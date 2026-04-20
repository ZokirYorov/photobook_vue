<template>
  <button
      type="button"
      class="notify-item"
      :class="{ unread: !item.read }"
      @click="$emit('click', item)"
  >
    <div class="notify-content">
      <div class="notify-item-top">
        <strong>{{ item.title }}</strong>
        <span>{{ formattedTime }}</span>
      </div>
      <p class="notify-message">{{ item.message }}</p>
      <div class="notify-meta">
        <span>{{ item.orderName || "Buyurtma" }}</span>
        <span>{{ config.label }}</span>
      </div>
    </div>
    <span v-if="!item.read" class="unread-dot"></span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { notificationTypeConfig } from "@/constants/notificationTypes";
import type { NotificationItem } from "@/typeModules/useModules";

const props = defineProps<{
  item: NotificationItem;
}>();

defineEmits<{
  click: [item: NotificationItem];
}>();

const config = computed(() => notificationTypeConfig[props.item.type] || notificationTypeConfig.ORDER_UPDATED);

const formattedTime = computed(() => {
  if (!props.item.createdAt) return "";

  return new Intl.DateTimeFormat("uz-UZ", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(props.item.createdAt));
});
</script>

<style scoped>
.notify-item {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  width: 100%;
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid rgba(241, 245, 249, 1);
  background: #fff;
  transition: background-color 0.16s ease;
}

.notify-item:hover {
  background: #f8fafc;
}

.notify-item.unread {
  background: #eff6ff;
}

.notify-content {
  min-width: 0;
}

.notify-item-top {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 12px;
}

.notify-item-top strong {
  font-size: 14px;
  line-height: 1.35;
  color: #0f172a;
}

.notify-item-top span {
  flex-shrink: 0;
  font-size: 11px;
  color: #64748b;
}

.notify-message {
  margin-top: 6px;
  color: #334155;
  font-size: 13px;
  line-height: 1.45;
}

.notify-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
  font-size: 12px;
  color: #1e40af;
  font-weight: 700;
}

.notify-meta span {
  min-width: 0;
}

.unread-dot {
  width: 8px;
  height: 8px;
  margin-top: 6px;
  border-radius: 999px;
  background: #2563eb;
}
</style>
