import React from 'react';
import { Product } from './Product';

export const Products = ({
  products,
  handleSort,
  sortColumn,
  sortDirection,
}) => {
  const getSortIconClass = column => {
    if (sortColumn !== column) return 'fas fa-sort';
    if (sortDirection === 'asc') return 'fas fa-sort-up';
    if (sortDirection === 'desc') return 'fas fa-sort-down';

    return 'fas fa-sort';
  };

  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              ID
              <a href="#/" onClick={() => handleSort('id')}>
                <span className="icon">
                  <i data-cy="SortIcon" className={getSortIconClass('id')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Product
              <a href="#/" onClick={() => handleSort('name')}>
                <span className="icon">
                  <i data-cy="SortIcon" className={getSortIconClass('name')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Category
              <a href="#/" onClick={() => handleSort('category')}>
                <span className="icon">
                  <i
                    data-cy="SortIcon"
                    className={getSortIconClass('category')}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              User
              <a href="#/" onClick={() => handleSort('user')}>
                <span className="icon">
                  <i data-cy="SortIcon" className={getSortIconClass('user')} />
                </span>
              </a>
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        {products.map(product => (
          <Product product={product} key={product.id} />
        ))}
      </tbody>
    </table>
  );
};
