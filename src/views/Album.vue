<template>
  <div class="flex flex-col container m-auto gap-4 p-6 min-h-screen w-full">
    <div class="flex flex-col sm:flex-row gap-4 items-center bg-white rounded-xl p-4 justify-between w-full">
      <div class="flex items-center gap-4">
        <i class="fa-solid fa-book-open text-4xl text-blue-600"></i>
        <div>
          <h2 class="text-xl font-semibold uppercase text-md">Buyurtmalar</h2>
          <p class="text-gray-600 text-md font-semibold">2 <span>ta buyurtma</span></p>
        </div>
      </div>
      <CButton
          type="button"
          text="+Yangi buyurtma"
          variant="primary"
          @click="visibleForm"
      />
    </div>
    <div
        class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-100 rounded-xl p-4 justify-between"
    >
      <div
          class="flex flex-col gap-4 bg-white rounded-xl p-4 justify-between"
          v-for="(cat, index) in categoryType"
          :key="index"
      >
        <div
            class="flex w-full flex-col border-b gap-1 border-gray-200"
        >
          <h2 class="text-md uppercase font-semibold">{{cat.text}}</h2>
          <span class="text-gray-400">Betlar: <span class="text-sm font-semibold text-gray-400">{{cat.item}}</span></span>
        </div>
        <div
            class="flex gap-4 items-center justify-between"
        >
          <div class="flex flex-col">
            <div class="gap-2 flex items-center font-semibold">
              <span class="text-gray-400">Buyurtma</span>
              <span class="text-xl text-blue-600">
                {{getCategoryCount(cat.value)}}
              </span>
              <span class="text-gray-400 text-lg">dona</span>
            </div>

          </div>
          <div class="flex flex-col">
            <div class="gap-2 flex items-center font-semibold">
              <span class="text-gray-400">Bajarilgan</span>
              <span class="text-xl text-blue-600">
                {{getCount(cat.value)}}
              </span>
              <span class="text-gray-400 text-lg">dona</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CDialog
        :show="showConfirmItem"
        @close="showConfirmItem = false"
        body-class="justify-center bg-blue-800 text-center px-4 pb-8"
    >
      <DeleteConfirm
          v-model:show="showConfirmItem"
          @confirm="deleteConfirmItem"
          title="Siz ushbu zakazni uchirmoqchimisiz?"
      />
    </CDialog>
    <CDialog
        has-close-icon
        no-header
        :show="isVisible"
        @close="closeForm"
        bodyClass="rounded-lg mt-28 py-4 mb-10 !bg-bg-primary"
    >
      <div
          class="flex flex-col overflow-y-auto"
      >
        <form
            @submit.prevent="submitForm"
            class="flex flex-col gap-3 overflow-y-auto px-4"
        >
          <h2 class=" text-2xl font-semibold">
            {{isEditing ? "Formani uzgartirish" : "Forma qo'shish"}}
          </h2>
          <AppSelect
              v-model="itemForm.categoryName"
              :options="categoryType"
              disabledValue="Tanlang"
              text-field="text"
              value-field="value"
              label="Albom turi"
          />
          <div class="flex w-full gap-2 px-1 items-center justify-between">
            <AppInput
                label="Betlar soni"
                type="number"
                step="2"
                class="w-full"
                placeholder="2,4,6,10,...,"
                v-model="itemForm.pageNumber"
            />
            <AppInput
                type="number"
                class="w-full"
                placeholder="Masalan: 10"
                label="Buyurtma soni"
                v-model="itemForm.amountNumber"
            /><AppInput
                type="number"
                class="w-full"
                placeholder="Masalan: 10"
                label="Bajarish soni"
                v-model="itemForm.processNumber"
            />
          </div>
          <AppInput
              type="text"
              placeholder="Masalan: Maktab"
              label="Nomi"
              v-model="itemForm.orderName"
          />
          <AppInput
              type="text"
              v-model="itemForm.customerName"
              placeholder="Ism kiriting"
              label="Mijoz ismi"
          />
          <AppInput
              v-model="itemForm.receiverName"
              placeholder="Ism kiriting"
              type="text"
              label="Qabul qiluvchi"
          />
          <AppSelect
              v-model="itemForm.employeeName"
              :options="allUsers"
              disabledValue="Xodimni tanlang"
              text-field="name"
              value-field="name"
              label="Mas'ul xodim"
          />
          <div
              class="flex items-center w-full gap-2"
          >
            <AppInput
                v-model="itemForm.createdData"
                label="Qabul qilingan sana"
                type="date"
                class="w-full"
            />
            <AppInput
                label="Tugash sanasi"
                type="date"
                class="w-full"
                v-model="itemForm.termData"
            />
          </div>
          <AppSelect
              v-model="itemForm.status"
              :options="itemStatus"
              disabledValue="Xolatni tanlang"
              label="Status"
              text-field="text"
              value-field="value"
          />
          <div class="flex flex-col sm:flex-row items-stretch lg:flex-row gap-2 sm:items-center justify-end w-full">
            <CButton
                type="button"
                text="Bekor qilish"
                variant="ghost-accent"
                @click="closeForm"
            />
            <CButton
                type="submit"
                text="Saqlash"
                variant="success"
            />
          </div>
        </form>
      </div>
    </CDialog>
    <div class="bg-white w-full flex overflow-x-auto flex-col p-4 min-h-0 rounded-xl shadow">
      <h2 class="text-2xl font-semibold">Buyurtmalar jadvali</h2>
      <div class="flex w-full items-end gap-2 py-2">
        <AppSelect
            v-model="formStatus"
            :options="itemStatus"
            disabledValue="Barcha holat"
            label=""
            has-reset
            resetText="Hammasi"
            style="width: 30%"
        />
        <AppInput
            v-model="formFilter"
            type="search"
            label=""
            class="w-full"
            style="width: 30%"
            placeholder="Qidirish..."
        />
        <AppInput
            v-model="formData"
            type="date"
            label=""
        />
        <CButton
            type="button"
            text="Bekor qilish"
            variant="ghost-accent"
            @click="closeFilter"
            class="mb-1"
        />
      </div>
      <table
          class="w-full rounded">
        <colgroup>
          <col style="width: 5%">
          <col style="width: 13%">
          <col style="width: 12%">
          <col style="width: 12%">
          <col style="width: 13%">
          <col style="width: 12%">
          <col style="width: 10%">
          <col style="width: 10%">
          <col style="width: 10%">
          <col style="width: 10%">
        </colgroup>
        <thead class="bg-gray-200 rounded-2xl border-b border-gray-600">
        <tr>
          <th class="px-2 py-3 text-start">№</th>
          <th class="p-2 text-start">Buyurtma nomi</th>
          <th class="p-2 text-start">Mijoz</th>
          <th class="p-2 text-start">Qabul qilgan</th>
          <th class="p-2 text-start">Mas'ul</th>
          <th class="p-2 px-4 text-start">Jarayon</th>
          <th class="p-2 text-start">Sana</th>
          <th class="p-2 text-start">Muddat</th>
          <th class="p-2 text-start">Holat</th>
          <th class="p-2 text-start">Operations</th>
        </tr>
        </thead>
        <tbody v-if="filteredAlbums.length > 0">
        <tr
            class="border-b border-gray-600 hover:bg-gray-100"
            v-for="(order, index) in filteredAlbums" :key="index"
        >
          <td class="p-2 ">{{ index + 1 }}</td>
