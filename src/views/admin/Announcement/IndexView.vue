<script setup>
import TableComponent from "@/components/Table";
import { reactive } from "vue";

// Helper variables
const cols = reactive([
  {
    name: "Judul",
    field: "title",
  },
  {
    name: "Isi",
    field: "content",
  },
  {
    name: "Status",
    field: "is_active",
    content: row => {
      const bgClass = row.is_active ? 'bg-success-light' : 'bg-danger-light';
      return `<span class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill ${bgClass} text-success">${row.is_active ? 'Aktif' : 'Nonaktif'}</span>`
    }
  },
]);
</script>

<template>
  <!-- Hero -->
  <BasePageHeading title="Announcement" />
  <!-- END Hero -->

  <!-- Page Content -->
  <div class="content">
    <TableComponent endpoint="announcement" :cols="cols">
      <template #actions="{ row }">
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
      </template>
    </TableComponent>
  </div>
</template>
