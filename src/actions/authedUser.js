export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser(authedUserId) {
  return {
    type: SET_AUTHED_USER,
    authedUserId
  }
}
