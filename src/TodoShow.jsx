import React, { useState } from 'react';
import './style.css';

const TodoShow = ({ todos, delBtn,editBtn }) => {
  const [lineCut, setLineCut] = useState(todos.map(() => false));

  const lineClick = (index) => {
    setLineCut((ele)=>{
        let newValue=[...ele]
        newValue[index]=!newValue[index]
        return newValue
    })
  };

  

  return (
    <div>
      {todos.map((ele, index) => {
        const textDecor = {
          textDecoration: lineCut[index] ? 'line-through' : 'none'
        };
        return (
          <div className='todolist' key={index}>
            <span onClick={() => lineClick(index)} className='todo' style={textDecor}>
              {ele}
            </span>
            <button className='del' onClick={() => delBtn(index)}>
              Delete
            </button>
            <button className='del' onClick={()=>editBtn(index)}>Edit</button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoShow;
