<template>
  <div class="bi-card">
    <div class="bi-card-header">
      <svg class="w-8 h-8 text-orange-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none"><path d="M12.5 10c0-1.65-1.35-3-3-3s-3 1.35-3 3s1.35 3 3 3s3-1.35 3-3zm-3 1c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1zm6.5 2c1.11 0 2-.89 2-2c0-1.11-.89-2-2-2c-1.11 0-2.01.89-2 2c0 1.11.89 2 2 2zM11.99 2.01c-5.52 0-10 4.48-10 10s4.48 10 10 10s10-4.48 10-10s-4.48-10-10-10zM5.84 17.12c.68-.54 2.27-1.11 3.66-1.11c.07 0 .15.01.23.01c.24-.64.67-1.29 1.3-1.86A9.05 9.05 0 0 0 9.5 14c-1.3 0-3.39.45-4.73 1.43c-.5-1.04-.78-2.2-.78-3.43c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.2-.27 2.34-.75 3.37c-1-.59-2.36-.87-3.24-.87c-1.52 0-4.5.81-4.5 2.7v2.78a7.935 7.935 0 0 1-5.66-2.86z" fill="currentColor"/></g></svg>
      <div class="bi-card-title">វត្តមាន / Attendance</div>
      <div class="bi-card-period" v-if="data && data.period">
        {{ data.period.month }}/{{ data.period.year }}
      </div>
    </div>
    <div class="bi-card-body" v-if="data">
      <div class="bi-stat-grid">
        <div class="bi-stat-item">
          <div class="bi-stat-value text-blue-600">{{ data.total_records || 0 }}</div>
          <div class="bi-stat-label">ប្រចាំខែ (Records)</div>
        </div>
        <div class="bi-stat-item">
          <div class="bi-stat-value text-green-600">{{ data.officers_with_attendance || 0 }}</div>
          <div class="bi-stat-label">បុគ្គលិកមានវត្តមាន</div>
        </div>
      </div>

      <!-- Attendance Rate Bar -->
      <div class="bi-att-rate-section" v-if="data.attendance_rate !== undefined">
        <div class="bi-att-rate-label">អត្រាវត្តមាន (Attendance Rate)</div>
        <div class="bi-att-rate-bar-bg">
          <div class="bi-att-rate-bar-fill" :style="{ width: data.attendance_rate + '%' }" :class="rateColorClass"></div>
        </div>
        <div class="bi-att-rate-pct">{{ data.attendance_rate }}%</div>
      </div>

      <div class="bi-att-breakdown">
        <div class="bi-att-row">
          <span class="bi-att-dot bg-green-500"></span>
          <span class="bi-att-label">មក (Present)</span>
          <span class="bi-att-value">{{ data.present || 0 }}</span>
        </div>
        <div class="bi-att-row">
          <span class="bi-att-dot bg-red-500"></span>
          <span class="bi-att-label">អវត្តមាន (Absent)</span>
          <span class="bi-att-value">{{ data.absent || 0 }}</span>
        </div>
        <div class="bi-att-row">
          <span class="bi-att-dot bg-yellow-500"></span>
          <span class="bi-att-label">ឈឺ (Sick)</span>
          <span class="bi-att-value">{{ data.sick_leave || 0 }}</span>
        </div>
        <div class="bi-att-row">
          <span class="bi-att-dot bg-purple-500"></span>
          <span class="bi-att-label">ឈប់សម្រាក (Annual Leave)</span>
          <span class="bi-att-value">{{ data.annual_leave || 0 }}</span>
        </div>
        <div class="bi-att-row">
          <span class="bi-att-dot bg-pink-500"></span>
          <span class="bi-att-label">មាតុភាព (Maternity)</span>
          <span class="bi-att-value">{{ data.maternity_leave || 0 }}</span>
        </div>
        <div class="bi-att-row">
          <span class="bi-att-dot bg-orange-500"></span>
          <span class="bi-att-label">ថ្ងៃបុណ្យ (Holiday)</span>
          <span class="bi-att-value">{{ data.holiday || 0 }}</span>
        </div>
      </div>

      <div class="bi-ot-section" v-if="data.total_ot_minutes > 0 || data.total_worked_minutes > 0">
        <div class="bi-ot-row">
          <span>ម៉ោងធ្វើការសរុប (Total Worked)</span>
          <span class="font-bold">{{ formatHours(data.total_worked_minutes) }}</span>
        </div>
        <div class="bi-ot-row">
          <span>ម៉ោងបន្ថែម (Overtime)</span>
          <span class="font-bold text-orange-600">{{ formatHours(data.total_ot_minutes) }}</span>
        </div>
      </div>
    </div>
    <div v-else class="bi-card-empty">
      <div v-if="loading" class="bi-loading">កំពុងផ្ទុក...</div>
      <div v-else class="bi-no-data">គ្មានទិន្នន័យ</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttendanceBi',
  props: {
    data: { type: Object, default: null },
    loading: { type: Boolean, default: false },
  },
  computed: {
    rateColorClass() {
      const rate = this.data?.attendance_rate || 0
      if (rate >= 90) return 'bg-green-500'
      if (rate >= 70) return 'bg-yellow-500'
      return 'bg-red-500'
    },
  },
  methods: {
    formatHours(minutes) {
      if (!minutes) return '0h 0m'
      const h = Math.floor(minutes / 60)
      const m = Math.round(minutes % 60)
      return `${h}h ${m}m`
    },
  },
}
</script>
