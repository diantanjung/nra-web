<script setup>
import request from "@/utils/request";
import { reactive, computed, ref, nextTick, onMounted } from "vue";
import { useTemplateStore } from "@/stores/template";
// Vue Dataset, for more info and examples you can check out https://github.com/kouts/vue-dataset/tree/next
import { Dataset, DatasetItem, DatasetSearch, DatasetShow } from "vue-dataset";

import DatasetPager from "./PagerComponent.vue";
import DatasetInfo from "./InfoComponent.vue";


const blockRef = ref(null);
const tableRef = ref(null);
const tableKey = ref(0);

const templateStore = useTemplateStore();

const props = defineProps({
  endpoint: {
    type: String,
    description: "API Endpoint",
  },
  cols: {
    type: Array,
    description: "Columns for table",
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

// Sort by functionality
const sortBy = computed(() => {
  return props.cols.reduce((acc, o) => {
    if (o.sort) {
      o.sort === "asc" ? acc.push(o.field) : acc.push("-" + o.field);
    }
    return acc;
  }, []);
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
}

const fetch = async () => {
  blockRef.value.statusLoading()
  const { data, meta } = await request({
    url: props.endpoint,
    method: "get",
    params: { ...params, ...props.extra },
  });
  state.data = data;
  state.meta = meta.pagination;
  blockRef.value.statusNormal();

  // * RUN ON FIRST CREATED
  tableKey.value += 1;
  await nextTick();
  document.querySelectorAll("#datasetLength label").forEach((el) => {
    el.remove();
  });

  let selectLength = document.querySelector("#datasetLength select");
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
onMounted(() => {
  fetch();
});
</script>

<template>
  <BaseBlock content-full ref="blockRef">
    <Dataset
      ref="tableRef"
      :key="tableKey"
      :ds-data="state.data"
      :ds-sortby="sortBy"
      :ds-search-in="['name', 'email', 'company', 'birthdate']"
    >
      <div class="row">
        <div id="datasetLength" class="col-md-8 py-2">
          <DatasetShow
            :ds-show-entries="params.per_page"
            @change="handleDatasetShowChange"
          />
        </div>
        <div class="col-md-4 py-2">
          <DatasetSearch ds-search-placeholder="Search..." :wait="1000" />
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
                  <th
                    v-for="(th, index) in props.cols"
                    :key="th.field"
                    :class="['sort', th.sort]"
                    @click="onSort($event, index)"
                  >
                    {{ th.name }} <i class="gg-select float-end"></i>
                  </th>
                </tr>
              </thead>
              <DatasetItem tag="tbody" class="fs-sm">
                <template #default="{ row, rowIndex }">
                  <tr>
                    <th scope="row">{{ rowIndex + 1 }}</th>
                    <td style="min-width: 150px">{{ row.name }}</td>
                    <td>{{ row.email }}</td>
                    <td style="min-width: 150px">{{ row.company }}</td>
                    <td style="min-width: 150px">{{ row.birthdate }}</td>
                  </tr>
                </template>
              </DatasetItem>
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