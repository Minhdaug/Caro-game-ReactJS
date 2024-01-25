import React from "react";


//function component hiển thị bàn cờ
const Square = ({ value, onClick, isWinningSquare }) => {

  //objiect squareStyle chứa các thuộc tính CSS để tùy chỉnh hiển thị của ô vuông
  const squareStyle = {
    backgroundColor: isWinningSquare ? "yellow" : "white",
    color: value === "X" ? "blue" : "red",
    fontWeight: isWinningSquare ? "bold" : "normal",
  };

  //component trả về một đoạn mã JSX để hiển thị ô vuông
  //component trả về một <button> chứa giá trị của ô vuông ({value})
  //click vào ô vuông, sự kiện onClick sẽ được gọi
  return (
    <div className="squares">
      <button className="square" style={squareStyle} onClick={onClick}>
        {value}
      </button>
    </div>
  );
};

//component được xuất ra bằng cách sử dụng export default Square
//cho phép nó được import và sử dụng trong các component khác trong ứng dụng cờ caro.
export default Square;
