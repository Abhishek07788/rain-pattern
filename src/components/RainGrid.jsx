import React, { useEffect, useState } from "react";
import "./RainGrid.css";

const colorsArr = [
  1, 1.01, 1.01, 1.02, 1.03, 1.04, 1.05, 1.06, 1.07, 1.08, 1.09,
];
let index = 0;
let direction = 1;

const RainGrid = ({
  rows,
  columns,
  gridSpeed = 50,
  addColorChances = 0.05,
  colorChangeSpeed = 500,
}) => {
  const [grid, setGrid] = useState([]);
  const [colorCount, setColorCount] = useState(1);

  useEffect(() => {
    // - initializing a new grid ----
    const newGrid = Array.from({ length: rows }, () =>
      Array(columns).fill(null)
    );
    setGrid(newGrid);
  }, []);

  useEffect(() => {
    const updateGrid = () => {
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            // if color exist in prev grid then return same for next
            if (prevGrid[rowIndex - 1] && prevGrid[rowIndex - 1][colIndex]) {
              return prevGrid[rowIndex - 1][colIndex];
            }
            return null;
          })
        );

        // adding the new colors to 5 cells ---
        const colorIntensity = [5, 10, 20, 35, 50];
        for (let i = 0; i < columns; i++) {
          if (Math.random() < addColorChances) {
            // 5% changes to add a new color
            colorIntensity.forEach((intensity, index) => {
              if (index < rows) {
                newGrid[index][i] = {
                  color: `hsl(${
                    (colorCount * 360) % 360
                  }, 100%, ${intensity}%)`,
                };
              }
            });
          }
        }
        return newGrid;
      });
    };

    // Iterating the colors num from the array colorsArr
    const iterateArray = () => {
      setColorCount(colorsArr[index]);
      index += direction;
      if (index === colorsArr.length) {
        direction = -1;
        index = colorsArr.length - 2;
      } else if (index === -1) {
        direction = 1;
        index = 1;
      }
    };

    // - Updating the grid and adding the color after 50 ms --
    const intervalId = setInterval(updateGrid, gridSpeed);
    // - Changing the colors after 500 ml --
    const colorId = setInterval(iterateArray, colorChangeSpeed);

    // clearing the interval when component get unmount for memory
    return () => {
      clearInterval(intervalId);
      clearInterval(colorId);
    };
  }, [rows, columns, colorCount]);

  return (
    <div className="grid-container">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="grid-item"
              style={{ backgroundColor: cell ? cell.color : "black" }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RainGrid;
