<script setup>
// import TableComponent from "@/components/Table";
// import { reactive } from "vue";

// Helper variables
// const cols = reactive([
//   {
//     name: "Foto",
//     field: "name",
//     content: (row) => `<img src="${row.photo}" height="50" />`,
//   },
//   {
//     name: "Nama",
//     field: "name",
//   },
//   {
//     name: "Hak Akses",
//     field: "role_name",
//   },
//   {
//     name: "Client",
//     field: "client_name",
//   },
// ]);
</script>

<template>
  <!-- Hero -->
  <BasePageHeading title="Approval" />
  <!-- END Hero -->

  <!-- Page Content -->
  <div class="content">
    <!-- <TableComponent endpoint="users" :cols="cols">
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
    </TableComponent> -->
  </div>
  <!-- END Page Content -->
</template>
