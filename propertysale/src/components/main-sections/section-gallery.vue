<template>
  <section id="gallery" class="property-gallery w-full h-auto p-32">
    <h3>Gallery</h3>

    <div class="mt-12 glassmorphism rounded-xl p-10">
      <div class="flex px-8 justify-around text-center font-bold">
        <div
            v-for="filter in filters"
            :key="filter.id"
            class="filter-item w-auto h-full"
            :class="{'active-filter': selectedFilter === filter.id}"
        >
          <button type="button" class="w-auto py-2 px-4" @click="onFilterChange(filter.id)">{{filter.label}}</button>
        </div>
      </div>

      <Gallery :slides="visibleImgArr" />

    </div>
  </section>
</template>

<script>
import {ref, onBeforeMount} from 'vue';

import Gallery from "../sub-components/gallery.vue";
import TabWrapper from '../sub-components/tab-wrapper.vue';
import Tab from '../sub-components/tab.vue';

export default {
  components: {
    Gallery,
    TabWrapper,
    Tab
  },
  setup() {
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

    return {
      filters,
      selectedFilter,
      visibleImgArr,
      onFilterChange
    }
  }
}
</script>