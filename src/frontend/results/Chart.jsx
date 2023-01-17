import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Bar } from 'react-chartjs-2';

function Histograma2(props) {

  let tiempoTotal = props.tiempoTotal;
  let llegadas = props.llegadas;
  let finalizadas = props.finalizadas;
  const labels = []; // etiquetas para cada barra del histograma
  const frequencies1 = []; // frecuencias para cada barra del histograma
  const frequencies2 = []; // frecuencias para cada barra del histograma

  

  // recorremos el arreglo de datos y contamos la frecuencia de cada valor
  let max = Math.max(...tiempoTotal);
  let min = Math.min(...tiempoTotal);
  let range = 300;
  let c = min;
  while (c < max) {
    labels.push(c);
    c = c + range;
  }
  llegadas.forEach((value, j) => {
    labels.forEach((label, i) => {
      if (labels[i+1]) {
        if (labels[i]< j && j < labels[i+1]) {
          if (!frequencies1[i]) {
            frequencies1[i] = 0;
          }
          frequencies1[i] = frequencies1[i] + + value/range;
        }
      }
      
    });
    
  });
  frequencies1.forEach((frequencie, i) => {
    frequencies1[i] = Math.round(frequencie);
  });

  finalizadas.forEach((value, j) => {
    labels.forEach((label, i) => {
      if (labels[i+1]) {
        if (labels[i]< j && j < labels[i+1]) {
          if (!frequencies2[i]) {
            frequencies2[i] = 0;
          }
          frequencies2[i] = frequencies2[i] + + value/range;
        }
      }
      
    });
    
  });
  frequencies2.forEach((frequencie, i) => {
    frequencies2[i] = Math.round(frequencie);
  });

  // definimos los datos y opciones del gráfico
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Llegadas',
        data: frequencies1,
        fontColor: '#D9D9D9',
        backgroundColor: '#0e70c1',
        borderColor: '#0e70c1',
        borderWidth: 1,
        fill: true,
        tension: 0.4,
        pointHitRadius: 25,
      },
      {
        label: 'Finalizadas',
        data: frequencies2,
        fontColor: '#D9D9D9',
        backgroundColor: '#ec9511',
        borderColor: '#ec9511',
        borderWidth: 1,
        fill: true,
        tension: 0.4,
        pointHitRadius: 25,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        color: '#D9D9D9',
        labels: {
          color: '#D9D9D9'
        },
      },
    },
    
    scales: {
      yAxis: {
        title: {
          display: false,
          text: 'Frecuencia',
          color: '#D9D9D9', 
        },
        ticks: { 
          color: '#D9D9D9', 
          beginAtZero: true ,
          
        },
        grid: {
          drawBorder: true,
          color: '#D9D9D9',
        },
      },
      xAxis: {
        title: {
          display: true,
          text: 'Tiempo',
          color: '#D9D9D9', 
        },
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
  };

  return (
    <Bar data={chartData} options={options} />
  );
}

function range(start, end) {
  return Array.from({length: end - start + 1}, (v, k) => k + start);
}

export default function Chart(props) {


  let firstNode = props.root.children[0].value;
  let lastNodes = props.lastNodes;
  let tiempoTotal = range(1, props.simulateResults.tiempoTotal-1);

  let llegadas = props.simulateResults.llegadas[firstNode];
  let finalizadas = [];
  lastNodes.forEach((nodeID, i) => { // para obtener todas las visitas finalizadas en cada una de los ultimos nodos
    props.simulateResults.finalizadas[nodeID].forEach((finalizada, j) => {
      if (i == 0) {
        finalizadas.push(finalizada)
      }else{
        finalizadas[j] = finalizada;
      }
    });
    
  });

  return (
    <Card sx={{ height: '100%-20px', width: '100%', margin: '10px', padding: '20px',borderRadius: '30px',border: 'solid',boxShadow: 'none', borderColor: 'white', backgroundColor: 'transparent' }}>
        <Histograma2  tiempoTotal={tiempoTotal} llegadas={llegadas} finalizadas={finalizadas}/>
    
    </Card>
  );
}