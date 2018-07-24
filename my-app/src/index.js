import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

//Renders a single square/game piece interaction
//Functional Component - Components that only contain a render method and don't
//track state
function Square(props) {
  //props refers to properties of the HTMl element
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

//Renders Game Board, made of nine squares.

//Lifting State Up:
//Moves state of each square up to Board to track
class Board extends React.Component {
  //Need to call SUPER when defining a subclass' constructor
  //ALL React Component classes with constructuor should call it with
  //super(props)
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    }
  }

  //To create a state toggle that shifts between clicks,
  // =====xIsNext: !this.state.xIsNext ========
  //is a good trick

  handleClick(i) {
    //If there's a winner or the square is filled with a value,
    //ignore any more clicks
    if (calculateWinner(squares) || squares[i]) {
      return
    }

    const squares = this.state.squares.slice() //Using slice for Immutability
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    })
  }

  //Used to create square components
  //Passing pieces of Board's state into Square components
  //Update Board's state on Square click
  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />
  }
  render() {
    const winner = calculateWinner(this.state.squares)
    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

//Creates overall BOARD component of the page.
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    )
  }
}

//Contains presets for winning conditions in an array.
//Winning Condition is returning an array
//Checks to see if any win conditions exist
function calculateWinner(squares) {
  const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    // console.log('/////////////////// ', 'Loop ' + lines[i])
    // console.log('Value A: ', a)
    // console.log('Value B: ', b)
    // console.log('Value C: ', c)
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // console.log('WINNER', squares[a])
      return squares[a]
    }
  }
  // console.log('NO WINNER')
  return null
}

//================================================

ReactDOM.render(<Game />, document.getElementById('root'))
