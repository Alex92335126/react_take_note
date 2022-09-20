import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todo: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    getTodo: (state, action) => {
      state.todo = action.payload;
    },
    addTodo: (state, action) => {
      console.log("action payload", action.payload)
      state.todo.push(action.payload)      
    },
    deleteTodo: (state, action) => {
      const currentState = current(state)
      console.log("current state", currentState.todo)
      const updateList = currentState.todo.filter(todo => todo.id !== action.payload)
      console.log(updateList)
      return updateList
    }
  },
});

// Action creators are generated for each case reducer function
export const { getTodo, addTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;

export const todoThunk = () => async (dispatch) => {
  const token = localStorage.getItem("TOKEN");
  const response = await axios(`${process.env.REACT_APP_BACKEND}/note`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("response thunk", response)
  dispatch(getTodo(response.data));
};

export const addTodoThunk = ({ content }) => async (dispatch) => {
  const token = localStorage.getItem("TOKEN");
  console.log("thunk content", {content})
  const response = await axios.post(`${process.env.REACT_APP_BACKEND}/note`,{
    content
  } ,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("response thunk", response.data)
  dispatch(addTodo({id: response.data[0].id, content}));
};

export const deleteTodoThunk = (id) => async (dispatch) => {
  const token = localStorage.getItem("TOKEN");
  const response = await axios.delete(`${process.env.REACT_APP_BACKEND}/note/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("del response thunk", response.data)
  dispatch(deleteTodo(response.data));
};