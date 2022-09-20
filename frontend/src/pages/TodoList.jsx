import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react"
import { useEffect } from "react"
import Button from 'react-bootstrap/Button';
import { todoThunk, deleteTodoThunk } from "../redux/todoSlice";


export default function TodoList(props) {
    const [list, setList] = useState([])
    const todo = useSelector((state) => state.todoReducer.todo);
    const dispatch = useDispatch();
    useEffect(()=> {
        // console.log(props.links)
        // console.log(props.word)
        // setList(props.links)
        dispatch(todoThunk())
        
    }, [props, list])

    const filteredLinks = todo && todo.filter(list => {
        return list.content.toLowerCase().includes(props.word.toLowerCase())
    });

    const deleteLink = async(id) => {
        console.log("clicked del", id)
        let res = await axios.delete(`http://localhost:8000/${id}`)
        if (res) {
            console.log("succes")
            props.reload()
        }
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="col-md-5">
                    <h3>Content</h3>
                </div>
                <div className="col-md-5">
                    <h3>Remove Note</h3>
                </div>
                
            </div>
            {filteredLinks ? filteredLinks.map((item) => {
                return (
                    <div className="d-flex justify-content-center my-2" key={item.id}>
                        <div className="col-md-5">
                            {item.content} 
                        </div>
                        <div className="col-md-5">
                            <Button variant="success" className="del_button" onClick={() => dispatch(deleteTodoThunk(item.id))}>
                                Delete
                            </Button>
                        </div>
                        
                    </div>
                )
            }):null}
        </>
    )
}
