import React from 'react';
    import { Routes, Route } from 'react-router-dom';
    import Home from './pages/Home';
    import BookDetails from './pages/BookDetails';
    import Cart from './pages/Cart';
    import Admin from './pages/Admin';

    const App = () => {
      return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      );
    };

    export default App;
