import React from "react";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.css";
import TodoItem from "../component/TodoItem";
import TodoItem2 from "../component/TodoItem2";
import { connect } from "react-redux";
import {
  changeTodoCount,
  fetchTodoGlobal,
  inputTodo,
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
        status: parseInt(0),
        createdAt: datetime,
      },
      submitted: false,
    };
  }

  componentDidMount() {
    this.props.fetchTodoGlobal();
  }

  TableStatus = () => {
    const sortedStatus0 = this.props.todoGlobalState.todoList.sort(
      (a, b) =>
        new Date(...a.createdAt.split("/")) -
        new Date(...b.createdAt.split("/"))
    );
    return sortedStatus0.map((val) => {
      if (val.status === 0 || val.status === "0") {
        return (
          <TodoItem
            deleteTodoHandler={() => this.props.deleteTodo(val.id)}
            todoData={val}
          />
        );
      }
    });
  };

  renderToDoList = () => {
    const sortedStatus1 = this.props.todoGlobalState.todoList.sort(
      (b, a) =>
        new Date(...a.createdAt.split("/")) -
        new Date(...b.createdAt.split("/"))
    );
    return sortedStatus1.map((val) => {
      if (val.status === 1 || val.status === "1") {
        return (
          <TodoItem2
            deleteTodoHandler={() => this.props.deleteTodo(val.id)}
            todoData={val}
          />
        );
      }
    });
  };

  inputHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ user: { ...this.state.user, [name]: value } });
  };

  handleSubmit = (e) => {
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
    e.preventDefault();

    this.props.addTodo(this.state.user);

    this.setState({
      user: {
        id: "",
        title: "",
        description: "",
        status: parseInt(0),
        createdAt: datetime,
      },
    });
  };

  render() {
    console.log(this.props.todoGlobalState.todoList);
    const { title, description, status } = this.state.user;
    return (
      <div className="container mt-3">
        <button
          className="btn btn-info"
          onClick={() => this.props.fetchTodoGlobal()}
        >
          Get my Todo List {this.props.todoGlobalState.todoCount}
        </button>
        <div className="row">
          <div className="col">{this.TableStatus()}</div>
          <div className="col">{this.renderToDoList()}</div>
        </div>
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
  addTodo,
  deleteTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
