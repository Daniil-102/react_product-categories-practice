import React from 'react';
import { UserFiltr } from './Panel/UserFiltr';

export const Panel = ({
  user,
  input,
  users,
  categories,
  selectedCategories,
  onInputChange,
  onUserClick,
  reset,
  toggleCategory,
  clearCategories,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <UserFiltr users={users} acitveUser={user} onUserClick={onUserClick} />

      <div className="panel-block">
        <p className="control has-icons-left has-icons-right">
          <input
            value={input}
            onChange={e => onInputChange(e.target.value)}
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
                onClick={() => onInputChange('')}
              />
            </span>
          )}
        </p>
      </div>

      <div className="panel-block is-flex-wrap-wrap">
        <a
          href="#/"
          data-cy="AllCategories"
          className={`button mr-6 ${selectedCategories.length === 0 ? 'is-info' : 'is-outlined'}`}
          onClick={e => {
            e.preventDefault();
            clearCategories();
          }}
        >
          All
        </a>

        {categories.map(category => (
          <a
            key={category.id}
            data-cy="Category"
            className={`button mr-2 my-1 ${
              selectedCategories.includes(category.id) ? 'is-info' : ''
            }`}
            href="#/"
            onClick={e => {
              e.preventDefault();
              toggleCategory(category.id);
            }}
          >
            {category.title}
          </a>
        ))}
      </div>

      <div className="panel-block">
        <a
          data-cy="ResetAllButton"
          onClick={reset}
          href="#/"
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
