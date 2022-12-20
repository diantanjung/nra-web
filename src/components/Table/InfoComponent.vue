<template>
  <div>
    {{ datasetI18n.showing }} {{ showing }} {{ datasetI18n.showingTo }} {{ showingTo }} {{ datasetI18n.showingOf }}
    {{ meta.total }} {{ datasetI18n.showingEntries }}
  </div>
</template>

<script>
import { computed, inject } from 'vue'

export default {
  props: {
    meta: { type: Object }
  },
  setup(props) {
    const dsFrom = inject('dsFrom')
    const dsTo = inject('dsTo')

    const showing = computed(() => (props.meta.total.value !== 0 ? dsFrom.value + 1 : 0))
    const showingTo = computed(() => (dsTo.value >= props.meta.total.value ? props.meta.total.value : dsTo.value))

    return {
      datasetI18n: inject('datasetI18n'),
      showing,
      showingTo
    }
  }
}
</script>