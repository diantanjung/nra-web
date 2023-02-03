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
    field: "schedule_date",
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
  {
    name: "Status",
    field: "status_label",
    order_by: "status",
    content: row => {
      const bgClass = ['bg-warning', 'bg-success', 'bg-danger'][row.status];
      return `<span class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill ${bgClass}-light text-success">${row.status_label}</span>`
    }
  },
]);

function handleFilter(params) {
  state.filter = params;
  const { merchant_ids=[], user_ids=[], statuses=[] } = params;
  const dates = params.dates ? params.dates.split(" s/d ") : '';
  const fetch_params = {
    merchant_id: merchant_ids.join(', '),
    user_id: user_ids.join(', '),
    status: statuses.length > 0 ? statuses.map(status => status.value).join(', ') : '',
    start_date: params.dates != '' ? moment(dates[0]).format("YYYY-MM-DD") : '',
    end_date: params.dates != '' ? moment(dates[1]).format("YYYY-MM-DD") : ''
  }
  TableRef.value.fetch(fetch_params);
}
</script>

<template>
  <!-- Hero -->
  <BasePageHeading title="Survey Data">
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
            <td>{{ state.filter.users.map(user => user.name).join(', ') }}</td>
          </tr>
          <tr>
            <th scope="row" width="160">Warung</th>
            <td>{{ state.filter.merchants.map(merchant => merchant.name).join(', ') }}</td>
          </tr>
          <tr>
            <th scope="row" width="160">Status</th>
            <td>{{ state.filter.statuses.map(status => status.label).join(', ') }}</td>
          </tr>
        </tbody>
      </table>
    </BaseBlock>
    <TableComponent ref="TableRef" endpoint="survey" :cols="cols" :extra="state.filter">
    </TableComponent>
  </div>

  <FilterComponent @submit="handleFilter" />
  <!-- END Page Content -->
</template>
