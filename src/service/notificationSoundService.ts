import type { NotificationItem } from "@/typeModules/useModules";

const STORAGE_KEY = "notification_sound_enabled";
const THROTTLE_MS = 3000;

class NotificationSoundService {
    private audio: HTMLAudioElement | null = null;
    private enabled = localStorage.getItem(STORAGE_KEY) !== "false";
    private unlocked = false;
    private lastSoundAt = 0;
    private unlockHandler = () => {
        void this.unlock();
    };

    isEnabled() {
        return this.enabled;
    }

    setEnabled(value: boolean) {
        this.enabled = value;
        localStorage.setItem(STORAGE_KEY, String(value));
    }

    toggle() {
        this.setEnabled(!this.enabled);
        return this.enabled;
    }

    init() {
        this.getAudio();
        window.addEventListener("pointerdown", this.unlockHandler);
        window.addEventListener("keydown", this.unlockHandler);
    }

    destroy() {
        window.removeEventListener("pointerdown", this.unlockHandler);
        window.removeEventListener("keydown", this.unlockHandler);
    }

    async playForNotification(notification?: NotificationItem | null) {
        if (!this.shouldPlay(notification)) return;

        const audio = this.getAudio();

        try {
            audio.currentTime = 0;
            await audio.play();
        } catch (error) {
            console.warn("Audio blocked:", error);
        }
    }

    private getAudio() {
        if (!this.audio) {
            this.audio = new Audio(new URL("@/assets/sounds/note1.wav", import.meta.url).href);
            this.audio.preload = "auto";
        }

        return this.audio;
    }

    private async unlock() {
        if (this.unlocked) return;

        const audio = this.getAudio();
        const previousVolume = audio.volume;

        try {
            audio.volume = 0;
            await audio.play();
            audio.pause();
            audio.currentTime = 0;
            this.unlocked = true;
            this.destroy();
        } catch (_error) {
            // Browser may still block audio until a later direct user interaction.
        } finally {
            audio.volume = previousVolume;
        }
    }

    private shouldPlay(notification?: NotificationItem | null) {
        if (!notification) return false;
        if (!this.enabled) return false;
        if (notification.read) return false;

        const now = Date.now();
        if (now - this.lastSoundAt < THROTTLE_MS) return false;

        this.lastSoundAt = now;
        return true;
    }
}

export const notificationSoundService = new NotificationSoundService();
