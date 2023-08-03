<template>
  <header>
    <nav :class="{ 'onScroll': !view.topOfPage}">
      <ul class="navmenu">
        <li
            v-for="item in navItems"
            class="item"
            :class="activeMenuId === item.id ? 'menu_active' : ''"
        >
          <a :href="'#' + item.id">{{ item.label }}</a>
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
      <div class="grid grid-cols-1 lg:grid-cols-2 grid-rows-[auto] lg:grid-rows-1 gap-10 lg:gap-20">
        <div
          class="col-start-1 row-start-2 lg:row-start-1"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <div class="w-full h-[40vh] lg:h-full">
            <iframe class="shadow-xl"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.31490788903!2d80.64089057482778!3d7.318478913415308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae367dd53e751bd%3A0x62e9afb02efd878c!2s16%20Dharshana%20Mawatha%2C%20Kandy%2020000%2C%20Sri%20Lanka!5e0!3m2!1sen!2sau!4v1689594126021!5m2!1sen!2sau"
                    width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>

        <div
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          <h3 class="text-center lg:text-left">Schedule a Visit</h3>
          <div class="mt-6 md:mt-12 mx-auto">
            <ContactForm
                :isMobileAvailable="true"
                :mobileNumber="'+61 406 195 123'"
                :onSubmit="onFormSubmit"
            />
          </div>
        </div>
      </div>

      <Popup :open="showSubmitMessage" @close="showSubmitMessage = false">
        <div v-if="submitMessage != null" class="h-full">
          <h3 class="text-center flex justify-center">
            <IconSuccess v-if="submitMessage.type === 1" class="mr-4 my-auto"/>
            <IconReject v-else class="mr-4 my-auto"/>
            {{ submitMessage.title }}
          </h3>
          <p class="mt-6 lg:mt-12 text-lg">{{ submitMessage.body }}</p>
        </div>
      </Popup>
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
          <a :href="'#' + item.id" @click="closeNav()">{{ item.label }}</a>
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

const submitMessage = ref(null);
const showSubmitMessage = ref(false);

let sectionTop, sectionId;

onBeforeMount(() => {
  window.addEventListener('scroll', handleScroll);
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

function onFormSubmit(result) {
  submitMessage.value = {
    type: result.success ? 1 : 0,
    title: result.message || (result.success ? 'Email sent successfully!' : 'Email sending failed!'),
    body: result.success ?
        'We appreciate you contacting us in scheduling a visit. We will get back in touch with you soon! Have a great day!'
        : 'An error has occurred while sending the email. Please submit your information again after a few minutes. Thank you! Have a great day!'
  }

  showSubmitMessage.value = true;
}
</script>