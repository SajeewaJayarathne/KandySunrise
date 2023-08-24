<template>
  <svg :width="iconWidth" :height="iconHeight" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M12 7V17M7 12H17M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        :stroke="strokeColour" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>
</template>

<script>
export default {
  props: {
    strokeColour: {
      type: String,
      default: '#c4b6bf'
    },
    iconWidth: {
      type: Number,
      default: 30
    },
    iconHeight: {
      type: Number,
      default: 30
    }
  }
};
</script>