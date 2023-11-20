import React from 'react'
import './Board.css'
import {MoreHorizontal} from 'react-feather'

const Board = () => {
  return (
    <div className='board'>
        <div className="board_top">
            <p className="board_top_title">To Do  <span>2</span></p>
            <MoreHorizontal/>
        </div>

        <div className="board_cards">
            <h1>Card 1</h1>
            <h1>Card 2</h1>
        </div>
    </div>
  )
}

export default Board
 