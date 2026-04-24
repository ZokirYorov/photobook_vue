import type { NotificationType } from "@/typeModules/useModules";

export type NotificationPresentation = {
    label: string;
    /** Admin monitoring — kulrang chet / badge */
    tone?: "default" | "admin";
};

/** POST /notifications/me/paging filter va dropdown (NOTIFICATION_MISC emas) */
export const notificationTypeOptions: { value: NotificationType; text: string }[] = [
    { value: "ORDER_ASSIGNED", text: "Biriktirilgan" },
    { value: "TASK_ACTIVATED", text: "Ish navbati" },
    { value: "ORDER_UPDATED", text: "Buyurtma yangilangan" },
    { value: "ORDER_STATUS_CHANGED", text: "Holat o'zgardi" },
    { value: "ADMIN_TASK_STEP_COMPLETED", text: "Bosqich tugadi (admin)" },
    { value: "ADMIN_TASK_HANDOFF", text: "Navbat o'tdi (admin)" },
];

export const notificationTypeConfig: Record<NotificationType, NotificationPresentation> = {
    ORDER_ASSIGNED: {
        label: "Biriktirilgan",
    },
    TASK_ACTIVATED: {
        label: "Ish navbati",
    },
    ORDER_UPDATED: {
        label: "Yangilangan",
    },
    ORDER_STATUS_CHANGED: {
        label: "Holat o'zgardi",
    },
    ADMIN_TASK_STEP_COMPLETED: {
        label: "Bosqich tugadi (admin)",
        tone: "admin",
    },
    ADMIN_TASK_HANDOFF: {
        label: "Navbat o'tdi (admin)",
        tone: "admin",
    },
    NOTIFICATION_MISC: {
        label: "Bildirishnoma",
        tone: "admin",
    },
};

export function getNotificationPresentation(type: NotificationType): NotificationPresentation {
    return notificationTypeConfig[type] ?? notificationTypeConfig.NOTIFICATION_MISC;
}
