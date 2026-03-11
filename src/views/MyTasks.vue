<template>
  <div class="flex flex-col container m-auto w-full p-6">
    <div class="w-full flex bg-white flex-col px-4 py-2 gap-3 min-h-0 rounded-xl shadow">
      <h2 class="text-2xl font-semibold p-4">Mening vazifalarim</h2>
      <div
          class="overflow-auto"
      >
        <table
            class="w-full table-auto overflow-auto"
        >
          <colgroup>
            <col style="width: 3%">
            <col style="width: 15%">
            <col style="width: 13%">
            <col style="width: 12%">
            <col style="width: 12%">
            <col style="width: 13%">
            <col style="width: 12%">
            <col style="width: 15%">
          </colgroup>
          <thead class="bg-gray-200 border-b border-gray-600 tracking-wider">
          <tr>
            <th class="px-1 py-3 items-start">№</th>
            <th class="p-2 text-start">Nomi</th>
            <th class="p-2 text-start">Xaridor</th>
            <th class="p-2 text-start">Sana</th>
            <th class="p-2 text-start">Muddat</th>
            <th class="p-3 text-start">Jarayon</th>
            <th class="p-2 text-start">Holat</th>
            <th class="p-3 text-start">Amallar</th>
          </tr>
          </thead>
          <tbody>
          <tr
              class="border-b py-4 border-gray-600 hover:bg-gray-100"
          >
            <td class="px-3 py-2">1</td>
            <td class="p-2">Albom</td>
            <td class="p-2">Akobir Kamolov</td>
            <td class="p-2">20.02.2026</td>
            <td class="p-2">30.02.2026</td>
            <td class="p-3">
              <div class="flex flex-col gap-2 pr-2">
                <div class="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
                <span
                    class="block h-full bg-blue-600 transition-all duration-300"
                ></span>
                </div>
                <div class="text-sm mt-1 flex items-center justify-between text-gray-600">
                  <span>{{ 20 }} / {{ 70 }}</span>
                  <span>{{20}}-Bet</span>
                </div>
              </div>
            </td>
            <td class="p-2">Kutilmoqda</td>
            <td>
              <div
                  class="flex items-center gap-2"
              >
                <CButton
                    type="button"
                    text="Bajarish"
                    variant="primary"
                />
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import CButton from "@/components/CButton.vue";
</script>

<style scoped>

</style>