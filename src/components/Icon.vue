<template>
  <svg class="block " :width="width" :height="height">
    <use :xlink:href="iconHref"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  width?: string;
  height?: string;
  iconName: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: "16",
  height: "16",
  iconName: "",
});

const iconHref = computed(() => `/images/svg/sprite.svg#${props.iconName}`);
</script>
