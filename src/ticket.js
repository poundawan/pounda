import React, { Component } from "react";

import { Modal } from "react-bootstrap";
import TicketDetails from "./ticketDetails.js";
import "./ticket.css";

import Icon from "./Icon";

import { FaceIcons } from "./faceIcons.js";

class Ticket extends Component {
  handleShow = this.handleShow.bind(this);
  handleClose = this.handleClose.bind(this);
  state = {
    show: false,
    showTicket: true,
    detail: this.props.detail
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

  showTicket = (e, show) => {
    e.preventDefault();
    this.setState({ showTicket: show });
  };
  updateRating = (e, ticket, rating) => {
    e.preventDefault();
    ticket.rating = rating;
    this.props.onUpdateTicket(ticket);
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
    const { ticket, status, draggable } = this.props;
    const { showTicket } = this.state;
    const maxLenght = 1000;
    let places = ticket.places;
    if (places.length > maxLenght)
      places = places.substring(0, maxLenght) + " ...";
    return (
      <div
        onDragStart={e => this.onDragStart(e, ticket.id)}
        draggable={draggable}
        className={`ticket ${status} draggable col-md-12`}
      >
        {!this.state.detail ? (
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={e => this.onDeleteTicket(e, ticket.id)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        ) : (
          ""
        )}
        {status === "finished" ? (
          <span className="stack fa-2x ratingIcon">
            <Icon name="circle" className={" iconOutside color" + status} />
            <Icon name={ticket.rating} className=" iconInside" />
          </span>
        ) : (
          ""
        )}
        {ticket.transport.length > 0 &&
        ticket.transport !== "none" &&
        showTicket ? (
          <span className="stack transportIcon">
            <Icon name="circle" className={" iconOutside "} />
            <Icon name={ticket.transport} className=" iconInside" />
          </span>
        ) : (
          ""
        )}
        {!showTicket ? (
          <span
            className={`col-md-12 title-ticket-small ${status}`}
            onClick={e => this.showTicket(e, true)}
          >
            {ticket.title + " "}
            <Icon name="caret-down" />
          </span>
        ) : (
          <div>
            <button
              type="button"
              className="button-show"
              onClick={e => this.showTicket(e, false)}
            >
              <Icon name="caret-up" />
            </button>
            <span className={` title-ticket ${status}`}>{ticket.title}</span>
            {!this.state.detail ? (
              <div className="actionIcon">
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
            ) : (
              ""
            )}
            <div className="">
              {this.state.detail && ticket.places.length > 0 ? (
                <span className="margin-top">{ticket.places}</span>
              ) : (
                ""
              )}
              {ticket.from.length > 0 ? (
                <span className="small italic light">
                  {" " + ticket.from + " "}
                </span>
              ) : (
                ""
              )}
              {ticket.to.length > 0 ? (
                <span className="small italic light">
                  <Icon name="long-arrow-alt-right" />
                  {" " + ticket.to}
                </span>
              ) : (
                ""
              )}

              <div className="margin-top">
                <Icon
                  name="quote-left"
                  className="fa-2x fa-pull-left very-light"
                />
                <span className=" italic light">{ticket.resume}</span>
              </div>
              {status === "finished" && this.state.detail ? (
                <div className="col-md-12 rating">
                  <FaceIcons ticket={ticket} onUpdate={this.updateRating} />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
        {!this.state.detail ? (
          <Modal show={this.state.show} onHide={this.handleClose}>
            <TicketDetails
              ticket={ticket}
              onUpdateTicket={this.props.onUpdateTicket}
              onHide={this.handleClose}
            />
          </Modal>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Ticket;
