import { useEffect, useState } from 'react'
import './App.css'
import Board from './Components/Board/Board'
import Editable from './Components/Editable/Editable'

function App() {
  // const [boards, setBoards]= useState([
  //   {
  //     id:Date.now() + Math.random()*2,
  //     title:"To Do",
  //     cards:[
  //       {
  //         id : Date.now()+Math.random(),
  //         title: "Card 1",
  //         tasks : [],
  //         labels : [
  //           {
  //             text : "frontend",
  //             color: "blue",
  //           },
  //         ],
  //         desc : "hlojhs fslhl fswlhlh",
  //         date: "",
  //       },
  //       {
  //         id : Date.now()+Math.random(),
  //         title: "Card 2",
  //         tasks : [],
  //         labels : [
  //           {
  //             text : "backend",
  //             color: "brown",
  //           },
  //         ],
  //         desc : "hlojhs fslhl fswlhlh",
  //         date: "",
  //       },
  //     ]
  //   }
  // ]);

  const [boards, setBoards]= useState(JSON.parse(localStorage.getItem("kanban")) || [])

  const [target, setTarget] = useState([
    {cid: "",
    bid: "",}
  ]);

  const addCard = (title, bid) => {
    const card = {
      id : Date.now()+Math.random(),
      title: title,
      tasks : [],
      labels : [],
      desc : "",
      date: "",
    };

    const index= boards.findIndex(item=>item.id===bid)
    if(index<0) return;

    const tempBoards = [...boards]
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);
  };

  const removeCard = (cid, bid) => {
    const bIndex = boards.findIndex((item)=> item.id === bid);
    if(bIndex<0) return;

    const cIndex = boards[bIndex].cards.findIndex((item)=> item.id === cid);
    if(cIndex<0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards.splice(cIndex, 1);
    setBoards(tempBoards);
  };

  const addBoard = (title) => {
    setBoards([
      ...boards,
      {
        id : Date.now() + Math.random(),
        title,
        cards: [],
      },
    ]);
  };

  const removeBoard = (bid)=>{
    const tempBoards = boards.filter((item)=> item.id !== bid);
    setBoards(tempBoards);
  };

  const handleDragEnter = (cid, bid) => {
    setTarget({
      cid,
      bid
    });
  };
  const handleDragEnd = (cid, bid) => {
    let s_bIndex, s_cIndex, t_bIndex, t_cIndex

    s_bIndex = boards.findIndex((item)=> item.id === bid);
    if(s_bIndex<0) return;

    s_cIndex = boards[s_bIndex].cards.findIndex((item)=> item.id === cid);
    if(s_cIndex<0) return;


    t_bIndex = boards.findIndex((item)=> item.id === target.bid);
    if(t_bIndex<0) return;

    t_cIndex = boards[t_bIndex].cards.findIndex((item)=> item.id === target.cid);
    if(t_cIndex<0) return;
    console.log(t_cIndex);


    const tempBoards=[...boards]
    const tempCard=tempBoards[s_bIndex].cards[s_cIndex]

    tempBoards[s_bIndex].cards.splice(s_cIndex, 1)
    tempBoards[t_bIndex].cards.splice(t_cIndex, 0, tempCard);

    setBoards(tempBoards)
  };
  


  const updateCard=(cid, bid, card)=>{
    const bIndex = boards.findIndex((item)=> item.id === bid);
    if(bIndex < 0) return;
    const cIndex = boards[bIndex].cards.findIndex((item)=> item.id === cid);
    if(cIndex < 0) return;
    
    const tempBoards = [...boards];
    tempBoards[bIndex].cards[cIndex] = card;
    setBoards(tempBoards);
  }

  useEffect(()=>{
    localStorage.setItem("kanban", JSON.stringify(boards));
  }, [boards]);
  return (
    <div className='app'>
        <div className="app_navbar">
          <h1>Kanban</h1>
        </div>

        <div className="app_outer">
          <div className="app_boards">
            {boards.map((item)=>(
              <Board 
                key={item.id} 
                board={item}
                removeBoard={removeBoard}
                addCard={addCard}
                removeCard={removeCard}
                handleDragEnd={handleDragEnd}
                handleDragEnter={handleDragEnter}
                updateCard={updateCard}
              />
            ))}
          
            <div className="app_boards_board">
              <Editable
                displayClass="app_boards_board_add"
                text="Add Board"
                placeholder="Enter board title"
                onSubmit={(value)=> addBoard(value)}
              />
            </div>
          </div>
        </div>
    </div>
  )
}

export default App
