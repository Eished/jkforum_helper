import React, { useState } from 'react';
import { Home } from './components/Home';

const App = () => {
  console.log('Hello world!');
  const [showHome, setShowHome] = useState(false);

  return (
    <div className="fixed z-10">
      {showHome ? (
        ''
      ) : (
        <button
          className="h-10 w-10 fixed -left-5 top-1/2 block rounded-full shadow-md text-white vertical transition ease-in-out delay-150 bg-indigo-600 hover:translate-x-5 hover:scale-110 hover:bg-indigo-500 duration-300"
          onClick={() => {
            setShowHome(!showHome);
          }}>
          JKFH
        </button>
      )}
      {showHome && (
        <Home
          setShowHome={() => {
            setShowHome(!showHome);
          }}
        />
      )}
      ;
    </div>
  );
};

export default App;
