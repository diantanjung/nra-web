<script setup>
import BaseNavigation from "@/components/BaseNavigation.vue";
import menu from "@/router/menu";
import BaseLayout from "@/layouts/BaseLayout.vue";
import { useAuthStore } from "@/stores/auth";
import { useTemplateStore } from "@/stores/template";
import { computed } from "vue";

// Main templateStore
const templateStore = useTemplateStore();
const authStore = useAuthStore();

// Set default elements for this layout
templateStore.setLayout({
  header: true,
  sidebar: true,
  sideOverlay: true,
  footer: true,
});

// Set various template options for this layout variation
templateStore.headerStyle({ mode: "light" });
templateStore.mainContent({ mode: "narrow" });

const nodes = computed(() => {
  return menu.filter((side) => side.roles.includes(authStore.auth.role_id));
});
</script>

<template>
  <BaseLayout>
    <!-- Side Overlay Content -->
    <!-- Using the available v-slot, we can override the default Side Overlay content from layouts/partials/SideOvelay.vue -->
    <template #side-overlay-content>
      <div class="content-side">
        <p>Side Overlay content..</p>
      </div>
    </template>
    <!-- END Side Overlay Content -->

    <!-- Sidebar Content -->
    <!-- Using the available v-slot, we can override the default Sidebar content from layouts/partials/Sidebar.vue -->
    <template #sidebar-content>
      <div class="content-side">
        <BaseNavigation :nodes="nodes" />
      </div>
    </template>
    <!-- END Sidebar Content -->

    <!-- Header Content Left -->
    <!-- Using the available v-slot, we can override the default Header content from layouts/partials/Header.vue -->
    <template #header-content-left>
      <!-- Toggle Sidebar -->
      <button
        type="button"
        class="btn btn-sm btn-alt-secondary me-2 d-lg-none"
        @click="templateStore.sidebar({ mode: 'toggle' })"
      >
        <i class="fa fa-fw fa-bars"></i>
      </button>
      <!-- END Toggle Sidebar -->

      <!-- Toggle Mini Sidebar -->
      <button
        type="button"
        class="btn btn-sm btn-alt-secondary me-2 d-none d-lg-inline-block"
        @click="templateStore.sidebarMini({ mode: 'toggle' })"
      >
        <i class="fa fa-fw fa-bars"></i>
      </button>
      <!-- END Toggle Mini Sidebar -->
    </template>
    <template #footer-content-left>
      <strong>{{ templateStore.app.name }}</strong>
      &copy; {{ templateStore.app.copyright }}
    </template>
    <!-- END Footer Content Left -->
  </BaseLayout>
</template>
