<script setup>
import TableComponent from "@/components/Table";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Helper variables
const cols = reactive([
  {
    name: "SKU",
    field: "sku",
  },
  {
    name: "Nama",
    field: "name",
  },
  {
    name: "Kategori",
    field: "category_name",
    order_by: "category_id"
  },
  {
    name: "Supplier",
    field: "supplier_name",
    order_by: "supplier_id"
  },
]);
</script>

<template>
  <!-- Hero -->
  <BasePageHeading title="Product">
    <template #extra>
      <button
        type="button"
        class="btn btn-primary text-white"
        @click="router.push({ name: 'master-product-create' })"
      >
        <i class="fa fa-add opacity-50 me-1"></i>
        Tambah Data
      </button>
    </template>
  </BasePageHeading>
  <!-- END Hero -->

  <!-- Page Content -->
  <div class="content">
    <TableComponent endpoint="product" :cols="cols">
      <template #actions="{ row }">
        <div class="btn-group">
          <button type="button" class="btn btn-alt-info" @click="router.push({ name: 'master-product-edit', params: { id: row.id } })">
            <i class="fa fa-fw fa-pencil-alt"></i>
          </button>
          <button type="button" class="btn btn-alt-success" @click="router.push({ name: 'master-product-detail', params: { id: row.id } })">
            <i class="fa fa-fw fa-list"></i>
          </button>
          <button type="button" class="btn btn-alt-danger" @click="router.push({ name: 'master-product-edit', params: { id: row.id } })">
            <i class="fa fa-fw fa-trash"></i>
          </button>
        </div>
      </template>
    </TableComponent>
  </div>
  <!-- END Page Content -->
</template>
