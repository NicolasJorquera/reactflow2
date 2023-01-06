import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Bar } from 'react-chartjs-2';

function Histogram( data ) {
  const labels = []; // etiquetas para cada barra del histograma
  const frequencies = []; // frecuencias para cada barra del histograma

  

  // recorremos el arreglo de datos y contamos la frecuencia de cada valor
  let max = Math.max(...data.data['1']);
  let min = Math.min(...data.data['1']);
  let range = Math.round((max-min)/20);
  let c = min;
  while (c < max) {
    labels.push(c);
    c = c + range;
  }
  data.data['1'].forEach((value) => {
    labels.forEach((label, i) => {
      if (labels[i+1]) {
        if (labels[i]< value && value < labels[i+1]) {
          if (!frequencies[i]) {
            frequencies[i] = 0;
          }
          frequencies[i]++;
        }
      }
      
    });
    
  });

  // definimos los datos y opciones del gráfico
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Frequency',
        data: frequencies,
        fontColor: '#D9D9D9',
        backgroundColor: '#0e70c1',
        borderColor: '#0e70c1',
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
        display: false,
      },
    },
    scales: {
      yAxis: {
        title: {
          display: true,
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
          text: 'Tiempo de respuesta',
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


export default function Chart(props) {
  return (
    <Card sx={{ height: '100%-20px', width: '100%', margin: '10px', padding: '20px',borderRadius: '30px',border: 'solid',boxShadow: 'none', borderColor: 'white', backgroundColor: 'transparent' }}>
        <Histogram  data={props.simulateResults.tiempoRespuesta}/>
    
    </Card>
  );
}