<template>
  <div
      class="bg-white p-6 rounded-xl shadow border-l-4"
      :class="{
      'border-blue-500': color === 'blue',
      'border-green-500': color === 'green',
      'border-yellow-500': color === 'yellow',
      'border-purple-500': color === 'purple'
    }"
  >
    <div class="flex justify-between items-center">
      <div>
        <p class="text-gray-500 text-sm">{{ title }}</p>
        <p class="text-2xl font-bold">{{ value }}</p>
      </div>
      <i class="fas text-4xl opacity-20" :class="icon"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
  icon: string
  color: 'blue' | 'green' | 'yellow' | 'purple'
}>()
</script>

