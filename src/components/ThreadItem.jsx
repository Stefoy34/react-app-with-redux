import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncToggleUpVoteThread, asyncToggleDownVoteThread } from '../states/threads/action';
import PropTypes from 'prop-types';

function ThreadItem({ thread, user, authUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const isUpVoted = authUser ? thread.upVotesBy.includes(authUser.id) : false;
  const isDownVoted = authUser ? thread.downVotesBy.includes(authUser.id) : false;

  const onVote = (e, type) => {
    e.stopPropagation();
    if (!authUser) {
      alert('Anda harus login untuk memberi vote!');
      navigate('/login');
      return;
    }

    if (type === 'up') {
      dispatch(asyncToggleUpVoteThread(thread.id));
    } else if (type === 'down') {
      dispatch(asyncToggleDownVoteThread(thread.id));
    }
  };

  const cleanBody = thread.body.replace(/<[^>]+>/g, '');

  return (
    <div className="thread-item">
      <header className="thread-item__header">
        <img src={user.avatar} alt={user.name} />
        <span>{user.name}</span>
      </header>
      <div className="thread-item__body">
        <h3>
          <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
        </h3>
        {/* Menampilkan 150 karakter pertama dari body */}
        <p>{cleanBody.substring(0, 150)}...</p>
      </div>
      <footer className="thread-item__footer">
        {/* --- Tombol Voting Baru --- */}
        {/* Tambahkan class 'voted' jika isUpVoted true (Kriteria 2) */}
        <button
          type="button"
          className={`vote-button ${isUpVoted ? 'voted' : ''}`}
          onClick={(e) => onVote(e, 'up')}
        >
          👍 <span className="vote-count">{thread.upVotesBy.length}</span>
        </button>
        <button
          type="button"
          className={`vote-button ${isDownVoted ? 'voted' : ''}`}
          onClick={(e) => onVote(e, 'down')}
        >
          👎 <span className="vote-count">{thread.downVotesBy.length}</span>
        </button>
        {/* --- Akhir Tombol Voting --- */}
        {/* TODO: Format tanggal ini dengan lebih baik nanti */}
        <span className="thread-item__time">{thread.createdAt}</span>
        <span className="thread-item__comments">{thread.totalComments} Komentar</span>
      </footer>
    </div>
  );
}

const userShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
});

const threadShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
});

ThreadItem.propTypes = {
  authUser: userShape, 
  user: userShape.isRequired,
  thread: threadShape.isRequired,
};

export default ThreadItem;
