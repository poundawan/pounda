import React, { Component } from "react";
import "./ticket.css";
import Icon from "./Icon";

class ToDoListBL extends Component {
  state = {
    id: 0,
    title: "",
    status: "none"
  };

  getLastId = toDoListBL => {
    let todo = "";
    let id = 1;
    if (toDoListBL && toDoListBL.length > 0) {
      todo = toDoListBL[toDoListBL.length - 1];
      id = parseInt(todo.id) + 1;
    }
    return id;
  };

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  onUpdateStatut = (e, ticket, id, status) => {
    e.preventDefault();
    let toDoListBL = ticket.toDoListBL.filter(todo => {
      if (todo.id === id) {
        todo.status === status
          ? (todo.status = "none")
          : (todo.status = status);
      }
      return todo;
    });
    ticket.toDoListBL = toDoListBL;
    this.props.onUpdateTicket(ticket);
  };

  onDeleteToDo = (e, ticket, id) => {
    e.preventDefault();
    let index = ticket.toDoListBL.findIndex(x => x.id === id);
    ticket.toDoListBL.splice(index, 1);
    this.props.onUpdateTicket(ticket);
  };

  onSubmit(e, ticket) {
    e.preventDefault();
    if (this.state.title.length === 0) return alert("Titre vide");
    let id = 1;
    !ticket.toDoListBL
      ? (ticket.toDoListBL = [])
      : (id = this.getLastId(ticket.toDoListBL));
    ticket.toDoListBL.push({
      id: id,
      title: this.state.title,
      status: this.state.status
    });
    this.setState({ title: "" });
    this.props.onUpdateTicket(ticket);
  }
  render() {
    const { ticket } = this.props;

    return (
      <div className="toDoListBL">
        <div className="col-md-12">
          {ticket.toDoListBL && ticket.toDoListBL.length > 0 ? (
            <ul>
              <li>
                <span className="bold">ToDo</span>
              </li>
              {ticket.toDoListBL.map(todo => (
                <li
                  key={todo.id}
                  className={"onHover " + todo.status}
                  onClick={e => this.onUpdateStatut(e, ticket, todo.id, "done")}
                >
                  <span>{todo.title}</span>
                  <span className="action-icon">
                    <Icon
                      name="trash-alt"
                      title="Supprimer"
                      className="theme-trash"
                      onClick={e => this.onDeleteToDo(e, ticket, todo.id)}
                    />
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <span>
              Ne laissez rien au hasard! Pensez à toutes vos démarches avant de
              partir (visa, vaccin, devise , ...).
            </span>
          )}
        </div>
        <div className="col-md-12 detailForm">
          <div id="formToDoListBL">
            <form className="" onSubmit={e => this.onSubmit(e, ticket)}>
              <div className="col-md-9 no-padding">
                <input
                  className="form-control"
                  value={this.state.title}
                  type="text"
                  placeholder="Que devez-vous faire avant de partir ?"
                  onChange={e => this.onChangeTitle(e)}
                />
              </div>
              <div className="col-md-3 no-padding">
                <button className="btn btn-primary" type="submite">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ToDoListBL;
