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
</style>

<template>
  <!-- Hero -->
  <BasePageHeading title="Import" />
  <!-- Page Content -->
  <div class="content">
    <BaseBlock title="Import Data Excel" class="pb-4">
        <form id="dropzoneForm" class="dropzone"></form>
    </BaseBlock>
  </div>
</template>
