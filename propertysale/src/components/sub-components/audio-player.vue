<template>
  <audio class="hidden" ref="audioPlayer" autoplay loop controls>
    <source src="../../../src/assets/audio/Background_Music.mp3" type="audio/mp3">
  </audio>
  <button v-if="isPlaying" type="button" @click="onButtonClick(false)">
    <IconPause/>
  </button>
  <button v-else type="button" @click="onButtonClick(true)">
    <IconPlay/>
  </button>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import IconPlay from '../icons/icon-play.vue';
import IconPause from '../icons/icon-pause.vue';

const audioPlayer = ref(null);
const isPlaying = ref(false);

onMounted(() => {
  setTimeout(() => {
    isPlaying.value = !audioPlayer.value?.paused;
  }, 1000);
});

function onButtonClick(play) {
  if (play) {
    audioPlayer.value?.play();
  } else {
    audioPlayer.value?.pause();
  }

  isPlaying.value = play;
}
</script>