<template>
  <div class="tabs">
    <ul class="tabs_header">
      <li
        v-for="tab in tabs"
        :key="tab.title"
        :class="selectedTabId === tab.tabId ? 'tab_active' : ''"
        @click="onTabChange(tab.tabId)"
      >
        <button type="button" class="tabs_button font-bold">
          {{ tab.title }}
        </button>
      </li>
    </ul>

    <slot />
  </div>
</template>

<script>
import { ref, toRefs, provide, watchEffect } from 'vue';

export default {
  props: {
    onTabChange: {
      type: Function
    },
    selectedTabId: {
      type: Number,
      default: 0
    }
  },
  setup (props, { slots }) {
    const {selectedTabId} = toRefs(props);
    const tabs = ref(slots.default().map((tab) => ({ title:tab.props.title, tabId:tab.props.tabId })));

    const selectedTitle = ref(tabs.value[selectedTabId.value].title);

    provide('selectedTitle', selectedTitle);

    watchEffect(() => {
      selectedTitle.value = tabs.value[selectedTabId.value].title;
    });

    return {
      selectedTitle,
      selectedTabId,
      tabs
    }
  }
}
</script>