<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';

defineProps<{
  msg: string
}>()

const appName = import.meta.env.VITE_APP_NAME
const count = useCounterStore()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?

    </h3>
    
    <!-- 显示当前环境 -->
    <h1>Mode: {{ appName }}</h1>
    <!-- 状态管理 -->
    <div>
      <button @click="count.increment">add</button>
      <p>Count: {{ count.count }}</p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
