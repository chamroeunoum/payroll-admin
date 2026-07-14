<template>
  <div>
    <!-- Month/Year picker row -->
    <div class="flex items-center border-b border-gray-200 pb-3 mb-4">
      <div class="font-moul text-lg flex-grow">សង្ខេបព័ត៌មាន / BI Dashboard</div>
      <div class="flex items-center gap-2">
        <n-date-picker
          type="month"
          v-model:value="selectedMonth"
          clearable
          class="w-48"
          placeholder="ជ្រើសរើសខែ"
          @update:value="loadBiData"
        />
        <n-button @click="loadBiData" :loading="loading" size="small" type="primary">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></g></svg>
          </template>
        </n-button>
      </div>
    </div>

    <!-- BI Widgets Grid -->
    <div v-if="biData" class="bi-grid">
      <StaffBi   :data="biData.staff"       :loading="loading" />
      <PayrollBi :data="biData.payroll"     :loading="loading" />
      <AttendanceBi :data="biData.attendance" :loading="loading" />
    </div>

    <!-- Loading state -->
    <div v-if="loading && !biData" class="flex justify-center py-20">
      <div class="text-center">
        <svg class="animate-spin w-12 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48s21.49-48 48-48s48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48s48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.491-48-48-48z" fill="currentColor"/></svg>
        <br/><br/>កំពុងផ្ទុក...
      </div>
    </div>

    <!-- Error state -->
    <div v-if="error" class="text-center py-10 text-red-500">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import dateFormat from 'dateformat'
import StaffBi from './bi/StaffBi.vue'
import PayrollBi from './bi/PayrollBi.vue'
import AttendanceBi from './bi/AttendanceBi.vue'

export default {
  name: 'Dashboard',
  components: {
    StaffBi,
    PayrollBi,
    AttendanceBi,
  },
  setup() {
    const store = useStore()
    const selectedMonth = ref(Date.now())
    const biData = ref(null)
    const loading = ref(false)
    const error = ref(null)

    async function loadBiData() {
      loading.value = true
      error.value = null
      try {
        const date = new Date(selectedMonth.value)
        const year = dateFormat(date, 'yyyy')
        const month = dateFormat(date, 'mm')
        const res = await store.dispatch('dashboard/fetchBi', { year, month })
        if (res && res.data) {
          biData.value = res.data
        } else {
          biData.value = null
          error.value = 'មិនអាចទាញយកទិន្នន័យបានទេ'
        }
      } catch (err) {
        error.value = err.response?.data?.message || 'មានបញ្ហាក្នុងការទាញយកទិន្នន័យ'
        biData.value = null
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadBiData()
    })

    return {
      selectedMonth,
      biData,
      loading,
      error,
      loadBiData,
    }
  },
}
</script>

<style scoped>
.bi-grid {
  @apply flex flex-wrap gap-4;
}
.bi-grid > * {
  @apply w-full lg:w-[calc(50%-8px)] xl:w-[calc(33.333%-11px)];
}
</style>
