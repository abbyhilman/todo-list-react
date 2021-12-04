import React, { useState } from "react";
import Modal from "../component/Modal/Modal";

const TodoItem = (props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="my-1 d-flex flex-row justify-content-between todo-item-container align-items-center">
      {props.todoData.title}
      <div className="div">
        <button
          onClick={() => setShow(true)}
          //   disabled={props.todoData.status}
          className="btn btn-success m-1"
        >
          Detail
        </button>
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
                <th>createdAt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="align-middle">{props.todoData.title}</td>
                <td className="align-middle">{props.todoData.description}</td>
                <td className="align-middle">{props.todoData.status}</td>
                <td className="align-middle">{props.todoData.createdAt}</td>
              </tr>
            </tbody>
            <tfoot className="bg-light">
              <tr>
                <td colSpan="6">
                  <button
                    onClick={props.deleteTodoHandler}
                    className="btn btn-warning m-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={props.deleteTodoHandler}
                    disabled={props.todoData.status}
                    className="btn btn-danger m-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </Modal>
      </div>
    </div>
  );
};

export default TodoItem;
