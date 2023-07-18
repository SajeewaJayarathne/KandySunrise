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
    <SectionAbout/>
    <SectionHighlights/>
    <SectionFeatures/>
    <SectionGallery />

    <section id="schedule" class="property-visit w-full h-auto p-32">
      <h3 class="text-center text-white">Schedule a Visit</h3>
      <ContactForm
          :isMobileAvailable="true"
          :mobileNumber="'+61 406 195 123'"
          class="mt-12 max-w-2/3 w-2/3 mx-auto"
      />
    </section>

    <section id="location" class="property-map w-full h-auto p-32">
      <h3 class="text-center w-full">Property Location</h3>
      <iframe class="mt-12 rounded-xl shadow" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.31490788903!2d80.64089057482778!3d7.318478913415308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae367dd53e751bd%3A0x62e9afb02efd878c!2s16%20Dharshana%20Mawatha%2C%20Kandy%2020000%2C%20Sri%20Lanka!5e0!3m2!1sen!2sau!4v1689594126021!5m2!1sen!2sau" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </section>
  </section>

  <section class="side-nav">

  </section>

  <footer>

  </footer>
</template>

<script>
import {ref, onBeforeMount} from 'vue';

/* Sections */
import SectionHero from "./main-sections/section-hero.vue";
import SectionAbout from "./main-sections/section-about.vue";
import SectionHighlights from "./main-sections/section-highlights.vue";
import SectionFeatures from "./main-sections/section-features.vue";
import SectionGallery from "./main-sections/section-gallery.vue";

import ContactForm from "./sub-components/contact-form.vue";

export default {
  components: {
    SectionHero,
    SectionAbout,
    SectionHighlights,
    SectionFeatures,
    SectionGallery,
    ContactForm
  },
  setup() {
    const view = ref({topOfPage: true});
    const navItems = ref([
      {id: 'home', label: 'Home'},
      {id: 'about', label: 'About'},
      {id: 'highlights', label: 'Highlights'},
      {id: 'features', label: 'Features'},
      {id: 'gallery', label: 'Gallery'},
      {id: 'schedule', label: 'Schedule a Visit'},
      {id: 'location', label: 'Map'}
    ]);

    onBeforeMount(() => {
      window.addEventListener('scroll', handleScroll);
    });

    const handleScroll = () => {
      if (window.pageYOffset > 56) {
        if (view.value.topOfPage) view.value.topOfPage = false;
      } else {
        if (!view.value.topOfPage) view.value.topOfPage = true;
      }
    };

    return {
      navItems: navItems,
      view
    };
  }
}
</script>