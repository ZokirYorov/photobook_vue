<template>
  <div class="flex flex-col container m-auto  px-6 h-full w-full">
    <div class="w-full h-full flex flex-col">
      <div class="flex items-center justify-between py-6 w-full">
        <h2 class="text-2xl font-semibold">Toifalar jadvali</h2>
        <CButton
            text="Add users"
            @click="clickVisibleForm"
        />
      </div>
      <CDialog
          :show="visibleForm"
          title="Add users"
          @close="closeVisibleForm"
      >
        <form
            @submit.prevent
            class="flex flex-col gap-4 p-10 "
        >
<!--          <span class="flex items-center gap-2 justify-center w-full">-->
<!--            <img class="rounded-full border-2 border-blue-600 w-20 h-20" :src="avatarPreview || form.avatar" alt="">-->
<!--            <input-->
<!--                type="file"-->
<!--                accept="image/*"-->
<!--                class="hidden"-->
<!--                ref="profileImageInput"-->
<!--                @change="changeAvatar($event)"-->
<!--            />-->
<!--              <button class="cursor-pointer border-dashed border-1 p-1 rounded-lg border-gray-800" @click="profileImageInput?.click()" type="button" >Change</button>-->
<!--          </span>-->
          <AppInput
              id="text"
              label="Text"
              type="text"
              required
              placeholder="Enter text"
              v-model="form.name"
          />
          <AppInput
              id="name"
              label="Name"
              placeholder="Enter name"
              type="number"
              required
              v-model="form.pageNumber"
          />
          <div class="flex items-center gap-4 justify-center w-full">
            <CButton
                type="button"
                text="Cancel"
                @click="visibleForm = false"
                variant="ghost-accent"
            />
            <CButton
                type="submit"
                text="Submit"
                @click="submit"
            />
          </div>
        </form>
      </CDialog>
      <div
          v-if="showImagePreview"
          class="flex flex-row-reverse items-center inset-0 fixed bg-black/50 z-[99999] justify-center">
        <div class="relative flex max-w-[60%] max-h-[90%] items-center justify-center">
          <i @click="imageRemove"
             class="fa-solid w-10 h-10 rounded-full bg-[#38333AFF] hover:bg-[#58363AFF] right-0
             text-2xl top-[-45px] p-2 text-center
          text-[#FB6F3AFF] cursor-pointer absolute flex justify-center fa-close">
          </i>
          <img :src="previewImageUrl"
               alt=""
               class="rounded-xl min-w-[200px] h-[600px] flex "
          />
        </div>
      </div>
      <CDialog
          :show="showConfirmDelete"
          @close="showConfirmDelete = false"
          title="Uchirishga ruxsat"
          body-class="justify-center bg-blue-800 text-center px-4 pb-8"
      >
        <DeleteConfirm
            title="Ushbu kategoriyani uchirmoqchimisiz?"
            v-model:show="showConfirmDelete"
            @confirm="confirmDelete"
        />
      </CDialog>
<!--      <Loading v-if="isLoading"/>-->
      <div  class="flex w-full py-4 rounded-lg overflow-x-auto bg-white">
        <table
            class="w-full"
        >
          <colgroup>
            <col style="width: 3%">
            <col style="width: 15%">
            <col style="width: 12%">
            <col style="width: 12%">
            <col style="width: 10%">
          </colgroup>
          <thead>
          <tr class="uppercase text-sm w-full text-gray-600 border-b border-gray-100">
            <th class="p-3 text-start">№</th>
            <th class="text-start">Name</th>
            <th class="text-start">Pages</th>
            <th class="text-start">Operations</th>
          </tr>
          </thead>
          <tbody v-if="customers.length">
          <tr
              class="hover:bg-gray-100 w-full border-b border-gray-100"
              v-for="(user, index) in customers"
              :key="index"
          >
            <td class="px-3 py-2 text-start">{{index + 1}}</td>
            <td class="items-start break-all px-1">{{user.name}}</td>
            <td class="items-start break-all PX-1">{{user.pageNumber}}</td>
            <td>
              <div class="flex items-center justify-start gap-3 text-xl w-full">
                <i
                    @click="editItem(user)"
                    class="fa-solid fa-pencil cursor-pointer text-blue-600 hover:text-blue-500"
                >
                </i>
                <i
                    @click="deleteItem(user.id)"
                    class="fas fa-trash-can text-red-500 cursor-pointer hover:text-red-600"
                >
                </i>
              </div>
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr>
            <td
                colspan="10"
                class="text-center py-6 text-gray-600 text-lg font-semibold"
            >
              Toifa topilmadi !
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/stores/store";

import CButton from "@/components/CButton.vue";
import {computed, onMounted, ref} from "vue";
import CDialog from "@/components/CDialog.vue";
import AppInput from "@/components/ui/AppInput.vue";
// import axiosInstance from "@/axios";
// import { authService } from "@/service/authService";
import { useToast } from "vue-toastification";
import DeleteConfirm from "@/components/DeleteConfirm.vue";
import { IFormData } from "@/typeModules/useModules";
// import Loading from "@/components/Loading.vue";

const authStore = useStore();
const Toast = useToast();
// const dataStore = authService();
const visibleForm = ref(false);
const isEditing = ref(false);
const selectedFile = ref<File | null>(null);
const avatarPreview = ref<string>("");
const showImagePreview = ref(false);
const previewImageUrl = ref("");
const showConfirmDelete = ref(false);
const selectedUser = ref<string | null>(null);
const isLoading = ref(false);

// ******* cloud api

const form = ref<IFormData>({
  id: null,
  name: '',
  pageNumber: null,
  createdAt: null,
  updatedAt: null
})

const customers = computed(() => authStore.state.customers) ;

const clickVisibleForm = () => {
  visibleForm.value = true;
  form.value = {
    id: null,
    name: '',
    pageNumber: null,
    createdAt: null,
    updatedAt: null
  }
}

const load = async () => {
  try {
     await authStore.loadComments();
  }
  catch (error) {
    console.log(error);
  }
}

const submit = async () => {

  isLoading.value = true;
  if (!form.value.name && !form.value.pageNumber ) {
    return alert("Iltimos formani to'ldiring!")
  }

  try {

    if (isEditing.value) {

      await authStore.updateComment(form.value.id, form.value);
      Toast.success("Yangilandi!");
    } else {

      await authStore.addComment(form.value);
      Toast.success("Qo'shildi!");
    }
    closeVisibleForm();
    await load();
    isLoading.value = false;
  }
  catch (error) {
    console.log(error);
  }
};


const getDate = (date: string) => {

  if (!date) return '';
  const data = new Date(date);
  if (isNaN(data.getTime())) return '';

  const day = data.getDate();
  const month = data.getMonth() + 1;
  const year = data.getFullYear();

  return `${day}.${month}.${year}`;
}

const imageRemove = () => {
  showImagePreview.value = false;
}

// const previewImage = (url: string) => {
//   previewImageUrl.value = url;
//   showImagePreview.value = true;
// }

const closeVisibleForm = () => {
  visibleForm.value = false;
  form.value = {
    id: null,
    name: '',
    pageNumber: null,
    createdAt: null,
    updatedAt: null
  }
}

const changeAvatar = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files?.length) return;

  selectedFile.value = target.files[0];
  avatarPreview.value = URL.createObjectURL(selectedFile.value);
};

