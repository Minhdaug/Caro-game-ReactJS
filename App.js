import React from "react";
import Gomoku from "./component/Gomoku";
import "./App.css";

const App = () => {

  //sử dụng hook useState để tạo state dimension và hàm setDimension để cập nhật giá trị của dimension
  let dimension = 12;

  // const handleDimensionChange = (event) => {
  //   const newDimension = parseInt(event.target.value);
  //   setDimension(newDimension);
  //   //định nghĩa hàm handleDimensionChange để xử lý sự kiện thay đổi giá trị của dropdown select
  //   //Hàm này được gọi khi giá trị của dropdown select thay đổi. Nó lấy giá trị mới từ event.target.value, 
  //   //chuyển đổi sang kiểu số nguyên bằng parseInt, 
  //   //và sau đó gọi hàm setDimension để cập nhật giá trị của dimension thành giá trị mới.
  // };


  // /render các phần tử HTML và component Gomoku:
  return (
    <div className="app">
      <div className="app-container">
        <h1 className="title" style={{ textAlign: 'center' }}> Caro </h1>
        <Gomoku key={dimension} dimension={dimension} />
        <div className="dimension-selector"> </div>
      </div>
      
    </div>
  );
};

export default App;
