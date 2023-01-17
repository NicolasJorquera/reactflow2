


const findConcurrenciaCola = (visitasGlobales, nodeID) => {
    let concurrencia = 0;
    let cola = 0;
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

    return [concurrencia, cola]
}

function ColaToConcurrencia(concurrencia, cola, limiteConcurrencia, visitasGlobales, nodeID) {
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
  }
  


function normalRandom(mean, standardDeviation) {
    let u1 = Math.random();
    let u2 = Math.random();
    let z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return z0 * standardDeviation + mean;
  }

  function findParentAndSiblings(tree, nodeValue) {
    if (!tree || typeof nodeValue === 'undefined') {
      return { parent: null, siblings: [] };
    }
  
    let parent = null;
    let siblings = [];
    const search = (currentNode) => {
      if (!currentNode) {
        return;
      }
      for (const child of currentNode.children) {
        if (child.value === nodeValue) {
          parent = currentNode.value;
          for (const child of currentNode.children) {
            if (child.value != nodeValue) {
                siblings.push(child.value);
            }
            
          }
        }
        search(child);
      }
    }
    search(tree);
    return { parent, siblings };
  }

const Node = ( nodeID, visitasGlobales, nodes, finalizadas, tree, llegadas) => {

    
    
    const node = nodes.find(node => (node.id == nodeID && nodeID != '0'));
    let {parent, siblings} = findParentAndSiblings(tree, nodeID);

    const promedio = node.data.fields.promedio;
    const desviacionEstandar = node.data.fields.desviacionEstandar;
    const limiteConcurrencia = node.data.fields.limiteConcurrencia;
    const limiteCola = node.data.fields.limiteCola;

    let [concurrencia, cola] = findConcurrenciaCola(visitasGlobales, nodeID);
    [concurrencia, cola, visitasGlobales] = ColaToConcurrencia(concurrencia, cola, limiteConcurrencia, visitasGlobales, nodeID);


    let visitas = 0;
    if (parent != null) {
        for (let visita of visitasGlobales) {
            if (visita['estado '+ parent]) {
                let alreadyBifurcado = false; //variable para chequear si ya fue bifurcada esta visita
                siblings.forEach(sibling => {
                    if (visita['estado '+sibling] == 'No bifurcado') {
                        alreadyBifurcado = true;
                    }
                });
                if (visita['estado '+nodeID] == 'No bifurcado') {
                    alreadyBifurcado = true;
                }
                if (visita['tiempoVisita ' + nodeID]) {
                    alreadyBifurcado = true;
                }
                if (visita['estado '+parent] == 'Concurrencia, bloque finalizado' && !alreadyBifurcado) {
                    const rd = Math.random();
                    if (rd < node.weight) {//distribuir las visitas segun su peso

                        visitas++;
                        visita['estado ' + nodeID] = 'Creado en ' + nodeID;

                        let tiempoVisita = Math.round(normalRandom(Number(promedio), Number(desviacionEstandar)));
                        while (tiempoVisita < 0) {
                            tiempoVisita = Math.round(normalRandom(promedio, desviacionEstandar));
                        }
                        visita["tiempoVisita " +nodeID] = tiempoVisita; 
                        visita["tiempoVisitaRestante " +nodeID] = tiempoVisita;
                        visita["tiempoEjecucion " +nodeID] = -1;
                        visita["tiempoCola " +nodeID] = 0;
                        visita["tiempoRespuesta " +nodeID] = -1;

                        [concurrencia, cola] = findConcurrenciaCola(visitasGlobales, nodeID);
                        
                        siblings.forEach(sibling => {
                            visita['estado '+sibling] = 'No bifurcado';
                        });

                        if (concurrencia < Number(limiteConcurrencia)) {
                            visita["estado "+ nodeID] = "Concurrencia";
                        }else{
                            if (cola < Number(limiteCola)) {
                                visita["estado "+ nodeID] = "Cola";
                            }else{
                                visita["estado "+ nodeID] = "Error";
                            }
                        }
                    }
                }
            }
            
        }
        if (!llegadas[nodeID]) {
            llegadas[nodeID] = [];
        }
        let firstNode = tree.children[0].value;
        if (nodeID != firstNode) {
            llegadas[nodeID].push(visitas)
        }
        
    }
    

    let finalizadasNodo = 0;

    for (let visita of visitasGlobales) {
        if (visita[`estado ${nodeID}`] != null && visita[`estado ${nodeID}`] != "Error" && visita[`estado ${nodeID}`] != "Filtrado") {
            if (visita[`tiempoVisitaRestante ${nodeID}`] <= 0 && visita[`estado ${nodeID}`] != "Concurrencia, bloque finalizado" && visita[`estado ${nodeID}`] == "Concurrencia") {
            visita[`estado ${nodeID}`] = "Concurrencia, bloque finalizado";
            finalizadasNodo++;
            }

            if (visita[`estado ${nodeID}`] == "Concurrencia, bloque finalizado" || visita[`estado ${nodeID}`] == "Concurrencia") {
            visita[`tiempoVisitaRestante ${nodeID}`]--;
            visita[`tiempoEjecucion ${nodeID}`]++;
            }

            if (visita[`estado ${nodeID}`] == "Cola") {
            visita[`tiempoCola ${nodeID}`]++;
            }

            visita[`tiempoRespuesta ${nodeID}`]++;
        }
        
        
        
    }
    if (!finalizadas[nodeID]) {
        finalizadas[nodeID] = []
    }
    finalizadas[nodeID].push(finalizadasNodo);

   
    
}

export default Node;