//constants
const SET_USER = 'session/SET_USER';

export const updateUser = (data) => {
  const response = await fetch(`/api/users/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const data = await response.json();
  if (data && data.errors) {
    return data;
  } else {
    dispatch(setUser(data));
  }
};
