<template>
  <ul class="pagination">
    <li :class="['page-item', disabledPrevious && 'disabled']">
      <a
        class="page-link"
        href="#"
        :tabindex="disabledPrevious ? '-1' : null"
        :aria-disabled="disabledPrevious ? 'true' : null"
        @click.prevent="handlePageChange(dsPage !== 1 && meta.total_pages !== 0 ? dsPage - 1 : dsPage)"
      >
        {{ datasetI18n.previous }}
      </a>
    </li>
    <template v-for="(item, index) in dsPages" :key="index">
      <li :class="['page-item', item === meta.current_page && 'active', item === morePages && 'disabled']">
        <a v-if="item !== morePages" class="page-link" href="#" @click.prevent="handlePageChange(item)">
          {{ item }}
        </a>
        <span v-else class="page-link">
          {{ item }}
        </span>
      </li>
    </template>
    <li :class="['page-item', disabledNext && 'disabled']">
      <a
        class="page-link"
        href="#"
        :tabindex="disabledNext ? '-1' : null"
        :aria-disabled="disabledNext ? 'true' : null"
        @click.prevent="handlePageChange(dsPage !== meta.total_pages && meta.total_pages !== 0 ? dsPage + 1 : dsPage)"
      >
        {{ datasetI18n.next }}
      </a>
    </li>
  </ul>
</template>

<script>
import { computed, inject, ref } from 'vue'
export default {
  props: {
    meta: { type: Object }
  },
  setup(props) {
    const morePages = ref("...")
    const dsPage = inject('dsPage')
    const disabledPrevious = computed(() => dsPage.value === 1)
    const disabledNext = computed(() => dsPage.value === props.meta.total_pages || props.meta.total_pages === 0)
    const dsPages = Array.from({length: props.meta.total_pages}, (x, i) => i + 1);
    return {
      datasetI18n: inject('datasetI18n'),
      setActive: inject('setActive'),
      dsPages,
      dsPage,
      morePages,
      disabledPrevious,
      disabledNext
    }
  },
  methods: {
    handlePageChange(item) {
      this.setActive(item);
      this.$emit('page-change', item);
    }
  }
}
</script>