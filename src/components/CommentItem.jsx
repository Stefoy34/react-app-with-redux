import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { asyncToggleUpVoteComment, asyncToggleDownVoteComment } from '../states/threadDetail/action';

function CommentItem({ comment, authUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id: commentId, owner, createdAt, content, upVotesBy, downVotesBy } = comment;

  const isUpVoted = authUser ? upVotesBy.includes(authUser.id) : false;
  const isDownVoted = authUser ? downVotesBy.includes(authUser.id) : false;

  const onVote = (type) => {
    if (!authUser) {
      alert('Anda harus login untuk memberi vote!');
      navigate('/login');
      return;
    }

    if (type === 'up') {
      dispatch(asyncToggleUpVoteComment(commentId));
    } else if (type === 'down') {
      dispatch(asyncToggleDownVoteComment(commentId));
    }
  };

  return (
    <div className="comment-item">
      <header className="comment-item__header">
        <img src={owner.avatar} alt={owner.name} />
        <strong>{owner.name}</strong>
        {/* <span className="comment-item__time">{formatDate(createdAt)}</span> */}
        <span className="comment-item__time">{createdAt}</span>
      </header>
      {/* API mungkin mengembalikan HTML di 'content',
        jadi kita gunakan dangerouslySetInnerHTML
      */}
      <div
        className="comment-item__body"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* --- Tombol Voting Baru --- */}
      <footer className="comment-item__footer">
        <button
          type="button"
          className={`vote-button ${isUpVoted ? 'voted' : ''}`}
          onClick={() => onVote('up')}
        >
          👍 <span className="vote-count">{upVotesBy.length}</span>
        </button>
        <button
          type="button"
          className={`vote-button ${isDownVoted ? 'voted' : ''}`}
          onClick={() => onVote('down')}
        >
          👎 <span className="vote-count">{downVotesBy.length}</span>
        </button>
      </footer>
    </div>
  );
}

export default CommentItem;
