<template>
  <section id="features" class="property-features w-full h-auto p-32">
    <h2>Property Features</h2>
    <div class="grid grid-cols-2 grid-rows-1 gap-x-20 mt-12 max-h-[70vh] h-[70vh]">
      <div class="col-start-1 row-start-1 rounded">
        <img class="h-full object-cover aspect-square brightness-110 rounded transition"
             :src="'../src/assets/images/' + selectedImg.imgName"
             :alt="selectedImg.alt"
        />
      </div>

      <div class="col-start-2 row-start-1">
        <TabWrapper :onClickTab="onClickTab">
          <Tab :title="'Floor Details'" :tabId="0">
            <div class="mt-8">
              <h6>4th floor</h6><p>Master bedroom with a large balcony facing the mountain view.</p>
              <h6 class="mt-4">3rd floor</h6><p>Main Entry to the house, main living/dining and office room, a large balcony viewing the mountain range.</p>
              <h6 class="mt-4">2nd floor</h6><p>All the other bedrooms.</p>
              <h6 class="mt-4">Ground floor</h6><p>Secondary entry to the house and a large family kitchen facing the garden.</p>
            </div>
          </Tab>

          <Tab :title="'Bedroom Details'" :tabId="1">
            <div class="mt-8">
              <h6>Bathrooms</h6><p>All bedrooms are quite large with attached bathrooms (excluding 1 bedroom).</p>
              <h6 class="mt-4">Air conditioning</h6><p>Rooms include fitted with fans and air-conditioners.</p>
            </div>
          </Tab>

          <Tab :title="'Property Details'" :tabId="2">
            <div class="mt-8">
              <h6>Security</h6><p>CCTV cameras installed even though it is an extremely peaceful suburb.</p>
              <h6 class="mt-4">Solar Energy</h6><p>Solar powered hot water available.</p>
            </div>
          </Tab>
        </TabWrapper>
      </div>
    </div>
  </section>
</template>

<script>
import {ref} from 'vue';

import TabWrapper from '../sub-components/tab-wrapper.vue';
import Tab from '../sub-components/tab.vue';

export default {
  components: {
    TabWrapper,
    Tab
  },
  setup() {
    const imagesArr = ref([
      {imgName: 'Hero_2.jpg', alt: 'Floor Details'},
      {imgName: 'Hero_3.jpg', alt: 'Bedroom Details'},
      {imgName: 'Hero_2.jpg', alt: 'Property Details'}
    ]);

    const selectedImg = ref(imagesArr.value[0]);

    function onClickTab(tabId) {
      selectedImg.value = imagesArr.value[tabId];
    }

    return {
      onClickTab,
      selectedImg
    }
  }
}
</script>