<!--          <td class="p-2 ">-->
<!--            <img :src="order.imgUrl" alt=""/>-->
<!--          </td>-->
          <td class="p-2 break-all">
            <p class="break-all font-semibold">{{ order.orderName }}</p>
            <p class="text-gray-600 text-sm font-semibold break-all">{{order.categoryName}}</p>
          </td>
          <td class="p-2 break-all">{{ order.customerName }}</td>
          <td class="p-2 break-all">{{ order.receiverName }}</td>
          <td class="p-2 pr-2 break-all">{{ order.employeeName }}</td>
          <td class="p-2 px-4">
            <div>
              <div class="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
                <span
                    v-if="order.processNumber && order.amountNumber"
                    class="block h-full bg-blue-600 transition-all duration-300"
                    :style="{
                    width: ((order.processNumber) / order.amountNumber * 100) + '%'
                  }"
                ></span>
              </div>
              <div class="text-sm gap-2 mt-1 flex px-2 items-center justify-between text-gray-600">
                <span>{{ order.processNumber || 0 }} / {{ order.amountNumber }}</span>
                <span>{{order.pageNumber || 0}}-Bet</span>
              </div>
            </div>
          </td>
          <td class="p-2 ">{{ formatDate(order.createdData) }}</td>
          <td class="p-2 ">{{ formatDate(order.termData) }}</td>
          <td class="p-2 "
          >
            <span
                :class="[statusColor[order.status],
                  'rounded-xl px-3 py-1 font-semibold text-sm',
                ]">
              {{ order.status }}
            </span>
          </td>
          <td class="p-2 ">
            <div
                class="flex items-center gap-2"
            >
              <CButton
                  type="button"
                  text="Edit"
                  variant="ghost-accent"
                  @click="editForm(order)"
              />
              <CButton
                  type="button"
                  text="Delete"
                  variant="danger"
                  @click="deleteItem(order.id)"
              />
            </div>
          </td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td
              colspan="10"
              class="text-center py-6 text-gray-600 font-semibold"
          >
            Buyurtma topilmadi!
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>


