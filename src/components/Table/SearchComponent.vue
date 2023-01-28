<template>
  <input
    type="text"
    :placeholder="dsSearchPlaceholder"
    class="form-control"
    :value="dsSearch"
    @keyup.enter="input($event.target.value)"
  />
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    dsSearchPlaceholder: {
      type: String,
      default: ''
    },
    wait: {
      type: Number,
      default: 0
    }
  },
  setup(props, context) {
    const dsSearch = ref('');
    const input = (value) => {
      dsSearch.value = value;
      context.emit('search', value);
    }

    return { input, dsSearch }
  }
}
</script>