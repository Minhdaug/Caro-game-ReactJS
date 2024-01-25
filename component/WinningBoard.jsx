import React from 'react';
import Square from './Square';

const WinningBoard = ({ winningBoard, winningLine }) => {
  const renderSquare = (row, col) => {
    const isWinningSquare = winningLine && winningLine.some(
        ([winRow, winCol]) => winRow === row && winCol === col
      );

    return (
      <Square
        key={col}
        value={winningBoard[row][col]}
        isWinningSquare={isWinningSquare}
      />
    );
  };

  const renderWinningBoard = () => {
    return winningBoard.map((row, rowIndex) => (
      <div key={rowIndex} className="board-row">
        {row.map((col, colIndex) => renderSquare(rowIndex, colIndex))}
      </div>
    ));
  };

  return <div className="winning-board">{renderWinningBoard()}</div>;
};

export default WinningBoard;