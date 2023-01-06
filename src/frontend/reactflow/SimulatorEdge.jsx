import React from "react";

import {
  getBezierPath,
} from "reactflow";

import "./Flow.css";

const foreignObjectSizeHeight = 35;
const foreignObjectSizeWidth = 45;
export default function SimulatorEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  arrowHeadType
}) {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });
  let edgeCenterX = sourceX + (targetX-sourceX)/2;
  let edgeCenterY = sourceY + (targetY-sourceY)/2;

  
  // const [edgeCenterX, edgeCenterY] = getEdgeCenter({
  //   sourceX,
  //   sourceY,
  //   targetX,
  //   targetY
  // });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path-selector"
        d={edgePath}
      />
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
      />
      <foreignObject
        width={foreignObjectSizeWidth}
        height={foreignObjectSizeHeight}
        x={edgeCenterX - foreignObjectSizeWidth / 2 }
        y={edgeCenterY - foreignObjectSizeHeight / 2  }
        style={{display:'block', textAlign: 'center'}}
      >
          <input
          className="edgeWeight"
          value={data.label}
          onChange={( e)=>{data.changeEdge(id, e.target.value)}}
          />
      </foreignObject>
    </>
  );
}
