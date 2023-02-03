<script setup>
import TableComponent from "@/components/Table";
import FlatPickr from "vue-flatpickr-component";
import VueSelect from "vue-select";

import { reactive } from "vue";


const emit = defineEmits(['submit'])


const data = reactive({
  statuses: [
    { value: 0, label: 'Draft' },
    { value: 1, label: 'Selesai' },
    { value: 2, label: 'Batal' }
  ]
})
const state = reactive({
  users: [],
  user_ids: [],
  merchants: [],
  merchant_ids: [],
  statuses: [],
  dates: "",
});

const cols = reactive({
  user: [
    {
      name: "Username",
      field: "username",
    },
    {
      name: "Nama",
      field: "name",
    },
  ],
  merchant: [
    {
      name: "Nama",
      field: "name",
    },
    {
      name: "Kontak",
      field: "role_name",
      content: (row) => {
        return `<span>${row.contact_name}</span><br><span><b>+${row.contact_number}</b></span>`;
      },
    },
    {
      name: "Kota",
      field: "name",
      content: (row) => {
        const locationArr = row.full_address.split(", ");
        const city = locationArr[locationArr.length - 2];
        const province = locationArr[locationArr.length - 1];
        return `${city}, ${province}`;
      },
    },
    {
      name: "Alamat",
      field: "address",
    },
  ],
});

function handleUserPick(user, type = "select") {
  state.users =
    type === "select"
      ? [...state.users, user]
      : state.users.filter((u) => u.id !== user.id);
  state.user_ids =
    type === "select"
      ? [...state.user_ids, user.id]
      : state.user_ids.filter((id) => id !== user.id);
}

function handleMerchantPick(merchant, type = "select") {
  state.merchants =
    type === "select"
      ? [...state.merchants, merchant]
      : state.merchants.filter((u) => u.id !== merchant.id);
  state.merchant_ids =
    type === "select"
      ? [...state.merchant_ids, merchant.id]
      : state.merchant_ids.filter((id) => id !== merchant.id);
}

function handleFilterReset() {
  Object.assign(state, {
    users: [],
    user_ids: [],
    merchants: [],
    merchant_ids: [],
    statuses: [],
    dates: "",
  });
  emit('submit', {})
}

function handleFilterSubmit() {
  emit('submit', state);
}
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select";
@import "@/assets/scss/vendor/vue-select";

// Flatpickr + Custom overrides
@import "flatpickr/dist/flatpickr.css";
@import "@/assets/scss/vendor/flatpickr";
</style>

<template>
  <div
    class="modal modal-xl"
    id="schedule-filter-component"
    tabindex="-1"
    role="dialog"
    aria-labelledby="schedule-filter-component"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <BaseBlock title="Filter Data" transparent class="mb-0">
          <template #options>
            <button
              type="button"
              class="btn-block-option"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i class="fa fa-fw fa-times"></i>
            </button>
          </template>

          <template #content>
            <div class="block-content fs-sm">
              <div class="row">
                <div class="col-12 mt-4">
                  <h6 class="mb-2">Tanggal</h6>
                  <FlatPickr
                    id="example-flatpickr-range"
                    class="form-control"
                    placeholder="Pilih rentang tanggal"
                    v-model="state.dates"
                    :config="{
                      mode: 'range',
                      maxDate: 'today',
                      altInput: true,
                      altFormat: 'd-m-Y',
                      locale: { rangeSeparator: ' s/d ' },
                    }"
                  />
                </div>

                <div class="col-12 mt-4">
                  <h6 class="mb-2">Status</h6>
                  <VueSelect
                    v-model="state.statuses"
                    :options="data.statuses"
                    label="label"
                    multiple
                    placeholder="Choose a value.."
                  ></VueSelect>
                </div>

                <div class="col-12 mt-4">
                  <h6 class="mb-2">Pegawai</h6>
                  <TableComponent
                    endpoint="users"
                    :cols="cols.user"
                    :extra="{ per_page: 5 }"
                  >
                    <template #actions="{ row }">
                      <button
                        v-if="!state.user_ids.includes(row.id)"
                        type="button"
                        class="btn btn-alt-success"
                        @click="handleUserPick(row, 'select')"
                      >
                        Pilih
                      </button>
                      <button
                        v-else
                        type="button"
                        class="btn btn-alt-danger"
                        @click="handleUserPick(row, 'deselect')"
                      >
                        Hapus
                      </button>
                    </template>
                  </TableComponent>
                </div>

                <div class="col-12 mt-4">
                  <h6 class="mb-2">Warung</h6>
                  <TableComponent
                    endpoint="merchant"
                    :cols="cols.merchant"
                    :extra="{ per_page: 5 }"
                  >
                    <template #actions="{ row }">
                      <button
                        v-if="!state.merchant_ids.includes(row.id)"
                        type="button"
                        class="btn btn-alt-success"
                        @click="handleMerchantPick(row, 'select')"
                      >
                        Pilih
                      </button>
                      <button
                        v-else
                        type="button"
                        class="btn btn-alt-danger"
                        @click="handleMerchantPick(row, 'deselect')"
                      >
                        Hapus
                      </button>
                    </template>
                  </TableComponent>
                </div>
              </div>
            </div>
            <div class="block-content block-content-full d-flex align-items-center justify-content-between bg-body">
              <button
                type="button"
                class="btn btn-danger text-white me-1"
                data-bs-dismiss="modal"
                @click="handleFilterReset"
              >
                Reset Filter
              </button>
              <div>
                <button
                  type="button"
                  class="btn btn-alt-secondary me-1"
                  data-bs-dismiss="modal"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  class="btn btn-success text-white"
                  data-bs-dismiss="modal"
                  @click="handleFilterSubmit"
                >
                  Terapkan Filter
                </button>
              </div>
            </div>
          </template>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>