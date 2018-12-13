import {createAction, handleActions} from 'redux-actions'
import {pender} from 'redux-pender'
import axios from 'axios'

// 뒤에 img 흠..
export const submitPost = (content,img) => axios.post('/post', {content, img})

const CHANGE = 'post/CHANGE'
const SUBMIT = 'post/SUBMIT'

export const change = createAction(CHANGE)
export const submit = createAction(SUBMIT,submitPost)

const initialState = {
  input : '',
  postedId : ''
}

// reducer
export default handleActions({
  [CHANGE] : (state,action) => {
    const {payload : input} = action
    return ({input})
  },
  ...pender({
    type : SUBMIT,    
    onSuccess : (state,action) =>{
      const {id} = action.payload.data
      return ({postedId : id})
    }
  })
},initialState)