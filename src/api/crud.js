import axios from "axios"
import { getAuthorization } from "../plugins/authentication"
export default {
  async list(url,params){
    return await axios({
      method: 'GET' ,
      url: url ,
      data: params ,
      headers: {
        'Authorization' : getAuthorization() ,
        'withCredentials': true
      }
    })
  },
  async read(url,params){
    return await axios({
      method: 'GET' ,
      url: url ,
      data: params,
      headers: {
        'Authorization' : getAuthorization(),
        'withCredentials': true
      }
    })
  },
  async get(url,params){
    return await axios({
      method: 'GET' ,
      url: url ,
      data: params
    })
  },
  async create(url,params){
    return await axios({
      method: 'POST' ,
      url: url ,
      data: params,
      headers: {
        'Authorization' : getAuthorization(),
        'withCredentials': true
      }
    })
  },
  async update(url,params){
    return await axios({
      method: 'PUT' ,
      url: url ,
      data: params,
      headers: {
        'Authorization' : getAuthorization(),
        'withCredentials': true
      }
    })
  },
  async delete(url,params){
    return await axios({
      method: 'DELETE' ,
      url: url ,
      data: params,
      headers: {
        'Authorization' : getAuthorization(),
        'withCredentials': true
      }
    })
  },
  async upload(url,formData ){
    return await axios.post( url , formData ,
      { 
        headers: {
          Authorization : getAuthorization() ,
          'Content-Type': 'multipart/form-data' ,
          // 'Access-Control-Allow-Origin' : '*' ,
          // 'Accept-Encoding' : 'gzip, deflate, br' ,
          // 'Host' : 'http://127.0.0.1:8000' ,
          // 'Accept' : '*/*' ,
          // 'Connection' : 'keep-alive'
          'withCredentials': true
        }
      }
    )
  },
  async compact(url){
    return await axios({
      method: 'GET' ,
      url: url ,
      data: params ,
      headers: {
        'Authorization' : getAuthorization(),
        'withCredentials': true
      }
    })
  },
  async activate(api){
    return await axios({
      method: 'PUT' ,
      url: url ,
      data: params,
      headers: {
        'Authorization' : getAuthorization(),
        'withCredentials': true
      }
    })
  },
}