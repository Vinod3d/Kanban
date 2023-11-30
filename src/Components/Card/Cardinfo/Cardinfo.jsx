import React from 'react'
import './Cardinfo.css'
import Modal from '../../Modal/Modal'

const Cardinfo = (props) => {
  return (
      <Modal onClose={()=>props.onClose()}>
        <div className="cardinfo">
            <div className="cardinfo_box">
                <div className="cardinfo_box_title"> </div>
            </div>
        </div>
      </Modal>
  )
}

export default Cardinfo
