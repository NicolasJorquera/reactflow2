import React, { memo } from 'react';
import { Handle, useStore } from 'reactflow';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const zoomSelector = (s) => s.transform[2];

const Placeholder = (data) => (
  <div style={{fontSize: '20px'}}>
    Nodo {data.id}
  </div>
);

const Data = (data) => {
  const [nodeMode, setNodeMode] = React.useState('');

  const handleChange = (event) => {
    setNodeMode(event.target.value);
  };

  return(
    <div>
      <div style={{ marginBottom: '15px' , marginTop: '7px'}}>
        ID Nodo {data.id}
      </div>
      <div className='fields'>
        {/* <div className='field'>
          <Box >
            <FormControl size="small">
              <InputLabel id="demo-select-small">Modo</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={nodeMode}
                label="Modo"
                onChange={handleChange}
                autoWidth
              >
                <MenuItem value={1}>Sincrono</MenuItem>
                <MenuItem value={2}>Asincrono</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div> */}
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
)};

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
      <Data changeNode= {data.changeNode} id={data.id} fields={data.fields}/>
      <Handle
        type="source"
        position="right"
        id="b"
        isConnectable={isConnectable}
      />
    </>
  );
});
