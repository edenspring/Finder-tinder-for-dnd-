//constants
const SET_GROUP = 'group/SET_GROUP';

//action creators
const setGroup = (group) => ({
  type: SET_GROUP,
  payload: group
})

//thunkitronics
export const updateUser = (data) => async(dispatch) => {
  console.log('you made it bro, heres ur data', data)
  const response = await fetch(`/api/users/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const user = await response.json();
  if (user && user.errors) {
    return user;
  } else {
    dispatch(setUser(user));
  }
};

const initialState = {}

export default function reducer(state = initialState, action) {
  let newState
  switch (action.type) {
      case SET_GROUP:
          return
      case UPDATE_GROUP_TAGS:
          newState = action.payload
          return newState;
  }
}