<script setup lang="ts">
import CButton from "@/components/CButton.vue";
import {computed, onMounted, ref, watch} from "vue";
import CDialog from "@/components/CDialog.vue";
import AppInput from "@/components/ui/AppInput.vue";
import AppSelect from "@/components/ui/AppSelect.vue";
import {useStore} from "@/stores/store";
import { AllOrders } from "@/typeModules/useModules";
import { useToast } from "vue-toastification";
import DeleteConfirm from "@/components/DeleteConfirm.vue";

const Toast = useToast();
const dataStore = useStore();

// const allUsers: ComputedRef = computed(() => dataStore.state.users);

const isEditing = ref(false);
const isVisible = ref(false);
const selectedItem = ref<string | null>(null);
const showConfirmItem = ref(false);
const formStatus = ref<string | ''>('');
const formFilter = ref<string | ''>('');
const formData = ref<string | ''>('');


const filteredAlbums = computed(() => {
  let data = dataStore.state.albums

  if (formFilter.value) {
    const search = formFilter.value.toLowerCase()

    data = data.filter(item =>
        item.orderName?.toLowerCase().includes(search) ||
        item.customerName?.toLowerCase().includes(search) ||
        item.employeeName?.toLowerCase().includes(search) ||
        item.pageNumber?.toFixed().includes(search) ||
        item.termData?.toString().includes(search) ||
        item.createdData?.toLowerCase().includes(search) ||
        item.receiverName?.toLowerCase().includes(search)
    )
  }

  // return [...data].sort((a: any, b: any) => new Date(b.createdData).getMilliseconds() - new Date(a.createdData).getMilliseconds());
  return [...data].sort((a, b) => {
    const dateA =  new Date(a.createdData).getMilliseconds();
    const dateB =  new Date(b.createdData).getMilliseconds();
    return dateB - dateA  // oxirgi qo'shilgan birinchi
  })
})

const allUsers = ref([
  {id: 1, name: 'Ali Usmonov'},
  {id: 2, name: 'Elyor Usmonov'},
  {id: 3, name: 'Akbar Salimov'},
  {id: 4, name: 'Murod Xalilov'},
  {id: 5, name: 'Samandar Kamolov'},
])

const itemForm = ref<AllOrders>({
  id: '',
  categoryName: '',
  orderName: '',
  processNumber: null,
  pageNumber: null,
  amountNumber: null,
  customerName: '',
  receiverName: '',
  employeeName: '',
  termData: null,
  status: '',
  // doneData: null,
  createdData: '',
  createdAt: null,
  updatedAt: null,
})

// const changeFilter = (type: 'search' | 'status', value: string ) => {
//   if (type === 'search') {
//     formFilter.value = value
//   } else if (type === 'status') {
//     formStatus.value = value;
//   }
//   dataStore.loadGetAlbum()
// }

watch(() => formFilter.value,  () => {
  dataStore.loadAlbums();
})


watch(formStatus, async (newStatus) => {
  await dataStore.loadAlbums(newStatus);
})

watch(() => formData.value, () => {
  dataStore.loadAlbums();
})

const closeFilter = () => {
  formStatus.value = '';
  formStatus.value = '';
  formData.value = '';
  dataStore.loadGetAlbum();
}

