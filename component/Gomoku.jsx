import React, {useEffect, useState} from 'react';
import Square from "./Square";
import WinHistory from './WinHistory';


//component nhận vào một prop { dimension } từ component cha để xác định kích thước của bàn cờ.
const Gomoku = ({dimension}) => {
  

  const [squares, setSquares] = useState(() => {
    // Thử lấy dữ liệu từ localStorage, nếu không có thì tạo bàn cờ mới
    const storedData = localStorage.getItem('gomokuGameData');
    if (storedData) {
      return JSON.parse(storedData).squares;
    }

    return Array(dimension).fill(Array(dimension).fill(null));
  });

  const [xIsNext, setXIsNext] = useState(() => {
    // Thử lấy dữ liệu từ localStorage, nếu không có thì đặt giá trị là true
    const storedData = localStorage.getItem('gomokuGameData');
    if (storedData) {
      return JSON.parse(storedData).xIsNext;
    }

    return true;
  });

  const [theWinner, setTheWinner] = useState(() => {
    // Thử lấy dữ liệu từ localStorage, nếu không có thì tạo giá trị null
    const storedData = localStorage.getItem('gomokuGameData');
    if (storedData) {
      return JSON.parse(storedData).theWinner;
    }

    return null;
  });

  const [winningLine, setWinningLine] = useState(() => {
    // Thử lấy dữ liệu từ localStorage, nếu không có thì tạo mảng rỗng
    const storedData = localStorage.getItem('gomokuGameData');
    if (storedData) {
      return JSON.parse(storedData).winningLine;
    }

    return [];
  });

  const [moveHistory, setMoveHistory] = useState(() => {
    // Thử lấy dữ liệu từ localStorage, nếu không có thì tạo mảng rỗng
    const storedData = localStorage.getItem('gomokuGameData');
    if (storedData) {
      return JSON.parse(storedData).moveHistory;
    }

    return [];
  });

  const [winHistory, setWinHistory] = useState(() => {
    // Thử lấy dữ liệu từ localStorage, nếu không có thì tạo mảng rỗng
    const storedData = localStorage.getItem('gomokuGameData');
    if (storedData) {
      return JSON.parse(storedData).winHistory;
    }

    return [];
  });
 

  const handleClick = (row, col) => {
    if (theWinner || squares[row][col]) {
      return;
    }

    const newSquares = squares.map((row) => [...row]);
    newSquares[row][col] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    
    setXIsNext(!xIsNext); //chuyển lượt cho người tiếp theo

    setMoveHistory(prevMoveHistory => [
      ...prevMoveHistory,
      {
        row,
        col,
        value: xIsNext ? 'X' : 'O'
      }
    ]);

    setSquares(newSquares);
    
    const winner = calculateWinner(newSquares, row, col);
    if (winner) {
      setTheWinner(winner);
      setWinningLine(findWinningLine(newSquares, row, col, winner));    
      
       const newWin = {
        winner: winner,
        winningBoard: newSquares,
        winningLine: findWinningLine(newSquares, row, col, winner),
      };
      
      setWinHistory(prevWinHistory => [
        newWin,
        ...(prevWinHistory ? prevWinHistory.slice(0, 5) : [])
      ]);   
    } 
  };

  const undoMove = () => {    
    if (moveHistory.length > 0) {
      // Xóa nước đi cuối cùng của người chơi
      const lastMove = moveHistory[moveHistory.length - 1];
      const { row, col, value } = lastMove;
      const newSquares = [...squares];
      newSquares[row][col] = null; // Xóa giá trị của ô đã đánh
      setSquares(newSquares);
      setXIsNext(value === 'X');

    // Xóa nước đi cuối cùng khỏi moveHistory
      setMoveHistory(prevMoveHistory => prevMoveHistory.slice(0, -1));
    
      // Reset thông tin về người chiến thắng và lượt chơi
      if (theWinner !== null) {
        setTheWinner(null);
        setWinningLine([]); 
        winHistory.shift();
        
      }
    }   
  };

  const handleRestart = (event) => {
  setSquares(Array(dimension).fill(Array(dimension).fill(null)));
  setXIsNext(true);
  setMoveHistory([]);
  setTheWinner(null);
  setWinningLine([]);
  };

  const calculateWinner = (currentSquares, row, col) => {
    const currentPlayer = currentSquares[row][col];

    // Check horizontally
    let count = 1;
    let leftCol = col - 1;
    while (leftCol >= 0 && currentSquares[row][leftCol] === currentPlayer) {
      count++;
      leftCol--;
    }
    let rightCol = col + 1;
    while (
      rightCol < dimension &&
      currentSquares[row][rightCol] === currentPlayer
    ) {
      count++;
      rightCol++;
    }
    if (count >= 5) {
      return currentPlayer;
    }

    // Check vertically
    count = 1;
    let topRow = row - 1;
    while (topRow >= 0 && currentSquares[topRow][col] === currentPlayer) {
      count++;
      topRow--;
    }
    let bottomRow = row + 1;
    while (
      bottomRow < dimension &&
      currentSquares[bottomRow][col] === currentPlayer
    ) {
      count++;
      bottomRow++;
    }
    if (count >= 5) {
      return currentPlayer;
    }

    // Check diagonally (top-left to bottom-right)
    count = 1;
    let topLeftRow = row - 1;
    let topLeftCol = col - 1;
    while (
      topLeftRow >= 0 &&
      topLeftCol >= 0 &&
      currentSquares[topLeftRow][topLeftCol] === currentPlayer
    ) {
      count++;
      topLeftRow--;
      topLeftCol--;
    }
    let bottomRightRow = row + 1;
    let bottomRightCol = col + 1;
    while (
      bottomRightRow < dimension &&
      bottomRightCol < dimension &&
      currentSquares[bottomRightRow][bottomRightCol] === currentPlayer
    ) {
      count++;
      bottomRightRow++;
      bottomRightCol++;
    }
    if (count >= 5) {
      return currentPlayer;
    }

    // Check diagonally (top-right to bottom-left)
    count = 1;
    let topRightRow = row - 1;
    let topRightCol = col + 1;
    while (
      topRightRow >= 0 &&
      topRightCol < dimension &&
      currentSquares[topRightRow][topRightCol] === currentPlayer
    ) {
      count++;
      topRightRow--;
      topRightCol++;
    }
    let bottomLeftRow = row + 1;
    let bottomLeftCol = col - 1;
    while (
      bottomLeftRow < dimension &&
      bottomLeftCol >= 0 &&
      currentSquares[bottomLeftRow][bottomLeftCol] === currentPlayer
    ) {
      count++;
      bottomLeftRow++;
      bottomLeftCol--;
    }
    if (count >= 5) {
      return currentPlayer;
    }
    
    return null;
  };

  const findWinningLine = (currentSquares, row, col, winner) => {
    const currentPlayer = currentSquares[row][col];
    const lines = [];

    // Check horizontally
    let leftCol = col - 1;
    while (leftCol >= 0 && currentSquares[row][leftCol] === currentPlayer) {
      lines.push([row, leftCol]);
      leftCol--;
    }
    lines.push([row, col]);
    let rightCol = col + 1;
    while (
      rightCol < dimension &&
      currentSquares[row][rightCol] === currentPlayer
    ) {
      lines.push([row, rightCol]);
      rightCol++;
    }
    if (lines.length >= 5) {
      return lines;
    }

    // Check vertically
    let topRow = row - 1;
    while (topRow >= 0 && currentSquares[topRow][col] === currentPlayer) {
      lines.push([topRow, col]);
      topRow--;
    }
    lines.push([row, col]);
    let bottomRow = row + 1;
    while (
      bottomRow < dimension &&
      currentSquares[bottomRow][col] === currentPlayer
    ) {
      lines.push([bottomRow, col]);
      bottomRow++;
    }
    if (lines.length >= 5) {
      return lines;
    }

    // Check diagonally (top-left to bottom-right)
    let topLeftRow = row - 1;
    let topLeftCol = col - 1;
    while (
      topLeftRow >= 0 &&
      topLeftCol >= 0 &&
      currentSquares[topLeftRow][topLeftCol] === currentPlayer
    ) {
      lines.push([topLeftRow, topLeftCol]);
      topLeftRow--;
      topLeftCol--;
    }
    lines.push([row, col]);
    let bottomRightRow = row + 1;
    let bottomRightCol = col + 1;
    while (
      bottomRightRow < dimension &&
      bottomRightCol < dimension &&
      currentSquares[bottomRightRow][bottomRightCol] === currentPlayer
    ) {
      lines.push([bottomRightRow, bottomRightCol]);
      bottomRightRow++;
      bottomRightCol++;
    }
    if (lines.length >= 5) {
      return lines;
    }

    // Check diagonally (top-right to bottom-left)
    let topRightRow = row - 1;
    let topRightCol = col + 1;
    while (
      topRightRow >= 0 &&
      topRightCol < dimension &&
      currentSquares[topRightRow][topRightCol] === currentPlayer
    ) {
      lines.push([topRightRow, topRightCol]);
      topRightRow--;
      topRightCol++;
    }
    lines.push([row, col]);
    let bottomLeftRow = row + 1;
    let bottomLeftCol = col - 1;
    while (
      bottomLeftRow < dimension &&
      bottomLeftCol >= 0 &&
      currentSquares[bottomLeftRow][bottomLeftCol] === currentPlayer
    ) {
      lines.push([bottomLeftRow, bottomLeftCol]);
      bottomLeftRow++;
      bottomLeftCol--;
    }
    if (lines.length >= 5) {
      return lines;
    }
 
    return [];
  };

  const renderSquare = (row, col) => {
    const isWinningSquare = winningLine.some(
      ([winRow, winCol]) => winRow === row && winCol === col
    );
    
    return (
      <Square
        key={col}
        value={squares[row][col]}
        onClick={() => handleClick(row, col)}
        isWinningSquare={isWinningSquare}
      />
    );
  };

  const renderBoard = () => {
    return squares.map((row, rowIndex) => (
      <div key={rowIndex} className="board-row">     
        {row.map((col, colIndex) => renderSquare(rowIndex, colIndex))}
      </div>
      
    ));  
    
  };
  
  const updateStatus = (theWinner, xIsNext) => {
    if (theWinner) {
        return `Winner: ${theWinner}`;
      } else {
        return `Next player: ${xIsNext ? 'X' : 'O'}`;
      }
  };

  
  useEffect(() => {
    // Lưu dữ liệu vào localStorage
    localStorage.setItem('gomokuGameData', JSON.stringify({
        squares,
        xIsNext,
        theWinner,
        moveHistory,
        winningLine,
        winHistory
      })
    );
  }, [squares,xIsNext, theWinner, moveHistory, winningLine, winHistory]);

  
  return (
    <div>
        <div className="board">
            <h2 className="text">{updateStatus(theWinner, xIsNext)}</h2>                          
            <div className="list-button">
                <button class="button" onClick={handleRestart}>Restart</button>
                <button class="button" onClick={undoMove}>Undo</button>      
            </div>                       
        </div>
        <div className="board-container">{renderBoard()}</div> 
        <div className="winHistory">
        <h2 className="text">Winning History</h2>
        <WinHistory winHistory={winHistory} />
      </div>
    </div> 
  );
};

export default Gomoku;
