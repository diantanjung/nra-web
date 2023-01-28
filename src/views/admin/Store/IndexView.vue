<script setup>
import { TableComponent } from "@/components/Table";
import { reactive } from "vue";

const cols = reactive([
  {
    name: "Nama",
    field: "name",
  },
  {
    name: "Kontak",
    field: "role_name",
    content: row => {
      return `<span>${row.contact_name}</span><br><span><b>+${row.contact_number}</b></span>`
    }
  },
  {
    name: "Kota",
    field: "name",
    content: row => {
      const locationArr = row.full_address.split(', ');
      const city = locationArr[locationArr.length - 2];
      const province = locationArr[locationArr.length - 1];
      return `${city}, ${province}`
    }
  },
  {
    name: "Alamat",
    field: "address",
  },
]);
</script>

<template>
  <!-- Hero -->
  <BasePageHeading title="Store" />
  <!-- END Hero -->

  <!-- Page Content -->
  <div class="content">
    <TableComponent endpoint="merchant" :cols="cols">
      <template #actions>
        <div class="btn-group">
          <button type="button" class="btn btn-alt-success">
            <i class="fa fa-fw fa-list"></i>
          </button>
        </div>
      </template>
    </TableComponent>
  </div>
  <!-- END Page Content -->
</template>
