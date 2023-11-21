import React from 'react'
import './Card.css'
import { CheckSquare, Clock, MoreHorizontal } from 'react-feather'
import Chip from '../Chip/Chip'

const Card = () => {
  return (
    <div className='card'>
        <div className="card_top">
          <div className="card_top_labels">
            <Chip text="frontend" color="green"/>
            {/* <Chip close text="frontend" color="green"/> */}
          </div>
          <MoreHorizontal/>
        </div>

        <div className="card_title">title</div>
        <div className="card_footer">
          <p><Clock/> 29 Sept</p>
          <p><CheckSquare/> 1/4</p>
        </div>
    </div>
  )
}

export default Card
