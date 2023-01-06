import React, { useState, useEffect, useRef } from 'react'
import { Bar, getElementsAtEvent } from "react-chartjs-2";
import 'chartjs-plugin-dragdata'
import { element } from 'prop-types';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

let maxY=  25;
  

export default function ArrivalModal(props) {
  const [ isLoaded, setIsLoaded ] =  useState(false);
  
  
  //  Build Data Set for the Bar Chart
  const buildDataSet = (data) => {
        
    let labels = data.map(c => c.label);
    let datas = data.map(c => c.Value);

    let config = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Steps',
            data: datas,
            datasetIndex: data.map(c => c.Id),
            fontColor: '#D9D9D9',
            fill: true,
            tension: 0.4,
            backgroundColor: '#0e70c1',
            pointHitRadius: 25,
          }
        ]
      },
      options: {
        scales: {
          yAxis: {
            title: {
              display: true,
              text: 'Llegadas por segundo',
              color: '#D9D9D9', 
            },
            max: maxY,
            ticks: { 
              color: '#D9D9D9', 
              beginAtZero: true ,
              callback: function(value) {if (value % 1 === 0) {return value;}}
              
            },
            grid: {
              drawBorder: true,
              color: '#D9D9D9',
            },
          },
          xAxis: {
            ticks: { 
              color: '#D9D9D9', 
              beginAtZero: true 
            },
            grid: {
              drawBorder: true,
              color: '#D9D9D9',
            },
          }
        },
        onHover: function(e) {
          const point = e.chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false)
          if (point.length) e.native.target.style.cursor = 'grab'
          else e.native.target.style.cursor = 'default'
        },
        plugins: {
          legend: {
            display: false,
          },
          dragData: {
            round: 0,
            showTooltip: true,
            magnet: {
              to: (value) => Math.round(value)
            },
            onDragStart: function(e, element) {
              console.log('On Drag Start ', element)
            },
            // Change while dragging 
            onDrag: function(e, datasetIndex, index, value) {  
              value = Math.round(value);            
              e.target.style.cursor = 'grabbing' 
              console.log('On Dragging ', datasetIndex, index, value)

              // let per = value % 1;
              // if (per == 0) {
              //   datas = data.map(c => c.Value);
              //   let max = Math.max(...datas);
              //   maxY = max*1.2;

              //   if (value == 0) {
              //     value = 1;
              //   }

              
              //   data[index].Value = value;

              //   props.onHandleChange(data);
              // }
              
              
              

            },
            // Only change when finished dragging 
            onDragEnd: function(e, datasetIndex, index, value) {  
              console.log('On Drag End ', datasetIndex, index, value)
              e.target.style.cursor = 'default' 

              if (value == 0) {
                value = 1;
              }

              data[index].Value = Math.round(value);
              
              
              datas = data.map(c => c.Value);
              let max = Math.max(...datas);

              maxY = max*1.2;
              if(maxY < 10){
                maxY = max*2;
              }
              
              

              props.onHandleChange(data);
            },
          }
        }
      }
    }
    
    return config;
  }


  let localOption = buildDataSet(props.data);

  const addStep = (data) => {
    data.push({label: 'Step ' + String(Number(data.length) + 1), Value: maxY/2});
    props.onHandleChange(data);

  }

  const deleteStep = (data) => {
    data.pop();
    props.onHandleChange(data);

  }


  useEffect(() => {        
    setTimeout(() => {
      setIsLoaded(true)
    }, 200);
  }, [])

  return (
        <div style={{textAlign: 'center'}}>
          <Bar
              redraw={false}
              data={localOption.data}
              options={localOption.options}
                      
          />
          {/* onClick={() => handleClick(props.data)} */}
          <button onClick={() => addStep(props.data)} className='button' style={{marginTop: '30px', marginRight: '30px', width: '100px', height: '30px'}} > Add Step</button>
          <button onClick={() => deleteStep(props.data)} className='button' style={{marginTop: '30px', width: '100px', height: '30px'}} > Delete Step</button>
        </div>
  );
}
