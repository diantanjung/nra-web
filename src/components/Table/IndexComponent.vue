<script setup>
import request from "@/utils/request";
import { reactive, ref, nextTick, onMounted } from "vue";
// Vue Dataset, for more info and examples you can check out https://github.com/kouts/vue-dataset/tree/next
import { Dataset, DatasetItem, DatasetShow } from "vue-dataset";

import DatasetPager from "./PagerComponent.vue";
import DatasetInfo from "./InfoComponent.vue";
import DatasetSearch from "./SearchComponent.vue";


const key = Math.floor(Math.random() * 100) + 1;
const BlockRef = ref(null);
const tableRef = ref(null);
const tableKey = ref(0);

const props = defineProps({
  endpoint: {
    type: String,
    description: "API Endpoint",
  },
  cols: {
    type: Array,
    description: "Columns for table",
  },
  title: {
    type: String,
    default: null
  },
  extra: {
    type: Object,
    default: () => ({}),
  },
});

const state = reactive({
  initiate: false,
  loading: true,
  data: [],
  meta: {
    total: 0,
    total_pages: 0,
  },
});
const params = reactive({
  keyword: "",
  per_page: 10,
  page: 1,
  order_by: "created_at",
  order_dir: "desc",
});

// On sort th click
function onSort(event, i) {
  let toset;
  const sortEl = props.cols[i];
  if (!event.shiftKey) {
    props.cols.forEach((o) => {
      if (o.field !== sortEl.field) {
        o.sort = "";
      }
    });
  }
  if (!sortEl.sort) {
    toset = "asc";
  }

  if (sortEl.sort === "desc") {
    toset = event.shiftKey ? "" : "asc";
  }

  if (sortEl.sort === "asc") {
    toset = "desc";
  }
  sortEl.sort = toset;

  const column = props.cols[i];
  params.order_by = column.order_by || column.field;
  params.order_dir = toset;
  fetch();
}

const fetch = async (fetch_extra = {}) => {
  Object.assign(params, {
    ...params,
    ...fetch_extra
  });
  BlockRef.value.statusLoading()
  const { data, meta } = await request({
    url: props.endpoint,
    method: "get",
    params: { ...params, ...props.extra },
  });
  state.data = data;
  state.meta = meta && meta.pagination ? meta.pagination : {
    total: data.length,
    total_pages: 1,
  };
  BlockRef.value.statusNormal();

  // * RUN ON FIRST CREATED
  tableKey.value += 1;
  await nextTick();
  document.querySelectorAll(`#datasetLength-${key} label`).forEach((el) => {
    el.remove();
  });

  let selectLength = document.querySelector(`#datasetLength-${key} select`);
  selectLength.classList = "";
  selectLength.classList.add("form-select");
  selectLength.style.width = "80px";
};

function handleDatasetShowChange(e) {
  params.per_page = Number(e.target.value);
  fetch();
}
function handleDatasetPagerChange(item) {
  params.page = item;
  fetch();
}

const handleSearch = (value) => {
  params.keyword = value;
  fetch();
}

onMounted(() => {
  fetch();
});

defineExpose({
  fetch
})

</script>

<template>
  <BaseBlock :title="props.title" content-full ref="BlockRef">
    <template #options>
      <slot name="options"></slot>
    </template>
    <Dataset
      ref="tableRef"
      :key="tableKey"
      :ds-data="state.data"
    >
      <div class="row">
        <div :id="`datasetLength-${key}`" class="col-md-8 py-2">
          <DatasetShow
            :ds-show-entries="params.per_page"
            @change="handleDatasetShowChange"
          />
        </div>
        <div class="col-md-4 py-2">
          <DatasetSearch ds-search-placeholder="Search..." :wait="500" @search="handleSearch" />
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="table table-striped mb-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <template
                    v-for="(th, index) in props.cols"
                    :key="th.field"
                  >
                    <th v-if="th.sortable == false">
                      {{ th.name }}
                    </th>
                    <th
                      v-else
                      :class="['sort', th.sort]"
                      @click="onSort($event, index)"
                    >
                      {{ th.name }} <i class="gg-select float-end"></i>
                    </th>
                  </template>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <DatasetItem v-if="state.data.length > 0" tag="tbody" class="fs-sm">
                <template #default="{ row, rowIndex }">
                  <tr>
                    <th scope="row">{{ rowIndex + 1 }}</th>
                    <td
                      v-for="(col, index) in props.cols"
                      :key="`${rowIndex}-${index}`"
                    >
                      <template v-if="'content' in col">
                        <div v-html="col.content(row)"></div>
                      </template>
                      <template v-else>
                        <div style="min-width: 150px">
                          {{ row[col.field] }}
                        </div>
                      </template>
                    </td>
                    <td style="min-width: 150px">
                      <slot name="actions" v-bind={row}></slot>
                    </td>
                  </tr>
                </template>
              </DatasetItem>
              <template v-else>
                <tr>
                  <td :colspan="props.cols.length + 2" class="text-center">
                    <p>Data Kosong</p>
                  </td>
                </tr>
              </template>
            </table>
          </div>
        </div>
      </div>
      <div
        class="d-flex flex-md-row flex-column justify-content-between align-items-center"
      >
        <DatasetInfo class="py-3 fs-sm" :meta="state.meta" />
        <DatasetPager
          class="flex-wrap py-3 fs-sm"
          :meta="state.meta"
          @page-change="handleDatasetPagerChange"
        />
      </div>
    </Dataset>
  </BaseBlock>
</template>

<style lang="scss" scoped>
.gg-select {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(1);
  width: 22px;
  height: 22px;
}
.gg-select::after,
.gg-select::before {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 8px;
  height: 8px;
  left: 7px;
  transform: rotate(-45deg);
}
.gg-select::before {
  border-left: 2px solid;
  border-bottom: 2px solid;
  bottom: 4px;
  opacity: 0.3;
}
.gg-select::after {
  border-right: 2px solid;
  border-top: 2px solid;
  top: 4px;
  opacity: 0.3;
}
th.sort {
  cursor: pointer;
  user-select: none;
  &.asc {
    .gg-select::after {
      opacity: 1;
    }
  }
  &.desc {
    .gg-select::before {
      opacity: 1;
    }
  }
}
</style>