import React, { useCallback, useRef, useEffect, useState } from 'react';
import './Results.css';
import Chart from './Chart';
import NodesList from './NodesList';
import SimConfig from './SimConfig';
import MiniMap from './MiniMap';
import NodeCharts from './NodeCharts';


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

const Results = (props) => {
    const [nodeID, setNodeID] = useState('');
    const [showCharts, setShowCharts] = useState(false);

    const changeNode = (nodeID) => {
        setNodeID(nodeID);  
        setShowCharts(true);
    }

    const handleClose = () => {
        setNodeID('0')
        setShowCharts(false);
      };

    return(
        <div className='background'>
            <div style={{width: '50%', height: '100%', display: 'block'}}>
                <div style={{width: '100%', height: '50%',maxHeight:'50%', display: 'flex'}}>
                    <div style={{width: '30%', height: '100%', display: 'flex'}}>
                        <SimConfig nodes={props.nodes} />
                    </div>
                    <div style={{width: '70%', height: '100%', display: 'flex'}}>
                        <MiniMap nodes={props.nodes} edges={props.edges} />
                    </div>
                </div>
                <div style={{width: '100%', height: '50%', display: 'flex'}}>
                    <Chart simulateResults={props.simulateResults} />
                </div>  
            </div>
            <div style={{width: '50%', height: '100%', display: 'flex'}}>
                <NodesList simulateResults={props.simulateResults} nodes={props.nodes} changeNode={changeNode} />
            </div>

            <Modal
                open={showCharts}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{height: '94%', width: '70%', top: '3%', left: '15%'}}
            >
                <NodeCharts simulateResults = {props.simulateResults} nodeID = {nodeID} />
            </Modal>
            
        </div>
    );
}

export default Results;