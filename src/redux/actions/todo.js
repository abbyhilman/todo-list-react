import Axios from "axios";
import store from "../store";

export const changeTodoCount = (newCount) => {
  return {
    type: "CHANGE_TODO_COUNT",
    payload: newCount,
  };
};

export const fetchTodoGlobal = () => {
  return (dispatch) => {
    Axios.get("http://localhost:3000/todo")
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "GET_TODO_LIST",
          payload: res.data,
        });

        dispatch({
          type: "CHANGE_TODO_COUNT",
          payload: res.data.length,
        });
      })
      .catch((err) => {
        alert("Terjadi Kesalahan di server!!");
      });
  };
};

export const inputTodo = (input) => {
  return {
    type: "INPUT_TODO",
    payload: input,
  };
};

export const editTodo = (id, user) => {
  return (dispatch) => {
    Axios.put(`http://localhost:3000/todo/${id}`, user)
      .then((res) => {
        console.log(res);
        alert("Berhasil Complete todo!");
        dispatch({
          type: "GET_TODO_LIST",
          payload: store.getState().todo.todoList,
        });
        store.dispatch(fetchTodoGlobal());
      })
      .catch((err) => {
        console.log(err);
        alert("Terjadi Kesalahan di server!!");
      });
  };
};

export const addTodo = (user) => {
  return (dispatch) => {
    Axios.post("http://localhost:3000/todo", user)
      .then(() => {
        alert("Success added Todo");
        dispatch({
          type: "GET_TODO_LIST",
          payload: store.getState().todo.todoList,
        });
        store.dispatch(fetchTodoGlobal());
      })
      .catch((err) => {
        alert("Terjadi Kesalahan di server!!");
      });
  };
};

export const deleteTodo = (id) => {
  return (dispatch) => {
    Axios.delete(`http://localhost:3000/todo/${id}`)
      .then(() => {
        alert("Success delete todo");
        dispatch({
          type: "GET_TODO_LIST",
          payload: store.getState().todo.todoList,
        });
        store.dispatch(fetchTodoGlobal());
      })
      .catch((err) => {
        alert("Terjadi Kesalahan di server!!");
      });
  };
};
