// constants
const UPDATE_USER_TAGS = "session/UPDATE_USER_TAGS"
const UPDATE_GROUP_TAGS = '/group/UPDATE_GROUP_TAGS'
const UPDATE_USER_GROUP_TAGS = "session/UPDATE_USER_GROUP_TAGS"
const REMOVE_USER_TAG = "session/REMOVE_USER_TAG"
const REMOVE_GROUP_TAG = "group/REMOVE_GROUP_TAG"

export const removeUserTag = (id) => ({
  type: REMOVE_USER_TAG,
  payload: id,
})

export const removeGroupTag = (id) => ({
  type: REMOVE_GROUP_TAG,
  payload: id,
})

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


export const removeTag = (id, type) => async(dispatch) => {
  const response = await fetch (`/api/tags/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (type === 'user'){
    dispatch(removeUserTag(id))
  }
  if (type === 'group'){
    dispatch(removeGroupTag(id))
  }
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
  console.log('``````', data)
  if (data.errors){
    return
  }
  if (data.taggable_type === 'user') dispatch(updateUserTags(data))
  else if (data.taggable_type === 'group'){
    console.log('group tag')
    dispatch(updateGroupTags(data))
  }
}
