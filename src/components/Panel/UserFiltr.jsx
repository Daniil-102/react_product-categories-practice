import React from 'react';

export const UserFiltr = ({ users, acitveUser, onUserClick }) => {
  return (
    <p className="panel-tabs has-text-weight-bold">
      <a
        data-cy="FilterAllUsers"
        onClick={() => onUserClick(0)}
        href="#/"
        className={acitveUser === 0 ? 'is-active' : ''}
      >
        All
      </a>

      {users.map(user => (
        <a
          key={user.id}
          onClick={() => onUserClick(user.id)}
          data-cy="FilterUser"
          href="#/"
          className={acitveUser === user.id ? 'is-active' : ''}
        >
          {user.name}
        </a>
      ))}
    </p>
  );
};
