<template>
  <h2
      class="text-center"
      data-aos="fade-up"
      data-aos-duration="1000"
  >
    {{ localCurrentLang.view.title }}
  </h2>
  <div
      class="mt-6 lg:mt-12 glassmorphism p-4 lg:p-10 w-full lg:w-4/5 mx-auto"
      data-aos="fade-in"
      data-aos-duration="1000"
  >
    <div class="w-full h-auto relative">
      <img src="../../assets/images/VideoThumbnail.png" alt="View from the Balcony">
      <div class="absolute flex justify-center items-center top-0 left-0 w-full h-full">
        <button type="button" @click="openPopup()">
          <IconPlay class="opacity-80 hover:opacity-100 transition" :iconWidth="150" :iconHeight="150"
                    :fillColour="'#f5fdff'"/>
        </button>
      </div>
    </div>
  </div>

  <Popup :open="showPopup" @close="closePopup()">
    <video ref="videoPlayer" class="w-full h-full" width="auto" height="auto" controls>
      <source src="../../assets/video/View_from_the_house.mp4" type="video/mp4">
      {{ localCurrentLang.common_desc.browser_error_video }}
    </video>
  </Popup>
</template>

<script setup>
import {ref} from 'vue';

import Popup from '../sub-components/popup.vue';
import IconPlay from '../icons/icon-play.vue';
import Utils from '../utils/utils';
import {getCurrentLangFile} from '../utils/state.vue';

const showPopup = ref(false);
const videoPlayer = ref(null);
const localCurrentLang = ref(getCurrentLangFile());

function openPopup() {
  showPopup.value = true;
  videoPlayer.value?.play();
  Utils.onModalStateChanged(true);
}

function closePopup() {
  videoPlayer.value?.pause();
  showPopup.value = false;
}
</script>