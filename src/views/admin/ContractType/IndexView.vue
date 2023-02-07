<script setup>
import TableComponent from "@/components/Table";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const cols = reactive([
  {
    name: "Nama",
    field: "name"
  },
]);
</script>

<template>
  <!-- Hero -->
  <BasePageHeading title="Contract Type">
    <template #extra>
      <button
        type="button"
        class="btn btn-primary text-white"
        @click="router.push({ name: 'master-contract-type-create' })"
      >
        <i class="fa fa-add opacity-50 me-1"></i>
        Tambah Data
      </button>
    </template>
  </BasePageHeading>
  <!-- END Hero -->

  <!-- Page Content -->
  <div class="content">
    <TableComponent endpoint="contract-type" :cols="cols">
      <template #actions="{ row }">
        <div class="btn-group">
          <button type="button" class="btn btn-alt-info" @click="router.push({ name: 'master-contract-type-edit', params: { id: row.id } })">
            <i class="fa fa-fw fa-pencil-alt"></i>
          </button>
          <button type="button" class="btn btn-alt-success" @click="router.push({ name: 'master-contract-type-detail', params: { id: row.id } })">
            <i class="fa fa-fw fa-list"></i>
          </button>
          <button type="button" class="btn btn-alt-danger" @click="router.push({ name: 'master-contract-type-edit', params: { id: row.id } })">
            <i class="fa fa-fw fa-trash"></i>
          </button>
        </div>
      </template>
    </TableComponent>
  </div>
  <!-- END Page Content -->
</template>
