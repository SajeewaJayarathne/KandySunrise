<template>
  <header>
    <nav>
      <ul class="navmenu">
        <li v-for="item in navItems" class="item">
          <a :href="'#' + item.id">{{item.label}}</a>
        </li>
      </ul>
    </nav>
  </header>

  <section class="main-content">
    <SectionHero />
    <SectionAbout />
    <SectionHighlights />
    <SectionAmenities />
  </section>

  <section class="side-nav">

  </section>

  <footer>

  </footer>
</template>

<script>
import { ref } from 'vue';

/* Sections */
import SectionHero from "./main-sections/section-hero.vue";
import SectionAbout from "./main-sections/section-about.vue";
import SectionHighlights from "./main-sections/section-highlights.vue";
import SectionAmenities from "./main-sections/section-features.vue";

export default {
  components: {
    SectionHero,
    SectionAbout,
    SectionHighlights,
    SectionAmenities
  },
  setup() {
    const navItems = ref([
      {id: 'about', label: 'About'},
      {id: 'highlights', label: 'Highlights'},
      {id: 'features', label: 'Amenities'},
      {id: 'rooms', label: 'Rooms'},
      {id: 'gallery', label: 'Gallery'}
    ]);

    return {
      navItems: navItems
    };
  }
}
</script>

<style scoped lang="sass">

</style>