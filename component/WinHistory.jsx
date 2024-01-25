import React from 'react';
import WinningBoard from './WinningBoard';

const WinHistory = ({ winHistory }) => {

    const textStyle = {
        color: "black",
        fontWeight: "bold",
        fontSize : "120",
      };
    return (
        <div>
          {winHistory && winHistory.map((win, index) => (
            <div key={index}>
              <p style={textStyle} >{`Previous ${index + 1} game: Winner - ${win.winner}`}</p>
              <WinningBoard winningBoard={win.winningBoard} winningLine={win.winningLine} />
            </div>
          ))}
        </div>
      );
};

export default WinHistory;