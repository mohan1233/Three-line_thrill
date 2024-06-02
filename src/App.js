import React, { useState } from 'react';
import './TicTacToe.css'; 

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function GameControl({ onRestart, onPause, isPaused }) {
  return (
    <div className="game-control">
      <button onClick={onRestart}>Restart</button>
      <button onClick={onPause}>{isPaused ? 'Resume' : 'Pause'}</button>
    </div>
  );
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const handleClick = (i) => {
    if (isPaused || board[i] || calculateWinner(board)) {
      return;
    }
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    const isBoardFull = board.every((square) => square !== null);
    status = isBoardFull ? 'TIE' : `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <h1>Three Line Thrill</h1> {/* Game name */}
      <div className="board">
        {board.map((value, i) => (
          <Square key={i} value={value} onClick={() => handleClick(i)} />
        ))}
      </div>
      <div className="status">{status}</div>
      <GameControl onRestart={handleRestart} onPause={handlePause} isPaused={isPaused} />
    </div>
  );
}
