<script setup>
import moment from 'moment';
import TableComponent from "@/components/Table";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const cols = reactive([
  {
    name: "Nama",
    field: "user_name"
  },
  {
    name: "Tipe",
    field: "contract_type_name"
  },
  {
    name: "Tgl Efektif",
    field: "effective_date",
    content: (row) => moment(row.effective_date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
  },
]);
</script>

<template>
  <!-- Hero -->
  <BasePageHeading title="Contract">
    <template #extra>
      <button
        type="button"
        class="btn btn-secondary text-white me-2"
        @click="router.push({ name: 'master-contract-type-index' })"
      >
        <i class="fa fa-list opacity-50 me-1"></i>
        Tipe Kontrak
      </button>
      <button
        type="button"
        class="btn btn-primary text-white"
        @click="router.push({ name: 'master-contract-create' })"
      >
        <i class="fa fa-add opacity-50 me-1"></i>
        Tambah Data
      </button>
    </template>
  </BasePageHeading>
  <!-- END Hero -->

  <!-- Page Content -->
  <div class="content">
    <TableComponent endpoint="user-contract" :cols="cols">
      <template #actions="{ row }">
        <div class="btn-group">
          <button type="button" class="btn btn-alt-info" @click="router.push({ name: 'master-contract-edit', params: { id: row.id } })">
            <i class="fa fa-fw fa-pencil-alt"></i>
          </button>
          <button type="button" class="btn btn-alt-success" @click="router.push({ name: 'master-contract-detail', params: { id: row.id } })">
            <i class="fa fa-fw fa-list"></i>
          </button>
          <button type="button" class="btn btn-alt-danger" @click="router.push({ name: 'master-contract-edit', params: { id: row.id } })">
            <i class="fa fa-fw fa-trash"></i>
          </button>
        </div>
      </template>
    </TableComponent>
  </div>
  <!-- END Page Content -->
</template>
