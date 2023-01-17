// Modules
import React, { useEffect, useMemo } from 'react';
import NodesPath from './NodesPath';
import Node from './Node';

// Api
// ...

// Assets
// ...

// Context
// ...

// Store
// ...

// Services
// ...

// Util
// ...

// Components
// ...



//==============================
//  Template
//==============================

const Template = ( props) => {
    // Memos

    const poissonRandom = useMemo((lambda) => {
        let L = Math.exp(-lambda);
        let k = 0;
        let p = 1;
      
        do {
          k++;
          p *= Math.random();
        } while (p > L);
      
        return k - 1;
    }, [])
    
    const findConcurrenciaCola = useMemo((visitasGlobales, nodeID) => {
        let concurrencia = 0;
        let cola = 0;
        if (visitasGlobales) {
            visitasGlobales.forEach(visita => {
                if (visita["estado "+ nodeID]) {
                    if (visita["estado "+nodeID] == "Concurrencia, bloque finalizado" || visita["estado "+nodeID] == "Concurrencia") {
                        concurrencia = concurrencia + 1;
                    }
                    if (visita["estado "+nodeID] == "Cola") {
                        cola = cola + 1;
                    }
                }
            });
        }
        
    
        return [concurrencia, cola]
    },[])

    const ColaToConcurrencia = useMemo((concurrencia, cola, limiteConcurrencia, visitasGlobales, nodeID) => {
        for (let visita of visitasGlobales) {
          if (visita[`estado ${nodeID}`] != null) {
            if (cola > 0 && concurrencia < parseInt(limiteConcurrencia) && visita[`estado ${nodeID}`] == "Cola") {
              visita[`estado ${nodeID}`] = "Concurrencia";
              concurrencia++;
              cola--;
            }
          }
        }
        return [concurrencia, cola, visitasGlobales];
    },[])

    const arrivalSteps = useMemo((steps, duracionPrueba) => {
        let stepCount = steps.length;
        let stepsTotalTime = 0;
        let stepsTime = [];
    
    
        steps.forEach((step, i) => {
            stepsTotalTime = stepsTotalTime + Math.round( Number(duracionPrueba)/stepCount);
            stepsTime.push(Math.round(Number(duracionPrueba)/stepCount))
        });
    
        while (stepsTotalTime != Number(duracionPrueba)) {
            if (stepsTotalTime > Number(duracionPrueba)) {
                stepsTime[ stepsTime.length -1] = stepsTime[stepsTime.length -1] - 1
                stepsTotalTime = stepsTotalTime -1
            }
            else{
                stepsTime[stepsTime.length -1] = stepsTime[stepsTime.length -1] + 1
                stepsTotalTime = stepsTotalTime +1
            }
        }
    
    
    
        return stepsTime
        
    }, [])

    const firstNodePoisson = useMemo((meanLlegadas, llegadas, firstNode) => {
        let visitas = poissonRandom(meanLlegadas.Value);
        if (!llegadas[firstNode]) {
            llegadas[firstNode] = [];
        }
        
        llegadas[firstNode].push(visitas);
        return visitas;
    }, [])

    const normalRandom = useMemo((mean, standardDeviation) => {
        let u1 = Math.random();
        let u2 = Math.random();
        let z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        return z0 * standardDeviation + mean;
      },[])

      const createVisitas = useMemo((visitas, visitasGlobales, nodes, nodeID) => {
        const node = nodes.find(node => (node.id == nodeID));
    
        const promedio = node.data.fields.promedio;
        const desviacionEstandar = node.data.fields.desviacionEstandar;
        const limiteConcurrencia = node.data.fields.limiteConcurrencia;
        const limiteCola = node.data.fields.limiteCola;
    
        let [concurrencia, cola] = findConcurrenciaCola(visitasGlobales, nodeID);
        [concurrencia, cola, visitasGlobales] = ColaToConcurrencia(concurrencia, cola, limiteConcurrencia, visitasGlobales, nodeID);
    
        for (let visit = 0; visit < visitas; visit++) {
    
            let tiempoVisita = Math.round(normalRandom(Number(promedio), Number(desviacionEstandar)));
            while (tiempoVisita < 0) {
                tiempoVisita = Math.round(normalRandom(promedio, desviacionEstandar));
            }
    
            let visita = {};
            visita["estado "+ nodeID] = "Creado en " + nodeID;
            visita["tiempoVisita " +nodeID] = tiempoVisita; 
            visita["tiempoVisitaRestante " +nodeID] = tiempoVisita;
            visita["tiempoEjecucion " +nodeID] = -1;
            visita["tiempoCola " +nodeID] = 0;
            visita["tiempoRespuesta " +nodeID] = -1;
    
            [concurrencia, cola] = findConcurrenciaCola(visitasGlobales, nodeID);
    
            if (concurrencia < Number(limiteConcurrencia)) {
                visita["estado "+ nodeID] = "Concurrencia";
                visitasGlobales.push(visita);
            }else{
                if (cola < Number(limiteCola)) {
                    visita["estado "+ nodeID] = "Cola";
                    visitasGlobales.push(visita);
                }else{
                    visita["estado "+ nodeID] = "Error";
                    visitasGlobales.push(visita);
                }
            }
        };
    }, [])

    //recorrer el path (aqui se corre la logica de cada nodo)
    const runPath = useMemo((nodesPath, nodes, meanLlegadas, llegadas, visitasGlobales, finalizadas, tree) => {
        let firstNode = tree.children[0].value;
        nodesPath.forEach(nodeID => {

            let visitas = -1;
            if (nodeID == firstNode) {
                visitas = firstNodePoisson(meanLlegadas, llegadas, firstNode);
                createVisitas(visitas, visitasGlobales, nodes, firstNode);
            }

            if (nodeID != '0') { // el nodo 0 solo tiene la informacion de la prueba y la tasa de llegadas a los primeros nodos
                Node(nodeID, visitasGlobales, nodes,finalizadas, tree, llegadas);
            }
            

        });
    }, [])

    const findLeaves = useMemo((node, leaves) => {
        if (node.children.length === 0) {
        // si el nodo no tiene hijos, es una hoja
        leaves.push(node.value); // añadir el valor del nodo al arreglo de hojas
        } else {
        // recorrer recursivamente cada hijo
        for (let i = 0; i < node.children.length; i++) {
            findLeaves(node.children[i], leaves);
        }
        }
    },[])

    const mean = useMemo((arr) => {
        let sum = arr.reduce((acc, cur) => acc + cur, 0);
        return sum / arr.length;
    },[])

    const checkFinish = useMemo((visitas, leaves, errores, filtrados, concurrencia, cola, tiempoRespuesta, nodes) => {
        let offset = 0;
        const tiempoRespuestaSuma = {};
    
    
        let keys = Object.keys(concurrencia);
        keys.forEach(nodeID => {
            concurrencia[nodeID].push(0);
            cola[nodeID].push(0);
            errores[nodeID].push(0);
            filtrados[nodeID].push(0);
        });
        
    
        visitas.forEach((_, visitaIndex) => {
            
        
    
    
            visitaIndex -= offset;
            const visita = visitas[visitaIndex];
    
            // Procesar cada bloque
            for (let bloque in visita) {
                if (bloque.startsWith("estado ")) {
                    const nodeID = bloque.slice(-1);
    
                    if (!tiempoRespuestaSuma[nodeID]) {
                        tiempoRespuestaSuma[nodeID] = [];
                    }
                    if (!errores[nodeID]) {
                        errores[nodeID] = [];
                    }
                    if (!filtrados[nodeID]) {
                        filtrados[nodeID] = [];
                    }
                    if (!concurrencia[nodeID]) {
                        concurrencia[nodeID] = [];
                    }
                    if (!cola[nodeID]) {
                        cola[nodeID] = [];
                    }
    
                    if (visita[bloque] == "Error") {
                        errores[nodeID][errores[nodeID].length-1]++;
                        visitas.splice(visitaIndex, 1);
                        offset++;
                        continue;
                    } else if (visita[bloque] == "Filtrado") {
                        filtrados[nodeID][filtrados[nodeID].length-1]++;
                        visitas.splice(visitaIndex, 1);
                        offset++;
                        continue;
                    } else if (visita[bloque] == "Concurrencia, bloque finalizado" || visita[bloque] == "Concurrencia") {
                        concurrencia[nodeID][concurrencia[nodeID].length-1]++;
                    } else if (visita[bloque] == "Cola") {
                        cola[nodeID][cola[nodeID].length-1]++;
                    }
                }
            }
    
            // Sumar tiempos de respuesta para las solicitudes finalizadas en el bloque C
            leaves.forEach(leave => {
                if (visita["estado " + leave] == "Concurrencia, bloque finalizado") {
                    for (let nodeID in tiempoRespuestaSuma) {
                        if (!isNaN(visita[`tiempoRespuesta ${nodeID}`])) {
                            tiempoRespuestaSuma[nodeID].push(visita[`tiempoRespuesta ${nodeID}`]);
                        }
                        
                    }
                    visitas.splice(visitaIndex, 1);
                    offset++;
                }
            });
        
        });
    
        nodes.forEach(node => {
            let nodeID = node.id;
            if (nodeID != '0') {
                if (tiempoRespuestaSuma[nodeID]) {
                    if (tiempoRespuestaSuma[nodeID].length > 0) {
                        if (!tiempoRespuesta[nodeID]) {
                            tiempoRespuesta[nodeID] = [];
                        }
                        tiempoRespuesta[nodeID].push(mean(tiempoRespuestaSuma[nodeID]));
                      }
                }
            }
            
            
            
        });
    
    }, [])

    const weightNodes = useMemo((root, nodes, edges) => {
        let suma = 0;
        for (let child of root.children) {
            const edge = edges.find( edge => (root.value == edge.source && child.value == edge.target));
    
            suma = suma + Number(edge.data.label);
    
        }
    
        for (let child of root.children) {
            let node = nodes.find( node => node.id == child.value);
            let edge = edges.find( edge => (root.value == edge.source && child.value == edge.target));
            node['weight'] = Number(edge.data.label)/suma;
            weightNodes(child, nodes, edges); // Recorremos cada subárbol hijo
        }
    
    }, [])
    // Const
    let simulateResults;

    const steps = props.nodes[0].data.fields.arrivals;
    const duracionPrueba = props.nodes[0].data.fields.duracionPrueba;
    let stepsTime = arrivalSteps(steps, duracionPrueba);

    let visitas = []

    let llegadas = {};
    let finalizadas = {};
    let tiempoRespuesta = {};
    let errores = {};
    let filtrados = {};
    let concurrencia = {};
    let cola = {};

    let [nodesPath, tree] = NodesPath(props.edges)

    let leaves = [];
    findLeaves(tree, leaves);
    weightNodes(tree, props.nodes, props.edges);
    let segundo = 1;
    
    // Local State
    // ...
    
    // Redux State
    // ...
    
    // Redux Dispatch
    // ...
    
    // Params
    // ...
    
    // Context
    // ...
    
    // Refs
    // ...
    
    // History
    // ...
    
    // Location
    // ...
    
    // Callbacks
    // ...
    
    steps.forEach((step, i) => {
        let timeStep = 1;
        while (timeStep <= stepsTime[i]) {
            console.log(segundo)

            runPath(nodesPath, props.nodes, step, llegadas, visitas, finalizadas, tree);

            checkFinish(visitas, leaves, errores, filtrados, concurrencia, cola, tiempoRespuesta, props.nodes);

            segundo = segundo + 1;
            timeStep = timeStep + 1;

        }
    });
    while (visitas.length > 0) {
        console.log(segundo);
        runPath(nodesPath, props.nodes, 0, llegadas, visitas, finalizadas, tree);

        checkFinish(visitas, leaves, errores, filtrados, concurrencia, cola, tiempoRespuesta, props.nodes);

        segundo++;

    }


    simulateResults = {
        duracionPrueba: duracionPrueba,
        tiempoTotal: segundo,
        tiempoRespuesta: tiempoRespuesta,
        concurrencia: concurrencia,
        cola: cola,
        errores: errores,
        filtrados: filtrados,
        llegadas: llegadas,
        finalizadas: finalizadas,
    };
    props.handleSimulate(simulateResults);
    
    // Effects
    useEffect( () => {

    }, [] );
    
    
    
    

};

//==============================
//  Export
//==============================

export default Template;