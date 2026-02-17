<template>
  <div class="flex flex-col gap-1 relative" :class="type === 'date' ? 'cursor-pointer' : ''">
    <label :for="id" class="text-gray-700 font-medium">{{ label }}</label>
    <div :class="[
        'w-full flex items-center gap-1 border flex-1 outline-none rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400',
        isInputFocused ? 'border-blue-500' : 'border-gray-300',
        showError ? 'border-red-500 focus-within:ring-red-200' : ''
      ]">
      <textarea
          v-if="isTextarea"
          :id="id"
          v-model="model"
          class="w-full outline-none"
          :placeholder="placeholder"
          @focus="isInputFocused = true"
          @blur="isInputFocused = false"
      ></textarea>
      <input
          v-else
          :id="id"
          v-model="model"
          :type="type"
          :min="min"
          :step="step"
          :max="max"
          class="w-full outline-none"
          :placeholder="placeholder"
          @focus="isInputFocused = true"
          @blur="isInputFocused = false"
      />
      <i v-if="hasIcon">
        <img
            :src="iconSrc"
            alt="icon"
            :width="iconSize"
            :height="iconSize"
            class="cursor-pointer"
            @click="iconClick"
        />
      </i>
    </div>
    <span v-if="showError" class="text-red-600 text-xs absolute -bottom-5 left-0">
  {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose, watch } from 'vue';
// import {useI18n} from "vue-i18n";

const model = defineModel<string | null | number>();
// const { t } = useI18n();
interface IProps {
  id?: string;
  label: string;
  type?: string;
  hasIcon?: boolean;
  iconSrc?: string;
  required?: boolean;
  placeholder?: string;
  iconSize?: string;
  isTextarea?: boolean;
  min?: string;
  step?: string;
  max?: string;
  errorText?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'text',
  isTextarea: false,
});

const emit = defineEmits(['iconClick']);
const isInputFocused = ref(false);
const showError = ref(false);
const errorMessage = ref('');

const validate = () => {
  const trimmedValue = model.value ? String(model.value).trim() : '';
  model.value = trimmedValue;

  if (props.required && !trimmedValue) {
    // errorMessage.value = props.errorText || t('components.inputErrorText');
    showError.value = true;
    return false;
  }

  errorMessage.value = '';
  showError.value = false;
  return true;
};

const iconClick = () => emit('iconClick');

defineExpose({validate});

watch(model, (newVal) => {
  if (props.required && newVal) {
    errorMessage.value = '';
    showError.value = false;
  }
});
</script>

