<template>
  <Carousel :items-to-show="slidesToShow" :wrap-around="true" :transition="500" :breakpoints="breakpoints">
    <Slide v-for="slide in slides" :key="slide.id">
      <div class="carousel__item h-96 w-full rounded relative cursor-pointer" @click="openPopup(slide.id)">
        <img
            :src="getImageUrl(slide.imgName)"
            :alt="slide.title"
            class="h-full w-full object-cover rounded brightness-120"
            loading="lazy"
        />
        <div class="absolute bottom-0 flex flex-col w-full h-1/4 bg-gray-800/60 text-center text-white rounded">
          <h5 class="mt-auto">{{ slide.title }}</h5>
          <button @click="handleSlideClick(slide.id)" class="text-sm underline mb-auto">Read More...</button>
        </div>
      </div>
    </Slide>

    <template #addons>
      <Navigation/>
      <Pagination/>
    </template>
  </Carousel>
</template>

<script>
import {ref} from 'vue';
import {Carousel, Slide, Pagination, Navigation} from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

import IconPrev from '../icons/icon-prev.vue';
import IconNext from '../icons/icon-next.vue';

export default {
  components: {
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
    },
    openPopup: {
      type: Function
    }
  },
  setup(props) {
    const openPopup = ref(props.openPopup);
    const isOpen = ref(false);
    const selectedSlide = ref('');

    function handleSlideClick(slideId) {
      if (openPopup.value) {
        openPopup.value(slideId);
      }
    }

    const getImageUrl = (imgName) => {
      return new URL(`/src/assets/images/${imgName}`, import.meta.url).href;
    }

    return {
      isOpen,
      selectedSlide,
      handleSlideClick,
      getImageUrl
    };
  }
};
</script>
