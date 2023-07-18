<template>
  <Carousel id="gallery" class="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
    <Slide v-for="slide in slides" :key="slide">
      <div class="carousel__item h-[80vh] w-full rounded relative">
        <img
            :src="'../src/assets/images/' + slide"
            :alt="slide"
            class="h-full w-full object-cover rounded"
        />
      </div>
    </Slide>

    <template #addons>
      <Navigation/>
    </template>
  </Carousel>

  <Carousel
      id="thumbnails"
      :items-to-show="thumbnailCount"
      :wrap-around="false"
      v-model="currentSlide"
      ref="carousel"
      class="gallery-thumbnails"
  >
    <Slide v-for="(slide, index) in slides" :key="index">
      <div class="carousel__item" @click="slideTo(index)">
        <img
            :src="'../src/assets/images/' + slide"
            :alt="slide"
            class="w-full h-auto object-cover aspect-4/3"
            :class="{'active-img': currentSlide === index}"
        />
      </div>
    </Slide>
  </Carousel>
</template>

<script>
import {ref, toRefs, onMounted} from 'vue'
import {Carousel, Slide, Navigation} from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css'

export default {
  name: 'Gallery',
  components: {
    Carousel,
    Slide,
    Navigation
  },
  props: {
    slides: {
      type: Array,
      required: true
    },
    thumbnailCount: {
      type: Number,
      default: 5
    }
  },
  setup(props) {
    const {slides, thumbnailCount} = toRefs(props);
    const currentSlide = ref(0);

    onMounted(() => {
      if (slides.value?.length < thumbnailCount.value) {
        thumbnailCount.value = slides.value.length;
      }
    });

    function slideTo(val) {
      currentSlide.value = val;
    }

    return {
      currentSlide,
      thumbnailCount,
      slideTo
    };

  },
}
</script>