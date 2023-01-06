import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReactFlow, { useNodesState, 
    useEdgesState,
    Background,
    BackgroundVariant} from 'reactflow';

import { Bar } from 'react-chartjs-2';
import SimulatorNode from '../reactflow/SimulatorNode';
import FirstSimulatorNode from '../reactflow/FirstSimulatorNode';
import SimulatorEdge from '../reactflow/SimulatorEdge';



export default function MiniMap(props) {
    const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges);

    const nodeTypes = { simulatorN: SimulatorNode, firstSimulatorN: FirstSimulatorNode };
    const edgeTypes = { simulatorE: SimulatorEdge };
    return (
        <Card sx={{ height: '100%-20px', width: '100%', margin: '10px',borderRadius: '30px',border: 'solid',boxShadow: 'none', borderColor: 'white', backgroundColor: 'transparent' }}>
            <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
        >
            <Background variant={BackgroundVariant.Cross} gap={50} />
        </ReactFlow>
        </Card>
    );
}