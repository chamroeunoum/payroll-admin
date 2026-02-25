import { defineStore } from 'pinia'
import axios from 'axios'

// Role constants to replace hardcoded IDs
export const ROLES = {
  ADMIN: 1,
  SUPER: 2,
  MEMBER: 3
}

export const ROLE_NAMES = {
  [ROLES.ADMIN]: 'Admin',
  [ROLES.SUPER]: 'Super',
  [ROLES.MEMBER]: 'Member'
}

// API configuration with credentials for cookie-based auth
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth header if token exists in memory
apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token?.access_token) {
      config.headers.Authorization = `${authStore.token.token_type} ${authStore.token.access_token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for automatic token refresh on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Prevent infinite loops
    if (originalRequest._retry) {
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const authStore = useAuthStore()
      
      try {
        const refreshed = await authStore.refreshToken()
        if (refreshed) {
          // Update the authorization header with new token
          originalRequest.headers.Authorization = `${authStore.token.token_type} ${authStore.token.access_token}`
          return apiClient(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed, logout the user
        await authStore.logout()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: {
      access_token: null,
      token_type: 'Bearer',
      expires_at: null
    },
    isAuthenticated: false,
    isLoading: false,
    error: null
  }),

  getters: {
    isAdmin: (state) => {
      if (!state.user?.roles) return false
      return state.user.roles.some(r => r.id === ROLES.ADMIN)
    },

    isSuper: (state) => {
      if (!state.user?.roles) return false
      return state.user.roles.some(r => r.id === ROLES.SUPER)
    },

    isMember: (state) => {
      if (!state.user?.roles) return false
      return state.user.roles.some(r => r.id === ROLES.MEMBER)
    },

    isBackend: (state) => {
      if (!state.user?.roles) return false
      return state.user.roles.some(r => r.id === ROLES.ADMIN || r.id === ROLES.SUPER || r.id === ROLES.MEMBER)
    },

    getAuthorization: (state) => {
      if (!state.token.access_token) return null
      return `${state.token.token_type} ${state.token.access_token}`
    },

    isTokenExpired: (state) => {
      if (!state.token.expires_at) return true
      return new Date(state.token.expires_at) <= new Date()
    },

    fullName: (state) => {
      if (!state.user) return ''
      return `${state.user.lastname || ''} ${state.user.firstname || ''}`.trim()
    }
  },

  actions: {
    async login(credentials) {
      this.isLoading = true
      this.error = null

      try {
        const response = await apiClient.post('/authentication/login', credentials)

        if (response.data.ok) {
          this.token = response.data.token
          this.user = response.data.record
          this.isAuthenticated = true
          return { success: true, data: response.data }
        } else {
          this.error = response.data.message || 'Login failed'
          return { success: false, message: this.error }
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Login failed'
        return { success: false, message: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      this.isLoading = true

      try {
        if (this.token.access_token) {
          await apiClient.post('/authentication/logout')
        }
      } catch (error) {
        // Ignore errors during logout
      } finally {
        this.clearAuth()
        this.isLoading = false
      }
    },

    async refreshToken() {
      try {
        const response = await apiClient.post('/authentication/refresh')
        
        if (response.data.ok && response.data.token) {
          this.token = response.data.token
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },

    async fetchUser() {
      try {
        const response = await apiClient.get('/authentication/user')
        this.user = response.data
        return true
      } catch (error) {
        return false
      }
    },

    clearAuth() {
      this.user = null
      this.token = {
        access_token: null,
        token_type: 'Bearer',
        expires_at: null
      }
      this.isAuthenticated = false
      this.error = null
    },

    checkAuth() {
      // Check if user has backend access based on roles
      if (!this.isBackend) {
        return false
      }
      // Check token expiration
      if (this.isTokenExpired) {
        return false
      }
      return this.isAuthenticated && this.token.access_token
    }
  },

  persist: {
    // Optional: use plugin for persistence
    // For now we'll keep in memory only (httpOnly cookies handle persistence)
  }
})

export { apiClient }
export default useAuthStore
