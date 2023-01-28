<script setup>
import TableComponent from "@/components/Table";
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ClientDetail } from "@/api/client";

const router = useRouter();
const route = useRoute();
const DetailBlockRef = ref(null);

const state = reactive({
  client: {},
});

// Helper variables
const cols = reactive({
  area: [
    {
      name: "Foto",
      field: "site_photo",
      content: (row) => `<img src="${row.site_photo}" height="70" />`,
    },
    {
      name: "Area",
      field: "area_name",
    },
    {
      name: "Alamat",
      field: "address",
    },
  ],
  location: [
    {
      name: "Area",
      field: "area_name",
    },
    {
      name: "Department",
      field: "department_name",
    },
    {
      name: "Shift",
      field: "shift",
    },
  ],
  regulation: [
    {
      name: "Nama",
      field: "regulation_name",
    },
    {
      name: "Tipe",
      field: "regulation_type",
    },
    {
      name: "Area",
      field: "area_name",
    },
    {
      name: "Department",
      field: "department_name",
    },
  ],
});

onMounted(async () => {
  DetailBlockRef.value.statusLoading();
  const { data: dataClient } = await ClientDetail(route.params.id);
  state.client = dataClient;
  DetailBlockRef.value.statusNormal();
});
</script>

<template>
  <BasePageHeading title="Detail Client" with-back />
  <!-- Page Content -->
  <div class="content">

    <BaseBlock title="Detail Data" content-full ref="DetailBlockRef">
      <div class="row">
        <div class="col-md-4 col-12">
          <img :src="state.client.logo" class="img-thumbnail" />
        </div>
        <div class="col-md-8 col-12">
          <table class="table table-striped table-vcenter">
            <tbody>
              <tr>
                <th scope="row" width="160">Nama</th>
                <td>{{ state.client.name }}</td>
              </tr>
              <tr>
                <th scope="row" width="160">Total Pegawai</th>
                <td>{{ state.client.total_employee }}</td>
              </tr>
              <tr>
                <th scope="row" width="160">Alamat</th>
                <td>{{ state.client.address }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </BaseBlock>

    <TableComponent
      title="Area"
      :endpoint="`client-area?client_id=${route.params.id}`"
      :cols="cols.area"
    >
      <template #options>
        <button
          disabled
          type="button"
          class="btn btn-primary text-white"
          @click="router.push('/admin/master/user/create')"
        >
          <i class="fa fa-add opacity-50 me-1"></i>
          Tambah Data
        </button>
      </template>
      <template #actions="{ row }">
        <div class="btn-group">
          <a :href="row.gmaps_url" target="_blank" class="btn btn-alt-warning">
            <i class="si si-pointer"></i>
          </a>
        </div>
      </template>
    </TableComponent>

    <TableComponent
      title="Location"
      :endpoint="`client-location?client_id=${route.params.id}`"
      :cols="cols.location"
    >
      <template #options>
        <button
          disabled
          type="button"
          class="btn btn-primary text-white"
          @click="router.push('/admin/master/user/create')"
        >
          <i class="fa fa-add opacity-50 me-1"></i>
          Tambah Data
        </button>
      </template>
    </TableComponent>

    <TableComponent
      title="Regulation"
      :endpoint="`client-regulation?client_id=${route.params.id}`"
      :cols="cols.regulation"
    >
      <template #options>
        <button
          disabled
          type="button"
          class="btn btn-primary text-white"
          @click="router.push('/admin/master/user/create')"
        >
          <i class="fa fa-add opacity-50 me-1"></i>
          Tambah Data
        </button>
      </template>
    </TableComponent>
  </div>
  <!-- END Page Content -->
</template>
