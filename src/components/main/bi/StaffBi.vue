<template>
  <div class="bi-card">
    <div class="bi-card-header">
      <svg class="w-8 h-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fill="none"><path d="M18 13a1 1 0 0 1 1-1h6a1 1 0 0 1 0 2h-6a1 1 0 0 1-1-1zm1 4a1 1 0 1 0 0 2h6a1 1 0 0 0 0-2h-6zm-6-4a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm-6 4.5A1.5 1.5 0 0 1 8.5 16h5a1.5 1.5 0 0 1 1.5 1.5s0 3.5-4 3.5s-4-3.5-4-3.5zM2 7.25A3.25 3.25 0 0 1 5.25 4h21.5A3.25 3.25 0 0 1 30 7.25v17.5A3.25 3.25 0 0 1 26.75 28H5.25A3.25 3.25 0 0 1 2 24.75V7.25zM5.25 6C4.56 6 4 6.56 4 7.25v17.5c0 .69.56 1.25 1.25 1.25h21.5c.69 0 1.25-.56 1.25-1.25V7.25C28 6.56 27.44 6 26.75 6H5.25z" fill="currentColor"/></g></svg>
      <div class="bi-card-title">បុគ្គលិក / Staff</div>
    </div>
    <div class="bi-card-body" v-if="data">
      <div class="bi-stat-grid">
        <div class="bi-stat-item">
          <div class="bi-stat-value text-blue-600">{{ data.total_active || 0 }}</div>
          <div class="bi-stat-label">កំពុងធ្វើការ (Active)</div>
        </div>
        <div class="bi-stat-item">
          <div class="bi-stat-value text-gray-600">{{ data.total_all || 0 }}</div>
          <div class="bi-stat-label">សរុបទាំងអស់ (Total)</div>
        </div>
        <div class="bi-stat-item">
          <div class="bi-stat-value text-pink-500">{{ data.female || 0 }}</div>
          <div class="bi-stat-label">ស្រី (Female)</div>
        </div>
        <div class="bi-stat-item">
          <div class="bi-stat-value text-blue-500">{{ data.male || 0 }}</div>
          <div class="bi-stat-label">ប្រុស (Male)</div>
        </div>
      </div>
      <div v-if="data.departments && data.departments.length > 0" class="bi-dept-section">
        <div class="bi-dept-title">តាមផ្នែក / By Department</div>
        <div class="bi-dept-badges">
          <span v-for="(dept, i) in data.departments" :key="i" class="bi-dept-badge">
            {{ dept.name }}
            <span class="bi-dept-badge-count">{{ dept.count }}</span>
          </span>
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
  name: 'StaffBi',
  props: {
    data: { type: Object, default: null },
    loading: { type: Boolean, default: false },
  },
}
</script>
