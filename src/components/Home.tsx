import React from 'react';
import { Button } from './Button/Button';
import { Input } from './Input/Input';
import { ToggleA, ToggleB } from './Toggle/Toggle';

export const Home = () => {
  return (
    <div className="h-96 w-60 p-2 m-2 fixed top-0 bg-gray-100 z-10 shadow-md rounded-md">
      <Button />
      <br />
      <Input />
      <br />
      <ToggleA />
      <br />
      <ToggleB />
    </div>
  );
};
