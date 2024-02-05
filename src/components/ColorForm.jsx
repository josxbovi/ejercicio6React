import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ColorForm = () => {
  const [color, setColor] = useState('');
  const [savedColors, setSavedColors] = useState(JSON.parse(localStorage.getItem('colors')) || []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newColors = [...savedColors, color];
    localStorage.setItem('colors', JSON.stringify(newColors));
    setSavedColors(newColors);
  };

  const handleDelete = (indexToDelete) => {
    const newColors = savedColors.filter((_, index) => index !== indexToDelete);
    localStorage.setItem('colors', JSON.stringify(newColors));
    setSavedColors(newColors);
  };

  useEffect(() => {
    setSavedColors(JSON.parse(localStorage.getItem('colors')) || []);
  }, []);

  return (
    <div className='d-flex flex-row flex-wrap p-5 '>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Introduce un color en inglés"
          className='me-2'
        />
        <button type="submit">Guardar Color</button>
      </form>
      {savedColors.map((savedColor, index) => (
        <div className='m-5' key={index} style={{backgroundColor: savedColor, width: '150px', height: '150px'}}>
          <button className="" onClick={() => handleDelete(index)}>Borrar Color</button>
        </div>
      ))}
    </div>
  );
};

export default ColorForm;