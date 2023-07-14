<template>
  <transition name="fade">
    <div class="vue-modal" v-show="open">
      <transition name="slide">
        <div class="vue-modal-inner">
          <div class="vue-modal-content">
            <slot/>
            <button type="button" @click="$emit('close')">
              <IconClose :fill-colour="'#1F2937B2'" />
            </button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';
import IconClose from "../icons/icon-close.vue";
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