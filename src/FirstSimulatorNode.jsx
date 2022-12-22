import React, { memo, useState } from 'react';
import { Handle } from 'reactflow';


import Button from 'react-bootstrap/Button';

export default memo(({ data, isConnectable }) => {
  const handleClick = (field, value) => {
    data.changeNode(data.id, field, value)
    
}

  return (
    <>
      <div style={{ marginBottom: '15px' , marginTop: '7px', fontSize: '15px'}}>
        Informacion de la prueba
      </div>
      <div className='fields'>
        <div className='field'>
          <h8 style={{marginRight: '20px'}}>Duracion de Prueba</h8>
          <input className='inputFields' value={data.fields.duracionPrueba} onChange={( e)=>{data.changeNode(data.id, 'duracionPrueba', e.target.value)}}/>
        </div>
      </div>
      <div style={{marginTop: '15px'}}>
        <button className='button' onClick={() => handleClick('displayArrival', true)}>Tasa de llegadas</button>
      </div>

      <Handle
        type="source"
        position="right"
        id="b"
        isConnectable={isConnectable}
      />
    </>
  );
});
