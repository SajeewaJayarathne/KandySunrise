<template>
  <div class="tabs">
    <ul class="tabs_header">
      <li
        v-for="tab in tabs"
        :key="tab.title"
        :class="selectedTabId === tab.tabId ? 'tab_active' : ''"
        @click="onSelectTab(tab.tabId, tab.title)"
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
import { ref, provide } from 'vue';

export default {
  props: {
    onClickTab: {
      type: Function
    }
  },
  setup (props, { slots }) {
    const customFunction = ref(props.onClickTab);
    const tabs = ref(slots.default().map((tab) => ({ title:tab.props.title, tabId:tab.props.tabId })));

    const selectedTitle = ref(tabs.value[0].title);
    const selectedTabId = ref(tabs.value[0].tabId);

    provide('selectedTitle', selectedTitle);
    callCustomFn(selectedTabId.value);

    function onSelectTab (tabId, title) {
      selectedTitle.value = title;
      selectedTabId.value = tabId;
      callCustomFn(tabId)
    }

    function callCustomFn (tabId) {
      if (typeof customFunction.value === 'function') {
        customFunction.value(tabId);
      }
    }

    return {
      selectedTitle,
      selectedTabId,
      tabs,
      onSelectTab
    }
  }
}
</script>