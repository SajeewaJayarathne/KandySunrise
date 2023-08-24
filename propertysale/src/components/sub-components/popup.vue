<template>
  <div class="popup" v-if="open">
    <div class="overlay" @click="close()"></div>

    <transition name="zoom">
      <div v-show="showContent" class="popup-inner">
        <div class="popup-content glassmorphism rounded-md">
          <slot/>
          <button type="button" @click="close()">
            <IconClose :fill-colour="'#f5fdff'"/>
          </button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted, watchEffect} from 'vue';
import {defineProps, defineEmits} from '@vue/runtime-core';

import Utils from '../utils/utils.js';
import IconClose from '../icons/icon-close.vue';

const props = defineProps(['open']);
const emit = defineEmits(['customEventName']);

const showContent = ref(false);
const close = () => {
  emit("close");
  Utils.onModalStateChanged(false);
};

const handleKeyup = (event) => {
  if (event.keyCode === 27) {
    close();
  }
};

onMounted(() => document.addEventListener("keyup", handleKeyup));
onUnmounted(() => document.removeEventListener("keyup", handleKeyup));

watchEffect(() => {
  const tempVal = props.open;

  // Sets the value in the next cycle
  setTimeout(() => {
    showContent.value = tempVal;
  }, 0);
});
</script>