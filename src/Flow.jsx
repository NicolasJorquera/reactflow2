import React, { useCallback, useRef, useEffect, useState } from 'react';
import ReactFlow, { useNodesState, 
  useEdgesState, 
  MiniMap, 
  Background, 
  BackgroundVariant,
  useReactFlow, 
  ReactFlowProvider} from 'reactflow';
import 'reactflow/dist/style.css';
import './Flow.css';
import SimulatorNode from './SimulatorNode';
import FirstSimulatorNode from './FirstSimulatorNode';
import SimulatorEdge from './SimulatorEdge';
import ArrivalModal from './ArrivalModal';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';





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



const nodeTypes = { simulatorN: SimulatorNode, firstSimulatorN: FirstSimulatorNode };
const edgeTypes = { simulatorE: SimulatorEdge };


let id = 1;
const getId = () => `${id++}`;

const fitViewOptions = {
  padding: 1,
};

const rawData = [
  {label: 'Step 1', Value: 2},
  {label: 'Step 2', Value: 6},
  {label: 'Step 3', Value: 10},
  {label: 'Step 4', Value: 14},
  {label: 'Step 5', Value: 18},
];



const AddNodeOnEdgeDrop = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [ chartData, setChartData ] = useState([]);
  const [ isLoaded, setIsLoaded ] =  useState(false);
  const [ isDataChanged, setIsDataChanged ] =  useState(true); 
  const { project } = useReactFlow();




  const changeNode = (id, field, value) => {
    setNodes((nds) => 
      nds.map((node) => {
        if (node.id === id) {
          let fields = node.data.fields;
          fields[field] = value
          node.data = {
            ...node.data,
            fields: fields,
          }
          node.data.fields[field] = value;
        }
        return node;
      })
    );
  }

  useEffect(() => {
    setIsLoaded(false)
    setChartData(rawData)

    setTimeout(() => {
        setIsLoaded(true)    
    }, 100);
  
  }, []); 

  const initialNodes = [
    {
      id: '0',
      type: 'firstSimulatorN',
      data: { id: '0', fields:{duracionPrueba: '3600',arrivals: chartData, displayArrival: false}, changeNode:changeNode},
      position: { x: 0, y: 0 },
      deletable: false,
    },
  ];

  useEffect(()=>{
    setNodes(initialNodes);
  },[])

  

  const changeEdge = (id, value) => {
    setEdges((eds) => 
      eds.map((edge) => {
        if (edge.id === id) {
          let label = edge.data.label;
          label = value;
          edge.data = {
            ...edge.data,
            label: label,
          }
          edge.data.label = value;
        }
        return edge;
      })
    );
  }

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);


  const onConnectEnd =
    (event) => {
      const targetIsPane = event.target.classList.contains('react-flow__pane');
      const targetIsNode = event.target.classList.contains('react-flow__handle-valid');

      // let count = 0;

      // setEdges((edges) => {
      //   edges.map((edge)=> {
      //     if (edge.source == '0') {
      //       count = count + 1;
      //     }
      //   })
      // })

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getId();
        const newNode = {
          id,
          // we are removing the half of the node width (75) to center the new node
          type: 'simulatorN',
          position: project({ x: event.clientX  , y: event.clientY - 100}),
          data: { id: id, fields:{limiteConcurrencia: '200', limiteCola: '100', stepRendimiento: '5', promedio: '20', desviacionEstandar: '5'}, changeNode:changeNode},
          
        };
        const newEdge = {
          id, 
          source: connectingNodeId.current, 
          target: id, 
          type: 'simulatorE', 
          data:{label: '100', changeEdge: changeEdge}
        }

        setNodes((nodes) => nodes.concat(newNode));
        setEdges((edges) => edges.concat(newEdge));
        
        
      }

      if (targetIsNode) {
        let id = event.target.dataset.nodeid;
        const newEdge = {
          id, 
          source: connectingNodeId.current, 
          target: id, 
          type: 'simulatorE', 
          data:{label: '100', changeEdges: changeEdge}
        }
        setEdges((edges) => 
          edges.concat(newEdge)
        );
      }

      
    }


  const handleClick = (event, node) => {
    if (node.data.id === '0' && event.target.className == 'button') {
      setOpen(true);
    }
    
  };

  const handleClose = () => setOpen(false);
  const id = open ? "simple-popover" : undefined;

  

  const onHandleChange  = (data) => {
    setIsDataChanged(false)
    setChartData(data)
    nodes[0].data.fields.arrivals = chartData;

    setTimeout(() => {
      setIsDataChanged(true)    
    }, 100);

  }

  const simulate = () => {
    console.log(nodes);
    console.log(edges);
  }


  return (
    <div className="wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        fitViewOptions={fitViewOptions}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        onNodeClick={(event, node) => {
          handleClick(event, node);
        }}
      >
        <Background variant={BackgroundVariant.Cross} gap={50} />
        <MiniMap  nodeColor='#505050'/>
        <div className='simulateButton'>
          <button className='button' onClick={()=>simulate()}>Simular</button>
        </div>
      </ReactFlow>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="arrivalModalBox">
          {isLoaded && 
            <ArrivalModal data={chartData} onHandleChange={onHandleChange}/>
          }
        </Box>
      </Modal>
      
      
      
    </div>
  );
};


export default () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
);