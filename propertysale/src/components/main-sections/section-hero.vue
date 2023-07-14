<template>
  <section id="hero-image" class="hero-image">
    <div class="hero-content">
      <div class="hero-content-text">
        <h1>Luxury Redefined</h1>
        <h3 class="mt-8 font-body">"Kandy Sunrise"</h3>
        <h5 class="mt-8 flex items-center">
          <IconLocation :fill-colour="'white'" class="mr-2 h-full"/>
          Kandy, Sri Lanka
        </h5>
        <button class="button-primary mt-12">Schedule a Visit ></button>
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