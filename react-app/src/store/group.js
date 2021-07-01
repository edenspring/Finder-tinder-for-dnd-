//constants
const SET_GROUP = 'group/SET_GROUP';
const UPDATE_GROUP_TAGS = '/group/UPDATE_GROUP_TAGS'

//action creators
export const setGroup = (group) => ({
  type: SET_GROUP,
  payload: group
})

//thunkitronics

export const getUserGroup = (userId) => async(dispatch) => {
  const response = await fetch(`/api/groups/user`)
}

export const createGroup = (data) => async(dispatch) => {
  console.log('you made it bro, heres ur data', data)
  const response = await fetch(`/api/groups/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const group = await response.json();
  if (group && group.errors) {
    return group;
  } else {
    dispatch(setGroup(group));
  }
};

const initialState = {}

export default function reducer(state = initialState, action) {
  let newState
  switch (action.type) {
      case SET_GROUP:
          newState = action.payload;
          return newState;
      case UPDATE_GROUP_TAGS:
          newState = action.payload;
          return newState;
  }
}
