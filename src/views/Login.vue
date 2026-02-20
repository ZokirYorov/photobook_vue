<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Branding -->
    <div class="hidden lg:flex lg:w-1/2 split-left items-center justify-center p-12 relative">
      <div class="scan-line"></div>

      <div class="relative z-10 text-center">
        <!-- Animated Logo -->
        <div class="mb-8 float">
          <div class="inline-flex items-center justify-center w-32 h-32 logo-glow rounded-3xl bg-white/10 backdrop-blur-xl mb-6">
          <img class="w-16 brightness-0 invert" src="../assets/camera.png" alt="">

          </div>
        </div>

        <!-- Title -->
        <h1 class="text-6xl font-bold text-white mb-4 tracking-tight">
          Photobook
        </h1>
        <p class="text-2xl text-white/90 mb-8 font-light">
          Professional Management System
        </p>

        <!-- Features -->
        <div class="space-y-4 text-white/80">
          <div class="flex items-center justify-center gap-3">
            <i class="fa-solid fa-check"></i>
            <span class="text-lg">Buyurtmalarni boshqarish</span>
          </div>
          <div class="flex items-center justify-center gap-3">
            <i class="fa-solid fa-check"></i>
            <span class="text-lg">Real-time statistika</span>
          </div>
          <div class="flex items-center justify-center gap-3">
            <i class="fa-solid fa-check"></i>
            <span class="text-lg">Omborxona nazorati</span>
          </div>
        </div>

        <!-- Decorative Elements -->
        <div class="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
        <div class="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="w-full lg:w-1/2 premium-bg flex items-center justify-center p-8 relative">
      <div class="scan-line"></div>
      <div class="w-full max-w-lg relative z-10">
        <!-- Mobile Logo -->
        <div class="lg:hidden text-center mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 logo-glow rounded-2xl bg-white/10 backdrop-blur-xl mb-4">
            <img class="w-16 brightness-0 invert" src="../assets/camera.png" alt="">
          </div>
          <h2 class="text-3xl font-bold text-white">Photobook</h2>
        </div>

        <!-- Login Card -->
<!--        <div class="flex flex-col bg-white w-[400px] h-[400px] rounded-3xl p-8 shadow-2xl">-->
<!--          &lt;!&ndash; Header &ndash;&gt;-->
<!--          <div class="mb-8 flex flex-col p-4">-->
<!--            <h2 class="text-3xl font-bold text-gray-800 mb-2">Xush kelibsiz! 👋</h2>-->
<!--            <p class="text-gray-600">Davom ettirish uchun hisobingizga kiring</p>-->
<!--          </div>-->

<!--          &lt;!&ndash; Form &ndash;&gt;-->
<!--          <form @submit.prevent="submitLogin" class="space-y-6">-->
<!--            &lt;!&ndash; Username &ndash;&gt;-->
<!--            <div>-->
<!--              <label class="block text-sm font-semibold text-gray-700 mb-2">-->
<!--                Login-->
<!--              </label>-->
<!--              <div class="relative group">-->
<!--                <div class=" flex items-center pointer-events-none">-->
<!--                  <i class="fa-regular fa-user text-gray-400"></i>-->
<!--                </div>-->
<!--                <input-->
<!--                    v-model="form.userName"-->
<!--                    type="text"-->
<!--                    required-->
<!--                    :disabled="isLoading"-->
<!--                    class="input-premium w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 placeholder-gray-400 font-medium focus:outline-none"-->
<!--                    placeholder="Loginni kiriting"-->
<!--                >-->
<!--              </div>-->
<!--            </div>-->

