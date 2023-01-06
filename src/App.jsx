import { useCallback, useLayoutEffect, useState } from 'react';
import './App.css';
import Flow from './frontend/reactflow/Flow';
import Simulate from './backend/Simulate';
import Results from './frontend/results/Results';
import DownloadImage from './backend/DownloadImage';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';




function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

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

function App() {
  const [width, height] = useWindowSize();
  const [ nodes, setNodes ] = useState('');
  const [ edges, setEdges ] = useState('');
  const [readyToSimulate, setReadyToSimulate] = useState(false);
  const [isSimulationDone, setIsSimulationDone] = useState(false);
  const [menu, setMenu] = useState('Flow');
  const [simulateResults, setSimulateResults] = useState([]);
  const [counter, setCounter] = useState(0);


  const handleSimulateButton = (nodes, edges) => {
    nodes = JSON.parse(nodes);
    edges = JSON.parse(edges);
    setNodes(nodes);
    setEdges(edges);
    if (nodes.length > 1 && edges.length > 0) {
      setReadyToSimulate(true);
      setMenu('Simulate');
    }
    
  }

  const handleSimulate = (simulateResults) => {
    setSimulateResults(simulateResults);
    setIsSimulationDone(true);
    setReadyToSimulate(false);
    setMenu('Results');

  }

  return (
    <div style={{height: height}}>
      {(menu == 'Flow') &&
        <Flow handleSimulateButton={handleSimulateButton}  />
      }
      {(menu == 'Simulate') &&
        <Simulate nodes={nodes} edges={edges} handleSimulate={handleSimulate} />
      }
      {(menu == 'Results') &&
        <Results simulateResults={simulateResults} nodes={nodes} edges={edges}/>
      }
    </div>
  );
}

export default App;
