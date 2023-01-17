import React, { memo } from 'react';
import { Handle, useStore } from 'reactflow';


const zoomSelector = (s) => s.transform[2];

const Placeholder = (data) => (
  <div >
    Nodo {data.id}
  </div>
);

const Data = (data) => (
  <div>
    <div style={{ marginBottom: '15px' , marginTop: '7px'}}>
      ID Nodo {data.id}
    </div>
    <div className='fields'>
      <h8 className='titleField'>General</h8>
      <div className='field'>
        <h8 style={{marginRight: '20px'}}>Limite Concurrencia</h8>
        <input className='inputFields' value={data.fields.limiteConcurrencia} onChange={( e)=>{data.changeNode(data.id, 'limiteConcurrencia', e.target.value)}}/>
      </div>
      <div className='field'>
        <h8 style={{marginRight: '20px'}}>Limite Cola</h8>
        <input className='inputFields' value={data.fields.limiteCola} onChange={( e)=>{data.changeNode(data.id, 'limiteCola', e.target.value)}}/>
      </div>
    </div>
    <div className='fields'>
      <h8 className='titleField'>Duracion Visitas (Normal)</h8>
      <div className='field'>
        <h8 style={{marginRight: '20px'}}>Promedio (ms)</h8>
        <input className='inputFields' value={data.fields.promedio} onChange={( e)=>{data.changeNode(data.id, 'promedio', e.target.value)}}/>
      </div>
      <div className='field'>
        <h8 style={{marginRight: '20px'}}>Desviacion estandar (ms)</h8>
        <input className='inputFields' value={data.fields.desviacionEstandar} onChange={( e)=>{data.changeNode(data.id, 'desviacionEstandar', e.target.value)}}/>
      </div>
    </div>
  </div>
);

export default memo(({ data, isConnectable }) => {

  
  const zoom = useStore(zoomSelector);
  const showContent = zoom >= 1.5;
  return (
    <>
      <Handle
        type="target"
        position="left"
        onConnect={(params) => console.log('handle onConnect', params)}
      />
      <Placeholder  id={data.id}/>
      <Handle
        type="source"
        position="right"
        id="b"
        isConnectable={isConnectable}
      />
    </>
  );
});
