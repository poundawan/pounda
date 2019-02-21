import React, { Component } from "react";
import "./ticket.css";
import DidOrNot from "./didOrNot.js";

class MyLuggage extends Component {
  state = {
    id: 0,
    title: "",
    status: "none"
  };

  getLastId = myLuggage => {
    let item = "";
    let id = 1;
    if (myLuggage && myLuggage.length > 0) {
      item = myLuggage[myLuggage.length - 1];
      id = parseInt(item.id) + 1;
    }

    return id;
  };

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  onUpdateStatut = (e, ticket, id, status) => {
    e.preventDefault();
    let myLuggage = ticket.myLuggage.filter(item => {
      if (item.id === id) {
        item.status === status
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
    this.setState({ title: "" });
    this.props.onUpdateTicket(ticket);
  }
  render() {
    const { ticket } = this.props;
    return (
      <div className="myLuggage">
        <div className="col-md-12">
          {ticket.myLuggage && ticket.myLuggage.length > 0 ? (
            <ul>
              <li>
                <span className="bold">Items</span>
                <span className="bold">Dedans</span>
              </li>
              {ticket.myLuggage.map(item => (
                <li
                  key={item.id}
                  className={"onHover " + item.status}
                  onClick={e => this.onUpdateStatut(e, ticket, item.id, "done")}
                >
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
        <div className="col-md-12 detailForm">
          <div id="formMyLuggage">
            <form className="" onSubmit={e => this.onSubmit(e, ticket)}>
              <div className="col-md-9 no-padding">
                <input
                  className="form-control"
                  value={this.state.title}
                  type="text"
                  placeholder="Remplissez votre valise."
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

export default MyLuggage;
