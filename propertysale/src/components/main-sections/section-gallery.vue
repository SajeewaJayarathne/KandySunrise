<template>
  <h2
    class="text-center"
    data-aos="fade-up"
    data-aos-duration="1000"
  >
    {{ localCurrentLang.gallery.title }}
  </h2>

  <div
    class="mt-6 lg:mt-8 glassmorphism rounded-xl p-4 lg:p-10"
    data-aos="fade-in"
    data-aos-duration="1000"
  >
    <div class="flex flex-wrap flex-grow-0 flex-shrink-0 px-8 justify-center lg:justify-around text-center font-bold">
      <div
          v-for="filter in filters"
          :key="filter.id"
          class="filter-item w-auto h-full"
          :class="{'active-filter': selectedFilter === filter.id}"
      >
        <button type="button" class="w-auto py-2 px-4" @click="onFilterChange(filter.id)">{{ localCurrentLang.common[filter.tag] }}</button>
      </div>
    </div>

    <Gallery :slides="visibleImgArr" :openPopup="openPopup"/>

  </div>

  <Popup :open="showPopup" @close="showPopup = false">
    <img
        :src="getImageUrl(selectedSlide)"
        :alt="selectedSlide"
        class="h-full w-full object-cover rounded"
        loading="lazy"
    />
  </Popup>
</template>

<script setup>
import {ref, onBeforeMount} from 'vue';

import Utils from '../utils/utils';
import {getCurrentLangFile} from '../utils/state.vue';
import Gallery from '../sub-components/gallery.vue';
import Popup from '../sub-components/popup.vue';

const localCurrentLang = ref(getCurrentLangFile());

const showPopup = ref(false);
const selectedSlide = ref(null);

const imgArraysByCat = ref({});
const visibleImgArr = ref([]);
const imgCountByCat = ref({view: 8, outer: 8, livingArea: 6, floors: 6, bed: 8, bath: 3, pantry: 3, kitchen: 1});

const filters = ref([
  {id: 'all', tag: 'all'},
  {id: 'view', tag: 'view'},
  {id: 'outer', tag: 'outer_area'},
  {id: 'livingArea', tag: 'living_area'},
  {id: 'floors', tag: 'floors'},
  {id: 'bed', tag: 'bedrooms'},
  {id: 'bath', tag: 'bathrooms'},
  {id: 'pantry', tag: 'pantries'},
  {id: 'kitchen', tag: 'kitchens'}
]);
const selectedFilter = ref(filters.value[0].id);

onBeforeMount(() => {
  Object.entries(imgCountByCat.value).forEach(([key, value]) => {
    let imgName = '';
    imgArraysByCat.value[key] = [];

    for (let i = 1; i <= value; i++) {
      imgName = `${key.charAt(0).toUpperCase()}${key.slice(1)}_${i}.jpg`;
      imgArraysByCat.value[key].push(imgName);
      visibleImgArr.value.push(imgName);
    }

    imgArraysByCat.value['all'] = [...visibleImgArr.value];
  });
});

const getImageUrl = (imgName) => {
  return new URL(`/src/assets/images/${imgName}`, import.meta.url).href;
}

function onFilterChange(filterId) {
  selectedFilter.value = filterId;
  visibleImgArr.value.length = 0;

  imgArraysByCat.value[filterId].forEach((item) => {
    visibleImgArr.value.push(item);
  });
}

function openPopup(imgIndex) {
  showPopup.value = true;
  selectedSlide.value = visibleImgArr.value[imgIndex];

  Utils.onModalStateChanged(true);
}
</script>