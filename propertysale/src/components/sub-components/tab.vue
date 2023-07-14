<template>
  <div class="tab_content" v-show="title === selectedTitle">
    <slot />
  </div>
</template>

<script>
import {inject} from 'vue';

export default {
  name: 'tab',
  props: ['title'],
  setup() {
    const selectedTitle = inject('selectedTitle');

    return {
      selectedTitle
    }
  }
}
</script>