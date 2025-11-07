import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useInput from '../hooks/useInput';
import { asyncAddThread } from '../states/threads/action';

function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  const onCreateThread = async (event) => {
    event.preventDefault();

    try {
      const thread = await dispatch(asyncAddThread({ title, body, category }));

      if (thread) {
        navigate(`/threads/${thread.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-thread-page">
      <h2>Buat Diskusi Baru</h2>
      <form onSubmit={onCreateThread} className="create-thread-form">
        <label htmlFor="title">Judul</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={onTitleChange}
          placeholder="Judul diskusi..."
          required
        />

        <label htmlFor="category">Kategori (Opsional)</label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={onCategoryChange}
          placeholder="Kategori diskusi..."
        />

        <label htmlFor="body">Isi Diskusi</label>
        <textarea
          id="body"
          value={body}
          onChange={onBodyChange}
          placeholder="Tuliskan isi diskusimu..."
          rows="10"
          required
        />

        <button type="submit">Buat Thread</button>
      </form>
    </div>
  );
}

export default CreateThreadPage;
