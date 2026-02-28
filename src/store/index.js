import { createStore, createLogger } from 'vuex'
import auth from './modules/authentication'

import user from './modules/user'
import officer from './modules/officer'
import usersalaryadjustment from './modules/usersalaryadjustment'
import organizations from './modules/organization'
import people from './modules/people'
import position from './modules/position'
import countesy from './modules/countesy'
import error from './modules/error'
import attendance from './modules/attendance'
import attendancepolicy from './modules/attendancepolicy'
import generalsetting from './modules/setting'
import salary from './modules/salary'
import salaryadjustment from './modules/salaryadjustment'
import salarypolicy from './modules/salarypolicy'
import holiday from './modules/holiday'


const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
    // apiServer: 'http://127.0.0.1:8000/api/admin' ,
    // apiServer: 'https://apis.ocm.gov.kh/api/admin' ,
    organization: {
      name: 'O AND M (CAMBODIA) CO., LTD'
    },
    system: {
      name: 'O AND M Payroll'
    },
    company: {
      // name: 'VRIYA'
      name: 'Services'
    }
  },
  modules: {
    // product ,
    auth,
    attendance ,
    attendancepolicy ,
    user,
    usersalaryadjustment ,
    officer,
    people ,
    organizations ,
    position ,
    countesy ,
    salary ,
    salaryadjustment ,
    salarypolicy ,
    error ,
    generalsetting ,
    holiday
  },
  strict: debug,
  plugins: debug ? 
    [
      createLogger()
    ] : 
    [
      
    ]
})
