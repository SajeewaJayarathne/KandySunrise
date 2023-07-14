<template>
  <svg :fill="fillColour" :width="iconWidth" :height="iconHeight" viewBox="0 0 512 512"
       xmlns="http://www.w3.org/2000/svg">
    <circle class="cls-1" cx="256" cy="256" r="246" :style="{stroke: strokeColour}"></circle>
    <polyline class="cls-1" points="178.18 411.63 333.82 256 178.18 100.37" :style="{stroke: strokeColour}"></polyline>
  </svg>
</template>

<script>
export default {
  props: {
    fillColour: {
      type: String,
      default: '#000000'
    },
    strokeColour: {
      type: String,
      default: '#000000'
    },
    iconWidth: {
      type: Number,
      default: 20
    },
    iconHeight: {
      type: Number,
      default: 20
    }
  }
};
</script>

<style scoped lang="scss">
.cls-1 {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 20px;
}</style>