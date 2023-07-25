<template>
  <section id="home" class="hero">
    <div class="hero-image">
      <picture>
        <img src="../../assets/images/Hero.jpg" alt="Kandy Sunrise">
      </picture>
    </div>

    <div class="hero-content text-center lg:text-left">
      <h1>Luxury Redefined</h1>
      <h2 class="mt-8 font-sub-heading" style="text-shadow: 4px 4px 4px #372d35;">Kandy Sunrise</h2>
      <div class="w-full mx-auto mt-8 inline-block">
        <a href="#schedule" type="button" class="button-primary">Schedule a Visit ></a>
      </div>
    </div>
  </section>
</template>

<script>
import IconLocation from "../icons/icon-location.vue";

export default {
  components: {
    IconLocation
  }
}
</script>