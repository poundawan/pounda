import React, { Component } from "react";

import { Modal } from "react-bootstrap";
import TicketDetails from "./ticketDetails.js";
import "./ticket.css";

import Icon from "./Icon";

class Ticket extends Component {
  handleShow = this.handleShow.bind(this);
  handleClose = this.handleClose.bind(this);
  state = {
    show: false
  };
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  };

  updateRating = (e, id, rating) => {
    e.preventDefault();
    this.props.onUpdateTicketRating(id, rating);
  };

  showForm = (e, id) => {
    e.preventDefault();
    this.props.showForm(id);
  };

  onDeleteTicket = (ev, id) => {
    ev.preventDefault();
    this.props.onDeleteTicket(id);
  };
  render() {
    const { ticket, status } = this.props;
    const maxLenght = 30;
    let classDate = "col-md-12";
    if (ticket.to.length > 0) classDate = "col-md-6";
    let places = ticket.places;
    if (places.length > maxLenght)
      places = places.substring(0, maxLenght) + " ...";
    return (
      <div
        onDragStart={e => this.onDragStart(e, ticket.id)}
        draggable
        className={`ticket ${status} draggable col-md-12`}
      >
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={e => this.onDeleteTicket(e, ticket.id)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <h3>{ticket.title}</h3>
        <div className="container-fluid">
          {ticket.places.length > 0 ? (
            <span className="col-md-12" title={ticket.places}>
              Lieux: {places}
            </span>
          ) : (
            ""
          )}
          {ticket.from.length > 0 ? (
            <span className={classDate}>Du: {ticket.from}</span>
          ) : (
            ""
          )}
          {ticket.to.length > 0 ? (
            <span className="col-md-6">au: {ticket.to}</span>
          ) : (
            ""
          )}
          {ticket.transport.length > 0 && ticket.transport !== "none" ? (
            <span className="col-md-12">
              <Icon name={ticket.transport} />
            </span>
          ) : (
            ""
          )}
          <span className="col-md-12">{ticket.resume}</span>
          {status === "finished" ? (
            <div className="col-md-12 rating">
              <Icon
                name="angry"
                className={ticket.rating === "angry" ? "rating-selected" : ""}
                onClick={e => this.updateRating(e, ticket.id, "angry")}
              />
              <Icon
                name="frown"
                className={ticket.rating === "frown" ? "rating-selected" : ""}
                onClick={e => this.updateRating(e, ticket.id, "frown")}
              />
              <Icon
                name="meh"
                className={ticket.rating === "meh" ? "rating-selected" : ""}
                onClick={e => this.updateRating(e, ticket.id, "meh")}
              />
              <Icon
                name="smile"
                className={ticket.rating === "smile" ? "rating-selected" : ""}
                onClick={e => this.updateRating(e, ticket.id, "smile")}
              />
              <Icon
                name="grin-alt"
                className={
                  ticket.rating === "grin-alt" ? "rating-selected" : ""
                }
                onClick={e => this.updateRating(e, ticket.id, "grin-alt")}
              />
              <Icon
                name="grin-stars"
                className={
                  ticket.rating === "grin-stars" ? "rating-selected" : ""
                }
                onClick={e => this.updateRating(e, ticket.id, "grin-stars")}
              />
            </div>
          ) : (
            ""
          )}
          <div>
            <span
              aria-hidden="true"
              title="edit"
              className="action-icon"
              onClick={e => this.showForm(e, ticket.id)}
            >
              <Icon name="edit" />
            </span>
            <span className="action-icon" title="See more informations">
              <Icon name="info-circle" onClick={this.handleShow} />
            </span>
          </div>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <TicketDetails ticket={ticket} />
        </Modal>
      </div>
    );
  }
}
export default Ticket;
