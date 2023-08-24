<template>
  <swiper
      class="gallery"
      :options="swiperOptions"
      :initial-slide="initialSlide"
      :slide-next-class="'.swiper-slide-next'"
      :slide-prev-class="'.swiper-slide-prev'"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      init="false"
  >
    <swiper-slide v-for="(slide, index) in slides" :key="index">
      <div class="carousel__item h-full w-full rounded relative">
        <img
            :src="slide.src"
            :alt="slide.imgName"
            class="h-full w-full object-contain"
            loading="lazy"
        />
      </div>
    </swiper-slide>

    <!-- Custom arrow buttons -->
    <button type="button" class="swiper-button-prev" slot="button-prev" @click="handlePrevSlide()" :disabled="isPrevDisabled"></button>
    <button type="button" class="swiper-button-next" slot="button-next" @click="handleNextSlide()" :disabled="isNextDisabled"></button>
  </swiper>


</template>

<script setup>
import {ref, onMounted} from 'vue';
import {defineProps} from '@vue/runtime-core';
import 'swiper/swiper-bundle.min.css'; // Import the Swiper CSS
import 'swiper/css/navigation';
import {Swiper, SwiperSlide} from 'vue-awesome-swiper';

const props = defineProps({
  slides: {
    type: Array,
    required: true
  },
  initialSlide: {
    type: Number,
    default: 0
  }
});

const swiperOptions = ref({
  centeredSlides: false,
  loop: false,
  pagination: '.swiper-pagination',
  slidesPerView: 1,
  paginationClickable: true,
  spaceBetween: 1,
  keyboardControl: true,
  slideNextClass: '.swiper-slide-next',
  slidePrevClass: '.swiper-slide-prev',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
});

const swiperEl = ref(null);
const isPrevDisabled = ref(false);
const isNextDisabled = ref(false);

onMounted(() => {
  swiperEl.value = document.querySelector('.swiper').swiper;
  setNavAvailability();
})

const handlePrevSlide = () => {
  swiperEl.value.slidePrev();
  setNavAvailability();
};

const handleNextSlide = () => {
  swiperEl.value.slideNext();
  setNavAvailability();
};

const setNavAvailability = () => {
  isPrevDisabled.value = swiperEl.value.activeIndex === 0;
  isNextDisabled.value = swiperEl.value.activeIndex === (props.slides.length - 1);
}
</script>