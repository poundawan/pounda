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
    let placesArray = [];
    let places = "";
    let ticketClass = status + " col-md-12";
    let transportsLength = ticket.transports.length;
    if (this.state.detail) {
      if (ticket.places.length > 0) {
        places = ticket.places.map(place => {
          placesArray.push(place.country);
        });
        places = placesArray.join(" • ");
      }
    } else {
      ticketClass += " draggable ticket";
    }
    return (
      <div
        onDragStart={e => this.onDragStart(e, ticket.id)}
        draggable={draggable}
        className={ticketClass}
      >
        {status === "finished" && !this.state.detail ? (
          <span className="stack fa-2x ratingIcon">
            <Icon name="circle" className={" iconOutside color" + status} />
            <Icon name={ticket.rating} className=" iconInside" />
          </span>
        ) : (
          ""
        )}

        <div>
          <span className={` title-ticket ${status}`}>{ticket.title}</span>
          {ticket.transports.length > 0 && showTicket ? (
            ticket.transports.length < 4 || this.state.detail ? (
              <div className="transportsIcon">
                {ticket.transports.map(transport => {
                  return (
                    <span>
                      <Icon name={transport} className="iconTransport" />
                    </span>
                  );
                })}
              </div>
            ) : (
              <div className="transportsIcon">
                <span>
                  <Icon name={ticket.transports[0]} className="iconTransport" />
                </span>
                <span>
                  <Icon name={ticket.transports[1]} className="iconTransport" />
                </span>
                <span className="iconTransport">(+{transportsLength - 2})</span>
              </div>
            )
          ) : (
            ""
          )}
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
              <span className="action-icon" title="See more informations">
                <Icon
                  name="trash"
                  onClick={e => this.onDeleteTicket(e, ticket.id)}
                />
              </span>
            </div>
          ) : (
            ""
          )}
          <div className="">
            {this.state.detail && ticket.places.length > 0 ? (
              <span className="margin-top">{places.toString()}</span>
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
            {ticket.resume.length > 0 ? (
              <div className="margin-top">
                <Icon
                  name="quote-left"
                  className="fa-2x fa-pull-left very-light"
                />
                <span className=" italic light">{ticket.resume}</span>
              </div>
            ) : (
              ""
            )}
            {status === "finished" && this.state.detail ? (
              <div className="col-md-12 rating">
                <FaceIcons ticket={ticket} onUpdate={this.updateRating} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
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
