/* eslint-disable function-paren-newline */
/* eslint-disable jsx-a11y/accessible-emoji */
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

  const filterProducts = (userId, searchText) => {
    let filteredProducts = fullProductInfo;

    if (userId !== 0) {
      filteredProducts = filteredProducts.filter(
        product => product.user.id === userId,
      );
    }

    if (searchText) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchText),
      );
    }

    setProducts(filteredProducts);
  };

  const onInputChange = str => {
    setInput(str.toLowerCase());
    filterProducts(user, str.toLowerCase());
  };

  const onUserClick = id => {
    setUser(id);
    filterProducts(id, input);
  };

  const reset = () => {
    setInput('');
    setUser(0);
    setProducts(fullProductInfo);
  };

  const functions = {
    onUserClick,
    onInputChange,
    reset,
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <Panel
            products={products}
            user={user}
            users={usersFromServer}
            functions={functions}
            input={input}
          />
        </div>

        <div className="box table-container">
          {!products.length ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          ) : (
            <Products products={products} />
          )}
        </div>
      </div>
    </div>
  );
};
