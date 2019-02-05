import React, { Component } from "react";
import "./ticket.css";
import Icon from "./Icon";
import DidOrNot from "./didOrNot.js";

class MyLuggage extends Component {
  state = {
    showForm: "false",
    id: 0,
    title: "",
    status: "none"
  };

  getLastId = myLuggage => {
    let item = "";
    let id = 1;
    if (myLuggage && myLuggage.length > 0) {
      item = myLuggage[myLuggage.length - 1];
      id = myLuggage.id + 1;
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
    let myLuggage = ticket.myLuggage.filter(item => {
      if (item.id === id) {
        item.status === status &&
        (ticket.status === "desire" || ticket.status === "planned")
          ? (item.status = "none")
          : (item.status = status);
      }
      return item;
    });
    ticket.myLuggage = myLuggage;
    this.props.onUpdateTicket(ticket);
  };

  onDeleteItem = (e, ticket, id) => {
    e.preventDefault();
    let index = ticket.myLuggage.findIndex(x => x.id === id);
    ticket.myLuggage.splice(index, 1);
    this.props.onUpdateTicket(ticket);
  };

  onSubmit(e, ticket) {
    e.preventDefault();
    if (this.state.title.length === 0) return alert("Titre vide");
    let id = 1;
    !ticket.myLuggage
      ? (ticket.myLuggage = [])
      : (id = this.getLastId(ticket.myLuggage));
    ticket.myLuggage.push({
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
    // if (ticket.status !== "finished" && ticket.status !== "current") {
    buttonAdd = (
      <button
        className="btn btn-dark btn-sm btn-block"
        title="Add new item"
        onClick={e => this.showForm(e, "show")}
      >
        Ajouter <Icon name="plus-circle" />
      </button>
    );
    // }
    return (
      <div className={`myLuggage`}>
        {showForm === "show" ? (
          <div className="col-md-12 detailForm">
            <button
              className="btn btn-dark btn-sm btn-block"
              title="Add new ToDo"
              onClick={e => this.showForm(e, "hidden")}
            >
              Fermer <Icon name="minus-circle" />
            </button>
            <div id="formMyLuggage">
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
          {ticket.myLuggage && ticket.myLuggage.length > 0 ? (
            <ul>
              <li>
                <span>Items</span>
                <span className="right margin-right-20">Dedans</span>
              </li>
              {ticket.myLuggage.map(item => (
                <li key={item.id} className="onHover">
                  {item.title}{" "}
                  <DidOrNot
                    status={item.status}
                    ticket={ticket}
                    id={item.id}
                    onUpdate={this.onUpdateStatut}
                    onDelete={this.onDeleteItem}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <span>Toujours rien dans votre valise ? Pensez à la remplir.</span>
          )}
        </div>
      </div>
    );
  }
}

export default MyLuggage;
