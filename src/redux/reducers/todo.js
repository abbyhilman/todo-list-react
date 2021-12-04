const initState = {
  todoList: [],
  newData: [],
  inputTodo: "",
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
    case "NEW_DATA":
      return {
        ...state,
        newData: [...state.newData, action.payload],
      };
    // break;
    default:
      return state;
  }
};
