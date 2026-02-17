<template>
  <div class="flex items-center justify-center w-full h-screen bg-gradient-to-br from-gray-200 to-gray-500 m-auto">
    <div class="bg-white rounded-2xl gap-4 flex flex-col w-[400px] max-w-md p-8 shadow-xl">
      <h2 class="text-2xl font-semibold">User Profile</h2>
      <form
          @submit.prevent="profileSubmit"
          class="flex flex-col gap-4"
      >
        <div class="flex items-center gap-2 flex-col justify-center w-full">
          <img class="w-20 border-2 border-gray-800 h-20 rounded-full" :src="avatarPreview ||  getAvatarUrl(form.avatar)" alt=""/>
<!--          <input-->
<!--              type="file"-->
<!--              accept="image/*"-->
<!--              class="hidden"-->
<!--              ref="profileImageInput"-->
<!--              @change="changeAvatar($event)"-->
<!--          />-->
<!--          <button class="cursor-pointer" @click="profileImageInput?.click()" type="button" >Change</button>-->
        </div>
        <AppInput
            label="User Name"
            placeholder="User Name"
            type="text"
            v-model="form.name"
        />
        <AppInput
            label="User Email"
            placeholder="User Email"
            type="email"
            v-model="form.email"
        />
        <AppInput
            label="User role"
            placeholder="User Role"
            type="text"
            v-model="form.roles"
        />
<!--        <div class="flex mt-5 items-center justify-center gap-4 w-full">-->
<!--          <CButton-->
<!--              type="button"-->
<!--              text="Clear"-->
<!--              variant="ghost-accent"-->
<!--              @click="clearForm"-->
<!--          />-->
<!--          <CButton-->
<!--              type="submit"-->
<!--              text="Submit"-->
<!--              variant="primary"-->
<!--          />-->
<!--        </div>-->
      </form>
    </div>
  </div>
</template>


<script setup lang="ts">
import AppInput from "@/components/ui/AppInput.vue";
import { reactive, ref, watch } from "vue";
import CButton from "@/components/CButton.vue";
import { authService } from "@/service/authService";
import axiosInstance from "@/axios";

const auth = authService();
const user = auth.state.user;

interface UserMe {
  _id: string | number;
  email: string;
  name: string;
  roles: string;
  avatar: string;
}
const form = reactive<UserMe>({
  _id: "",
  name: "",
  email: "",
  roles: "",
  avatar: "",
});

const selectedFile = ref<File | null>(null);
const avatarPreview = ref<string>("");
const profileImageInput = ref<HTMLInputElement>();

const getAvatarUrl = (avatarField: string | null | undefined) => {
  if (!avatarField) return "";

  if (avatarField.startsWith("https")) {
    return avatarField;
  }

  return `${import.meta.env.VITE_BASE_API}/static/${avatarField}`;
};

const changeAvatar = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files?.length) return;

  selectedFile.value = target.files[0];
  avatarPreview.value = URL.createObjectURL(selectedFile.value);
};

const profileSubmit = async () => {
  try {
    const fd = new FormData();
    fd.append("_id", String(form._id));
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("roles", form.roles);

    if (selectedFile.value) {
      fd.append("avatar", selectedFile.value);
    }
    const { data } = await axiosInstance.get('/api/auth/me/' );

    form._id = data._id;
    form.name = data.name;
    form.email = data.email;
    form.roles = Array.isArray(data.roles)
        ? data.roles.join(", ")
        : data.roles;

    console.log('Avatar name',data.avatar);
    form.avatar = data.avatar;

    auth.setUser(data);
    selectedFile.value = null;

  } catch (error) {
    console.error(error);
  }
};

// const clearForm = () => {
//   form._id = "";
//   form.email = "";
//   form.name = "";
//   form.roles = "";
//   form.avatar = "";
//   avatarPreview.value = "";
//   selectedFile.value = null;
// };

watch(
    () => user,
    (newUser) => {
      if (!newUser) return;

      form._id = newUser._id;
      form.name = newUser.name;
      form.email = newUser.email;

      form.roles = Array.isArray(newUser.roles)
          ? newUser.roles.join(", ")
          : newUser.roles;

      form.avatar = newUser.avatar;
    },
    { immediate: true }
);

</script>


<style scoped>

</style>