<!--            &lt;!&ndash; Password &ndash;&gt;-->
<!--            <div>-->
<!--              <label class="block text-sm font-semibold text-gray-700 mb-2">-->
<!--                Parol-->
<!--              </label>-->
<!--              <div class="relative group">-->
<!--                <div class="flex items-center pointer-events-none">-->
<!--                  <svg class="w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>-->
<!--                  </svg>-->
<!--                </div>-->
<!--                <input-->
<!--                    v-model="form.password"-->
<!--                    :type="showPassword ? 'text' : 'password'"-->
<!--                    required-->
<!--                    :disabled="isLoading"-->
<!--                    class="input-premium w-full pl-12 pr-12 py-4 rounded-xl text-gray-800 placeholder-gray-400 font-medium focus:outline-none"-->
<!--                    placeholder="Parolni kiriting"-->
<!--                >-->
<!--                <button-->
<!--                    type="button"-->
<!--                    @click="showPassword = !showPassword"-->
<!--                    class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-purple-600 transition-colors"-->
<!--                >-->
<!--                  <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>-->
<!--                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>-->
<!--                  </svg>-->
<!--                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>-->
<!--                  </svg>-->
<!--                </button>-->
<!--              </div>-->
<!--            </div>-->

<!--            &lt;!&ndash; Login Button &ndash;&gt;-->
<!--            <button-->
<!--                type="submit"-->
<!--                :disabled="isLoading"-->
<!--                class="btn-premium bg-purple-200 w-full py-4 rounded-xl text-white font-bold text-lg relative overflow-hidden"-->
<!--            >-->
<!--                                        <span v-if="!isLoading" class="relative z-10 flex items-center justify-center gap-2">-->
<!--                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>-->
<!--                                            </svg>-->
<!--                                            Kirish-->
<!--                                        </span>-->
<!--              <span v-else class="relative z-10 flex items-center justify-center gap-2">-->
<!--                                            <svg class="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>-->
<!--                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>-->
<!--                                            </svg>-->
<!--                                            Yuklanmoqda...-->
<!--                                        </span>-->
<!--            </button>-->

<!--            &lt;!&ndash; Divider &ndash;&gt;-->
<!--            <div class="relative">-->
<!--              <div class="absolute inset-0 flex items-center">-->
<!--                <div class="w-full border-t border-gray-200"></div>-->
<!--              </div>-->
<!--              <div class="relative flex justify-center text-sm">-->
<!--                <span class="px-4 bg-white text-gray-500 font-medium">Demo hisoblar</span>-->
<!--              </div>-->
<!--            </div>-->

<!--            &lt;!&ndash; Demo Accounts &ndash;&gt;-->
<!--            <div class="space-y-2">-->
<!--              <div class="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">-->
<!--                <div class="flex items-center justify-between">-->
<!--                  <span class="text-sm font-semibold text-gray-700">👨‍💼 Admin:</span>-->
<!--                  <code class="text-sm font-mono bg-white px-3 py-1 rounded-lg text-purple-600 font-bold">admin / admin123</code>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">-->
<!--                <div class="flex items-center justify-between">-->
<!--                  <span class="text-sm font-semibold text-gray-700">👤 Xodim:</span>-->
<!--                  <code class="text-sm font-mono bg-white px-3 py-1 rounded-lg text-blue-600 font-bold">sardor / 123</code>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </form>-->

<!--          &lt;!&ndash; Footer &ndash;&gt;-->
<!--          <div class="mt-8 text-center">-->
<!--            <p class="text-sm text-gray-600">-->
<!--              Hisobingiz yo'qmi?-->
<!--              <a href="#" class="font-semibold text-purple-600 hover:text-purple-700 transition-colors ml-1">-->
<!--                Ro'yxatdan o'ting →-->
<!--              </a>-->
<!--            </p>-->
<!--          </div>-->
<!--        </div>-->
        <div class="bg-white rounded-2xl flex flex-col w-[400px] p-4 max-w-md shadow-xl">
          <div class="mb-8 flex flex-col p-4">
            <h2 class="text-3xl font-bold text-gray-800 mb-2">Xush kelibsiz! 👋</h2>
            <p class="text-gray-600">Davom ettirish uchun hisobingizga kiring</p>
          </div>
          <form
              @submit.prevent="submitLogin"
              class="flex flex-col gap-4"
          >
            <AppInput
                type="text"
                label="Login"
                v-model="form.userName"
                placeholder="Login kiriting"
            />
            <AppInput
                label="Parol"
                :type="isPasswordVisible ? 'text' : 'password'"
                :hasIcon="isPasswordEyeOpen"
                :iconSrc="isPasswordVisible ? 'images/svg/eye-open.svg' : 'images/svg/eye-password-hide-svgrepo-com.svg'"
                iconSize="20"
                @iconClick="isPasswordVisible = !isPasswordVisible"
                @input="isPasswordEyeOpen = form.password.length > 0"
                placeholder="Parol kiriting"
                v-model="form.password"
                required
            />
            <CButton
                type="submit"
                text="Login"
                class="w-full mt-4 btn-premium"
                variant="primary"
            />
          </form>
          <span
              class="mt-4 gap-2 flex items-center"
          >
            Registratsiyadan utish
            <i class="fa-solid fa-arrow-right"></i>
            <router-link
                class="text-blue-500 text-md font-bold p-1.5 rounded contain-paint hover:bg-gray-200"
                to="/register"
            >
              Register
            </router-link>
          </span>
          <p class="text-center text-md mt-8">
            © 2026 PHOTOBOOK. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppInput from "@/components/ui/AppInput.vue";
