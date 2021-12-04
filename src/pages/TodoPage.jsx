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
  fetchNewData,
} from "../redux/actions/todo";

class TodoPage extends React.Component {
  componentDidMount() {
    this.props.fetchTodoGlobal();
    this.props.fetchNewData();
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

  inputHandler = (event) => {
    this.props.inputTodo(event.target.value);
  };

  render() {
    console.log(this.props.todoGlobalState.newData, "<= New Data");
    return (
      <div className="container mt-3">
        <button
          className="btn btn-info"
          onClick={() => this.props.fetchNewData()}
        >
          Get my Todo List {this.props.todoGlobalState.todoCount}
        </button>
        {this.renderToDoList()}
        <div className="mt-3">
          <input type="text" className="mx-3" onChange={this.inputHandler} />
          <button className="btn btn-primary" onClick={this.props.addTodo}>
            Add Todo
          </button>
        </div>
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
  fetchNewData,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
