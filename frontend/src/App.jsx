import React, { useState } from "react";
import axios from "axios";
import './app.css'

const App = () => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""])
  const [currentPlayer, setCurrentPlayer] = useState("X")
  const [winner, setWinner] = useState(null)

  const handleCellClick = async (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer

    setBoard(newBoard)

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/check_winner", {
        board: newBoard,
      })

      setWinner(response.data.winner)

      if (!response.data.winner) {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
      }
    } catch (error) {
      console.error("Error checking winner:", error)
    }
  }

  const resetGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""])
    setCurrentPlayer("X")
    setWinner(null)
  }

  return (
    <div id='game' style={{ textAlign: "center" }}>
      <h1>Tic Tac Toe</h1>
      <div id='board'style={{ display: "grid", gridTemplateColumns: "repeat(3, 160px)", gap: "10px", margin: "20px auto" }}>
        {board.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleCellClick(index)}
            style={{
              width: "160px",
              height: "160px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid pink",
              backgroundColor: 'lavenderblush',
              borderRadius: '7px',
              fontSize: "60px",
              cursor: "pointer",
              boxShadow: '5px 5px 10px azure',
              fontFamily: 'myfont1',
              textShadow: '2px 2px 5px powderblue'
            }}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && <h2>{winner === "draw" ? "It's a draw!" : `Winner: ${winner}`}</h2>}
      <button onClick={resetGame} style={{ padding: "10px 20px", fontSize: "24px" }}>
        Reset Game
      </button>
    </div>
  )
}

export default App

