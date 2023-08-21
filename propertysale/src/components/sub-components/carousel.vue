<template>
  <Carousel :items-to-show="slidesToShow" :wrap-around="wrapAround" :transition="500" :breakpoints="breakpoints">
    <!-- The slot should include the vue3-carousel <Slide> element -->
    <slot/>

    <template #addons>
      <Navigation/>
      <Pagination/>
    </template>
  </Carousel>
</template>

<script>
import {Carousel, Pagination, Navigation} from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

export default {
  components: {
    Carousel,
    Pagination,
    Navigation
  },
  props: {
    slidesToShow: {
      type: Number,
      default: 3
    },
    breakpoints: {
      type: Object,
      default: {}
    },
    wrapAround: {
      type: Boolean,
      default: false
    }
  }
};
</script>