const categoryType = [
  { id: 1, value: 'A3 Albom', text: 'A3 Albom', item: '10, 20, 30, 40'},
  { id: 2, value: 'A3 Kitob (knijniy)', text: 'A3 Kitob (knijniy)', item: '10, 20, 30, 40'},
  { id: 3, value: "O'rtacha (Sredniy)", text: "O'rtacha (Sredniy)", item: '10, 20, 30, 40' },
  { id: 4, value: 'Kichik Albom', text: 'Kichik Albom', item: '6, 8, 10, 12, 14, 16, 18, 20, 30, 40'},
  { id: 5, value: 'Kichik Kitob (knijniy)', text: 'Kichik Kitob (knijniy)', item: '6, 8, 10, 12, 14, 16, 18, 20, 30, 40' },
  { id: 6, value: 'Ikki tomonlama', text: 'Ikki tomonlama', item: '6, 8, 10, 12, 14, 16' },
]

const getCategoryCount = (value: string) => {
  return filteredAlbums.value
      .filter(item => item.categoryName === value)
      .reduce((total, item) => total + (item.amountNumber || 0), 0)
}

const getCount = (value: string) => {
  return filteredAlbums.value
      .filter(item => item.categoryName === value)
      .reduce((total, item) => total + (item.processNumber || 0), 0)
}

const itemStatus = ref( [
  { value: 'Kutilmoqda', text: 'Kutilmoqda' },
  { value: 'Jarayonda', text: 'Jarayonda' },
  { value: 'Bajarilgan', text: 'Bajarilgan' },
])


const visibleForm = () => {
  isVisible.value = true;
  resetForm()
};

const closeForm = () => {
  isVisible.value = false;
}

const statusColor: Record<string, string> = {
  Kutilmoqda: 'bg-yellow-100 text-yellow-700',
  Jarayonda: 'bg-green-100 text-green-700',
  Bajarilgan: 'bg-blue-100 text-blue-700',
}

const isValidForm = () => {
  const f = itemForm.value;
  return (
      f.amountNumber !== null &&
      // f.processNumber !== null &&
      f.pageNumber !== null &&
      f.receiverName !== null &&
      f.categoryName !== null &&
      f.orderName !== null &&
      f.customerName !== null &&
      f.employeeName !== null &&
      f.createdData !== null &&
      f.termData !== null &&
      f.status !== null
  );
};

const submitForm = async ( ) => {
  try {
  if (!isValidForm()) return;
    filteredAlbums.value.push(itemForm.value);

    if (isEditing.value) {
      await dataStore.updateAlbum(itemForm.value.id, itemForm.value);
    } else {
     await dataStore.addAlbum(itemForm.value);
    }
    await dataStore.loadGetAlbum()
    Toast.success( isEditing ? "Yangilandi!" : "Qo'shildi!");
    resetForm();
    isVisible.value = false;
    isEditing.value = false;
  }
  catch (error) {
    console.log("Error", error);
  }
}


const editForm = async (item: AllOrders): Promise<void> => {
  isVisible.value = true;
  isEditing.value = true;
  itemForm.value = { ...item };
};

const deleteConfirmItem = async () => {
  if (!selectedItem.value) return;
  try {
    await dataStore.deleteAlbum(selectedItem.value)
    Toast.info("Successfully deleted!");
    showConfirmItem.value = false;
    selectedItem.value = null;
  }
  catch (error) {
    console.log("Error", error);
  }
}

const deleteItem = async (id: string | null) => {
  selectedItem.value = id;
  showConfirmItem.value = true;
}

const resetForm = () => {
  itemForm.value = {
    id: '',
    // imgUrl: null,
    categoryName: '',
    orderName: '',
    processNumber: null,
    pageNumber: null,
    amountNumber: null,
    customerName: '',
    receiverName: '',
    employeeName: '',
    termData: null,
    status: '',
    // doneData: null,
    createdData: '',
    createdAt: null,
    updatedAt: null,
  }
  isEditing.value = false
}

const formatDate = (dateString?: string | null): string => {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2,'0');
  return `${day}-${month}-${year}`;
};



onMounted(async () => {
  await dataStore.loadGetAlbum()
  // await Promise.all([
  //     // await dataStore.loadCategories(),
  // ])

})

</script>