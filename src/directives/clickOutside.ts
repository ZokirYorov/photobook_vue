import type { ObjectDirective } from 'vue'

type ClickOutsideElement = HTMLElement & {
    __clickOutsideHandler__?: (e: MouseEvent) => void
}

const clickOutside: ObjectDirective<ClickOutsideElement, (e: MouseEvent) => void> = {
    beforeMount(el, binding) {
        el.__clickOutsideHandler__ = (event: MouseEvent) => {
            if (!(el === event.target || el.contains(event.target as Node))) {
                binding.value?.(event)
            }
        }
        document.addEventListener('click', el.__clickOutsideHandler__)
    },

    unmounted(el) {
        document.removeEventListener('click', el.__clickOutsideHandler__!)
        delete el.__clickOutsideHandler__
    },
}

export default clickOutside
