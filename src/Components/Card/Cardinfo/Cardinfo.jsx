import React, { useState } from 'react'
import './Cardinfo.css'
import Modal from '../../Modal/Modal'
import { Calendar, CheckSquare, List, Tag, Trash, Type } from 'react-feather'
import Editable from '../../Editable/Editable'
import Chip from '../../Chip/Chip'

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
    const {title, labels, desc, date, tasks} = props.card
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
                        text={title} 
                        default={title}
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
                    text={desc} 
                    default={desc}
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
                   <input type="date" 
                   defaultValue={date ? new Date(date).toISOString().substr(0, 10) : ""}/>
                </div>
            </div>

            <div className="cardinfo_box">
                <div className="cardinfo_box_title"> 
                    <Tag/>
                    Labels
                </div>
                <div className="cardinfo_box_labels">
                    {
                        labels?.map((item, index)=>(
                            <Chip 
                            close 
                            onClose={()=>console.log("chip")} 
                            key={item.tex+index}
                            color={item.color}
                            text={item.text}
                            />
                        ))
                    }
                </div>
                <div className="cardinfo_box_colors">
                    {colors.map((item, index)=> <li key={index} style={{backgroundColor:item}}
                        className={item===activeColor ? "active" : ""}
                        onClick={()=>setActiveColor(item)}
                    />)}
                </div>
                <div className="cardinfo_box_body">
                <Editable 
                    text={"Add Label"} 
                    placeholder="Enter Label"
                    buttonText="Add Label"
                />
                </div>
            </div>

            <div className="cardinfo_box">
                <div className="cardinfo_box_title"> 
                    <CheckSquare/>
                    Tasks
                </div>
                <div className="cardinfo_box_progress-bar">
                    <div className="cardinfo_box_progress" style={{width : "30%"}}/>
                </div>
                <div className="cardinfo_box_list">
                    {
                        tasks?.map((item)=>(<div key={item.id} className="cardinfo_task">
                        <input type="checkbox" defaultValue={item.completed}/>
                        <p>{item.text}</p>
                        <Trash/>
                    </div>))
                    }
                    
                </div>
                <div className="cardinfo_box_body">
                <Editable 
                    text={"Add Task"} 
                    placeholder="Enter Task"
                    buttonText="Add Task"
                />
                </div>
            </div>
        </div>
      </Modal>
  )
}

export default Cardinfo
