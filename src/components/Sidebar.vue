<template>
  <div
      class="w-full invisible sm:w-1/2 md:w-1/3 h-full mt-20 pt-40 min-h-screen bg-gray-700 transition-all ease-in-out duration-300 fixed inset-0 z-999 left-0"
      @click="toggleMenu"
      :class="isMenuVisible ? 'visible' : 'invisible'"
  >
    <div
        @click.stop
        :class="isMenuVisible ? 'translate-x-0' : '-translate-x-full'"
        v-if="mainMenuItems.length"
        class="pt-10 md:w-1/2 sm:1/2 lg:w-1/2 gap-4 p-4 w-3/4 h-dvh flex flex-col md:pt-16 bg-gray-700 absolute top-0 left-0 text-white z-20 transition-all ease-in-out duration-300 overflow-hidden"

    >
      <router-link
          v-for="(item, index) in mainMenuItems"
          :key="index"
          :to="item.path"
          @click="toggleMenu"
          active-class="bg-gray-600 text-white font-semibold"
          class="rounded-sm p-2 cursor-pointer hover:bg-gray-600 transition-colors duration-300 flex items-center gap-1"
          :class="!isDesktop && index === mainMenuItems.length -1 ? 'hidden' : 'of-hidden'"
      >
        <i :class="item.meta.icon"></i>
        {{item.name}}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ComputedRef} from "vue";
import {watch} from "vue";

const emits = defineEmits(['toggleMenu']);

interface IProps {
  menuItems: Array<{
    name: string;
    path: string;
  }>;
  isMenuVisible: boolean;
}

const props = defineProps<IProps>()

const toggleMenu = () => {
  emits("toggleMenu" );
}

const mainMenuItems: ComputedRef = computed(() => {
    return props.menuItems;
})

const isDesktop = computed(() => window.innerWidth > 768);

watch(
    () => props.isMenuVisible,
    (val) => {
      if (val) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
)
</script>