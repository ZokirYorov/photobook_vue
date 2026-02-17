<template>
  <div class="flex min-h-screen bg-gradient-to-br from-purple-300 to-gray-800 m-auto w-full items-center justify-center">
    <div class="bg-white rounded-2xl gap-4 flex flex-col w-[400px] max-w-md p-8 shadow-xl">
      <h2 class="text-xl font-semibold">Login Page</h2>
      <form
          @submit.prevent="submitLogin"
          class="flex flex-col gap-4"
      >
        <AppInput
            type="email"
            label="Email"
            v-model="form.email"
            placeholder="Enter email"
        />
        <AppInput
            label="Password"
            :type="isPasswordVisible ? 'text' : 'password'"
            :hasIcon="isPasswordEyeOpen"
            :iconSrc="isPasswordVisible ? 'images/svg/eye-open.svg' : 'images/svg/eye-password-hide-svgrepo-com.svg'"
            iconSize="20"
            @iconClick="isPasswordVisible = !isPasswordVisible"
            @input="isPasswordEyeOpen = form.password.length > 0"
            placeholder="Enter password"
            v-model="form.password"
            required
        />
        <CButton
            type="submit"
            text="Login"
            class="w-full mt-4"
            variant="primary"
        />
      </form>
      <span>Already have an account?
        <router-link
            class="text-blue-600 text-md font-bold py-1 px-2 rounded contain-paint hover:bg-gray-200"
            to="/register"
        >
          Register
        </router-link>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppInput from "@/components/ui/AppInput.vue";
import CButton from "@/components/CButton.vue";
import {ref} from "vue";
import {UserLogin} from "@/typeModules/useModules";
import {authService} from "@/service/authService";

const useAuthService = authService();

const isPasswordVisible = ref(false);
const isPasswordEyeOpen = ref(false);

const form = ref<UserLogin>({
  email: "",
  password: "",
})

const validateRegister = () => {
  if (!form.value.email.trim()) return "Name is required";
  if (!form.value.password.trim()) return "Password is required";

  return null; // ✔ Valid
};


const submitLogin = async () => {
  try {
    if (form.value.email && form.value.password) {

      const error = validateRegister();
      if (error) {
        alert(error);
        return;
      }

      await useAuthService.login({
        email: form.value.email,
        password: form.value.password,
      });

    }
  } catch (error) {
    console.log("Login error:", error);
  }
}

</script>
