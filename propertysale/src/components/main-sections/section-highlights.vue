<template>
  <div
      class="highlights-container"
      data-aos="fade-up"
      data-aos-duration="800"
  >
    <div
      v-for="slide in slides"
      :key="slide.id"
      class="highlights-item"
      @click="openPopup(slide.id)"
    >
      <div>
        <span v-html="slide.icon"></span>
        <span class="uppercase tracking-widest pt-6">{{localCurrentLang.highlights.content[slide.tag]}}</span>
      </div>
    </div>
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
    tag: 'convenient_location',
    icon: `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#ffffff" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#ffffff" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
  },
  {
    id: 1,
    imgName: 'Views.jpg',
    tag: 'picturesque_views',
    icon: `<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2.5" stroke="#ffffff" stroke-width="0.5"></circle><path d="M18.2265 11.3805C18.3552 11.634 18.4195 11.7607 18.4195 12C18.4195 12.2393 18.3552 12.366 18.2265 12.6195C17.6001 13.8533 15.812 16.5 12 16.5C8.18799 16.5 6.39992 13.8533 5.77348 12.6195C5.64481 12.366 5.58048 12.2393 5.58048 12C5.58048 11.7607 5.64481 11.634 5.77348 11.3805C6.39992 10.1467 8.18799 7.5 12 7.5C15.812 7.5 17.6001 10.1467 18.2265 11.3805Z" stroke="#ffffff" stroke-width="0.5"></path><path d="M17.5 3.5H17.7C19.4913 3.5 20.387 3.5 20.9435 4.0565C21.5 4.61299 21.5 5.50866 21.5 7.3V7.5" stroke="#ffffff" stroke-width="0.5" stroke-linecap="round"></path><path d="M17.5 20.5H17.7C19.4913 20.5 20.387 20.5 20.9435 19.9435C21.5 19.387 21.5 18.4913 21.5 16.7V16.5" stroke="#ffffff" stroke-width="0.5" stroke-linecap="round"></path><path d="M6.5 3.5H6.3C4.50866 3.5 3.61299 3.5 3.0565 4.0565C2.5 4.61299 2.5 5.50866 2.5 7.3V7.5" stroke="#ffffff" stroke-width="0.5" stroke-linecap="round"></path><path d="M6.5 20.5H6.3C4.50866 20.5 3.61299 20.5 3.0565 19.9435C2.5 19.387 2.5 18.4913 2.5 16.7V16.5" stroke="#ffffff" stroke-width="0.5" stroke-linecap="round"></path></svg>`
  },
  {
    id: 2,
    imgName: 'Landscape.jpg',
    tag: 'serene_landscape',
    icon: `<svg height="50" width="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 5.85964C22 5.06508 21.2094 4.33374 19.883 3.75279C18.7083 3.23834 17.5 4.21963 17.5 5.50199V8.71946M22 5.85964C22 7.05487 20.2111 8.10705 17.5 8.71946M22 5.85964V8.99982M2 5.85964C2 5.06508 2.79055 4.33374 4.11705 3.75279C5.29169 3.23834 6.5 4.21963 6.5 5.50199V8.71946M2 5.85964V18.5761C2 20.467 6.47715 21.9998 12 21.9998C17.5228 21.9998 22 20.467 22 18.5761V12.9998M2 5.85964C2 7.05487 3.78889 8.10705 6.5 8.71946M6.5 8.71946C8.0779 9.07589 9.96818 9.28335 12 9.28335C14.0318 9.28335 15.9221 9.07589 17.5 8.71946" stroke="#ffffff" stroke-width="0.5" stroke-linecap="round"></path> <path d="M19.5 13C19.5 13.8284 18.8284 14.5 18 14.5C17.1716 14.5 16.5 13.8284 16.5 13C16.5 12.1716 17.1716 11.5 18 11.5C18.8284 11.5 19.5 12.1716 19.5 13Z" stroke="#ffffff" stroke-width="0.5"></path> <path d="M21 20L18.5044 17.8514C17.6996 17.1586 16.501 17.0896 15.6152 17.6851L15.3843 17.8403C14.7687 18.2542 13.9312 18.1848 13.3991 17.6758L10.0781 14.4989C9.41518 13.8648 8.35189 13.8309 7.64639 14.4214L6.29032 15.5565L2.5 19.1035" stroke="#ffffff" stroke-width="0.5" stroke-linecap="round"></path></svg>`
  },
  {
    id: 3,
    imgName: 'Neighbourhood.jpg',
    tag: 'quiet_neighbourhood',
    icon: `<svg height="50" width="50" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="muteIconTitle" stroke="#ffffff" stroke-width="0.5" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#000000"><path d="M18 10L22 14M18 14L22 10"></path><path d="M13 5v14l-5-4H3V9h5z"></path><path stroke-linecap="round" d="M13 14c1.5-1 1.5-3 0-4"></path></svg>`
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