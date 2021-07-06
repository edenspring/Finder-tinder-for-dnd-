const SET_MATCHABLE_USERS = 'matches/SET_MATCHABLE_USERS';
const SET_MATCHABLE_GROUPS = 'matches/SET_MATCHABLE_GROUPS';

const setMatchableUsers = (users) => ({
  type: SET_MATCHABLE_USERS,
  payload: users,
});

const setMatchableGroups = (groups) => ({
  type: SET_MATCHABLE_GROUPS,
  payload: groups,
})

export const getMatchableUsers = () => async (dispatch) => {
  const response = await fetch('/api/users/matchable');
  const data = await response.json();
  dispatch(setMatchableUsers(data));
};

export const getMatchableGroups = () => async (dispatch) => {
  const response = await fetch ('api/groups/matchable')
  const data = await response.json()
  console.log(data,'woopwoopwoopwoop')
  dispatch(setMatchableGroups(data))
}

export const makeMatch = (data) => async (dispatch) => {
  const response = await fetch('/api/matches/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  console.log(responseData, 'wubwubwubwub')
};

export const unMatch = (data) => async (dispatch) => {
  const response = await fetch('/api/matches/unmatch', {
    method: 'POST',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(data)
  })
}

const initialState = {
  users: null,
  groups: null,
  usersMatchedtoGroup: null,
  groupsMatchedtoUser: null,
};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_MATCHABLE_USERS:
      newState = {...state};
      newState.users = Object.values(action.payload);
      return newState;
    case SET_MATCHABLE_GROUPS:
      newState = {...state}
      newState.groups = Object.values(action.payload)
      return newState;
    default:
      return state;
  }
}
