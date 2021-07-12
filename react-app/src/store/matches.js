const SET_MATCHABLE_USERS = "matches/SET_MATCHABLE_USERS";
const SET_MATCHABLE_GROUPS = "matches/SET_MATCHABLE_GROUPS";
const SET_FULLYMATCHED_USERS = "matches/SET_FULLYMATCHED_USERS";
const SET_FULLYMATCHED_GROUPS = "matches/SET_FULLYMATCHED_GROUPS";
const SET_PARTIALLYMATCHED_USERS = "matches/SET_PARTIALLYMATCHED_USERS";
const SET_PARTIALLYMATCHED_GROUPS = "matches/SET_PARTIALLYMATCHED_GROUPS";
const ADD_FULLYMATCHED_GROUP = "matches/ADD_FULLYMATCHED_GROUP";
const ADD_FULLYMATCHED_USER = "matches/ADD_FULLYMATCHED_USER";
const ADD_PARTIALLYMATCHED_GROUP = "matches/ADD_PARTIALLYMATCHED_GROUP";
const ADD_PARTIALLYMATCHED_USER = "matches/ADD_PARTIALLYMATCHED_USER";
const LOGOUT = "matches/LOGOUT";

const setMatchableUsers = (users) => ({
  type: SET_MATCHABLE_USERS,
  payload: users,
});

const setMatchableGroups = (groups) => ({
  type: SET_MATCHABLE_GROUPS,
  payload: groups,
});

const setFullyMatchedGroups = (groups) => ({
  type: SET_FULLYMATCHED_GROUPS,
  payload: groups,
});

const setPartiallyMatchedGroups = (groups) => ({
  type: SET_PARTIALLYMATCHED_GROUPS,
  payload: groups,
});
const setFullyMatchedUsers = (users) => ({
  type: SET_FULLYMATCHED_USERS,
  payload: users,
});

const addFullyMatchedGroup = (group) => ({
  type: ADD_FULLYMATCHED_GROUP,
  payload: group,
});

const addFullyMatchedUser = (user) => ({
  type: ADD_FULLYMATCHED_USER,
  payload: user,
});

const addPartiallyMatchedGroup = (group) => ({
  type: ADD_PARTIALLYMATCHED_GROUP,
  payload: group,
});

const addPartiallyMatchedUser = (user) => ({
  type: ADD_PARTIALLYMATCHED_USER,
  payload: user,
});

export const matchesLogout = () => ({
  type: LOGOUT,
});

export const getMatchableUsers = () => async (dispatch) => {
  const response = await fetch("/api/users/matchable");
  const data = await response.json();
  dispatch(setMatchableUsers(data));
};

export const getMatchableGroups = () => async (dispatch) => {
  const response = await fetch("api/groups/matchable");
  const data = await response.json();
  console.log(data, "woopwoopwoopwoop");
  dispatch(setMatchableGroups(data));
};

export const makeMatch = (data) => async (dispatch) => {
  const response = await fetch("/api/matches/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  console.log("wubwubwubwub", responseData);
  if (responseData.user_matched && responseData.group_matched) {
    if (data.context === "user") {
      dispatch(addFullyMatchedGroup(responseData));
    } else {
      dispatch(addFullyMatchedUser(responseData));
    }
  } else if (responseData.user_matched) {
    dispatch(addPartiallyMatchedGroup(responseData));
  } else if (responseData.group_matched) {
    dispatch(addPartiallyMatchedUser(responseData));
  }
};

export const getMatchedUsers = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/matches/groups/${groupId}`);
  const matches = { full: {}, partial: {} };
  const data = await response.json();

  for (const key in data) {
    console.log(key, "key");
    if (data[key].user_matched && data[key].group_matched) {
      console.log(data[key], "data at key");
      matches.full[key] = data[key];
      // fullMatch[key] = data[key]
    } else {
      if (data[key].group_matched) matches.partial[key] = data[key];
    }
  }

  dispatch(setFullyMatchedUsers(matches));
};

export const getMatchedGroups = (userId) => async (dispatch) => {
  const response = await fetch(`/api/matches/users/${userId}`);

  // let partialMatch = new Object({});
  // let fullMatch = new Object({})
  const matches = { full: {}, partial: {} };
  const data = await response.json();
  console.log(matches);

  for (const key in data) {
    console.log(key, "key");
    if (data[key].user_matched && data[key].group_matched) {
      console.log(data[key], "data at key");
      matches.full[key] = data[key];
      // fullMatch[key] = data[key]
    } else {
      if (data[key].user_matched) matches.partial[key] = data[key];
    }
  }
  console.log("full", matches);
  dispatch(setFullyMatchedGroups(matches));
  // dispatch(setPartiallyMatchedGroups(partialMatch))
};

export const unMatch = (data) => async (dispatch) => {
  const response = await fetch("/api/matches/unmatch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

const initialState = {
  users: null,
  groups: null,
  usersMatchedtoGroup: { partial: null, full: null },
  groupsMatchedtoUser: { partial: null, full: null },
};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_MATCHABLE_USERS:
      newState = { ...state };
      newState.users = Object.values(action.payload);
      return newState;
    case SET_MATCHABLE_GROUPS:
      newState = { ...state };
      newState.groups = Object.values(action.payload);
      return newState;
    case SET_FULLYMATCHED_GROUPS:
      newState = { ...state };
      newState.groupsMatchedtoUser.full = action.payload.full;
      newState.groupsMatchedtoUser.partial = action.payload.partial;
      return newState;
    case SET_FULLYMATCHED_USERS:
      newState = { ...state };
      newState.usersMatchedtoGroup.full = action.payload.full;
      newState.usersMatchedtoGroup.partial = action.payload.partial;
    case SET_PARTIALLYMATCHED_GROUPS:
      newState = { ...state };
      newState.groupsMatchedtoUser.partial = action.payload;
      return newState;
    case ADD_FULLYMATCHED_GROUP:
      newState = { ...state };
      newState.groupsMatchedtoUser.full[action.payload.id] = action.payload;
      return newState;
    case ADD_PARTIALLYMATCHED_GROUP:
      newState = { ...state };
      newState.groupsMatchedtoUser.partial[action.payload.id] = action.payload;
      return newState;
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
