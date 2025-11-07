import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

import LeaderboardItem from '../components/LeaderboardItem';

function LeaderboardPage() {
  const dispatch = useDispatch();

  const leaderboards = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  if (leaderboards.length === 0) {
    return <p>Memuat papan peringkat...</p>;
  }

  return (
    <div className="leaderboard-page">
      <h2>Papan Peringkat Pengguna Aktif</h2>
      <div className="leaderboard-list">
        {leaderboards.map((entry) => (
          <LeaderboardItem key={entry.user.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

export default LeaderboardPage;
