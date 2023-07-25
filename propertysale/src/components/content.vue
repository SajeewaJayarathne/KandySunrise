<template>
  <header>
    <nav :class="{ 'onScroll': !view.topOfPage}">
      <ul class="navmenu">
        <li v-for="item in navItems" class="item">
          <a :href="'#' + item.id">{{ item.label }}</a>
        </li>
      </ul>
    </nav>
  </header>

  <section class="main-content">
    <SectionHero/>
    <SectionAbout ref="sectionAboutRef" />
    <SectionHighlights/>
    <SectionFeatures ref="sectionFeaturesRef" />
    <SectionGallery ref="sectionGalleryRef" />

    <section id="schedule" class="section-schedule">
      <div class="grid grid-cols-1 lg:grid-cols-2 grid-rows-[auto] lg:grid-rows-1 gap-10 lg:gap-20">
        <div class="col-start-1 row-start-2 lg:row-start-1">
          <div class="w-full h-[40vh] lg:h-full">
            <iframe class="shadow-xl" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.31490788903!2d80.64089057482778!3d7.318478913415308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae367dd53e751bd%3A0x62e9afb02efd878c!2s16%20Dharshana%20Mawatha%2C%20Kandy%2020000%2C%20Sri%20Lanka!5e0!3m2!1sen!2sau!4v1689594126021!5m2!1sen!2sau" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>

        <div>
          <h3 class="text-center lg:text-left">Schedule a Visit</h3>
          <div class="mt-6 md:mt-12 mx-auto">
            <ContactForm
                :isMobileAvailable="true"
                :mobileNumber="'+61 406 195 123'"
            />
          </div>
        </div>
      </div>
    </section>
  </section>

  <section class="side-nav">

  </section>

  <footer>

  </footer>
</template>

<script setup>
import {ref, onBeforeMount, onUnmounted} from 'vue';

/* Sections */
import SectionHero from "./main-sections/section-hero.vue";
import SectionAbout from "./main-sections/section-about.vue";
import SectionHighlights from "./main-sections/section-highlights.vue";
import SectionFeatures from "./main-sections/section-features.vue";
import SectionGallery from "./main-sections/section-gallery.vue";
import ContactForm from "./sub-components/contact-form.vue";

const view = ref({topOfPage: true});
const navItems = ref([
  {id: 'home', label: 'Home'},
  {id: 'about', label: 'About'},
  {id: 'highlights', label: 'Highlights'},
  {id: 'features', label: 'Features'},
  {id: 'gallery', label: 'Gallery'},
  {id: 'schedule', label: 'Schedule a Visit'}
]);

const sectionAboutRef = ref();
const sectionFeaturesRef = ref();
const sectionGalleryRef = ref();

let stateChanged = {
  sectionAbout: false,
  sectionFeatures: false,
  sectionGallery: false
}

onBeforeMount(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  if (window.pageYOffset > 70) {
    if (view.value.topOfPage) view.value.topOfPage = false;
  } else {
    if (!view.value.topOfPage) view.value.topOfPage = true;
  }

  if (sectionAboutRef.value && !stateChanged.sectionAbout) {
    stateChanged.sectionAbout = sectionAboutRef.value.handleScroll();
  }

  if (sectionFeaturesRef.value && !stateChanged.sectionFeatures) {
    stateChanged.sectionFeatures = sectionFeaturesRef.value.handleScroll();
  }

  if (sectionGalleryRef.value && !stateChanged.sectionGallery) {
    stateChanged.sectionGallery = sectionGalleryRef.value.handleScroll();
  }
};
</script>