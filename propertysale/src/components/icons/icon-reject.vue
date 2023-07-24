<template>
  <svg :width="iconWidth" :height="iconHeight" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink"
       viewBox="0 0 50 50" xml:space="preserve" :fill="lineFill">
    <circle :style="{fill: circleFill}" cx="25" cy="25" r="25"></circle>
    <polyline style="fill:none;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;"
              :style="{stroke: strokeColour}"
              points="16,34 25,25 34,16 "></polyline>
    <polyline style="fill:none;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;"
              :style="{stroke: strokeColour}"
              points="16,16 25,25 34,34 "></polyline>
  </svg>
</template>

<script>
export default {
  props: {
    circleFill: {
      type: String,
      default: '#D75A4A'
    },
    lineFill: {
      type: String,
      default: '#000000'
    },
    strokeColour: {
      type: String,
      default: '#FFFFFF'
    },
    iconWidth: {
      type: Number,
      default: 50
    },
    iconHeight: {
      type: Number,
      default: 50
    }
  }
};
</script>