export default {
  install(app, options = {}) {
    const baseUrl = import.meta.url 
    app.config.globalProperties.$assets = ( pathToFile ) => {
      return new URL(pathToFile, baseUrl).pathname
    }
  }
}