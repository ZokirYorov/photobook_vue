<template>
  <div class="flex p-6 flex-col  gap-6 h-screen w-full">
    <div class="flex justify-between items-center w-full">
      <h2 class="font-semibold text-xl">Dashboard</h2>
      <CButton
          type="button"
          text="Add Category"
          @click="visibleForm"
      />
    </div>

    <CDialog
        has-close-icon
        no-header
        @close="closeDialog"
        :show="isShow"
        bodyClass="rounded-lg !bg-bg-primary"
    >
      <div
          class=" flex p-2 flex-col"
      >
        <form
            @submit.prevent
            class="gap-4 flex flex-col p-6"
        >
          <h3 class="flex text-2xl">Form category</h3>
          <AppInput
              label="Category"
              type="text"
              placeholder="Category name"
              v-model="form.name"
          />
          <div class="flex gap-2 mt-4 justify-end items-center">

            <CButton
                type="button"
                text="Cancel"
                variant="ghost-accent"
                @click="closeDialog()"
            />
            <CButton
                text="Add Category"
                type="submit"
                variant="primary"
                @click="submitForm"
            />
          </div>
        </form>
      </div>
    </CDialog>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard title="Jami Buyurtmalar" :value="stats.totalOrders" color="blue" icon="fa-shopping-cart" />
      <StatCard title="Jarayonda" :value="stats.pending" color="yellow" icon="fa-clock" />
      <StatCard title="Bajarilgan" :value="stats.completed" color="green" icon="fa-check-circle" />
      <StatCard title="Umumiy Summa" :value="stats.revenue + ' so‘m'" color="purple" icon="fa-money-bill-wave" />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div class="flex flex-col justify-between shadow-xl rounded-xl hover:bg-gray-100 h-full bg-white items-center"
           v-for="(item, index) in categoryItems"
           :key="index"
      >
        <div class="flex items-start flex-col justify-between w-full p-4">
          <div class="flex items-center justify-between w-full">
            <div class="break-all text-lg font-semibold">{{item.name}}</div>
            <div class="flex items-center text-lg gap-3">
              <i
                  @click="editCategory(item.id)"
                  class="fa-solid fa-pencil text-blue-600 hover:text-blue-500"
              >
              </i>
              <i
                  @click="deleteCategory(item.id)"
                  class="fas fa-trash-can text-red-700 hover:text-red-600"
              >
              </i>
            </div>
          </div>
          <p class="text-sm flex  text-gray-500 mt-2">
            <span>
              Created at: <strong> {{ formatDate(item?.createdAt) }}</strong>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>

</template>


<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import CDialog from "@/components/CDialog.vue";
import AppInput from "@/components/ui/AppInput.vue";
import CButton from "@/components/CButton.vue";
import { useStore } from "@/stores/store";
import {CategoryForm} from "@/typeModules/useModules";
import axiosInstance from "@/axios";
import { useToast } from "vue-toastification";
import StatCard from "@/components/CCard.vue";

const Toast = useToast();
const dataStore = useStore();

const isShow = ref(false);
const isEditing = ref(false);

const category = (): CategoryForm => ( {
  id: null,
  name: '',
  createdAt: null,
  updatedAt: null,
})

const stats = ref({
  totalOrders: 12,
  pending: 4,
  completed: 8,
  revenue: 25000000
})
const form = ref<CategoryForm>(category());

const visibleForm = ()  => {
  isEditing.value = false;
  isShow.value = true;
  resetForm()
}

const closeDialog = () => {
  isShow.value = false;
  resetForm()
}

const resetForm = () => {
  isEditing.value = false;
  form.value = category();
}

const categoryItems = computed(() => dataStore.state.categories || []);

const submitForm = async ( ) => {
  try {
    // const token = localStorage.getItem("accessToken")
    // if ( isEditing.value ){
    //   await axiosInstance.put(`/api/expenses/category/${form.value._id}`,
    //       {name: form.value.name,},
    //       {headers: {Authorization: token}}
    //   )
    //   Toast.success("Successfully changed!");
    //   await dataStore.loadCategories()
    // } else {
    //   await axiosInstance.post('/api/expenses/category',
    //       { name: form.value.name},
    //       {headers: {Authorization: token}}
    //   );
    //   Toast.success("Successfully added!");
    //
    //   await dataStore.loadCategories();
    // }

  }
  catch (error) {
    console.log(error);
  }
  isShow.value = false;
  isEditing.value = false;
  resetForm()
}

const editCategory = async (id: number | string | null): Promise<void> => {
  isEditing.value = true;
  isShow.value = true;

  if (id === null) return;
  const itemId = categoryItems.value.find(item => item.id === id);
  if (itemId) {
    form.value = { ...itemId }
    console.log('Form data',form.value)
  } else {
    console.log('Topilmadi',id)
  }
  console.log('Item',itemId?.id)
}

const deleteCategory = async (id: number | string | null): Promise<void> => {
  try {
    // const token = localStorage.getItem("accessToken")
    // await axiosInstance.delete(`/api/expenses/category/${id}`,
    // {headers: {Authorization: token}}
    // )
    // await getCategory()
    // Toast.info("Successfully deleted!");
  }
  catch (error) {
    console.log(error);
  }
}

const getCategory = async () => {
  try {

    // await dataStore.loadCategories();

  } catch (error) {
    console.log(error);
  }
};

const formatDate = (dateString?: string | null): string => {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const month = monthName[date.getMonth()];
  return `${day} ${month} ${year}`;
};

onMounted(async (): Promise<void> => {
  // await getCategory();
})
</script>
<style>
</style>