import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRALIZE_VOTE_THREAD_DETAIL: 'NEUTRALIZE_VOTE_THREAD_DETAIL',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRALIZE_VOTE_COMMENT: 'NEUTRALIZE_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function upVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function downVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function neutralizeVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function upVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      commentId, userId,
    },
  };
}

function downVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      commentId, userId,
    },
  };
}

function neutralizeVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const userId = authUser.id;
    const threadId = threadDetail.id;

    const isUpVoted = threadDetail.upVotesBy.includes(userId);
    if (isUpVoted) {
      dispatch(neutralizeVoteThreadDetailActionCreator(userId));
    } else {
      dispatch(upVoteThreadDetailActionCreator(userId));
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
        dispatch(upVoteThreadDetailActionCreator(userId));
      } else {
        dispatch(neutralizeVoteThreadDetailActionCreator(userId));
      }
    }
  };
}

function asyncToggleDownVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const userId = authUser.id;
    const threadId = threadDetail.id;

    const isDownVoted = threadDetail.downVotesBy.includes(userId);
    if (isDownVoted) {
      dispatch(neutralizeVoteThreadDetailActionCreator(userId));
    } else {
      dispatch(downVoteThreadDetailActionCreator(userId));
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
        dispatch(downVoteThreadDetailActionCreator(userId));
      } else {
        dispatch(neutralizeVoteThreadDetailActionCreator(userId));
      }
    }
  };
}

function asyncToggleUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const userId = authUser.id;
    const threadId = threadDetail.id;
    const comment = threadDetail.comments.find((c) => c.id === commentId);

    if (!comment) return;

    const isUpVoted = comment.upVotesBy.includes(userId);
    if (isUpVoted) {
      dispatch(neutralizeVoteCommentActionCreator({ commentId, userId }));
    } else {
      dispatch(upVoteCommentActionCreator({ commentId, userId }));
    }

    try {
      if (isUpVoted) {
        await api.neutralizeVoteComment(threadId, commentId);
      } else {
        await api.upVoteComment(threadId, commentId);
      }
    } catch (error) {
      alert(error.message);
      if (isUpVoted) {
        dispatch(upVoteCommentActionCreator({ commentId, userId }));
      } else {
        dispatch(neutralizeVoteCommentActionCreator({ commentId, userId }));
      }
    }
  };
}

function asyncToggleDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const userId = authUser.id;
    const threadId = threadDetail.id;
    const comment = threadDetail.comments.find((c) => c.id === commentId);

    if (!comment) return;

    const isDownVoted = comment.downVotesBy.includes(userId);
    if (isDownVoted) {
      dispatch(neutralizeVoteCommentActionCreator({ commentId, userId }));
    } else {
      dispatch(downVoteCommentActionCreator({ commentId, userId }));
    }

    try {
      if (isDownVoted) {
        await api.neutralizeVoteComment(threadId, commentId);
      } else {
        await api.downVoteComment(threadId, commentId);
      }
    } catch (error) {
      alert(error.message);
      if (isDownVoted) {
        dispatch(downVoteCommentActionCreator({ commentId, userId }));
      } else {
        dispatch(neutralizeVoteCommentActionCreator({ commentId, userId }));
      }
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
};
