import * as groupActions from './group';
import * as matchActions from './matches'

// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const UPDATE_USER_TAGS = 'session/UPDATE_USER_TAGS';
const UPDATE_USER_GROUP = 'session/UPDATE_USER_GROUP';
const UPDATE_USER_GROUP_TAGS = 'session/UPDATE_USER_GROUP_TAGS';
const REMOVE_USER_TAG = "session/REMOVE_USER_TAG"

// action creators
const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

// thunks

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (data.errors) {
    return;
  }
  dispatch(setUser(data));
  if (data.group) dispatch(groupActions.setGroup(data.group));
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  if (data.errors) {
    return data;
  }
  dispatch(setUser(data));
  if (data.group) dispatch(groupActions.setGroup(data.group));
  return {};
};

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  dispatch(removeUser());
  dispatch(groupActions.removeGroup());
  dispatch(matchActions.matchesLogout());
};

export const signUp =
  (username, email, password, about, user_photo, looking_for_group) =>
  async (dispatch) => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        about,
        user_photo,
        looking_for_group,
      }),
    });
    const data = await response.json();
    if (data.errors) {
      return data;
    }
    dispatch(setUser(data));
    return {};
  };

export const demoLogin = () => async (dispatch) => {
  const response = await fetch('/api/auth/demologin')
  const data = await response.json()
  dispatch(setUser(data))
  if (data.group) dispatch(groupActions.setGroup(data.group));
  return data;
}

const initialState = {user: null};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      return {user: action.payload};
    case REMOVE_USER:
      return {user: null};
    case UPDATE_USER_TAGS:
      newState = {...state};
      newState.user.tags[action.payload.id] = {
        id: action.payload.id,
        tag: action.payload.tag,
      };
      return newState;
    case UPDATE_USER_GROUP:
      newState = {...state};
      newState.user.group = action.payload;
      return newState;
    case UPDATE_USER_GROUP_TAGS:
      newState = {...state};
      newState.user.group.tags[action.payload.id] = {
        id: action.payload.id,
        tag: action.payload.tag,
      };
      return newState;
    case REMOVE_USER_TAG:
        console.log('hitting remove user tag reducer route')
        newState={...state};
        console.log(newState)
        delete(newState.user.tags[action.payload]);
        console.log(newState)
        return newState;
    default:
      return state;
  }
}
