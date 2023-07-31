<template>
  <h2
    class="text-center"
    data-aos="fade-up"
    data-aos-duration="1000"
  >
    Property Highlights
  </h2>
  <div
    class="mt-6 lg:mt-12"
    data-aos="fade-in"
    data-aos-duration="1000"
  >
    <Carousel
        :slides="slides"
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
        :openPopup="openPopup"
    />
  </div>

  <Popup :open="showPopup" @close="showPopup = false">
    <div class="h-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
      <img
          :src="'../src/assets/images/' + selectedSlide.imgName"
          :alt="selectedSlide.title"
          class="h-full w-full object-cover rounded"
      />
      <div class="flex flex-col overflow-y-scroll">
        <h4>{{selectedSlide.title}}</h4>
        <p class="mb-auto mt-4 lg:mt-12 leading-7">{{selectedSlide.details}}</p>
      </div>
    </div>
  </Popup>
</template>

<script setup>
import {ref} from 'vue';
import Utils from '../utils.js';
import Carousel from '../sub-components/carousel.vue';
import Popup from '../sub-components/popup.vue';

const slides = ref([
  {
    id: 0,
    imgName: 'Location.jpg',
    title: 'Convenient Location',
    details: 'Discover an idyllic location just 3km away from the vibrant city of Kandy. This exquisite property is perfectly situated within walking distance of two remarkable attractions: the renowned Mahaweli River Diversion Project at Polgolla dam and the convenient sea plane landing spot that connects you to the breathtaking Polgolla reservoir. With its GPS reference of 7.318669, 80.64321, finding your way to this paradise is a breeze. Adding to the convenience, two access roads—Darshana Mawatha and Deepthi Mawatha—each measuring 20ft wide, provide seamless connectivity to your dream destination.'
  },
  {
    id: 1,
    imgName: 'Views.jpg',
    title: 'Picturesque Views',
    details: 'Indulge in captivating panoramic views of the majestic mountain range from the third-floor vantage point of this extraordinary residence. The master bedroom, situated one level above the main living area, offers a private sanctuary with a balcony that opens up to an enchanting panorama of the mountains. On the ground floor, immerse yourself in a spacious and beautifully designed family kitchen area, seamlessly connected to the lush garden, allowing you to savor the breathtaking views as you go about your culinary adventures. Experience the perfect fusion of nature and luxury in this remarkable home.'
  },
  {
    id: 2,
    imgName: 'Landscape.jpg',
    title: 'Serene Landscape',
    details: 'Discover a true oasis of beauty with this remarkable property boasting a generous floor area of 6000 Sq. Ft. Step into a world of elegance as you enter through the main entry from the third floor, leading you to the captivating main living, dining, and office. From here, a large balcony awaits, offering breathtaking views of the picturesque mountain range, creating a serene backdrop for your everyday life. Furthermore, an additional entry on the ground floor provides convenient access to the stunning surroundings. Embrace the allure of the outdoors as this beautifully landscaped property showcases retaining walls, accentuating the natural charm. With a spacious garden area at your disposal, the possibilities are endless – envision a private pool where you can relax and unwind in luxurious seclusion. Immerse yourself in this extraordinary landscape and make every moment a truly enchanting experience.'
  },
  {
    id: 3,
    imgName: 'Neighbourhood.jpg',
    title: 'Quiet Neighbourhood',
    details: 'Immerse yourself in the allure of a tranquil neighborhood adorned with a touch of prestige along Darshana Mawatha. Nestled within this sought-after locale, you\'ll find yourself surrounded by a community of highly regarded professionals, fostering an ambiance of respect and refinement. Adorned with elegantly crafted retaining walls, the surroundings exude a sense of sophistication, creating an enchanting backdrop for your dream home. Discover the serenity and elegance that awaits you in this coveted neighborhood, where every moment is steeped in tranquility and grace.'
  },
]);

const showPopup = ref(false);
const selectedSlide = ref(slides.value[0]);

function openPopup(index) {
  showPopup.value = true;
  selectedSlide.value = slides.value[index];

  Utils.onModalStateChanged(true);
}
</script>