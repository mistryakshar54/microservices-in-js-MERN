import React from 'react';
import {Provider, defaultTheme} from '@adobe/react-spectrum';
import Layout from './components/layout';
import './App.css';

function App() {
  return (
      <Provider UNSAFE_className="App" theme={defaultTheme} colorScheme="light">
        <Layout/>
      </Provider>
  );
}

export default App;
