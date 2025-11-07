import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRALIZE_VOTE_THREAD: 'NEUTRALIZE_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function upVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralizeVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncReceiveThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads = await api.getAllThreads();
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
      return thread;
    } catch (error) {
      alert(error.message);
      throw error;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    const userId = authUser.id;
    const thread = threads.find((t) => t.id === threadId);

    if (!thread) return;

    const isUpVoted = thread.upVotesBy.includes(userId);

    if (isUpVoted) {
      dispatch(neutralizeVoteThreadActionCreator({ threadId, userId }));
    } else {
      dispatch(upVoteThreadActionCreator({ threadId, userId }));
    }

    try {
      if (isUpVoted) {
        await api.neutralizeVoteThread(threadId);
      } else {
        await api.upVoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);
      if (isUpVoted) {
        dispatch(upVoteThreadActionCreator({ threadId, userId }));
      } else {
        dispatch(neutralizeVoteThreadActionCreator({ threadId, userId }));
      }
    }
  };
}

function asyncToggleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    const userId = authUser.id;
    const thread = threads.find((t) => t.id === threadId);

    if (!thread) return;

    const isDownVoted = thread.downVotesBy.includes(userId);

    if (isDownVoted) {
      dispatch(neutralizeVoteThreadActionCreator({ threadId, userId }));
    } else {
      dispatch(downVoteThreadActionCreator({ threadId, userId }));
    }

    try {
      if (isDownVoted) {
        await api.neutralizeVoteThread(threadId);
      } else {
        await api.downVoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);
      if (isDownVoted) {
        dispatch(downVoteThreadActionCreator({ threadId, userId }));
      } else {
        dispatch(neutralizeVoteThreadActionCreator({ threadId, userId }));
      }
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralizeVoteThreadActionCreator,
  asyncReceiveThreads,
  asyncAddThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
};
