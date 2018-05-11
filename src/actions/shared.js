import { getInitialData } from '../utils/api';
import { receiveTweets } from './tweets';
import { receiveUsers } from './users';
import { setAuthedUser } from './authedUser';

export const AUTHED_ID = 'sarah_edo'

export function handleInitialData() {
  return (dispatch) => {
    getInitialData().then(({ users, tweets }) => {
      dispatch(receiveUsers(users))
      dispatch(receiveTweets(tweets))
      dispatch(setAuthedUser(AUTHED_ID))
    })
  }
}
