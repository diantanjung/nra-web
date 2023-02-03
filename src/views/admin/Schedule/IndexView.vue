<script setup>
import moment from "moment";
import FilterComponent from "./FilterComponent.vue";
import TableComponent from "@/components/Table";
import { reactive, ref } from "vue";

const TableRef = ref(null);

const state = reactive({
  filter: {},
});

const cols = reactive([
  {
    name: "Waktu Tgl",
    field: "date_time",
    content: row => moment(row.schedule_date).format('DD/MM/YYYY HH:mm')
  },
  {
    name: "Pegawai",
    field: "user_name",
  },
  {
    name: "Warung",
    field: "merchant_name",
  },
]);

function handleFilter(params) {
  state.filter = params;
  const { merchant_ids=[], user_ids=[] } = params;
  const dates = params.dates ? params.dates.split(" s/d ") : '';
  const fetch_params = {
    merchant_ids,
    user_ids,
    start_date: params.dates != '' ? moment(dates[0]).format("YYYY-MM-DD") : '',
    end_date: params.dates != '' ? moment(dates[1]).format("YYYY-MM-DD") : ''
  }
  TableRef.value.fetch(fetch_params);
}
</script>

<template>
  <!-- Hero -->
  <BasePageHeading title="Schedule">
    <template #extra>
      <button
        type="button"
        class="btn btn-alt-info ms-2"
        v-click-ripple
        data-bs-toggle="modal"
        data-bs-target="#schedule-filter-component"
      >
        <i class="fa fa-filter opacity-50 me-1"></i>
        Filter
      </button>
    </template>
  </BasePageHeading>

  <!-- END Hero -->

  <!-- Page Content -->
  <div class="content">
    <BaseBlock
      v-if="Object.keys(state.filter).length !== 0"
      title="Filter Berdasarkan"
      content-full
      btn-option-content
      mode-content-hide
    >
      <table class="table table-striped table-vcenter">
        <tbody>
          <tr>
            <th scope="row" width="160">Tanggal</th>
            <td>{{ state.filter.dates }}</td>
          </tr>
          <tr>
            <th scope="row" width="160">Pegawai</th>
            <td>
              <span v-for="user in state.filter.users" :key="user.id">
                {{ user.name }},
              </span>
            </td>
          </tr>
          <tr>
            <th scope="row" width="160">Warung</th>
            <td>
              <span v-for="merchant in state.filter.merchants" :key="merchant.id">
                {{ merchant.name }},
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </BaseBlock>
    <TableComponent ref="TableRef" endpoint="survey/schedule" :cols="cols" :extra="state.filter">
    </TableComponent>
  </div>

  <FilterComponent @submit="handleFilter" />
  <!-- END Page Content -->
</template>
