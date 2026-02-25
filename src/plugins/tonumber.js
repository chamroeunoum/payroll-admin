var numbers = {
  khmer : ['១','២','៣','៤','៥','៦','៧','៨','៩','០'] ,
  latin : ['1','2','3','4','5','6','7','8','9','0']
};
export default {
  install(app, options = {}) {
    app.config.globalProperties.$toNumber = ( number ) => {
      number = number != null && number != undefined ? parseFloat( number ) : number
      // number = new Intl.NumberFormat('en-IN', {
      number = new Intl.NumberFormat('en-IN', {
        style : 'currency' , currency : "USD"
      } ).format( parseFloat( number ) )
      let strNumber = number 
      if( strNumber.length > 0 ){
        for(let i in numbers.latin){
          strNumber = strNumber.replaceAll( numbers.latin[i] , numbers.khmer[i] )
        }
      }
      return strNumber
    }
  }
}