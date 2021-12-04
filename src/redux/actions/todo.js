import Axios from "axios";
import store from "../store";

const url = "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list";

export const changeTodoCount = (newCount) => {
  return {
    type: "CHANGE_TODO_COUNT",
    payload: newCount,
  };
};

export const fetchTodoGlobal = () => {
  return (dispatch) => {
    Axios.get(url)
      .then((res) => {
        store.subscribe(() => {
          localStorage.setItem("reduxState", JSON.stringify(res.data));
        });
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

export const fetchNewData = () => {
  return (dispatch) => {
    if (!store.getState().todo.newData.length) {
      dispatch({
        type: "NEW_DATA",
        payload: store.getState(),
      });
    }

    dispatch({
      type: "CHANGE_TODO_COUNT",
      payload: store.getState().todo.newData.length,
    });
  };
};

export const inputTodo = (input) => {
  return {
    type: "INPUT_TODO",
    payload: input,
  };
};

export const completeTodo = (id) => {
  return (dispatch) => {
    Axios.patch(`${url}/${id}`, {
      isFinished: true,
    })
      .then(() => {
        alert("Berhasil Complete todo!");
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

export const addTodo = () => {
  return (dispatch) => {
    Axios.post(`${url}`, {
      id: store.getState().todo.inputTodo,
      // isFinished: false,
    })
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
    try {
      alert("Success delete todo");
      dispatch({
        type: "GET_TODO_LIST",
        payload: store
          .getState()
          .todo.newData.filter((item) => !item.id !== id),
      });
      store.dispatch(fetchTodoGlobal());
    } catch (error) {
      alert("Terjadi Kesalahan di server!!");
    }
  };
};
