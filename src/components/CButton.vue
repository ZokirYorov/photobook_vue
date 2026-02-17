<template>
  <button
    v-bind="{ type, disabled }"
    :class="[
      variants[variant],
      sizes[size],
      { '!pointer-events-none': loading },
      { '!cursor-not-allowed !shadow-none opacity-60': disabled },
    ]"
    class="relative w-auto outline-none flex focus:ring-2 items-center text-white justify-center gap-2 cursor-pointer rounded transition-200 active:scale-95 leading-6 whitespace-nowrap disabled:cursor-not-allowed"
    :disabled="disabled"
  >
    <i v-if="isHasFaIcon" :class="faClass"></i>
    <span
        v-if="icon || text"
      :class="[
        {
          '!opacity-0': loading,
          'flex-center justify-center gap-1': text,
          'flex-row-reverse': iconPosition === 'left',
        },
        mainClass,
      ]"
      class="transition-200 text-center font-bold"
    >
      <span v-if="text">
        {{ text }}
      </span>
      <span v-if="icon?.length">
        <svg
          :class="iconClass"
          class="block"
          :width="iconWidth"
          :height="iconHeight"
        >
          <use :href="iconHref"></use>
        </svg>
      </span>
    </span>
    <transition mode="out-in" name="fade">
      <span
        v-if="loading"
        class="absolute-center z-10 !inline-block w-max h-max loading transition-200"
      >
        <svg
          class="animate-spin"
          fill="none"
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            :fill="loaderFill"
            d="M18.6705 10C19.4048 10 20.0091 10.5978 19.9118 11.3256C19.7101 12.8333 19.1663 14.2813 18.3147 15.5557C17.2159 17.2002 15.6541 18.4819 13.8268 19.2388C11.9996 19.9957 9.98891 20.1937 8.0491 19.8079C6.10929 19.422 4.32746 18.4696 2.92894 17.0711C1.53041 15.6725 0.578004 13.8907 0.192152 11.9509C-0.193701 10.0111 0.00433284 8.00043 0.761209 6.17317C1.51809 4.3459 2.79981 2.78412 4.4443 1.6853C5.71875 0.833744 7.16671 0.289884 8.6744 0.0882432C9.40217 -0.00909153 10 0.595234 10 1.32949C10 2.06375 9.39999 2.64679 8.67774 2.77904C7.69697 2.95865 6.75831 3.33706 5.92155 3.89617C4.71433 4.70281 3.77341 5.84932 3.21779 7.19071C2.66217 8.53211 2.51679 10.0081 2.80004 11.4322C3.0833 12.8562 3.78246 14.1642 4.80912 15.1909C5.83578 16.2175 7.14383 16.9167 8.56784 17.2C9.99186 17.4832 11.4679 17.3378 12.8093 16.7822C14.1507 16.2266 15.2972 15.2857 16.1038 14.0784C16.6629 13.2417 17.0414 12.303 17.221 11.3223C17.3532 10.6 17.9363 10 18.6705 10Z"
          />
        </svg>
      </span>
    </transition>
  </button>
</template>

<script lang="ts" setup>
import { TClassName } from "@/types/common";
import { TButtonSizes, TButtonVariants } from "@/types/button";
import { computed } from "vue";

interface Props {
  variant?: TButtonVariants;
  size?: TButtonSizes;
  loading?: boolean;
  mainClass?: TClassName;
  type?: "button" | "submit" | "reset";
  iconPosition?: "left" | "right";
  text?: string | number;
  icon?: string;
  iconClass?: string;
  iconWidth?: string;
  iconHeight?: string;
  disabled?: boolean;
  isHasFaIcon?: boolean;
  faClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  text: "",
  type: "button",
  iconWidth: "16px",
  iconHeight: "16px",
});

const variants: Record<TButtonVariants, string> = {
  primary: "bg-[#1929B9] hover:bg-[#4B5BE7] disabled:bg-[#1929B9] focus:ring-blue-500",
  secondary: "bg-button-secondary-bg hover:bg-button-secondary-bg-hover text-text-primary-inverted",
  "outline-primary": "bg-bg-white border-none shadow-inset-1 disabled:border-0 hover:shadow-inset-2 text-text-primary",
  "outline-accent": "bg-bg-white border-none shadow-filter-inset-1 disabled:border-0 hover:shadow-filter-inset-2 text-text-primary-brand",
  "ghost-primary": "bg-bg-white disabled:!bg-transparent border-0",
  "ghost-accent": "bg-gray-500 disabled:bg-gray-400 hover:bg-gray-400 focus:ring-gray-500 border-0 text-text-primary-brand",
  "text-primary": "bg-transparent hover:opacity-80 border-none text-text-primary font-bold",
  "text-accent": "bg-transparent hover:opacity-80 border-none text-text-primary-inverted font-bold",
  warning: "bg-yellow-500 hover:bg-yellow-600 text-text-primary-inverted",
  danger: "bg-red-500 hover:bg-red-600 text-text-primary-inverted",
  success: "bg-green-500 disabled:bg-green-400 hover:bg-green-400 text-text-primary-inverted",
};

const sizes: Record<TButtonSizes, string> = {
  xs: "h-[24px] px-1 text-[11px]",
  sm: "h-[32px] px-2 text-sm",
  md: "h-9 px-4 text-sm",
  lg: "h-11 px-4 text-lg leading-20",
  xl: "h-[52px] px-4 text-sm leading-20",
  xxl: "h-[62px] px-5 text-base",
  "text-xxl": "h-[38px]",
  "text-xl": "h-[36px] text-sm",
  "text-lg": "h-[36px] text-sm",
  "text-md": "h-[28px] text-sm",
  "text-sm": "h-[25px] text-[12px]",
  "text-xs": "h-[23px] text-[11px] font-medium",

  //// adaptive

  "sm-lg": "h-[32px] md:h-11 px-2 md:px-4 text-xs md:text-sm",
};

const loaderFill = computed(() => {
  if (["outline", "outline-dark", "outline-primary"].includes(props.variant)) {
    return "#191F2E";
  }
  return "#8595AD";
});

const iconHref = computed(() => `/images/svg/sprite.svg#${props.icon}`);
</script>
