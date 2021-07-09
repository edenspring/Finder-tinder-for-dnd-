//constants
const SET_USER = 'session/SET_USER';

//action creators
const setUser = (user) => ({
  type: SET_USER,
  payload: user
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

export const updatePassword = (data) => async(dispatch) => {
  const response = await fetch(`/api/users/${data.id}/password`, {
    method:'PUT',
    headers: {
      'Content-Type': 'application/json',

    },
    body: JSON.stringify(data)
  })
  const resjson = await response.json()
  return resjson;
}
