const SET_USER_CHATS = 'chat/SET_USER_CHATS'
const SET_GROUP_CHATS = 'chat/SET_GROUP_CHATS'

const setUserChats = (chats) => ({
  type: SET_USER_CHATS,
  payload: chats,
})

const setGroupChats = (chats) => ({
  type: SET_GROUP_CHATS,
  payload: chats,
})

export const getUserChats = (userId) => async(dispatch) => {
  const response = await fetch(`/api/chats/users/${userId}`)
  const data = await response.json()
  if (data && data.errors){
    return data;
  }
  dispatch(setUserChats(data))
}

export const getGroupChats = (groupId) => async(dispatch) => {
  console.log('---group id : ', groupId)
  const response = await fetch(`/api/chats/groups/${groupId}`)
  const data = await response.json()
  if (data && data.errors){
    return data;
  }
  dispatch(setGroupChats(data))
}

const initialState =  {
  user_chats : {},
  group_chats : {},
}

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER_CHATS:
      newState = {...state};
      newState.user_chats = action.payload;
      return newState;
    case SET_GROUP_CHATS:
      newState = {...state};
      newState.group_chats = action.payload;
      return newState;
    default:
      return state;
  }
}
