import React, { useState, useEffect } from "react";
import Node from "./Node";
import Astar from "../astarAlgo/astar";
import "./Pathfind.css";

const cols = 25;
const rows = 15;

const NODE_START_ROW = 0;
const NODE_START_COL = 0;
const NODE_END_ROW = rows - 1;
const NODE_END_COL = cols - 1;

const Pathfind = () => {
  const [Grid, setGrid] = useState([]);
  const [Path, setPath] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([]);

  useEffect(() => {
    initalizeGrid();
  }, []);

  const initalizeGrid = () => {
    const grid = new Array(rows);

    for (let i = 0; i < cols; i++) {
      grid[i] = new Array(cols);
    }
    createSpot(grid);

    setGrid(grid);
    addNieghbours(grid);
    const startNode = grid[NODE_START_ROW][NODE_START_COL];
    const endNode = grid[NODE_END_ROW][NODE_END_COL];
    let path = Astar(startNode, endNode);
    setPath(path.path);
    setVisitedNodes(path.visitedNodes);
  };

  const createSpot = (grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }
  };

  //ADD neighbour

  const addNieghbours = (grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j].addneighbour(grid);
      }
    }
  };

  // SPot Constructor

  function Spot(i, j) {
    this.x = i;
    this.y = j;
    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.neighbour = [];
    this.previous = undefined;
    this.addneighbour = function (grid) {
      let i = this.x;
      let j = this.y;
      if (i > 0) this.neighbour.push(grid[i - 1][j]);
      if (i < rows - 1) this.neighbour.push(grid[i + 1][j]);
      if (j > 0) this.neighbour.push(grid[i][j - 1]);
      if (j < cols - 1) this.neighbour.push(grid[i][j + 1]);
    };
  }

  //Grid with Node

  const gridWithNode = (
    <div>
      {Grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="rowWrapper">
            {row.map((col, colIndex) => {
              const { isStart, isEnd } = col;
              return (
                <Node
                  key={colIndex}
                  isStart={isStart}
                  isEnd={isEnd}
                  row={rowIndex}
                  col={colIndex}
                ></Node>
              );
            })}
          </div>
        );
      })}
    </div>
  );
  //   console.log(Grid);

  //    console.log(Path);
  const visualizeShortestPath = (shortestPathNodes) => {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        const node = shortestPathNodes[i];
        document.getElementById(`node-${node.x}-${node.y}`).className =
          "node node-shortest-path";
      }, 10 * i);
    }
  };
  const visualizepath = () => {
    // console.log("visualize path");
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          visualizeShortestPath(Path);
        }, 20 * i);
      } else {
        setTimeout(() => {
          const node = visitedNodes[i];
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-visited";
        }, 20 * i);
      }
    }
  };
  return (
    <div className="Wrapper">
      <button onClick={visualizepath}>VisuVisu</button>
      <h1>PathFinder Visualizer</h1>
      {gridWithNode}
    </div>
  );
};

export default Pathfind;
