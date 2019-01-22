import React, { Component } from "react";
import "./ticket.css";

import Icon from "./Icon";

function DidOrNot({ status, ticket, id, onUpdate }) {
  return (
    <div className="didOrNot">
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
      {ticket.status === "desire" || ticket.status === "planned" ? (
        <Icon name="trash-alt" className="theme-trash" />
      ) : (
        ""
      )}
    </div>
  );
}

class Forecasts extends Component {
  updateDone = (e, ticket, id, status) => {
    e.preventDefault();
    let forecasts = ticket.forecasts.filter(forecast => {
      if (forecast.id == id) {
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
  render() {
    const { ticket } = this.props;
    return (
      <div className={`ticket forecasts ${ticket.status} col-md-12`}>
        <ul>
          {ticket.forecasts.map(forecast => (
            <li key={forecast.id} className="onHover">
              {forecast.wording}{" "}
              <DidOrNot
                status={forecast.status}
                ticket={ticket}
                id={forecast.id}
                onUpdate={this.updateDone}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Forecasts;
