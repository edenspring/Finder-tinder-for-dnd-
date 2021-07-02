// constants
const UPDATE_USER_TAGS = "session/UPDATE_USER_TAGS"
const UPDATE_GROUP_TAGS = '/group/UPDATE_GROUP_TAGS'
const UPDATE_USER_GROUP_TAGS = "session/UPDATE_USER_GROUP_TAGS"


export const updateUserGroupTags = (tags) => ({
  type: UPDATE_USER_GROUP_TAGS,
  payload: tags,
})

export const updateGroupTags = (tags) => ({
  type: UPDATE_GROUP_TAGS,
  payload: tags,
})

const updateUserTags = (tags) => ({
  type: UPDATE_USER_TAGS,
  payload: tags
})


export const removeTag = (id) => async(dispatch) => {
  const response = await fetch (`/api/tags/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const createTag = (tagData) => async(dispatch) => {
  const response = await fetch ("/api/tags/new", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tagData)
  });
  const data = await response.json();
  if (data.errors){
    return
  }
  if (data.taggable_type == 'user') dispatch(updateUserTags(data))
  else if (data.taggble_type == 'group'){
    dispatch()
  }
}
