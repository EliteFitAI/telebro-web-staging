<template>
  <div class="video-container" :style="{ height: height }">
    <div class="video-content">
      <video
        ref="videoRef"
        class="video-player"
        :style="{ height: '50vh' }"
        src="../../../assets/Copy of wecome screen.mp4"
        autoplay
        playsinline
      />
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue';

defineProps({
  height: {
    type: String,
    default: '50vh'
  }
});

const videoRef = ref(null);

onMounted(() => {
  nextTick(()=>{
    console.log(videoRef)
    if (videoRef.value) {
    const playPromise = videoRef.value.play();
    if (playPromise !== undefined) {
      console.log(playPromise)
      playPromise.catch((error) => {
        console.warn('Auto-play failed:', error);
      });
    }
  }
  })
});
</script>

<style scoped>
.video-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.video-content {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid white;
}

.video-player {
  width: 100%;
  object-fit: cover;
  scale: 1.5;
    object-position: top;

    margin-top: 200px;
}
</style>
