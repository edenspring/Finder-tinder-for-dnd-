//constants
const SET_GROUP = 'group/SET_GROUP';
const UPDATE_USER_GROUP = 'session/UPDATE_USER_GROUP';
const UPDATE_GROUP_TAGS = '/group/UPDATE_GROUP_TAGS';
const UPDATE_USER_GROUP_TAGS = 'session/UPDATE_USER_GROUP_TAGS';
const REMOVE_GROUP_TAG = "group/REMOVE_GROUP_TAG"

//action creators
export const setGroup = (group) => ({
  type: SET_GROUP,
  payload: group,
});

export const updateUserGroup = (group) => ({
  type: UPDATE_USER_GROUP,
  payload: group,
});

export const updateUserGroupTags = (tags) => ({
  type: UPDATE_USER_GROUP_TAGS,
  payload: tags,
});

export const updateGroupTags = (tags) => ({
  type: UPDATE_GROUP_TAGS,
  payload: tags,
});

//thunkitronics

export const getUserGroup = (userId) => async (dispatch) => {
  const response = await fetch(`/api/groups/user`);
};

export const createGroup = (data) => async (dispatch) => {
  console.log('you made it bro, heres ur data', data);
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
    dispatch(updateUserGroup(group));
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_GROUP:
      newState = action.payload;
      return newState;
    case UPDATE_GROUP_TAGS:
      newState = {...state};
      newState.tags[action.payload.id] = {
        id: action.payload.id,
        tag: action.payload.tag,
      };
      return newState;
    case REMOVE_GROUP_TAG:
      newState = {...state};
      delete(newState.tags[action.payload]);
      return newState;
    default:
      return initialState;
  }
}
