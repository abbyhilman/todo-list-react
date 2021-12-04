import React from "react";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.css";
import TodoItem from "../component/TodoItem";
import { connect } from "react-redux";
import {
  changeTodoCount,
  fetchTodoGlobal,
  inputTodo,
  completeTodo,
  addTodo,
  deleteTodo,
} from "../redux/actions/todo";

class TodoPage extends React.Component {
  constructor(props) {
    super(props);
    const min = 1;
    const max = 100;
    const rand = min + Math.random() * (max - min);
    var currentdate = new Date();
    var datetime =
      currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate() +
      " " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes();
    this.state = {
      user: {
        id: rand,
        title: "",
        description: "",
        status: 0,
        createdAt: datetime,
      },
      submitted: false,
    };
  }

  componentDidMount() {
    this.props.fetchTodoGlobal();
  }

  renderToDoList = () => {
    return this.props.todoGlobalState.todoList.map((val) => {
      return (
        <TodoItem
          completeTodoHandler={() => this.props.completeTodo(val.id)}
          deleteTodoHandler={() => this.props.deleteTodo(val.id)}
          todoData={val}
        />
      );
    });
  };

  inputHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ user: { ...this.state.user, [name]: value } });
    this.props.inputTodo();
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.addTodo(this.state.user);
  };

  render() {
    const { title, description, status } = this.state.user;
    return (
      <div className="container mt-3">
        <button
          className="btn btn-info"
          onClick={() => this.props.fetchTodoGlobal()}
        >
          Get my Todo List {this.props.todoGlobalState.todoCount}
        </button>
        {this.renderToDoList()}
        <form name="form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="title"
            value={title}
            className="mx-3"
            onChange={this.inputHandler}
          />
          <input
            type="text"
            name="description"
            value={description}
            className="mx-3"
            onChange={this.inputHandler}
          />
          <select
            className="custom-select mx-3"
            value={status}
            name="status"
            id="inlineFormCustomSelect"
            onChange={this.inputHandler}
          >
            <option value="0">0</option>
            <option value="1">1</option>
          </select>
          <button className="btn btn-primary">Add Todo</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todoGlobalState: state.todo,
  };
};

const mapDispatchToProps = {
  changeTodoCount,
  fetchTodoGlobal,
  inputTodo,
  completeTodo,
  addTodo,
  deleteTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
