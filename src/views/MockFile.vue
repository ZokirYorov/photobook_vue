<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fotostudiya Tizimi - Vue 3</title>
<!--  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>-->
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
      min-height: 100vh;
    }

    .glass {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .animate-fade { animation: fadeIn 0.5s ease; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .hover-scale { transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .hover-scale:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2); }

    .btn-gradient { background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); transition: all 0.3s ease; }
    .btn-gradient:hover { transform: scale(1.05); box-shadow: 0 10px 30px rgba(59, 130, 246, 0.5); }

    .stat-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
      background: linear-gradient(90deg, #3b82f6 0%, #1e40af 100%);
    }

    input:focus, select:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }

    .modal-backdrop { backdrop-filter: blur(10px); animation: fadeIn 0.2s ease; }
    .modal-content { animation: slideUp 0.3s ease; }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(50px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .table-row { transition: all 0.2s ease; }
    .table-row:hover {
      background: linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, rgba(30, 64, 175, 0.05) 100%);
      transform: translateX(4px);
    }
  </style>
</head>
<body>
<div id="app"></div>

<script>
  const { createApp, ref, computed } = Vue;

  createApp({
    setup() {
      const icons = {
        home: '<svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>',
        book: '<svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>',
        image: '<svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',
        frame: '<svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>',
        users: '<svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>',
        package: '<svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>',
        clock: '<svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
        check: '<svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
        dollar: '<svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
        plus: '<svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>',
        edit: '<svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>',
        trash: '<svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>',
        search: '<svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>',
        x: '<svg class="w-6 h-6 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>',
        phone: '<svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>',
      };

      const activeTab = ref('dashboard');
      const orders = ref([]);
      const showModal = ref(false);
      const editingItem = ref(null);
      const filterStatus = ref('all');
      const searchQuery = ref('');

      const employees = ref([
        { id: 1, name: 'Aliyev Sardor', position: 'Usta', phone: '+998 90 123 45 67', avatar: 'AS' },
        { id: 2, name: 'Karimov Javohir', position: 'Dizayner', phone: '+998 91 234 56 78', avatar: 'KJ' },
        { id: 3, name: 'Toshmatov Bekzod', position: 'Bosma usta', phone: '+998 93 345 67 89', avatar: 'TB' },
        { id: 4, name: 'Rahimov Otabek', position: 'Usta', phone: '+998 94 456 78 90', avatar: 'RO' },
        { id: 5, name: 'Mahmudov Dilshod', position: 'Dizayner', phone: '+998 95 567 89 01', avatar: 'MD' },
        { id: 6, name: 'Yusupov Farrux', position: 'Yordamchi', phone: '+998 97 678 90 12', avatar: 'YF' },
        { id: 7, name: 'Abdullayev Jamshid', position: 'Omborchi', phone: '+998 98 789 01 23', avatar: 'AJ' },
        { id: 8, name: 'Nazarov Sherzod', position: 'Haydovchi', phone: '+998 99 890 12 34', avatar: 'NS' },
        { id: 9, name: 'Ismoilov Aziz', position: 'Usta', phone: '+998 90 901 23 45', avatar: 'IA' },
        { id: 10, name: 'Mirzoev Rustam', position: 'Yordamchi', phone: '+998 91 012 34 56', avatar: 'MR' }
      ]);

      const clients = ref([
        { id: 1, name: 'Azimov Farxod', phone: '+998 91 111 22 33', address: 'Toshkent sh., Yunusobod t.', company: 'Fotostudiya "Nur"' },
        { id: 2, name: 'Saidov Jamshid', phone: '+998 90 222 33 44', address: 'Samarqand sh.', company: 'Maktab №12' }
      ]);

      const productCategories = {
        albums: { name: 'Albomlar', icon: 'book', types: [
            { id: 'album-a3', name: 'A3 Albom', pages: [20, 30, 40, 50] },
            { id: 'album-vinetka', name: 'Vinetka Albom', pages: [10, 15, 20] },
            { id: 'album-book-large', name: 'Katta Kitobcha Albom', pages: [20, 30, 40] },
            { id: 'album-book-small', name: 'Kichik Kitobcha Albom', pages: [10, 15, 20] },
            { id: 'album-double', name: 'Ikki Tomonlama Albom', pages: [15, 20, 25] }
          ]},
        vinetka: { name: 'Vinetka', icon: 'image', types: [
            { id: 'vinetka-color', name: 'Rangli Vinetka', sizes: ['10x15', '13x18', '15x21'], colors: ['Oq', 'Ko\'k', 'Pushti', 'Sariq'] },
            { id: 'vinetka-bw', name: 'Qora-Oq Vinetka', sizes: ['10x15', '13x18', '15x21'] }
          ]},
        photoAlbums: { name: 'Rasmli Albom', icon: 'frame', types: [
            { id: 'photo-a3', name: 'A3 Kitobcha Albom', pages: [20, 30, 40] },
            { id: 'photo-medium', name: 'O\'rtacha Albom', pages: [15, 20, 25] },
            { id: 'photo-small', name: 'Kichik Albom', pages: [10, 15, 20] },
            { id: 'photo-square', name: 'Kvadrat Albom', pages: [15, 20, 25, 30] }
          ]},
        frames: { name: 'Oynalar', icon: 'package', types: [
            { id: 'frame-glass', name: 'Shisha Oyna', sizes: ['10x15', '13x18', '15x21', '20x30', '30x40'] },
            { id: 'frame-plastic', name: 'Plastik Oyna', sizes: ['10x15', '13x18', '15x21', '20x30'] },
            { id: 'frame-wood', name: 'Yog\'och Oyna', sizes: ['13x18', '15x21', '20x30', '30x40'] }
          ]}
      };

      const formData = ref({
        productCategory: '', productTypeId: '', orderName: '', clientId: '', employeeId: '', receiverId: '',
        amount: '', deadline: '', receivedDate: new Date().toISOString().split('T')[0],
        status: 'pending', specifications: {}
      });

      const stats = computed(() => ({
        total: orders.value.length,
        pending: orders.value.filter(o => o.status === 'pending').length,
        inProgress: orders.value.filter(o => o.status === 'in-progress').length,
        completed: orders.value.filter(o => o.status === 'completed').length,
        revenue: orders.value.reduce((sum, o) => sum + (o.amount || 0), 0)
      }));

      const recentOrders = computed(() => [...orders.value].slice(-5).reverse());
      const currentCategory = computed(() => productCategories[activeTab.value] || null);
      const categoryOrders = computed(() => currentCategory.value ? orders.value.filter(o => o.productCategory === activeTab.value) : []);

      const filteredOrders = computed(() => {
        let filtered = categoryOrders.value;
        if (filterStatus.value !== 'all') filtered = filtered.filter(o => o.status === filterStatus.value);
        if (searchQuery.value) {
          const query = searchQuery.value.toLowerCase();
          filtered = filtered.filter(o => o.orderName.toLowerCase().includes(query) || o.clientName.toLowerCase().includes(query));
        }
        return filtered;
      });

      const selectedCategory = computed(() => formData.value.productCategory ? productCategories[formData.value.productCategory] : null);
      const selectedType = computed(() => selectedCategory.value?.types.find(t => t.id === formData.value.productTypeId));

      const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      const getStatusColor = (status) => ({'pending': 'bg-yellow-100 text-yellow-800', 'in-progress': 'bg-blue-100 text-blue-800', 'completed': 'bg-green-100 text-green-800'}[status] || 'bg-yellow-100 text-yellow-800');
      const getStatusText = (status) => ({'pending': 'Kutilmoqda', 'in-progress': 'Jarayonda', 'completed': 'Bajarilgan'}[status] || 'Kutilmoqda');
      const getCategoryOrdersCount = (key) => orders.value.filter(o => o.productCategory === key).length;
      const getTypeOrdersCount = (typeId) => categoryOrders.value.filter(o => o.productTypeId === typeId).length;
      const getEmployeeStats = (empId) => {
        const empOrders = orders.value.filter(o => o.employeeId === empId);
        return { completed: empOrders.filter(o => o.status === 'completed').length, pending: empOrders.filter(o => o.status !== 'completed').length };
      };

      const openModal = (item = null) => {
        if (item) {
          formData.value = { ...item, specifications: item.specifications || {} };
          editingItem.value = item;
        } else {
          formData.value = {
            productCategory: ['dashboard', 'employees'].includes(activeTab.value) ? '' : activeTab.value,
            productTypeId: '', orderName: '', clientId: '', employeeId: '', receiverId: '',
            amount: '', deadline: '', receivedDate: new Date().toISOString().split('T')[0],
            status: 'pending', specifications: {}
          };
          editingItem.value = null;
        }
        showModal.value = true;
      };

      const closeModal = () => { showModal.value = false; editingItem.value = null; };

      const handleSubmit = () => {
        const client = clients.value.find(c => c.id === parseInt(formData.value.clientId));
        const employee = employees.value.find(e => e.id === parseInt(formData.value.employeeId));
        const receiver = employees.value.find(e => e.id === parseInt(formData.value.receiverId));

        const orderData = {
          ...formData.value,
          id: editingItem.value?.id || Date.now(),
          clientName: client?.name || '', employeeName: employee?.name || '', receiverName: receiver?.name || '',
          productType: selectedType.value?.name || '', amount: parseFloat(formData.value.amount),
          clientId: parseInt(formData.value.clientId), employeeId: parseInt(formData.value.employeeId),
          receiverId: parseInt(formData.value.receiverId)
        };

        if (editingItem.value?.id) {
          const index = orders.value.findIndex(o => o.id === editingItem.value.id);
          if (index !== -1) orders.value[index] = orderData;
        } else {
          orders.value.push(orderData);
        }
        closeModal();
      };

      const deleteOrder = (orderId) => {
        if (confirm("O'chirmoqchimisiz?")) orders.value = orders.value.filter(o => o.id !== orderId);
      };

      return {
        icons, activeTab, orders, employees, clients, productCategories, showModal, editingItem, formData,
        filterStatus, searchQuery, stats, recentOrders, currentCategory, categoryOrders, filteredOrders,
        selectedCategory, selectedType, formatNumber, getStatusColor, getStatusText, getCategoryOrdersCount,
        getTypeOrdersCount, getEmployeeStats, openModal, closeModal, handleSubmit, deleteOrder
      };
    },
    template: `
                <div class="min-h-screen pb-8">
                    <header class="glass shadow-2xl sticky top-0 z-40 mb-8">
                        <div class="container mx-auto px-4 py-4">
                            <div class="flex items-center justify-between flex-wrap gap-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
                                        <span v-html="icons.book" class="text-white"></span>
                                    </div>
                                    <div>
                                        <h1 class="text-2xl font-bold text-gray-900">Fotostudiya Tizimi</h1>
                                        <p class="text-sm text-gray-600">Buyurtma boshqaruv platformasi</p>
                                    </div>
                                </div>
                                <nav class="flex gap-2 flex-wrap">
                                    <button @click="activeTab = 'dashboard'" :class="['px-4 py-2 rounded-lg font-semibold transition-all', activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/70 text-gray-700 hover:bg-white']">
                                        <span v-html="icons.home" class="mr-2"></span>Dashboard
                                    </button>
                                    <button v-for="[key, cat] in Object.entries(productCategories)" :key="key" @click="activeTab = key" :class="['px-4 py-2 rounded-lg font-semibold transition-all', activeTab === key ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/70 text-gray-700 hover:bg-white']">
                                        <span v-html="icons[cat.icon]" class="mr-2"></span>{{ cat.name }}
                                    </button>
                                    <button @click="activeTab = 'employees'" :class="['px-4 py-2 rounded-lg font-semibold transition-all', activeTab === 'employees' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/70 text-gray-700 hover:bg-white']">
                                        <span v-html="icons.users" class="mr-2"></span>Xodimlar
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </header>

                    <main class="container mx-auto px-4">
                        <div v-if="activeTab === 'dashboard'" class="space-y-6 animate-fade">
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                <div class="glass stat-card relative p-6 rounded-xl shadow-lg hover-scale">
                                    <div class="flex items-center justify-between">
                                        <div><p class="text-sm font-semibold text-gray-600 mb-1">Jami Buyurtmalar</p><p class="text-3xl font-bold text-blue-600">{{ stats.total }}</p></div>
                                        <span v-html="icons.book" class="text-blue-200" style="width:40px;height:40px"></span>
                                    </div>
                                </div>
                                <div class="glass stat-card relative p-6 rounded-xl shadow-lg hover-scale">
                                    <div class="flex items-center justify-between">
                                        <div><p class="text-sm font-semibold text-gray-600 mb-1">Kutilmoqda</p><p class="text-3xl font-bold text-yellow-600">{{ stats.pending }}</p></div>
                                        <span v-html="icons.clock" class="text-yellow-200" style="width:40px;height:40px"></span>
                                    </div>
                                </div>
                                <div class="glass stat-card relative p-6 rounded-xl shadow-lg hover-scale">
                                    <div class="flex items-center justify-between">
                                        <div><p class="text-sm font-semibold text-gray-600 mb-1">Jarayonda</p><p class="text-3xl font-bold text-blue-600">{{ stats.inProgress }}</p></div>
                                        <span v-html="icons.clock" class="text-blue-200" style="width:40px;height:40px"></span>
                                    </div>
                                </div>
                                <div class="glass stat-card relative p-6 rounded-xl shadow-lg hover-scale">
                                    <div class="flex items-center justify-between">
                                        <div><p class="text-sm font-semibold text-gray-600 mb-1">Bajarilgan</p><p class="text-3xl font-bold text-green-600">{{ stats.completed }}</p></div>
                                        <span v-html="icons.check" class="text-green-200" style="width:40px;height:40px"></span>
                                    </div>
                                </div>
                                <div class="glass stat-card relative p-6 rounded-xl shadow-lg hover-scale">
                                    <div class="flex items-center justify-between">
                                        <div><p class="text-sm font-semibold text-gray-600 mb-1">Jami Summa</p><p class="text-2xl font-bold text-purple-600">{{ formatNumber(stats.revenue) }}</p><p class="text-xs text-gray-500 mt-1">so'm</p></div>
                                        <span v-html="icons.dollar" class="text-purple-200" style="width:40px;height:40px"></span>
                                    </div>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div v-for="[key, category] in Object.entries(productCategories)" :key="key" @click="activeTab = key" class="glass p-6 rounded-xl shadow-lg hover-scale cursor-pointer">
                                    <div class="flex items-center gap-4 mb-4">
                                        <div class="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                                            <span v-html="icons[category.icon]" class="text-white" style="width:28px;height:28px"></span>
                                        </div>
                                        <div><h3 class="font-bold text-lg">{{ category.name }}</h3><p class="text-sm text-gray-500">{{ category.types.length }} turi</p></div>
                                    </div>
                                    <div class="pt-4 border-t"><p class="text-2xl font-bold text-gray-800">{{ getCategoryOrdersCount(key) }}</p><p class="text-sm text-gray-500">buyurtma</p></div>
                                </div>
                            </div>

                            <div class="glass rounded-xl shadow-lg p-6">
                                <h2 class="text-xl font-bold mb-4">So'nggi Buyurtmalar</h2>
                                <div class="space-y-3">
                                    <div v-for="order in recentOrders" :key="order.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                        <div class="flex-1"><p class="font-semibold">{{ order.orderName }}</p><p class="text-sm text-gray-600">{{ order.clientName }} • {{ order.productType }}</p></div>
                                        <div class="text-right"><span :class="['px-3 py-1 text-xs rounded-full font-semibold', getStatusColor(order.status)]">{{ getStatusText(order.status) }}</span><p class="text-sm text-gray-500 mt-1">{{ order.deadline }}</p></div>
                                    </div>
                                    <p v-if="orders.length === 0" class="text-center text-gray-500 py-8">Hozircha buyurtmalar yo'q</p>
                                </div>
                            </div>
                        </div>

                        <div v-else-if="currentCategory" class="space-y-6 animate-fade">
                            <div class="glass rounded-xl shadow-lg p-6">
                                <div class="flex items-center justify-between flex-wrap gap-4">
                                    <div class="flex items-center gap-4">
                                        <div class="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                                            <span v-html="icons[currentCategory.icon]" class="text-white" style="width:32px;height:32px"></span>
                                        </div>
                                        <div><h2 class="text-2xl font-bold">{{ currentCategory.name }}</h2><p class="text-gray-600">{{ categoryOrders.length }} ta buyurtma</p></div>
                                    </div>
                                    <button @click="openModal()" class="btn-gradient text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold shadow-lg">
                                        <span v-html="icons.plus"></span>Yangi Buyurtma
                                    </button>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div v-for="type in currentCategory.types" :key="type.id" class="glass p-6 rounded-xl shadow-md hover-scale">
                                    <h3 class="font-bold text-lg mb-3">{{ type.name }}</h3>
                                    <div class="space-y-2 text-sm text-gray-600 mb-4">
                                        <p v-if="type.pages">Betlar: {{ type.pages.join(', ') }}</p>
                                        <p v-if="type.sizes">O'lchamlar: {{ type.sizes.join(', ') }}</p>
                                        <p v-if="type.colors">Ranglar: {{ type.colors.join(', ') }}</p>
                                    </div>
                                    <div class="pt-3 border-t"><p class="text-2xl font-bold text-blue-600">{{ getTypeOrdersCount(type.id) }}</p><p class="text-sm text-gray-500">buyurtma</p></div>
                                </div>
                            </div>

                            <div class="glass rounded-xl shadow-lg p-6">
                                <h3 class="text-xl font-bold mb-4">Buyurtmalar Ro'yxati</h3>

                                <div class="flex gap-4 mb-4 flex-wrap">
                                    <select v-model="filterStatus" class="px-4 py-2 border-2 rounded-lg font-medium">
                                        <option value="all">Barcha holat</option><option value="pending">Kutilmoqda</option>
                                        <option value="in-progress">Jarayonda</option><option value="completed">Bajarilgan</option>
                                    </select>
                                    <div class="flex-1 relative min-w-[200px]">
                                        <span v-html="icons.search" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></span>
                                        <input v-model="searchQuery" type="text" placeholder="Qidirish..." class="w-full pl-10 pr-4 py-2 border-2 rounded-lg">
                                    </div>
                                </div>

                                <div class="overflow-x-auto">
                                    <table class="w-full">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th class="px-4 py-3 text-left text-sm font-semibold">№</th>
                                                <th class="px-4 py-3 text-left text-sm font-semibold">Buyurtma</th>
                                                <th class="px-4 py-3 text-left text-sm font-semibold">Mijoz</th>
                                                <th class="px-4 py-3 text-left text-sm font-semibold">Mas'ul</th>
                                                <th class="px-4 py-3 text-left text-sm font-semibold">Sana</th>
                                                <th class="px-4 py-3 text-left text-sm font-semibold">Holat</th>
                                                <th class="px-4 py-3 text-left text-sm font-semibold">Amallar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(order, index) in filteredOrders" :key="order.id" class="border-b table-row">
                                                <td class="px-4 py-3">{{ index + 1 }}</td>
                                                <td class="px-4 py-3"><div class="font-semibold">{{ order.orderName }}</div><div class="text-sm text-gray-500">{{ order.productType }}</div></td>
                                                <td class="px-4 py-3 text-sm">{{ order.clientName }}</td>
                                                <td class="px-4 py-3 text-sm">{{ order.employeeName }}</td>
                                                <td class="px-4 py-3 text-sm">{{ order.deadline }}</td>
                                                <td class="px-4 py-3"><span :class="['px-3 py-1 text-xs rounded-full font-semibold', getStatusColor(order.status)]">{{ getStatusText(order.status) }}</span></td>
                                                <td class="px-4 py-3">
                                                    <div class="flex gap-2">
                                                        <button @click="openModal(order)" class="text-blue-600 hover:text-blue-800"><span v-html="icons.edit"></span></button>
                                                        <button @click="deleteOrder(order.id)" class="text-red-600 hover:text-red-800"><span v-html="icons.trash"></span></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p v-if="filteredOrders.length === 0" class="text-center text-gray-500 py-8">Bu kategoriyada buyurtmalar yo'q</p>
                                </div>
                            </div>
                        </div>

                        <div v-else-if="activeTab === 'employees'" class="animate-fade">
                            <div class="glass rounded-xl shadow-lg p-6">
                                <h2 class="text-2xl font-bold mb-6">Xodimlar Ro'yxati</h2>
                                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div v-for="emp in employees" :key="emp.id" class="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg hover-scale">
                                        <div class="flex items-center gap-4 mb-4">
                                            <div class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-2xl font-bold">{{ emp.avatar }}</div>
                                            <div><h3 class="font-bold text-lg">{{ emp.name }}</h3><p class="text-sm opacity-90">{{ emp.position }}</p></div>
                                        </div>
                                        <div class="space-y-2 text-sm">
                                            <p class="flex items-center gap-2"><span v-html="icons.phone"></span>{{ emp.phone }}</p>
                                            <p class="flex items-center gap-2"><span v-html="icons.check"></span>Bajarilgan: <span class="font-bold">{{ getEmployeeStats(emp.id).completed }}</span></p>
                                            <p class="flex items-center gap-2"><span v-html="icons.clock"></span>Jarayonda: <span class="font-bold">{{ getEmployeeStats(emp.id).pending }}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    <div v-if="showModal" class="fixed inset-0 bg-black/50 modal-backdrop flex items-center justify-center z-50 p-4" @click.self="closeModal">
                        <div class="glass modal-content rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                            <div class="sticky top-0 glass border-b px-6 py-4 flex justify-between items-center rounded-t-2xl">
                                <h3 class="text-2xl font-bold">{{ editingItem ? 'Tahrirlash' : 'Yangi Buyurtma' }}</h3>
                                <button @click="closeModal" class="text-gray-500 hover:text-gray-700"><span v-html="icons.x"></span></button>
                            </div>

                            <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
                                <div class="bg-blue-50 p-4 rounded-xl space-y-4">
                                    <h4 class="font-bold text-lg">Mahsulot Turi</h4>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div><label class="block text-sm font-semibold mb-2">Kategoriya *</label>
                                        <select v-model="formData.productCategory" @change="formData.productTypeId = ''" required class="w-full px-4 py-2 border-2 rounded-lg">
                                            <option value="">Tanlang</option><option v-for="[key, cat] in Object.entries(productCategories)" :key="key" :value="key">{{ cat.name }}</option>
                                        </select></div>
                                        <div v-if="selectedCategory"><label class="block text-sm font-semibold mb-2">Turi *</label>
                                        <select v-model="formData.productTypeId" required class="w-full px-4 py-2 border-2 rounded-lg">
                                            <option value="">Tanlang</option><option v-for="type in selectedCategory.types" :key="type.id" :value="type.id">{{ type.name }}</option>
                                        </select></div>
                                    </div>
                                    <div v-if="selectedType" class="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        <div v-if="selectedType.pages"><label class="block text-sm font-semibold mb-2">Bet soni</label>
                                        <select v-model="formData.specifications.pages" class="w-full px-4 py-2 border-2 rounded-lg">
                                            <option value="">Tanlang</option><option v-for="p in selectedType.pages" :key="p" :value="p">{{ p }} bet</option>
                                        </select></div>
                                        <div v-if="selectedType.sizes"><label class="block text-sm font-semibold mb-2">O'lcham</label>
                                        <select v-model="formData.specifications.size" class="w-full px-4 py-2 border-2 rounded-lg">
                                            <option value="">Tanlang</option><option v-for="s in selectedType.sizes" :key="s" :value="s">{{ s }}</option>
                                        </select></div>
                                        <div v-if="selectedType.colors"><label class="block text-sm font-semibold mb-2">Rang</label>
                                        <select v-model="formData.specifications.color" class="w-full px-4 py-2 border-2 rounded-lg">
                                            <option value="">Tanlang</option><option v-for="c in selectedType.colors" :key="c" :value="c">{{ c }}</option>
                                        </select></div>
                                        <div><label class="block text-sm font-semibold mb-2">Miqdori</label>
                                        <input v-model.number="formData.specifications.quantity" type="number" min="1" class="w-full px-4 py-2 border-2 rounded-lg" placeholder="1"></div>
                                    </div>
                                </div>

                                <div class="bg-green-50 p-4 rounded-xl space-y-4">
                                    <h4 class="font-bold text-lg">Buyurtma Ma'lumotlari</h4>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div><label class="block text-sm font-semibold mb-2">Buyurtma Nomi *</label>
                                        <input v-model="formData.orderName" type="text" required class="w-full px-4 py-2 border-2 rounded-lg" placeholder="Masalan: Maktab albomi"></div>
                                        <div><label class="block text-sm font-semibold mb-2">Summa (so'm) *</label>
                                        <input v-model.number="formData.amount" type="number" required class="w-full px-4 py-2 border-2 rounded-lg"></div>
                                    </div>
                                </div>

                                <div class="bg-purple-50 p-4 rounded-xl">
                                    <h4 class="font-bold text-lg mb-4">Mijoz</h4>
                                    <select v-model="formData.clientId" required class="w-full px-4 py-2 border-2 rounded-lg">
                                        <option value="">Tanlang</option><option v-for="client in clients" :key="client.id" :value="client.id">{{ client.name }} - {{ client.phone }}</option>
                                    </select>
                                </div>

                                <div class="bg-yellow-50 p-4 rounded-xl space-y-4">
                                    <h4 class="font-bold text-lg">Mas'ul Shaxslar</h4>
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div><label class="block text-sm font-semibold mb-2">Qabul Qiluvchi *</label>
                                        <select v-model="formData.receiverId" required class="w-full px-4 py-2 border-2 rounded-lg">
                                            <option value="">Tanlang</option><option v-for="emp in employees" :key="emp.id" :value="emp.id">{{ emp.name }}</option>
                                        </select></div>
                                        <div><label class="block text-sm font-semibold mb-2">Mas'ul Xodim *</label>
                                        <select v-model="formData.employeeId" required class="w-full px-4 py-2 border-2 rounded-lg">
                                            <option value="">Tanlang</option><option v-for="emp in employees" :key="emp.id" :value="emp.id">{{ emp.name }} - {{ emp.position }}</option>
                                        </select></div>
                                        <div><label class="block text-sm font-semibold mb-2">Qabul Sana</label>
                                        <input v-model="formData.receivedDate" type="date" class="w-full px-4 py-2 border-2 rounded-lg"></div>
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div><label class="block text-sm font-semibold mb-2">Tugash Sanasi *</label>
                                    <input v-model="formData.deadline" type="date" required class="w-full px-4 py-2 border-2 rounded-lg"></div>
                                    <div><label class="block text-sm font-semibold mb-2">Holat</label>
                                    <select v-model="formData.status" class="w-full px-4 py-2 border-2 rounded-lg">
                                        <option value="pending">Kutilmoqda</option><option value="in-progress">Jarayonda</option><option value="completed">Bajarilgan</option>
                                    </select></div>
                                </div>

                                <div class="flex gap-3 pt-4 border-t">
                                    <button type="submit" class="flex-1 btn-gradient text-white px-6 py-3 rounded-lg font-bold shadow-lg">Saqlash</button>
                                    <button type="button" @click="closeModal" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-lg font-bold">Bekor qilish</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `
  }).mount('#app');
</script>
</body>
</html>