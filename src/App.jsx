/* eslint-disable function-paren-newline */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { Panel } from './components/Panel';
import { Products } from './components/Products';

const fullProductInfo = productsFromServer.map(product => {
  const category = categoriesFromServer.find(
    categor => product.categoryId === categor.id,
  );
  const user = usersFromServer.find(u => u.id === category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [products, setProducts] = useState(fullProductInfo);
  const [user, setUser] = useState(0);
  const [input, setInput] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const filterProducts = (userId, searchText, categories) => {
    let filteredProducts = fullProductInfo;

    if (userId !== 0) {
      filteredProducts = filteredProducts.filter(
        curProduct => curProduct.user.id === userId,
      );
    }

    if (categories.length > 0) {
      filteredProducts = filteredProducts.filter(curProduct =>
        categories.includes(curProduct.category.id),
      );
    }

    if (searchText) {
      filteredProducts = filteredProducts.filter(curProduct =>
        curProduct.name.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    setProducts(filteredProducts);
  };

  const onInputChange = str => {
    setInput(str.toLowerCase());
    filterProducts(user, str.toLowerCase(), selectedCategories);
  };

  const onUserClick = ids => {
    setUser(ids);
    filterProducts(ids, input, selectedCategories);
  };

  const reset = () => {
    setInput('');
    setUser(0);
    setSelectedCategories([]);
    setProducts(fullProductInfo);
  };

  const toggleCategory = categoryId => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(updatedCategories);
    filterProducts(user, input, updatedCategories);
  };

  const clearCategories = () => {
    setSelectedCategories([]);
    filterProducts(user, input, []);
  };

  const handleSort = column => {
    if (sortColumn === column) {
      if (sortDirection === '') {
        setSortDirection('asc');
      } else if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortDirection('');
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedProducts = React.useMemo(() => {
    const sorted = [...products];

    if (sortColumn) {
      sorted.sort((a, b) => {
        let valueA = a;
        let valueB = b;

        if (sortColumn === 'category') {
          valueA = a.category.title;
          valueB = b.category.title;
        } else if (sortColumn === 'user') {
          valueA = a.user.name;
          valueB = b.user.name;
        } else {
          valueA = a[sortColumn];
          valueB = b[sortColumn];
        }

        if (sortDirection === 'asc') {
          return valueA > valueB ? 1 : -1;
        }

        if (sortDirection === 'desc') {
          return valueA < valueB ? 1 : -1;
        }

        return 0;
      });
    }

    return sorted;
  }, [products, sortColumn, sortDirection]);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <Panel
            user={user}
            input={input}
            users={usersFromServer}
            categories={categoriesFromServer}
            selectedCategories={selectedCategories}
            onInputChange={onInputChange}
            onUserClick={onUserClick}
            reset={reset}
            toggleCategory={toggleCategory}
            clearCategories={clearCategories}
          />
        </div>

        <div className="box table-container">
          {!products.length ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          ) : (
            <Products
              products={sortedProducts}
              handleSort={handleSort}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
            />
          )}
        </div>
      </div>
    </div>
  );
};
