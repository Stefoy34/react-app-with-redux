import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  function voteComment(comment) {
    if (comment.id !== action.payload.commentId) {
      return comment;
    }

    let { upVotesBy, downVotesBy } = comment;

    switch (action.type) {
    case ActionType.UP_VOTE_COMMENT:
      upVotesBy = upVotesBy.includes(action.payload.userId)
        ? upVotesBy
        : [...upVotesBy, action.payload.userId];
      downVotesBy = downVotesBy.filter((id) => id !== action.payload.userId);
      break;
    case ActionType.DOWN_VOTE_COMMENT:
      downVotesBy = downVotesBy.includes(action.payload.userId)
        ? downVotesBy
        : [...downVotesBy, action.payload.userId];
      upVotesBy = upVotesBy.filter((id) => id !== action.payload.userId);
      break;
    case ActionType.NEUTRALIZE_VOTE_COMMENT:
      upVotesBy = upVotesBy.filter((id) => id !== action.payload.userId);
      downVotesBy = downVotesBy.filter((id) => id !== action.payload.userId);
      break;
    default:
    }

    return { ...comment, upVotesBy, downVotesBy };
  }

  if (threadDetail === null) {
    if (action.type === ActionType.RECEIVE_THREAD_DETAIL) {
      return action.payload.threadDetail;
    }
    return null;
  }

  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;
  case ActionType.CLEAR_THREAD_DETAIL:
    return null;
  case ActionType.ADD_COMMENT:
    if (threadDetail === null) {
      return threadDetail;
    }
    return {
      ...threadDetail,
      comments: [action.payload.comment, ...threadDetail.comments],
    };

  case ActionType.UP_VOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
        ? threadDetail.upVotesBy
        : [...threadDetail.upVotesBy, action.payload.userId],
      downVotesBy: threadDetail.downVotesBy.filter(
        (id) => id !== action.payload.userId
      ),
    };
  case ActionType.DOWN_VOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      upVotesBy: threadDetail.upVotesBy.filter(
        (id) => id !== action.payload.userId
      ),
      downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
        ? threadDetail.downVotesBy
        : [...threadDetail.downVotesBy, action.payload.userId],
    };
  case ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      upVotesBy: threadDetail.upVotesBy.filter(
        (id) => id !== action.payload.userId
      ),
      downVotesBy: threadDetail.downVotesBy.filter(
        (id) => id !== action.payload.userId
      ),
    };

  case ActionType.UP_VOTE_COMMENT:
  case ActionType.DOWN_VOTE_COMMENT:
  case ActionType.NEUTRALIZE_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map(voteComment),
    };

  default:
    return threadDetail;
  }
}

export default threadDetailReducer;
