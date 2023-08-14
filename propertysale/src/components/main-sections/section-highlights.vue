<template>
  <h2
      class="text-center"
      data-aos="fade-up"
      data-aos-duration="1000"
  >
    {{ localCurrentLang.highlights.title }}
  </h2>
  <div
      class="mt-6 lg:mt-12"
      data-aos="fade-in"
      data-aos-duration="1000"
  >
    <Carousel
        :slides-to-show="1"
        :breakpoints="{
            600: {
              itemsToShow: 1.5,
              snapAlign: 'center'
            },
            700: {
              itemsToShow: 2,
              snapAlign: 'center'
            },
            1024: {
              itemsToShow: 3,
              snapAlign: 'start'
            }}"
    >
      <Slide v-for="slide in slides" :key="slide.id">
        <div class="carousel__item h-96 w-full rounded relative cursor-pointer" @click="openPopup(slide.id)">
          <img
              :src="getImageUrl(slide.imgName)"
              :alt="localCurrentLang.highlights.content[slide.tag]"
              class="h-full w-full object-cover rounded brightness-120"
              loading="lazy"
          />
          <div class="absolute bottom-0 flex flex-col w-full h-1/4 bg-gray-800/60 text-center text-white rounded">
            <h5 class="mt-auto">{{ localCurrentLang.highlights.content[slide.tag] }}</h5>
            <button @click="openPopup(slide.id)" class="text-sm underline mb-auto">
              {{localCurrentLang.common.read_more }}
            </button>
          </div>
        </div>
      </Slide>
    </Carousel>
  </div>

  <Popup :open="showPopup" @close="showPopup = false">
    <div class="h-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
      <img
          :src="getImageUrl(selectedSlide.imgName)"
          :alt="localCurrentLang.highlights.content[selectedSlide.tag]"
          class="h-full w-full object-cover rounded"
          loading="lazy"
      />
      <div class="flex flex-col overflow-y-auto">
        <h4>{{ localCurrentLang.highlights.content[selectedSlide.tag] }}</h4>
        <p class="mb-auto mt-4 lg:mt-12 leading-7">
          {{ localCurrentLang.highlights.content[`${selectedSlide.tag}_desc`] }}</p>
      </div>
    </div>
  </Popup>
</template>

<script setup>
import {ref} from 'vue';
import {Slide} from 'vue3-carousel';
import {getCurrentLangFile} from '../utils/state.vue';

import Utils from '../utils/utils.js';
import Carousel from '../sub-components/carousel.vue';
import Popup from '../sub-components/popup.vue';

const localCurrentLang = ref(getCurrentLangFile());

const slides = ref([
  {
    id: 0,
    imgName: 'Location.jpg',
    tag: 'convenient_location'
  },
  {
    id: 1,
    imgName: 'Views.jpg',
    tag: 'picturesque_views'
  },
  {
    id: 2,
    imgName: 'Landscape.jpg',
    tag: 'serene_landscape'
  },
  {
    id: 3,
    imgName: 'Neighbourhood.jpg',
    tag: 'quiet_neighbourhood'
  }
]);

const showPopup = ref(false);
const selectedSlide = ref(slides.value[0]);

const getImageUrl = (imgName) => {
  return new URL(`/src/assets/images/${imgName}`, import.meta.url).href;
}

function openPopup(index) {
  showPopup.value = true;
  selectedSlide.value = slides.value[index];

  Utils.onModalStateChanged(true);
}
</script>