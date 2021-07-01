// constants
const UPDATE_USER_TAGS = "session/UPDATE_USER_TAGS"

const updateUserTags = (tags) => ({
  type: UPDATE_USER_TAGS,
  payload: tags
})

export const removeTag = ()
