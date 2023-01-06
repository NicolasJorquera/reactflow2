import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import './Results.css';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';
import GroupIcon from '@mui/icons-material/Group';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { borderRadius } from '@mui/system';

export default function NodesList(props) {
    const nodes = props.nodes.filter(node => (node.id != '0'));
    return (
        <Card sx={{ height: '100%-20px', width: '100%', margin: '10px', borderRadius: '30px',border: 'solid',boxShadow: 'none', borderColor: 'white', backgroundColor: 'transparent' }}>
            <div className='table' style={{color:'#D9D9D9', fontSize:' 30px', marginBottom: '20px', paddingLeft: '20px', paddingTop: '20px'}}>
                Nodos
            </div>
            
            <TableContainer>
                <Table >
                    <TableBody>
                        {
                        nodes.map(node => (
                            
                                <TableRow
                                key={node.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className='nodeRow'
                                >
                                    <TableCell align='right'  className='nodeCell'>
                                        {'Nodo ' + node.id}
                                    </TableCell>
                                    <TableCell align="right" className='nodeCell'>
                                        <div style={{display:'block', alignContent: 'center'}}>
                                            <GroupIcon style={{marginRight:'10px'}}/>
                                            { node.data.fields.limiteConcurrencia}
                                        </div>
                                        
                                        
                                    </TableCell>
                                    <TableCell align="left" className='nodeCell' >

                                        <div style={{display:'block', alignContent: 'center'}}>
                                            <ContentPasteIcon style={{marginRight:'10px'}}/>
                                            { node.data.fields.limiteCola}
                                        </div>
                                    </TableCell>
                                    <TableCell align='left' className='nodeCell'>
                                        <button className='buttonB' onClick={() => props.changeNode(node.id)}> View Data</button>
                                    </TableCell>
                                </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
}