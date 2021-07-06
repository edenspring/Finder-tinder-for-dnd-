const SET_MATCHABLE_USERS = 'matches/SET_MATCHABLE_USERS'

const setMatchableUsers = (users) => ({
  type: SET_MATCHABLE_USERS,
  payload: users,
})

export const getMatchableUsers = () => async(dispatch) => {
  const response = await fetch('/api/users/matchable')
  const data = await response.json()
  dispatch(setMatchableUsers(data))
}

export const matchUserToGroup = (data) => async(dispatch) => {

}

const initialState = {users: null, groups: null, usersMatchedtoGroup:null, groupsMatchedtoUser:null,}

export default function reducer(state=initialState, action){
  let newState;
  switch(action.type) {
    case SET_MATCHABLE_USERS:
      console.log('peeepeeepooopoo',action.payload)
      newState = {...state}
      newState.users = Object.values(action.payload)
      return newState
    default:
      return state
  }
}
