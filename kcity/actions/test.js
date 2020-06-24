// action types
export const UPDATE_LANGUAGE ='UPDATE_LANGUAGE'
export const FREE ='FREE'

//action creator

export const  updateLang= update =>({
    type:UPDATE_LANGUAGE,
    payload:update
})

export function addTodo(text) {
    return {
      type: 'UPDATE_LANGUAGEs',
      payload:text
    }
  }
  export function free() {
    return {
      type: 'FREE',
      
    }
  }