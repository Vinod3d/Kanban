import React, { useState } from 'react'
import './Cardinfo.css'
import Modal from '../../Modal/Modal'
import { Calendar, List, Tag, Type } from 'react-feather'
import Editable from '../../Editable/Editable'

const Cardinfo = (props) => {
    const colors = [
        "#a8193d",
        "#4fcc25",
        "#1ebffa",
        "#8da377",
        "#9975bd",
        "#cf61a1",
        "#240959"
    ];

    const [activeColor, setActiveColor] = useState("");
  return (
      <Modal onClose={()=>props.onClose()}>
        <div className="cardinfo">
            <div className="cardinfo_box">
                <div className="cardinfo_box_title"> 
                    <Type/>
                    Title no 1
                </div>
                <div className="cardinfo_box_body">
                    <Editable 
                        text={"Add Title"} 
                        placeholder="Enter Title"
                        buttonText="Set Title"
                    />
                </div>
            </div>

            <div className="cardinfo_box">
                <div className="cardinfo_box_title"> 
                    <List/>
                    Description
                </div>
                <div className="cardinfo_box_body">
                    <Editable 
                    text={"Add Description"} 
                    placeholder="Enter Description" 
                    buttonText="Set Description"
                    />
                </div>
            </div>

            <div className="cardinfo_box">
                <div className="cardinfo_box_title"> 
                    <Calendar/>
                    Date
                </div>
                <div className="cardinfo_box_body">
                   <input type="date" />
                </div>
            </div>

            <div className="cardinfo_box">
                <div className="cardinfo_box_title"> 
                    <Tag/>
                    Labels
                </div>
                <div className="cardinfo_box_colors">
                    {colors.map((item, index)=> <li key={index} style={{backgroundColor:item}}
                        className={item===activeColor ? "active" : ""}
                        onClick={()=>setActiveColor(item)}
                    />)}
                </div>
                <div className="cardinfo_box_body">
                <Editable 
                    text={"Add Title"} 
                    placeholder="Enter Title"
                    buttonText="Add Label"
                />
                </div>
            </div>
        </div>
      </Modal>
  )
}

export default Cardinfo
