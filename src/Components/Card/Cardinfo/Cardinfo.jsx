import React, { useEffect, useState } from 'react'
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
    const {title, labels, desc, date, tasks} = props.card;
    const [values, setValues] = useState({...props.card});

    const calculatePercent = ()=>{
        if(values.tasks?.length==0) return "0"
        const completed=values.tasks?.filter(item=>item.completed)?.length

        return (completed/values.tasks?.length)*100 + ""
    };

    const addLabel = (value, color)=>{
        const index = values.labels?.findIndex((item)=> item.text=== value);
        if(index>-1) return;

        const label={
            text: value,
            color
        }
        setValues({...values, labels:[...values.labels, label]})
    };

    const removeLabel=(text)=>{
        const index = values.labels?.findIndex((item)=> item.text === text);
        if(index<0) return;

        setValues({...values, labels: values.labels?.splice(index, 1)});
    };

    useEffect(()=>{
        props.updateCard(props.card.id, props.boardId, values)
    },[values])
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
                        text={values.title} 
                        default={values.title}
                        placeholder="Enter Title"
                        buttonText="Set Title"
                        onSubmit={(value)=>setValue({...values, title : value})}
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
                    text={values.desc} 
                    default={values.desc}
                    placeholder="Enter Description" 
                    buttonText="Set Description"
                    onSubmit={(value)=>setValue({...values, desc : value})}
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
                   defaultValue={values.date ? new Date(values.date).toISOString().substr(0, 10) : ""}
                   onChange={(event)=> setValue({...values, date: event.target.value})}
                   />
                </div>
            </div>

            <div className="cardinfo_box">
                <div className="cardinfo_box_title"> 
                    <Tag/>
                    Labels
                </div>
                <div className="cardinfo_box_labels">
                    {
                        values.labels?.map((item, index)=>(
                            <Chip 
                            close 
                            onClose={()=> removeLabel(item.text)} 
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
                    onSubmit={(value)=>addLabel(value, activeColor)}
                />
                </div>
            </div>

            <div className="cardinfo_box">
                <div className="cardinfo_box_title"> 
                    <CheckSquare/>
                    Tasks
                </div>
                <div className="cardinfo_box_progress-bar">
                    <div className="cardinfo_box_progress" style={{width : calculatePercent()+"%"}}/>
                </div>
                <div className="cardinfo_box_list">
                    {
                        values.tasks?.map((item)=>(<div key={item.id} className="cardinfo_task">
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
