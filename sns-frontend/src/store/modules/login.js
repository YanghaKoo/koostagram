import {createAction, handleActions} from 'redux-actions'
import {pender} from 'redux-pender'
import axios from 'axios'

const checkLogin = () => axios.get('/auth/login')

const LOGIN = 'login/LOGIN'

export const login = createAction(LOGIN,checkLogin)

const initialState = {
  user : {
    id : 0,
    nick : ''
  }
}

// reducer
export default handleActions({
  ...pender({
    type : LOGIN,
    onSuccess : (state,action) =>{
      const {data} = action.payload
      return {user : data.user}
    }
  })
},initialState)