<script setup>
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

</script>

<template>
  <BasePageHeading title="Dashboard" :subtitle="`Selamat Datang, ${authStore.auth.name}!`">
  </BasePageHeading>
</template>
