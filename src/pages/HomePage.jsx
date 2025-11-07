import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { asyncReceiveThreads } from '../states/threads/action';
import { asyncReceiveUsers } from '../states/users/action';

import ThreadItem from '../components/ThreadItem';

function HomePage() {
  const dispatch = useDispatch();

  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncReceiveThreads());
    dispatch(asyncReceiveUsers());
  }, [dispatch]);

  if (users.length === 0) {
    return <p>Memuat data diskusi...</p>;
  }

  const threadsList = threads.map((thread) => {
    const user = users.find((user) => user.id === thread.ownerId);
    return { ...thread, user };
  });

  return (
    <div className="home-page">
      <h2>Daftar Diskusi</h2>
      <div className="threads-list">
        {threadsList.map((item) => (
          <ThreadItem
            key={item.id}
            thread={item}
            user={item.user}
            authUser={authUser}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
