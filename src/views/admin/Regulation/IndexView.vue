<script setup>
import TableComponent from "@/components/Table";
import { reactive } from "vue";

const cols = reactive([
  {
    name: "Tipe",
    field: "type"
  },
  {
    name: "Nama",
    field: "name",
  }
]);
</script>

<template>
  <!-- Hero -->
  <BasePageHeading title="Regulation">
    <!-- <template #extra>
      <button
        type="button"
        class="btn btn-primary text-white"
        @click="router.push('/admin/master/user/create')"
      >
        <i class="fa fa-add opacity-50 me-1"></i>
        Tambah Data
      </button>
    </template> -->
  </BasePageHeading>
  <!-- END Hero -->

  <!-- Page Content -->
  <div class="content">
    <TableComponent endpoint="regulation" :cols="cols">
      <!-- <template #actions="{ row }">
        <div class="btn-group">
          <button type="button" class="btn btn-alt-info" @click="router.push(`/admin/master/user/edit/${row.id}`)">
            <i class="fa fa-fw fa-pencil-alt"></i>
          </button>
          <button type="button" class="btn btn-alt-success">
            <i class="fa fa-fw fa-list"></i>
          </button>
          <button type="button" class="btn btn-alt-danger">
            <i class="fa fa-fw fa-trash"></i>
          </button>
        </div>
      </template> -->
    </TableComponent>
  </div>
  <!-- END Page Content -->
</template>
