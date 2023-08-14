<template>
  <header>
    <nav :class="{ 'onScroll': !view.topOfPage}">
      <ul class="navmenu">
        <li
            v-for="item in navItems"
            class="item"
            :class="activeMenuId === item.id ? 'menu_active' : ''"
        >
          <a :href="'#' + item.id">{{ localCurrentLangFile.nav[item.tag] }}</a>
        </li>
        <li v-if="isLangDdAvailable" class="item dropdown">
          <a href="javascript:void(0)" class="dropdown-button">Lang</a>
          <div class="dropdown-content">
            <a
              v-for="lang in languages"
              :class="selectedLang === lang.id ? 'lang-active' : ''"
              href="#"
              @click="onChangeLang(lang.id)"
            >
              {{ lang.label }}
            </a>
          </div>
        </li>
      </ul>
    </nav>
  </header>

  <section class="section-audio">
    <AudioPlayer/>
  </section>

  <section class="main-content">
    <section id="home" class="hero" ref="sectionHomeRef">
      <SectionHero/>
    </section>

    <section id="about" class="section-about" ref="sectionAboutRef">
      <SectionAbout />
    </section>

    <section id="highlights" class="section-highlights text-center" ref="sectionHighlightsRef">
      <SectionHighlights/>
    </section>

    <section id="features" class="section-features" ref="sectionFeaturesRef">
      <SectionFeatures />
    </section>

    <section id="gallery" class="section-gallery" ref="sectionGalleryRef">
      <SectionGallery />
    </section>

    <section id="view" class="section-view" ref="sectionViewRef">
      <SectionView />
    </section>

    <section id="schedule" class="section-schedule" ref="sectionScheduleRef">
      <SectionSchedule/>
    </section>
  </section>

  <section class="side-nav">
    <div class="nav-container" :class="{open: mobileNavOpen}">

      <button type="button" class="close-button" @click="closeNav()">
        <IconClose :fill-colour="'#f5fdff'"/>
      </button>

      <ul class="navmenu">
        <li
            v-for="item in navItems"
            class="item"
            :class="activeMenuId === item.id ? 'menu_active' : ''"
        >
          <a :href="'#' + item.id" @click="closeNav()">{{ localCurrentLangFile.nav[item.tag] }}</a>
        </li>
      </ul>
    </div>

    <button v-show="!mobileNavOpen" class="p-4" @click="openNav()">
      <IconMenu/>
    </button>
  </section>
</template>

<script setup>
import {ref, onBeforeMount, onMounted, onUnmounted} from 'vue';
import Utils from './utils';

/* Sections */
import SectionHero from './main-sections/section-hero.vue';
import SectionAbout from './main-sections/section-about.vue';
import SectionHighlights from './main-sections/section-highlights.vue';
import SectionFeatures from './main-sections/section-features.vue';
import SectionGallery from './main-sections/section-gallery.vue';
import SectionView from './main-sections/section-view.vue';
import SectionSchedule from './main-sections/section-schedule.vue';

import ContactForm from './sub-components/contact-form.vue';
import AudioPlayer from './sub-components/audio-player.vue';
import Popup from './sub-components/popup.vue';

import IconClose from './icons/icon-close.vue';
import IconMenu from './icons/icon-menu.vue';
import IconReject from './icons/icon-reject.vue';
import IconSuccess from './icons/icon-success.vue';

const view = ref({topOfPage: true});
const navItems = ref([
  {id: 'home', label: 'Home'},
  {id: 'about', label: 'About'},
  {id: 'highlights', label: 'Highlights'},
  {id: 'features', label: 'Features'},
  {id: 'gallery', label: 'Gallery'},
  {id: 'schedule', label: 'Schedule a Visit'}
]);

const sections = [];
const sectionHomeRef = ref();
const sectionAboutRef = ref();
const sectionHighlightsRef = ref();
const sectionFeaturesRef = ref();
const sectionGalleryRef = ref();
const sectionViewRef = ref();
const sectionScheduleRef = ref();

const mobileNavOpen = ref(false);
const activeMenuId = ref(navItems.value[0].id);

const isLangDdAvailable = ref(false);
const languages = ref([
  {id: Constants.LANG_CODES.EN, label: 'EN'},
  {id: Constants.LANG_CODES.ZH, label: '中文'}
]);
const selectedLang = ref(languages.value[0].id);
const localCurrentLangFile = ref(getCurrentLangFile());

let sectionTop, sectionId;

onBeforeMount(() => {
  window.addEventListener('scroll', handleScroll);
  setCurrentLangFile(selectedLang.value);
});

onMounted(() => {
  sections.push(sectionHomeRef, sectionAboutRef, sectionHighlightsRef, sectionFeaturesRef, sectionGalleryRef, sectionViewRef, sectionScheduleRef);
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

  sections.forEach(section => {
    sectionTop = section.value.offsetTop;
    sectionId = section.value.getAttribute('id');

    if (pageYOffset >= sectionTop && activeMenuId.value !== sectionId) {
      activeMenuId.value = sectionId;
    }
  });
};

function openNav() {
  mobileNavOpen.value = true;
  Utils.onModalStateChanged(true);
}

function closeNav() {
  mobileNavOpen.value = false;
  Utils.onModalStateChanged(false);
}

const onChangeLang = (langID) => {
  selectedLang.value = langID;
  setCurrentLangFile(langID);
}
</script>