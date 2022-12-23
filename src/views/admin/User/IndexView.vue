<script setup>
import TableComponent from "@/components/Table";
import { reactive } from "vue";


// Helper variables
const cols = reactive([
  {
    name: "Name",
    field: "name",
    sort: "",
  },
  {
    name: "Email",
    field: "email",
    sort: "",
  },
  {
    name: "Company",
    field: "company",
    sort: "",
  },
  {
    name: "Birth date",
    field: "birthdate",
    sort: "",
  },
]);
</script>

<template>
  <!-- Hero -->
  <BasePageHeading title="Daftar User">
    <template #extra>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb breadcrumb-alt">
          <li class="breadcrumb-item">
            <a class="link-fx" href="javascript:void(0)">Tables</a>
          </li>
          <li class="breadcrumb-item" aria-current="page">Helpers</li>
        </ol>
      </nav>
    </template>
  </BasePageHeading>
  <!-- END Hero -->

  <!-- Page Content -->
  <div class="content">
    <TableComponent
      endpoint="users"
      :cols="cols"
    />
  </div>
  <!-- END Page Content -->
</template>
