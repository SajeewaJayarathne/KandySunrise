<template>
  <Carousel
    id="gallery"
    class="gallery"
    :items-to-show="1"
    :wrap-around="false"
    v-model="currentSlide"
  >
    <Slide v-for="(slide, index) in slides" :key="index">
      <div class="carousel__item h-[50vh] lg:h-[80vh] w-full rounded relative">
        <img
            :src="slide.src"
            :alt="slide.imgName"
            class="h-full w-full rounded object-cover cursor-pointer"
            @click="handleImgClick(index)"
            loading="lazy"
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
      :snap-align="'start'"
      class="gallery-thumbnails hidden lg:block"
  >
    <Slide v-for="(slide, index) in slides" :key="index">
      <div class="carousel__item" @click="slideTo(index)">
        <img
            :src="slide.src"
            :alt="slide.imgName"
            class="w-full h-auto object-cover aspect-4/3"
            :class="{'active-img': currentSlide === index}"
            loading="lazy"
        />
      </div>
    </Slide>
  </Carousel>
</template>

<script setup>
import {ref, defineProps} from 'vue'

import {Carousel, Slide, Navigation} from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css'

const props = defineProps({
  slides: {
    type: Array,
    required: true
  },
  thumbnailCount: {
    type: Number,
    default: 5
  },
  openPopup: {
    type: Function
  }
});

const currentSlide = ref(0);

function slideTo(val) {
  currentSlide.value = val;
}

function handleImgClick(index) {
  if (props.openPopup) {
    props.openPopup(index);
  }
}
</script>