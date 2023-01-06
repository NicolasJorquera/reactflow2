import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Row from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function getLastDigits(string) {
    // Find the last group of consecutive digits in the string using a regular expression
    const match = string.match(/\d+/g);
    return match ? match[match.length - 1] : null;
  }


export default function SimConfig(props) {
    let nodeConfig = props.nodes[0].data.fields;

    return (
        <Card sx={{ height: '100%-20px', width: '100%', margin: '10px', padding: '5px' ,borderRadius: '30px',border: 'solid',boxShadow: 'none', borderColor: 'white', backgroundColor: 'transparent' }}>
            <div style={{width: '100%', display: 'flex', flexDirection:'column'}}>
                <div id='other1' style={{width:'100%', marginBottom: '10px', marginTop: '10px'}}>
                    <h2 style={{margin: '3px', textAlign: 'center', color: '#D9D9D9', fontSize: '18px'}}>Configuracion de Simulación</h2>
                </div>
                <div id='other2' style={{width:'100%', display: 'flex'}}>
                    <h3 style={{width: '50%',marginLeft: '10px', color: '#D9D9D9', fontSize: '13px'}}>Duracion (seg) </h3>
                    <h3 style={{width: '50%',marginRight: '10px', textAlign: 'right', color: '#D9D9D9', fontSize: '13px'}}>{nodeConfig.duracionPrueba} </h3>
                </div>
                <div id='other3' style={{width:'100%', display: 'flex'}}>
                    <h8 style={{width: '100%',marginLeft: '10px', color: '#D9D9D9', fontSize: '13px'}}>Steps (llegadas por segundo)</h8>
                </div>
                
                <div style={{width:'100%',display: 'flex', flex:'1'}}>
                    
                    <TableContainer>
                        <Table >
                            <TableBody >
                                {
                                
                                nodeConfig.arrivals.map(step => (
                                    
                                    <TableRow
                                    hover 
                                    key={getLastDigits(step.label)}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    style={{border:'0', padding: '0'}}
                                  >
                                    <TableCell  style={{color:'#D9D9D9', border:'0'}}>
                                      {step.label}
                                    </TableCell>
                                    <TableCell align="right" style={{color:'#D9D9D9', border:'0'}}>
                                      {step.Value}
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            
        </Card>
    );
}