import React, { useState } from "react";
import { connect } from "react-redux";

import { editTodo } from "../redux/actions/todo";
import Modal from "../component/Modal/Modal";

const TodoItem2 = (props) => {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({
    id: props.todoData.id,
    title: "",
    description: "",
    status: parseInt(0),
    createdAt: props.todoData.createdAt,
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleClick = () => {
    setEdit(false);
    const data = {
      ...props.todoData,
      ...user,
    };
    props.editTodo(props.todoData.id, data);
  };

  return (
    <div className="mx-auto d-flex flex-row todo-item-container align-items-center">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Date</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody className="table-light">
          <tr>
            <td className="align-middle">{props.todoData.title}</td>
            <td className="align-middle">{props.todoData.status}</td>
            <td className="align-middle">{props.todoData.createdAt}</td>
            <td className="align-middle">
              <button
                onClick={() => setShow(true)}
                className="btn btn-success m-1"
              >
                Detail
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="div">
        <Modal
          title="Todo List Detail"
          onClose={() => setShow(false)}
          show={show}
        >
          <table className="table">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>description</th>
                <th>status</th>
                {edit ? null : <th>createdAt</th>}
              </tr>
            </thead>
            <tbody>
              {edit ? (
                <tr>
                  <td className="align-middle">
                    <input
                      type="text"
                      name="title"
                      value={user.title || props.todoData.title}
                      className="form-control"
                      onChange={inputHandler}
                    />
                  </td>
                  <td className="align-middle">
                    <input
                      type="text"
                      name="description"
                      value={user.description || props.todoData.description}
                      className="form-control"
                      onChange={inputHandler}
                    />
                  </td>
                  <select
                    className="form-control mt-1"
                    value={user.status || props.todoData.status}
                    name="status"
                    id="inlineFormCustomSelect"
                    onChange={inputHandler}
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                  </select>
                </tr>
              ) : (
                <tr>
                  <td className="align-middle">{props.todoData.title}</td>
                  <td className="align-middle">{props.todoData.description}</td>
                  <td className="align-middle">{props.todoData.status}</td>
                  <td className="align-middle">{props.todoData.createdAt}</td>
                </tr>
              )}
            </tbody>
            <tfoot className="bg-light">
              <tr>
                <td colSpan="6">
                  <button
                    onClick={() => setEdit(true)}
                    className="btn btn-warning m-1"
                  >
                    Edit
                  </button>
                  {edit ? (
                    <button
                      onClick={handleClick}
                      className="btn btn-success m-1"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={props.deleteTodoHandler}
                      disabled={props.todoData.status}
                      className="btn btn-danger m-1"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </Modal>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todoGlobalState: state.todo,
  };
};

export default connect(mapStateToProps, {
  editTodo,
})(TodoItem2);
