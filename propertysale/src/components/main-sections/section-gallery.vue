<template>
  <h2 class="text-center">Gallery</h2>

  <div class="mt-6 lg:mt-12 glassmorphism rounded-xl p-4 lg:p-10" :class="{'slide-up': activeMenuId === menuId && isScrollingDown}">
    <div class="flex flex-wrap flex-grow-0 flex-shrink-0 px-8 justify-center lg:justify-around text-center font-bold">
      <div
          v-for="filter in filters"
          :key="filter.id"
          class="filter-item w-auto h-full"
          :class="{'active-filter': selectedFilter === filter.id}"
      >
        <button type="button" class="w-auto py-2 px-4" @click="onFilterChange(filter.id)">{{ filter.label }}</button>
      </div>
    </div>

    <Gallery :slides="visibleImgArr" :openPopup="openPopup"/>

  </div>

  <Popup :open="showPopup" @close="showPopup = false">
    <img
        :src="'../src/assets/images/' + selectedSlide"
        :alt="selectedSlide"
        class="h-full w-full object-cover rounded"
    />
  </Popup>
</template>

<script setup>
import {ref, onBeforeMount} from 'vue';
import {defineProps} from '@vue/runtime-core';

import Utils from '../utils';
import Gallery from '../sub-components/gallery.vue';
import Popup from '../sub-components/popup.vue';

defineProps(['activeMenuId', 'menuId', 'isScrollingDown']);

const showPopup = ref(false);
const selectedSlide = ref(null);

const imgArraysByCat = ref({});
const visibleImgArr = ref([]);
const imgCountByCat = ref({view: 6, outer: 5, livingArea: 6, floors: 6, bed: 8, bath: 3, pantry: 3, kitchen: 1});

const filters = ref([
  {id: 'all', label: 'All'},
  {id: 'view', label: 'View'},
  {id: 'outer', label: 'Outer Area'},
  {id: 'livingArea', label: 'Living Area'},
  {id: 'floors', label: 'Floors'},
  {id: 'bed', label: 'Bedrooms'},
  {id: 'bath', label: 'Bathrooms'},
  {id: 'pantry', label: 'Pantry'},
  {id: 'kitchen', label: 'Kitchen'}
]);
const selectedFilter = ref(filters.value[0].id);

onBeforeMount(() => {
  Object.entries(imgCountByCat.value).forEach(([key, value]) => {
    let imgName = '';
    imgArraysByCat.value[key] = [];

    for (let i = 1; i <= value; i++) {
      imgName = `gallery/${key.charAt(0).toUpperCase()}${key.slice(1)}_${i}.jpg`;
      imgArraysByCat.value[key].push(imgName);
      visibleImgArr.value.push(imgName);
    }

    imgArraysByCat.value['all'] = [...visibleImgArr.value];
  });
});

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