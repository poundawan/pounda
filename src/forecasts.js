import React, { Component } from "react";
import "./ticket.css";
import Icon from "./Icon";
import Priority from "./Priority";

function DidOrNot({ status, ticket, id, onUpdate, onDelete }) {
  return (
    <div className="didOrNot">
      {ticket.status === "desire" || ticket.status === "planned" ? (
        <Icon
          name="trash-alt"
          title="Supprimer"
          className="theme-trash"
          onClick={e => onDelete(e, ticket, id)}
        />
      ) : (
        <div title="Fait ou pas fait">
          <Icon
            name="thumbs-up"
            className={`${status === "done" ? "active" : ""} theme-done`}
            onClick={e => onUpdate(e, ticket, id, "done")}
          />
          <Icon
            name="thumbs-down"
            className={`${status === "fail" ? "active" : ""} theme-fail`}
            onClick={e => onUpdate(e, ticket, id, "fail")}
          />
        </div>
      )}
    </div>
  );
}

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
        forecast.status === status &&
        (ticket.status === "desire" || ticket.status === "planned")
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
        forecast.priority === priority
          ? (forecast.priority = priority - 1)
          : (forecast.priority = priority);
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
      status: this.state.status
    });
    this.props.onUpdateTicket(ticket);
  }
  render() {
    const { ticket } = this.props;
    const { showForm } = this.state;
    return (
      <div className={`ticket forecasts ${ticket.status} col-md-12`}>
        {showForm === "show" ? (
          <div className="col-md-12">
            <span
              className={`action-icon`}
              title="Add new forecast"
              onClick={e => this.showForm(e, "hidden")}
            >
              <Icon name="minus-circle" />
            </span>
            <div id="formForecast">
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
          <span
            className={`action-icon`}
            title="Add new forecast"
            onClick={e => this.showForm(e, "show")}
          >
            <Icon name="plus-circle" />
          </span>
        )}
        <div className="col-md-12">
          {ticket.forecasts && ticket.forecasts.length > 0 ? (
            <ul>
              {ticket.forecasts.map(forecast => (
                <li key={forecast.id} className="onHover">
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
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Forecasts;
