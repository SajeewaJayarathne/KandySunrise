<template>
  <div class="tabs">
    <ul class="tabs_header">
      <li
        v-for="title in tabTitles"
        :key="title"
        :class="selectedTitle === title ? 'tab_active' : ''"
        @click="selectedTitle = title"
      >
        <button type="button" class="tabs_button">
          {{ title }}
        </button>
      </li>
    </ul>

    <slot />
  </div>
</template>

<script>
import { ref, provide } from 'vue';

export default {
  setup (props, { slots }) {
    const tabTitles = ref(slots.default().map((tab) => tab.props.title));
    const selectedTitle = ref(tabTitles.value[0]);

    provide('selectedTitle', selectedTitle);

    return {
      selectedTitle,
      tabTitles
    }
  }
}
</script>