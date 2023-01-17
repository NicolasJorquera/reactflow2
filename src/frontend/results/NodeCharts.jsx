import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import './Results.css';


import { Bar, Line } from 'react-chartjs-2';

function range(start, end) {
  return Array.from({length: end - start + 1}, (v, k) => k + start);
}

function Histograma( data ) {
  const labels = []; // etiquetas para cada barra del histograma
  const frequencies = []; // frecuencias para cada barra del histograma

  

  // recorremos el arreglo de datos y contamos la frecuencia de cada valor
  let max = Math.max(...data);
  let min = Math.min(...data);
  let range = Math.round((max-min)/20);
  if (range == 0) {
    range = 1;
  }
  let c = min;
  while (c < max) {
    labels.push(c);
    c = c + range;
  }
  data.forEach((value) => {
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

function Histograma1( data ) {
  const labels = []; // etiquetas para cada barra del histograma
  const frequencies = []; // frecuencias para cada barra del histograma

  

  // recorremos el arreglo de datos y contamos la frecuencia de cada valor
  let max = Math.max(...data);
  let min = Math.min(...data);
  let range = Math.round((max-min)/20);
  if (range == 0) {
    range = 1;
  }
  let c = min;
  while (c <= max) {
    labels.push(c);
    c = c + range;
  }
  data.forEach((value) => {
    labels.forEach((label, i) => {
      if (labels[i+1]) {
        if (labels[i]<= value && value <= labels[i+1]) {
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

function Histograma2(tiempoTotal, llegadas, finalizadas ) {
  const labels = []; // etiquetas para cada barra del histograma
  const frequencies1 = []; // frecuencias para cada barra del histograma
  const frequencies2 = []; // frecuencias para cada barra del histograma

  

  // recorremos el arreglo de datos y contamos la frecuencia de cada valor
  let max = Math.max(...tiempoTotal);
  let min = Math.min(...tiempoTotal);
  let range = 5*60;// 5 minutos
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
          frequencies1[i] = frequencies1[i] + value/range;
        }
      }
      
    });
    
  });
  frequencies1.forEach((frequencie, i) => {
    frequencies1[i] = frequencie;
  });

  finalizadas.forEach((value, j) => {
    labels.forEach((label, i) => {
      if (labels[i+1]) {
        if (labels[i]< j && j < labels[i+1]) {
          if (!frequencies2[i]) {
            frequencies2[i] = 0;
          }
          frequencies2[i] = frequencies2[i] + value/range;
        }
      }
      
    });
    
  });

  frequencies2.forEach((frequencie, i) => {
    frequencies2[i] = frequencie;
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



function Linea3( tiempoTotal, concurrencia, cola, errores, filtrados ) {

  

  

  // definimos los datos y opciones del gráfico
  const chartData = {
    labels: tiempoTotal,
    datasets: [
      {
        label: 'Concurrencia',
        data: concurrencia,
        fontColor: '#D9D9D9',
        backgroundColor: '#0e70c1',
        borderColor: '#0e70c1',
      },
      {
        label: 'Cola',
        data: cola,
        borderColor: '#ec9511',
        backgroundColor: '#ec9511',
      },
      {
        label: 'Errores',
        data: errores,
        borderColor: '#03c122',
        backgroundColor: '#03c122',
      },
    ],
  };

  const options = {
    elements: {
      point: {
        radius: 0,
      },
    },
    
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
          sampleSize: 100,
          
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
          beginAtZero: true,
          sampleSize: 100,
        },
        grid: {
          drawBorder: true,
          color: '#D9D9D9',
        },
      }
    },
  };

  return (
    <Line data={chartData} options={options} />
  );
}



function Linea4( tiempoTotal, llegadas ) {

  let range = tiempoTotal.length/llegadas.length;
  let tiempoTotalN = []
  for (let index = 1; index < tiempoTotal.length; index = index+ range) {
    tiempoTotalN.push(Math.round(index))
  }

  // definimos los datos y opciones del gráfico
  const chartData = {
    labels: tiempoTotalN,
    datasets: [
      {
        label: 'Llegadas',
        data: llegadas,
        fontColor: '#D9D9D9',
        backgroundColor: '#0e70c1',
        borderColor: '#0e70c1',
      },
    ],
  };

  const options = {
    elements: {
      point: {
        radius: 0,
      },
    },
    
    plugins: {
      legend: {
        display: false,
        color: '#D9D9D9',
        labels: {
          color: '#D9D9D9'
        },
      },
    },
    scales: {
      yAxis: {
        title: {
          display: true,
          text: 'Llegadas',
          color: '#D9D9D9', 
        },
        ticks: { 
          color: '#D9D9D9', 
          beginAtZero: true ,
          sampleSize: 100,
          
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
          beginAtZero: true,
          sampleSize: 100,
        },
        grid: {
          drawBorder: true,
          color: '#D9D9D9',
        },
      }
    },
  };

  return (
    <Line data={chartData} options={options} />
  );
}

function Linea1( tiempoTotal, tiempoRespuesta ) {

  let range = tiempoTotal.length/tiempoRespuesta.length;
  let tiempoTotalN = []
  for (let index = 1; index < tiempoTotal.length; index = index+ range) {
    tiempoTotalN.push(Math.round(index))
  }

  // definimos los datos y opciones del gráfico
  const chartData = {
    labels: tiempoTotalN,
    datasets: [
      {
        label: 'Tiempo Respuesta',
        data: tiempoRespuesta,
        fontColor: '#D9D9D9',
        backgroundColor: '#0e70c1',
        borderColor: '#0e70c1',
      },
    ],
  };

  const options = {
    elements: {
      point: {
        radius: 0,
      },
    },
    
    plugins: {
      legend: {
        display: false,
        color: '#D9D9D9',
        labels: {
          color: '#D9D9D9'
        },
      },
    },
    scales: {
      yAxis: {
        title: {
          display: true,
          text: 'Tiempo de respuesta',
          color: '#D9D9D9', 
        },
        ticks: { 
          color: '#D9D9D9', 
          beginAtZero: true ,
          sampleSize: 100,
          
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
          beginAtZero: true,
          sampleSize: 100,
        },
        grid: {
          drawBorder: true,
          color: '#D9D9D9',
        },
      }
    },
  };

  return (
    <Line data={chartData} options={options} />
  );
}


function removeZeros(numbers) {
  return numbers.filter(function(number) {
    return number !== 0;
  });
}



const NodeCharts = (props) => {
    let tiempoRespuesta = props.simulateResults.tiempoRespuesta[Number(props.nodeID)];
    let concurrencia = props.simulateResults.concurrencia[Number(props.nodeID)];
    let cola = props.simulateResults.cola[Number(props.nodeID)];
    let errores = props.simulateResults.errores[Number(props.nodeID)];
    let filtrados = props.simulateResults.filtrados[Number(props.nodeID)];
    let tiempoTotal = range(1, props.simulateResults.tiempoTotal-1);
    let llegadas = props.simulateResults.llegadas[Number(props.nodeID)];
    let llegadasSinCeros = removeZeros(llegadas);
    let finalizadas = props.simulateResults.finalizadas[Number(props.nodeID)];

    return(
        <div style={{height: '100%', width: '100%', background: '#252525', borderRadius: '15px', display: 'grid', alignContent: 'space-around'}}>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <div style={{height: '100%', width: '45%'}}>
                    <div className='chartM'>
                        {Histograma(tiempoRespuesta)}
                    </div>
                    
                </div>
                <div style={{height: '100%', width: '45%'}}>
                    <div className='chartM'>
                        {Linea3(tiempoTotal, concurrencia, cola, errores, filtrados)}
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <div style={{height: '100%', width: '45%'}}>
                    <div className='chartM'>
                        {Linea1(tiempoTotal, tiempoRespuesta)}
                    </div>
                </div>
                <div style={{height: '100%', width: '45%'}}>
                    <div className='chartM'>
                        {Histograma1(llegadasSinCeros)}
                    </div>   
                </div>
            </div>
            <div style={{ display: 'flex',justifyContent: 'space-around'}}>
                <div style={{height: '100%', width: '45%'}}>
                    <div className='chartM'>
                        {Linea4(tiempoTotal, llegadasSinCeros)}
                    </div>   
                </div>
                <div style={{height: '100%', width: '45%'}}>
                    <div className='chartM'>
                        {Histograma2(tiempoTotal, llegadas, finalizadas)}
                    </div>
                </div>
            </div>
            
            
        </div>
    )

}

export default NodeCharts;