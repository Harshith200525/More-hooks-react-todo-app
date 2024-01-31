import { useReducer, useRef } from "react"
import Task from "./Task"
import "./Todo.css"

const intialState = [
    
]

const reducer = (state, action) => {
    switch(action.type){
        case "TOGGLE_TEXT":
            return state.map((el , i) => {
                return i === action.payload ? {...el, isHidden: !el.isHidden} : el
            })
        case "ADD_TASK":
            return [
                ...state,
                {
                    text: action.payload,
                    isHidden: false,
                },
            ]
    }
}

const Todo = () => {
    const [todos, dispatch] = useReducer(reducer, intialState)
    const inputRef = useRef()

    const focus = () => {
        inputRef.current.focus()
    }


  return (
    <div className="main-container">
        <div className="input-container">
        <input type="text" placeholder="What's on your mind?😎" style={{width: "575px", height: "40px", padding: " 3px 5px "}}  ref={inputRef} onKeyDown={
            (e) => {
                if(e.key == "Enter"){
                    dispatch({type: "ADD_TASK", payload: e.target.value})
                    e.target.value =""
                }
            }
        } />
    </div>
    <div className="zed">
        {todos.map((el, i) => (
            <Task key={i} task={el} index={i} dispatch={dispatch} />
        ))}
    </div>
    <div className="focus-btn">
        <button onClick={focus}>Get back to writing</button>
    </div>
    </div>
  )
}

export default Todo