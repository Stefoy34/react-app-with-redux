import React from 'react';
import { useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { asyncAddComment } from '../states/threadDetail/action';

function CommentForm({ threadId }) {
  const dispatch = useDispatch();

  const [content, onContentChange] = useInput('');

  const onAddComment = (event) => {
    event.preventDefault();
    dispatch(asyncAddComment({ threadId, content }));
    onContentChange({ target: { value: '' } });
  };

  return (
    <div className="comment-form-container">
      <h3>Beri Komentar</h3>
      <form onSubmit={onAddComment} className="comment-form">
        <textarea
          value={content}
          onChange={onContentChange}
          placeholder="Tulis komentarmu..."
          rows="5"
          required
        />
        <button type="submit">Kirim Komentar</button>
      </form>
    </div>
  );
}

export default CommentForm;
