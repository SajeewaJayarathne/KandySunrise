<template>
  <Carousel :items-to-show="slidesToShow" :wrap-around="true" :transition="500" :breakpoints="breakpoints">
    <Slide v-for="slide in slides" :key="slide.id">
      <div class="carousel__item h-96 w-full rounded relative cursor-pointer" @click="openPopup(slide.id)">
        <img
            :src="'../src/assets/images/' + slide.imgName"
            :alt="slide.title"
            class="h-full w-full object-cover rounded brightness-120"
        />
        <div class="absolute bottom-0 flex flex-col w-full h-1/4 bg-gray-800/60 text-center text-white rounded">
          <h5 class="mt-auto">{{ slide.title }}</h5>
          <button @click="openPopup(slide.id)" class="text-sm underline mb-auto">Read More...</button>
        </div>
      </div>
    </Slide>

    <template #addons>
      <Navigation/>
      <Pagination/>
    </template>
  </Carousel>

  <Popup :open="isOpen" @close="isOpen = false">
    <div class="h-full grid grid-cols-2 gap-x-14">
      <img
          :src="'../src/assets/images/' + selectedSlide.imgName"
          :alt="selectedSlide.title"
          class="h-full w-full object-cover rounded"
      />
      <div class="flex flex-col">
        <h4>{{selectedSlide.title}}</h4>
        <p class="mb-auto mt-12 leading-7">{{selectedSlide.details}}</p>
      </div>

    </div>
  </Popup>
</template>

<script>
import {ref} from 'vue';
import 'vue3-carousel/dist/carousel.css';
import {Carousel, Slide, Pagination, Navigation} from 'vue3-carousel';

import Utils from '../utils';
import Popup from '../sub-components/popup.vue';
import IconPrev from '../icons/icon-prev.vue';
import IconNext from '../icons/icon-next.vue';

export default {
  components: {
    Popup,
    IconPrev,
    IconNext,
    Carousel,
    Slide,
    Pagination,
    Navigation
  },
  props: {
    slides: {
      type: Array,
      default: []
    },
    slidesToShow: {
      type: Number,
      default: 3
    },
    slideMargin: {
      type: String,
      default: '5'
    },
    breakpoints: {
      type: Object,
      default: {}
    }
  },
  setup(props) {
    const slides = ref(props.slides);
    const isOpen = ref(false);
    const selectedSlide = ref('');

    function openPopup(slideId) {
      isOpen.value = true;
      selectedSlide.value = slides.value[slideId];

      Utils.onModalStateChanged(true);
    }

    return {
      isOpen,
      selectedSlide,
      openPopup: openPopup
    };
  }
};
</script>

<style scoped lang="scss">

</style>
