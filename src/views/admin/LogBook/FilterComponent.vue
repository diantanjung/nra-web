<script setup>
import TableComponent from "@/components/Table";
import FlatPickr from "vue-flatpickr-component";

import { reactive } from "vue";


const emit = defineEmits(['submit'])

const state = reactive({
  users: [],
  user_ids: [],
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

function handleFilterReset() {
  Object.assign(state, {
    users: [],
    user_ids: [],
    dates: "",
  });
  emit('submit', {})
}

function handleFilterSubmit() {
  emit('submit', state);
}
</script>

<style lang="scss">

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