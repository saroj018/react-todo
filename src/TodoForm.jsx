import React, { useEffect, useState } from 'react'
import './style.css'
import TodoShow from './TodoShow'

const TodoForm = () => {
    const[todo,setTodo]=useState('')
    const[todos,setTodos]=useState([])
    const[newIndex,setNewIndex]=useState(null)

    function changeTxt(e){
        setTodo(e.target.value)
    }

    function addLocalStorage(todos){
        localStorage.setItem('savetodo',JSON.stringify(todos))
    }

    function showLocalStorage(){
       let showData= localStorage.getItem('savetodo')
      if(showData){
        setTodos(JSON.parse(showData))
      }
    }
    useEffect(()=>{
        showLocalStorage()
    },[])
    
    useEffect(()=>{
        addLocalStorage(todos)
    },[todos])
    


    const clickBtn=()=>{
        if(!todo){
            return
        }

        if(newIndex==null){
            setTodos([...todos,todo])
        }
        else{
            setTodos((ele)=>{
                let update=[...ele]
                update[newIndex]=todo
                return update
            })
            setNewIndex(null)
        }
        setTodo('')
    }

    const enterKey=(e)=>{
        if(e.key==='Enter'){
            clickBtn()
        }
    }
    function delBtn(index){
        let delValue=todos.splice(index,1)
        let filValue=todos.filter((ele)=>ele!==delValue)
        setTodos(filValue)
    }

    function editBtn(index){
        console.log(index);
        setTodo(todos[index])
        setNewIndex(index)
    }
  return (
    <div className='main'>
        <h2 className='header'>TODO LIST</h2>
        <div className='entry'>
        <input onKeyDown={enterKey} onChange={changeTxt} className='input' value={todo} type="text" placeholder='enter your todo' />
        <button onClick={clickBtn} className='btn'>Add</button>
        <TodoShow  todos={todos} editBtn={editBtn} delBtn={delBtn}/>
        </div>
    </div>
  )
}

export default TodoForm