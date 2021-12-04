const initState = {
  todoList: [],
  inputTodo: {
    id: 0,
    title: "",
    description: "",
    status: 0,
    createdAt: "",
  },
  todoCount: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case "CHANGE_TODO_COUNT":
      return {
        ...state,
        todoCount: action.payload,
      };
    case "GET_TODO_LIST":
      return {
        ...state,
        todoList: action.payload,
      };
    case "INPUT_TODO":
      return {
        ...state,
        inputTodo: action.payload,
      };
    default:
      return state;
  }
};
