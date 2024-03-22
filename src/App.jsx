import React, { useState, useRef, useEffect } from "react";

const DrawingBoard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState("#000000");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const startDrawing = (e) => {
      setIsDrawing(true);
      setLastX(e.offsetX);
      setLastY(e.offsetY);
    };

    const draw = (e) => {
      if (!isDrawing) return;
      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(e.offsetX, e.offsetY);
      context.strokeStyle = brushColor;
      context.lineWidth = brushSize;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.stroke();
      setLastX(e.offsetX);
      setLastY(e.offsetY);
    };

    const stopDrawing = () => {
      setIsDrawing(false);
    };

    const clearCanvas = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    document
      .getElementById("clearCanvas")
      .addEventListener("click", clearCanvas);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
      document
        .getElementById("clearCanvas")
        .removeEventListener("click", clearCanvas);
    };
  }, [isDrawing, brushColor, brushSize, lastX, lastY]);

  return (
    <div className="h-screen w-screen flex flex-row justify-center items-center ">
      <div className="h-full flex items-center justify-start mr-10">
        <canvas
          ref={canvasRef}
          width={1000}
          height={800}
          color={"white"}
          className="border-black border"
        ></canvas>
      </div>
      <div className="flex flex-row h-[120px]  w- justify-center items-start text-xl">
        <div>
          Brush Size:<br></br>
          Brush Color:
          <br></br>
          <button
            id="clearCanvas"
            className=" text-xl mt-4 h-[40px] rounded-md w-[150px] bg-green-600"
          >
            Clear Canvas
          </button>
        </div>
        <div className="ml-4">
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(e.target.value)}
          />
          <br></br>
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default DrawingBoard;
