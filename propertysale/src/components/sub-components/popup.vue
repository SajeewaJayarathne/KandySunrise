<template>
    <div class="vue-modal" v-show="open">
      <div class="overlay" @click="close()"></div>

      <transition name="slide">
        <div class="vue-modal-inner">
          <div class="vue-modal-content glassmorphism rounded-md">
            <slot/>
            <button type="button" @click="close()">
              <IconClose :fill-colour="'#f5fdff'" />
            </button>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';

import Utils from '../utils/utils.js';

import IconClose from '../icons/icon-close.vue';

export default {
  components: {
    IconClose
  },
  props: {
    open: {
      type: Boolean,
      default: true,
    },
  },
  setup(_, { emit }) {
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

    return { close };
  }
};
</script>

<style scoped lang="scss">

</style>