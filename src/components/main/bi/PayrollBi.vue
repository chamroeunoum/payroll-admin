<template>
  <div class="bi-card">
    <div class="bi-card-header">
      <svg class="w-8 h-8 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none"><path d="M5 6.25A2.25 2.25 0 0 1 7.25 4h8.5A2.25 2.25 0 0 1 18 6.25V14h3.5v3.25a3.25 3.25 0 0 1-3.25 3.25H13V19h3.5V6.25a.75.75 0 0 0-.75-.75h-8.5a.75.75 0 0 0-.75.75V14H5V6.25zM18 19h.25A1.75 1.75 0 0 0 20 17.25V15.5h-2V19zm-3.75-2.5H13a2.49 2.49 0 0 0-.5-1.5h1.75a.75.75 0 0 1 0 1.5zM8 8.75A.75.75 0 0 1 8.75 8h5.5a.75.75 0 0 1 0 1.5h-5.5A.75.75 0 0 1 8 8.75zm0 3.5a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zM1 16.5A1.5 1.5 0 0 1 2.5 15h8a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 1 20.5v-4zm10 .5a1 1 0 0 1-1-1H9a2 2 0 0 0 2 2v-1zm0 2a2 2 0 0 0-2 2h1a1 1 0 0 1 1-1v-1zm-8-3a1 1 0 0 1-1 1v1a2 2 0 0 0 2-2H3zm1 5a2 2 0 0 0-2-2v1a1 1 0 0 1 1 1h1zm4.25-2.5a1.75 1.75 0 1 0-3.5 0a1.75 1.75 0 0 0 3.5 0z" fill="currentColor"/></g></svg>
      <div class="bi-card-title">ប្រាក់បៀវត្ស / Payroll</div>
      <div class="bi-card-period" v-if="data && data.period">
        {{ data.period.month }}/{{ data.period.year }}
      </div>
    </div>
    <div class="bi-card-body" v-if="data">
      <div class="bi-finance-grid">
        <div class="bi-finance-item">
          <div class="bi-finance-label">ប្រាក់ឈ្នួលសុទ្ធ (Basic)</div>
          <div class="bi-finance-value text-green-700">$ {{ formatCurrency(data.total_basic_salary) }}</div>
        </div>
        <div class="bi-finance-item">
          <div class="bi-finance-label">ប្រាក់សរុប (Gross)</div>
          <div class="bi-finance-value text-blue-700">$ {{ formatCurrency(data.total_gross_salary) }}</div>
        </div>
        <div class="bi-finance-item">
          <div class="bi-finance-label">ប្រាក់សុទ្ធ (Net)</div>
          <div class="bi-finance-value text-green-600 font-bold">$ {{ formatCurrency(data.total_net_salary) }}</div>
        </div>
        <div class="bi-finance-item">
          <div class="bi-finance-label">កាត់ទុក (Deductions)</div>
          <div class="bi-finance-value text-red-600">$ {{ formatCurrency(data.total_deductions) }}</div>
        </div>
        <div class="bi-finance-item">
          <div class="bi-finance-label">OT Pay</div>
          <div class="bi-finance-value text-orange-600">$ {{ formatCurrency(data.total_ot_pay) }}</div>
        </div>
        <div class="bi-finance-item">
          <div class="bi-finance-label">ប្រាក់បន្ថែម (Allowance)</div>
          <div class="bi-finance-value text-purple-600">$ {{ formatCurrency(data.total_allowance) }}</div>
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
  name: 'PayrollBi',
  props: {
    data: { type: Object, default: null },
    loading: { type: Boolean, default: false },
  },
  methods: {
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount || 0)
    },
  },
}
</script>
