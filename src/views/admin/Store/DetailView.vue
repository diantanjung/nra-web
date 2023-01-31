<script setup>
import TableComponent from "@/components/Table";
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { StoreDetail } from "@/api/store";

const router = useRouter();
const route = useRoute();
const DetailBlockRef = ref(null);

const state = reactive({
  store: {},
});

// Helper variables
const cols = reactive({
  chiller: [
    {
      name: "Nama",
      field: "name",
    },
    {
      name: "Tipe",
      field: "type",
      content: (row) => `${row.type} <b>(${row.merk})</b>`,
    },
    {
      name: "Kapasitas",
      field: "capacity",
    },
    {
      name: "Tgl. Maintenance",
      field: "last_maintenance_date",
    },
  ],
  survey: [
    {
      name: "Waktu",
      field: "date_time",
    },
    {
      name: "Pegawai",
      field: "user_name",
    },
  ],
});

onMounted(async () => {
  DetailBlockRef.value.statusLoading();
  const { data: dataClient } = await StoreDetail(route.params.id);
  state.store = dataClient;
  DetailBlockRef.value.statusNormal();
});
</script>

<template>
  <BasePageHeading title="Detail Client" with-back />
  <!-- Page Content -->
  <div class="content">
    <BaseBlock title="Detail Data" content-full ref="DetailBlockRef">
      <table class="table table-striped table-vcenter">
        <tbody>
          <tr>
            <th colspan="2">
              <img :src="state.store.photo" class="img-thumbnail" />
            </th>
          </tr>
          <tr>
            <th scope="row" width="160">Nama</th>
            <td>{{ state.store.name }}</td>
          </tr>
          <tr>
            <th scope="row" width="160">Kontak</th>
            <td>
              <span>{{ state.store.contact_name }}</span
              ><br />
              <span
                ><b>+{{ state.store.contact_number }}</b></span
              >
            </td>
          </tr>
          <tr>
            <th scope="row" width="160">Alamat</th>
            <td>{{ state.store.full_address }}</td>
          </tr>
          <tr v-if="state.store.latitude">
            <td colspan="2">
              <iframe
                width="600"
                height="300"
                :src="`https://maps.google.com/maps?q=${state.store.latitude},${state.store.longitude}&z=15&output=embed`"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                class="w-100"
              ></iframe>
            </td>
          </tr>
        </tbody>
      </table>
    </BaseBlock>

    <TableComponent
      title="Chiller"
      :endpoint="`chiller?merchant_id=${route.params.id}`"
      :cols="cols.chiller"
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
      title="Survey"
      :endpoint="`survey/schedule?merchant_id=${route.params.id}`"
      :cols="cols.survey"
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
</template>
