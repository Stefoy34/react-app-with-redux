import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  asyncReceiveThreadDetail,
  clearThreadDetailActionCreator,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
} from '../states/threadDetail/action';

import CommentItem from '../components/CommentItem';
import CommentForm from '../components/CommentForm';

function DetailPage() {
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));

    return () => {
      dispatch(clearThreadDetailActionCreator());
    };
  }, [threadId, dispatch]);

  if (!threadDetail) {
    return <p>Memuat detail diskusi...</p>;
  }

  const isThreadUpVoted = authUser ? threadDetail?.upVotesBy.includes(authUser.id) : false;
  const isThreadDownVoted = authUser ? threadDetail?.downVotesBy.includes(authUser.id) : false;

  const onThreadVote = (type) => {
    if (!authUser) {
      alert('Anda harus login untuk memberi vote!');
      navigate('/login');
      return;
    }
    if (type === 'up') {
      dispatch(asyncToggleUpVoteThreadDetail());
    } else if (type === 'down') {
      dispatch(asyncToggleDownVoteThreadDetail());
    }
  };

  const { title, body, createdAt, owner, comments, upVotesBy, downVotesBy } = threadDetail;

  return (
    <div className="detail-page">
      <header className="thread-header">
        <h2 className="thread-header__title">{title}</h2>
        <div className="thread-header__meta">
          <img src={owner.avatar} alt={owner.name} />
          <span>Dibuat oleh <strong>{owner.name}</strong></span>
          {/* <span>{formatDate(createdAt)}</span> */}
          <span>{createdAt}</span>
        </div>
      </header>

      {/* Tampilkan body thread */}
      <div
        className="thread-body"
        dangerouslySetInnerHTML={{ __html: body }}
      />

      {/* 5. --- Tombol Voting THREAD --- */}
      <div className="thread-voting">
        <button
          type="button"
          className={`vote-button ${isThreadUpVoted ? 'voted' : ''}`}
          onClick={() => onThreadVote('up')}
        >
          👍 <span className="vote-count">{upVotesBy.length}</span>
        </button>
        <button
          type="button"
          className={`vote-button ${isThreadDownVoted ? 'voted' : ''}`}
          onClick={() => onThreadVote('down')}
        >
          👎 <span className="vote-count">{downVotesBy.length}</span>
        </button>
      </div>
      {/* ----------------------------- */}

      {/* Tampilkan form komentar HANYA jika login */}
      {authUser ? (
        <CommentForm threadId={threadId} />
      ) : (
        <p>
          Anda harus <a href="/login">login</a> untuk berkomentar.
        </p>
      )}

      {/* Tampilkan daftar komentar */}
      <div className="comments-list">
        <h3>Komentar ({comments.length})</h3>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            authUser={authUser}
          />
        ))}
      </div>
    </div>
  );
}

export default DetailPage;