const getAvatarUrl = (avatarField: string | null | undefined) => {
  if (!avatarField) return "";

  if (avatarField.startsWith("https")) {
    return avatarField;
  }

  return `${import.meta.env.VITE_BASE_API}/static/${avatarField}`;
};


const editItem = (user: IFormData) => {
  form.value = { ...user };
  isEditing.value = true;
  visibleForm.value = true;
};

const dataItem = (inputDate: string | number | Date | undefined | null) => {
  if (!inputDate) return '';

  const data = new Date(inputDate);
  if (Number.isNaN(data.getTime())) return String(inputDate);

  const monthName = [
    "Yan", "Fev", "Mar", "Apr", "May", "Iyn",
    "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek"
  ];

  const day = data.getDate().toString().padStart(2, "0");
  const month = monthName[data.getMonth()];
  const year = data.getFullYear();

  return `${day} ${month} ${year}`;
};

const confirmDelete = async () => {
  isLoading.value = true;
  try {
    if (!selectedUser.value) return;
    await authStore.deleteComment(selectedUser.value);
    await load();

    Toast.info("Successfully deleted!");
    showConfirmDelete.value = false;
    selectedUser.value = null;
    isLoading.value = false;
  }
  catch (error) {
    console.error(error);
  }
}

const deleteItem =  async (id: string | null) => {
  selectedUser.value = id;
  showConfirmDelete.value = true;
}


onMounted( async () => {
  isLoading.value = true;
  try {
    await load();
    isLoading.value = false;
  }
  catch (error) {
    console.log(error);
  }
})

</script>