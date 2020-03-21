// import { ADD_RESTAURANT, EDIT_RESTAURANT, GET_RESTAURANT, GET_LIST_RESTAURANT, DELETE_RESTAURANT } from '../constants/appConstants'
const DEFAULT_STATE=[]

const addTodo = (state, payload) =>{
    const arr = state.map(item => item)                             
    arr.push(payload)
    return arr
}

const getTodo = (state, {index}) =>{
    return state.map((item, targetIndex) =>targetIndex === index ? item : {} )
}


const getTodoList = (state) =>{
    if(!!state.length > 0){
        return state
    }else{
        return []
    }
}

const editTodo = (state, { index, ...data}) =>{
    return state.map((item, targetIndex) =>  targetIndex === index ? data : item )
}

const deleteTodo = (state, {index}) =>{
    return state.filter((item, targetIndex) => targetIndex !== index)     
}

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case 'ADD_TODO':
            return addTodo(state, payload)
        case 'EDIT_TODO':
            return editTodo(state, payload)
        case 'GET_TODO':
            return getTodo(state, payload)
        case 'GET_TODOLIST':
            return getTodoList(state, payload)
        case 'DELETE_TODO':
            return deleteTodo(state)
      default:
        return state;
    }
  };
