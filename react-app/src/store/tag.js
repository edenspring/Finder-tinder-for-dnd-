// constants
const UPDATE_USER_TAGS = "session/UPDATE_USER_TAGS"

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
  dispatch(updateUserTags(data))
}
