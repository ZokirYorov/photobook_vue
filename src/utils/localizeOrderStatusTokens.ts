/** Bildirishnoma / toast matnida uchraydigan backend status tokenlari */
const STATUS_TOKEN_UZ: Record<string, string> = {
    PENDING: "Kutilmoqda",
    IN_PROGRESS: "Jarayonda",
    PAUSED: "To'xtatilgan",
    COMPLETED: "Bajarilgan",
    CANCELLED: "Bekor qilindi",
    STARTED: "Boshlangan",
};

/** Uzun tokenlarni avval almashtiramiz */
const TOKEN_ORDER = ["IN_PROGRESS", "COMPLETED", "CANCELLED", "PENDING", "PAUSED", "STARTED"] as const;

/**
 * Backend yuborgan matndagi IN_PROGRESS, PENDING kabi tokenlarni o‘zbekcha ko‘rinishga almashtiradi.
 */
export function localizeOrderStatusTokens(text: string): string {
    if (!text) return text;

    let out = text;
    for (const token of TOKEN_ORDER) {
        const uz = STATUS_TOKEN_UZ[token];
        if (!uz) continue;
        const re = new RegExp(`\\b${token}\\b`, "gi");
        out = out.replace(re, uz);
    }
    return out;
}
