import {createAction, handleActions} from 'redux-actions'
import {pender} from 'redux-pender'
import axios from 'axios'

const checkLogin = async () => await axios.get('/auth/login')

const LOGIN = 'login/LOGIN'

export const login = createAction(LOGIN,checkLogin)

const initialState = {
  user : null,
  id : null
}

// reducer
export default handleActions({
  ...pender({
    type : LOGIN,
    onSuccess : (state,action) =>{
      const { data } = action.payload
      
      
      localStorage.setItem('id', data.user.id)
      localStorage.setItem('nick', data.user.nick)
      localStorage.setItem("pic", data.user.pic)

      // localStorage.id = data.user.id
      // localStorage.nick = data.user.nick
      
      return {user : data.user}
      // return {user : 'asdasd'}
    }
  })
},initialState)