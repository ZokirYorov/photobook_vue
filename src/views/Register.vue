<template>
  <div class="flex min-h-screen bg-gradient-to-br from-gray-300 to-gray-500 m-auto w-full items-center justify-center">
    <div class="bg-white rounded-2xl gap-4 flex flex-col w-[400px] max-w-md p-8 shadow-xl">
      <h2 class="text-xl font-semibold">Register Page</h2>
      <form
          @submit.prevent="submitForm"
          class="flex flex-col gap-4"
      >
        <AppInput
            type="text"
            label="User name"
            v-model="form.name"
            placeholder="Enter username"
        />
        <AppInput

            label="Email"
            type="email"
            placeholder="Enter email"
            v-model="form.email"
        />
        <AppInput
            label="Password"
            type="password"
            placeholder="Enter password"
            v-model="form.password"
            required
        />
        <CButton
            type="submit"
            text="Register"
            class="w-full mt-4"
            variant="primary"
        />

      </form>
      <span>
        Are you registered?
        <router-link
            class="text-blue-600 text-md font-bold py-1 px-2 rounded contain-paint hover:bg-gray-200"
            to="/login"
        >
          Login
        </router-link>
      </span>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import AppInput from "@/components/ui/AppInput.vue";
import CButton from "@/components/CButton.vue";
import {ref} from "vue";
import {Register} from "@/typeModules/useModules";
import { authService } from "@/service/authService";

const useAuthService = authService();
const router = useRouter();

const form = ref<Register>({
  name: "",
  email: "",
  password: "",
})

const validateRegister = () => {
  if (!form.value.name.trim()) return "Name is required";
  if (!form.value.email.trim()) return "Email is required";
  if (!form.value.password.trim()) return "Password is required";

  return null; // ✔ Valid
};


const submitForm = async () => {
  try {
    if (form.value.name && form.value.email && form.value.password) {

      const error = validateRegister();

      if (error) {
        alert('Enter password and confirm password!');
        return;
      }

      const res = await useAuthService.register(form.value);
      const token = res.data;
      localStorage.setItem("accessToken", token.accessToken);

      console.log('User item', token);

      await useAuthService.getCurrentUser();

      await router.push("/category");
    } else {
      console.log('Its not registered!');
    }
  }
  catch (error) {
    console.log("error", error);
  }

}
</script>
