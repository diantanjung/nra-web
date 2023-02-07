<script setup>
import TableComponent from "@/components/Table";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Helper variables
const cols = reactive([
  {
    name: "Logo",
    field: "logo",
    sortable: false,
    content: (row) => `<img src="${row.logo}" height="50" />`,
  },
  {
    name: "Nama",
    field: "name",
    sortable: false,
  },
  {
    name: "Alamat",
    field: "address",
    sortable: false,
  },
  {
    name: "Total Pegawai",
    field: "total_employee",
    sortable: false,
  },
]);
</script>

<template>
  <!-- Hero -->
  <BasePageHeading title="Client">
    <template #extra>
      <button
        type="button"
        class="btn btn-primary text-white"
        @click="router.push({ name: 'master-client-create' })"
      >
        <i class="fa fa-add opacity-50 me-1"></i>
        Tambah Data
      </button>
    </template>
  </BasePageHeading>
  <!-- END Hero -->

  <!-- Page Content -->
  <div class="content">
    <TableComponent endpoint="client" :cols="cols">
      <template #actions="{ row }">
        <div class="btn-group">
          <button type="button" class="btn btn-alt-info" @click="router.push({ name: 'master-client-edit', params: { id: row.id }})">
            <i class="fa fa-fw fa-pencil-alt"></i>
          </button>
          <button type="button" class="btn btn-alt-success" @click="router.push({ name: 'master-client-detail', params: { id: row.id }})">
            <i class="fa fa-fw fa-list"></i>
          </button>
          <!-- <button type="button" class="btn btn-alt-danger">
            <i class="fa fa-fw fa-trash"></i>
          </button> -->
        </div>
      </template>
    </TableComponent>
  </div>
  <!-- END Page Content -->
</template>
