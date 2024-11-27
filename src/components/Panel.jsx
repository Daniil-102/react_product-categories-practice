import React from 'react';
import { UserFiltr } from './Panel/UserFiltr';

export const Panel = ({ users, user, functions, input }) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <UserFiltr
        users={users}
        acitveUser={user}
        onUserClick={functions.onUserClick}
      />

      <div className="panel-block">
        <p className="control has-icons-left has-icons-right">
          <input
            value={input}
            onChange={e => functions.onInputChange(e.target.value)}
            data-cy="SearchField"
            type="text"
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>

          {input.length > 0 && (
            <span className="icon is-right">
              <button
                data-cy="ClearButton"
                type="button"
                className="delete"
                onClick={() => functions.onInputChange('')}
              />
            </span>
          )}
        </p>
      </div>

      <div className="panel-block is-flex-wrap-wrap">
        <a
          href="#/"
          data-cy="AllCategories"
          className="button is-success mr-6 is-outlined"
        >
          All
        </a>

        <a data-cy="Category" className="button mr-2 my-1 is-info" href="#/">
          Category 1
        </a>

        <a data-cy="Category" className="button mr-2 my-1" href="#/">
          Category 2
        </a>

        <a data-cy="Category" className="button mr-2 my-1 is-info" href="#/">
          Category 3
        </a>
        <a data-cy="Category" className="button mr-2 my-1" href="#/">
          Category 4
        </a>
      </div>

      <div className="panel-block">
        <a
          data-cy="ResetAllButton"
          onClick={functions.reset}
          href="#/"
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
