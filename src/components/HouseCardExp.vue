<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMouseInElement } from '@vueuse/core'
const targetCard = ref(null)
const { elementX, elementY, isOutside, elementHeight, elementWidth } =
  useMouseInElement(targetCard)
const cardTransform = computed(() => {
  const MAX_ROTATION = 6
  const rX = (
    MAX_ROTATION / 2 -
    (elementY.value / elementHeight.value) * MAX_ROTATION
  ).toFixed(2) // handles x-axis
  const rY = (
    (elementX.value / elementWidth.value) * MAX_ROTATION -
    MAX_ROTATION / 2
  ).toFixed(2) // handles y-axis
  return isOutside.value
    ? ''
    : `perspective(${elementWidth.value}px) rotateX(${rX}deg) rotateY(${rY}deg)`
})
</script>
<template>
  <div class="col-3 p-8 m-2 rounded shadow-2xl bg-charcoal-600 card" ref="targetCard" :style="{
    transform: cardTransform,
    transition: 'transform 0.25s ease-out'
  }">
    <h1 class="mb-2 text-center text-2xl font-bold">House</h1>
    <section class="flex items-center">
      <img src="" class="w-8 h-8 mr-4 rounded" />
      <h2 class="font-2xl"></h2>
    </section>
    <p class="mt-4 p-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sit deleniti illo distinctio alias. Et eligendi
      porro neque saepe voluptatem molestias labore nam, ea ex incidunt quae perferendis, ad iusto!
    </p>
  </div>
</template>
<!-- <script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { elementX, elementY, isOutside, elementHeight, elementWidth, targetCard, cardTransform } from '../CardTransform.js'
export default {
  setup() {
    return {}
  }
};
</script> -->


<style scoped>
/* .card {
  transform: v-bind(cardTransform);
  transition: transform 0.25s ease-out;
} */
</style>
