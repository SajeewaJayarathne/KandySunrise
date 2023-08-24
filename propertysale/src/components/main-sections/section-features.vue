<template>
  <h2
      class="text-center lg:text-left"
      data-aos="fade-up"
      data-aos-duration="1000"
  >
    {{ localCurrentLang.features.title }}
  </h2>
  <div
      class="grid grid-cols-1 lg:grid-cols-2 grid-rows-[auto] lg:grid-rows-1 gap-10 lg:gap-20 mt-6 lg:mt-12 lg:max-h-[70vh] lg:h-[70vh]">
    <div
        class="col-start-1 row-start-2 lg:row-start-1 rounded"
        data-aos="fade-right"
        data-aos-duration="1500"
    >
      <img class="h-[60vh] w-full lg:h-full object-cover aspect-square brightness-110 rounded transition"
           :src="getImageUrl(selectedImg.imgName)"
           :alt="selectedImg.alt"
           loading="lazy"
      />
    </div>

    <div
        class="col-start-1 lg:col-start-2 row-start-1"
        data-aos="fade-left"
        data-aos-duration="1500"
    >
      <TabWrapper :onClickTab="onClickTab">
        <Tab :title="localCurrentLang.common[tabs[0].title]" :tabId="0">
          <div v-for="tag in tabs[0].content">
            <h6>{{ localCurrentLang.features.tabs[tag] }}</h6>
            <p>{{ localCurrentLang.features.tabs[`${tag}_desc`] }}</p>
          </div>
        </Tab>

        <Tab :title="localCurrentLang.common[tabs[1].title]" :tabId="1">
          <div v-for="tag in tabs[1].content">
            <h6>{{ localCurrentLang.features.tabs[tag] }}</h6>
            <p>{{ localCurrentLang.features.tabs[`${tag}_desc`] }}</p>
          </div>
        </Tab>

        <Tab :title="localCurrentLang.common[tabs[2].title]" :tabId="2">
          <div v-for="tag in tabs[2].content">
            <h6>{{ localCurrentLang.features.tabs[tag] }}</h6>
            <p>{{ localCurrentLang.features.tabs[`${tag}_desc`] }}</p>
          </div>
        </Tab>
      </TabWrapper>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {getCurrentLangFile} from '../utils/state.vue';

import TabWrapper from '../sub-components/tab-wrapper.vue';
import Tab from '../sub-components/tab.vue';

const localCurrentLang = ref(getCurrentLangFile());

const imagesArr = ref([
  {imgName: 'Floors_6.jpg', alt: 'Floor Details'},
  {imgName: 'Bed_2.jpg', alt: 'Bedroom Details'},
  {imgName: 'LivingArea_1.jpg', alt: 'Property Details'}
]);

const selectedImg = ref(imagesArr.value[0]);

const tabs = ref([
  {title: 'floors', content: ['floor_4', 'floor_3', 'floor_2', 'floor_g']},
  {title: 'bedrooms', content: ['bath', 'ac']},
  {title: 'property', content: ['security', 'solar']}
]);

const getImageUrl = (imgName) => {
  return new URL(`/src/assets/images/${imgName}`, import.meta.url).href;
}

function onClickTab(tabId) {
  selectedImg.value = imagesArr.value[tabId];
}
</script>