<template>
  <section class="hero-image">
    <picture>
      <img src="../../assets/images/Hero.jpg" alt="Kandy Sunrise">
    </picture>
  </section>

  <section class="hero-content text-center lg:text-left font-secondary">
    <h1
        data-aos="fade"
        data-aos-duration="2000"
        data-aos-delay="1000"
        data-aos-once="true"
    >
      {{ localCurrentLang.hero.heading }}
    </h1>

    <div class="mt-8 ml-4 border-l-2 border-white"
         data-aos="fade-right"
         data-aos-duration="2000"
         data-aos-delay="1500"
         data-aos-once="true"
    >
      <h3 class="font-main pl-8 uppercase" style="text-shadow: 4px 4px 4px #372d35;">
        {{ localCurrentLang.hero.sub_heading }}
      </h3>
    </div>
  </section>

  <section
      ref="linkRibbonGrid"
      class="hero-link-ribbon glassmorphism rounded-xl"
      data-aos="fade-up"
      data-aos-duration="2000"
      data-aos-delay="1700"
      data-aos-once="true"
  >
    <div class="grid-item">
      <h6>{{ localCurrentLang.hero.want_to_book }}</h6>
      <div>
        <a href="https://www.booking.com/hotel/lk/mountain-views.en-gb.html" target="_blank" type="button" class="button button-primary mr-2">{{ localCurrentLang.hero.booking }}</a>
        <a href="https://www.airbnb.com.au/rooms/12785680" target="_blank" type="button" class="button button-primary">{{ localCurrentLang.hero.airbnb }}</a>
      </div>
    </div>

    <div class="grid-item">
      <h6>{{ localCurrentLang.hero.want_to_buy }}</h6>
      <div><a href="#schedule" type="button" class="button button-primary">{{ localCurrentLang.hero.schedule }}</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import {ref} from 'vue';
import {getCurrentLangFile} from '../utils/state.vue';

const localCurrentLang = ref(getCurrentLangFile());
</script>