<script setup>onBeforeUnmount
import { ref, onMounted, onBeforeUnmount } from "vue";
import { getJwtToken } from "@/utils/auth";
import { useToast } from 'vue-toastification'

import Dropzone from "dropzone";

const dropzone = ref(null);
const toast = useToast();

onMounted(async () => {
  const jwtToken = getJwtToken();
  dropzone.value = new Dropzone("#dropzoneForm", {
    url: `${import.meta.env.VITE_API_URL}/upload`,
    acceptedFiles: ".xls,.xlsx",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Bearer " + jwtToken,
    },
  });
  dropzone.value.on("success", (file) => {
    toast.success("Import Data Berhasil!");
    dropzone.value.removeFile(file)
  });
});

// Detroy dropzone instance before leaving the page
onBeforeUnmount(() => {
  dropzone.value.destroy();
});

</script>

<style lang="scss">

@import "dropzone/dist/dropzone.css";
@import "@/assets/scss/vendor/dropzone";

#import-index-view {
  .dz-default.dz-message {
    display: none!important;
  }
}
</style>

<template>
  <!-- Hero -->
  <BasePageHeading title="Import" />
  <!-- Page Content -->
  <div class="content" id="import-index-view">
    <BaseBlock class="pb-4">
        <form id="dropzoneForm" class="dropzone">
          <div class="dz-message d-flex flex-column align-items-center justify-content-center" data-dz-message>
            <i class="fa fa-file-import text-success fa-5x"></i>
            <h5 class="mt-3">Upload file dengan format <b>.xlsx</b></h5>
          </div>
        </form>
    </BaseBlock>
  </div>
</template>
