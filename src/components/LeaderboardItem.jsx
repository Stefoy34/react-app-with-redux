import React from 'react';

function LeaderboardItem({ entry }) {
  const { user, score } = entry;

  return (
    <div className="leaderboard-item">
      <div className="leaderboard-item__user-info">
        <img src={user.avatar} alt={user.name} />
        <span>{user.name}</span>
      </div>
      <div className="leaderboard-item__score">
        <strong>{score}</strong>
      </div>
    </div>
  );
}

export default LeaderboardItem;
