<template>
  <header>
    <nav>
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