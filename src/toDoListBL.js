import React, { Component } from "react";
import "./ticket.css";
import Icon from "./Icon";
import DidOrNot from "./didOrNot.js";

class ToDoListBL extends Component {
  state = {
    showForm: "false",
    id: 0,
    title: "",
    status: "none"
  };

  getLastId = toDoListBL => {
    let todo = "";
    let id = 1;
    if (toDoListBL && toDoListBL.length > 0) {
      todo = toDoListBL[toDoListBL.length - 1];
      id = toDoListBL.id + 1;
    }

    return id;
  };
  showForm = (e, show) => {
    e.preventDefault();
    this.setState({ showForm: show });
  };

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  onUpdateStatut = (e, ticket, id, status) => {
    e.preventDefault();
    let toDoListBL = ticket.toDoListBL.filter(todo => {
      if (todo.id === id) {
        todo.status === status &&
        (ticket.status === "desire" || ticket.status === "planned")
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
    this.props.onUpdateTicket(ticket);
  }
  render() {
    const { ticket } = this.props;
    const { showForm } = this.state;
    let buttonAdd = "";
    //  if (ticket.status !== "finished" && ticket.status !== "current") {
    buttonAdd = (
      <button
        className="btn btn-dark btn-sm btn-block"
        title="Add new ToDo"
        onClick={e => this.showForm(e, "show")}
      >
        Ajouter <Icon name="plus-circle" />
      </button>
    );
    // }
    return (
      <div className={`toDoListBL`}>
        {showForm === "show" ? (
          <div className="col-md-12 detailForm">
            <button
              className="btn btn-dark btn-sm btn-block"
              title="Add new ToDo"
              onClick={e => this.showForm(e, "hidden")}
            >
              Fermer <Icon name="minus-circle" />
            </button>
            <div id="formToDoListBL">
              <form onSubmit={e => this.onSubmit(e, ticket)}>
                <div className="form-group">
                  <label className="col-sm-2 col-form-label">Titre</label>
                  <div className="col-sm-12">
                    <input
                      className="form-control"
                      value={this.state.title}
                      type="text"
                      placeholder=""
                      onChange={e => this.onChangeTitle(e)}
                    />
                  </div>
                </div>
                <div className="btn-group col-md-12">
                  <button
                    className="btn btn-default"
                    onClick={e => this.showForm(e, "hidden")}
                  >
                    Annuler
                  </button>
                  <button className="btn btn-primary" type="submite">
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          buttonAdd
        )}
        <div className="col-md-12">
          {ticket.toDoListBL && ticket.toDoListBL.length > 0 ? (
            <ul>
              <li>
                <span>ToDo</span>
                <span className="right margin-right-20">Fait</span>
              </li>
              {ticket.toDoListBL.map(todo => (
                <li key={todo.id} className="onHover">
                  {todo.title}{" "}
                  <DidOrNot
                    status={todo.status}
                    ticket={ticket}
                    id={todo.id}
                    onUpdate={this.onUpdateStatut}
                    onDelete={this.onDeleteToDo}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <span>Pas de ToDo avant de partir ? Pensez en ajouter.</span>
          )}
        </div>
      </div>
    );
  }
}

export default ToDoListBL;
