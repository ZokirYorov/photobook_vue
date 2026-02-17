

<template>
  <p class="text-lg font-semibold my-4">{{title}}</p>
  <div class="flex justify-center gap-4">
    <button
        @click="handleConfirm"
        class="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-4 py-2 rounded-md font-medium">
      Ha, o'chirish
      <!--      {{t('actions.confirmDelete')}}-->
    </button>
    <button
        @click="emit('update:show', false)"
        class="bg-gray-300 hover:bg-gray-400 cursor-pointer text-gray-800 px-4 py-2 rounded-md font-medium"
    >
      Bekor qilish
<!--      {{t('actions.cancel')}}-->
    </button>
  </div>
</template>
<script setup lang="ts">
// import  {useI18n} from "vue-i18n";

// const { t } = useI18n()
defineProps<{
  title: string
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'update:show', value: boolean): void
}>()

const handleConfirm = () => {
  emit('confirm')
  emit('update:show', false)
}
</script>

<style scoped>

</style>