import CButton from "@/components/CButton.vue";
import {onMounted, ref} from "vue";
import {UserLogin} from "@/typeModules/useModules";
import {authService} from "@/service/authService";

const useAuthService = authService();

const isPasswordVisible = ref(false);
const isPasswordEyeOpen = ref(false);

const form = ref<UserLogin>({
  userName: "",
  password: "",
})
// const loginForm = ref({ username: '', password: '' });
// const showPassword = ref(false);
// const isLoading = ref(false);


const validateRegister = () => {
  if (!form.value.userName.trim()) return "Name is required";
  if (!form.value.password.trim()) return "Password is required";

  return null; // ✔ Valid
};


const submitLogin = async () => {
  try {
    if (form.value.userName && form.value.password) {

      const error = validateRegister();
      if (error) {
        alert(error);
        return;
      }

      await useAuthService.login({
        userName: form.value.userName,
        password: form.value.password,
      });

    }
  } catch (error) {
    console.log("Login error:", error);
  }
}

</script>
<style>

body {
  font-family: 'Poppins', sans-serif;
}

/* Premium Gradient Background */
.premium-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.premium-bg::before {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: moveGrid 20s linear infinite;
}

@keyframes moveGrid {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

/* Glassmorphism Card */
.glass-premium {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

/* Floating Elements */
.float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* Shimmer Effect */
.shimmer {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Premium Input */
.input-premium {
  background: rgba(103, 126, 234, 0.05);
  border: 2px solid rgba(103, 126, 234, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.input-premium:focus {
  background: rgba(103, 126, 234, 0.08);
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(103, 126, 234, 0.1);
  transform: translateY(-2px);
}

/* Premium Button */
.btn-premium {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 10px 30px rgba(103, 126, 234, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.btn-premium::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-premium:hover::before {
  width: 300px;
  height: 300px;
}

.btn-premium:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(103, 126, 234, 0.5);
}

.btn-premium:active {
  transform: translateY(-1px);
}

/* Particle Effect */
.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  pointer-events: none;
  animation: rise 8s infinite;
}

@keyframes rise {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-1000px) scale(0);
    opacity: 0;
  }
}

/* Premium Logo Glow */
.logo-glow {
  box-shadow: 0 0 40px rgba(103, 126, 234, 0.6),
  0 0 80px rgba(118, 75, 162, 0.4);
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 40px rgba(103, 126, 234, 0.6),
    0 0 80px rgba(118, 75, 162, 0.4);
  }
  50% {
    box-shadow: 0 0 60px rgba(103, 126, 234, 0.8),
    0 0 100px rgba(118, 75, 162, 0.6);
  }
}

/* Scan Line Effect */
.scan-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(103, 126, 234, 0.8), transparent);
  animation: scan 4s linear infinite;
}

@keyframes scan {
  0% { top: 0; }
  100% { top: 100%; }
}

/* Premium Checkbox */
.checkbox-premium {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #667eea;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.checkbox-premium:checked {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #764ba2;
}

.checkbox-premium:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 14px;
  font-weight: bold;
}

/* Split Screen Layout */
.split-left {
  background: linear-gradient(135deg, rgba(103, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%);
  position: relative;
  overflow: hidden;
}

/* 3D Tilt Effect */
.tilt-card {
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}

</style>
