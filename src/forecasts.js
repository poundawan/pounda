import React, { Component } from "react";
import "./ticket.css";
import Icon from "./Icon";
import Priority from "./Priority";
import DidOrNot from "./didOrNot.js";

class Forecasts extends Component {
  state = {
    showForm: "false",
    id: 0,
    title: "",
    status: "none",
    priority: 0
  };

  getLastId = forecasts => {
    let forecast = "";
    let id = 1;
    if (forecasts && forecasts.length > 0) {
      forecast = forecasts[forecasts.length - 1];
      id = forecast.id + 1;
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
    let forecasts = ticket.forecasts.filter(forecast => {
      if (forecast.id === id) {
        forecast.status === status
          ? (forecast.status = "none")
          : (forecast.status = status);
      }
      return forecast;
    });
    ticket.forecasts = forecasts;
    this.props.onUpdateTicket(ticket);
  };

  onUpdatePriority = (e, ticket, id, priority) => {
    e.preventDefault();
    let forecasts = ticket.forecasts.filter(forecast => {
      if (forecast.id === id) {
        forecast.priority = priority;
      }
      return forecast;
    });
    ticket.forecasts = forecasts;
    this.props.onUpdateTicket(ticket);
  };

  onDeleteForecast = (e, ticket, id) => {
    e.preventDefault();
    let index = ticket.forecasts.findIndex(x => x.id === id);
    ticket.forecasts.splice(index, 1);
    this.props.onUpdateTicket(ticket);
  };

  onSubmit(e, ticket) {
    e.preventDefault();
    if (this.state.title.length === 0) return alert("Titre vide");
    let id = 1;
    !ticket.forecasts
      ? (ticket.forecasts = [])
      : (id = this.getLastId(ticket.forecasts));
    ticket.forecasts.push({
      id: id,
      title: this.state.title,
      status: this.state.status,
      priority: 0
    });
    this.setState({ title: "" });
    this.props.onUpdateTicket(ticket);
  }
  render() {
    const { ticket } = this.props;
    const { showForm } = this.state;
    let buttonAdd = "";
    //if (ticket.status !== "finished") {
    buttonAdd = (
      <button
        className="btn btn-dark btn-sm btn-block"
        title="Add new forecast"
        onClick={e => this.showForm(e, "show")}
      >
        Ajouter <Icon name="plus-circle" />
      </button>
    );
    // }
    return (
      <div className="forecasts">
        <div className="col-md-12">
          {ticket.forecasts && ticket.forecasts.length > 0 ? (
            <ul>
              <li>
                <span>Priorité</span>
                {ticket.status === "finished" || ticket.status === "current" ? (
                  <span className="right margin-right-20">Fait</span>
                ) : (
                  <span className="right">Supprimer</span>
                )}
              </li>
              {ticket.forecasts.map(forecast => (
                <li
                  key={forecast.id}
                  className={"onHover " + forecast.status}
                  onClick={e =>
                    this.onUpdateStatut(e, ticket, forecast.id, "done")
                  }
                >
                  {forecast.title}{" "}
                  <Priority
                    priority={forecast.priority}
                    id={forecast.id}
                    ticket={ticket}
                    onUpdate={this.onUpdatePriority}
                  />
                  <DidOrNot
                    status={forecast.status}
                    ticket={ticket}
                    id={forecast.id}
                    onUpdate={this.onUpdateStatut}
                    onDelete={this.onDeleteForecast}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <span>
              Un ville? Un monument? Un lac? Un restaurant? Ajoutez les
              incontournables ici.
            </span>
          )}
        </div>
        <div className="col-md-12 detailForm">
          <div id="formForecast ">
            <form className="" onSubmit={e => this.onSubmit(e, ticket)}>
              <div className="col-md-9 no-padding">
                <input
                  className="form-control"
                  value={this.state.title}
                  type="text"
                  placeholder="Un ville? Un monument? Un lac? ..."
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

export default Forecasts;
