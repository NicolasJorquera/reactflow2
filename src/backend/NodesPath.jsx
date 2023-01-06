import React, { useCallback, useRef, useEffect, useState } from 'react';


function DFS_preorder(node) {
    const path = []; // crear un arreglo vacío para almacenar el camino
  
    // procesar el valor del nodo y añadirlo al final del arreglo
    path.push(node.value);
  
    // recorrer recursivamente cada hijo
    for (let i = 0; i < node.children.length; i++) {
      path.push(...DFS_preorder(node.children[i]));
    }
  
    return path; // devolver el arreglo con el camino recorrido
}


function buildTree(edges) {
    // crear un diccionario vacío para almacenar los nodos
    const nodes = {};
  
    // recorrer cada borde
    for (const edge of edges) {
      // si el nodo padre no está en el diccionario, agrégalo
      if (!(edge.source in nodes)) {
        nodes[edge.source] = {value: edge.source, children: []};
      }
  
      // si el nodo hijo no está en el diccionario, agrégalo
      if (!(edge.target in nodes)) {
        nodes[edge.target] = {value: edge.target, children: []};
      }
  
      // añadir el nodo hijo al final de la matriz edge.targetren del nodo padre
      nodes[edge.source].children.push(nodes[edge.target]);
    }
  
    // encontrar el nodo raíz (el que no tiene padre)
    for (const node of Object.values(nodes)) {
      if (!node.parent) {
        return node;
      }
    }
  }

const NodesPath = (edges) => {

    const rootNode = buildTree(edges);

    const nodesPath = DFS_preorder(rootNode);
    return [nodesPath, rootNode];
    
}

export default NodesPath;