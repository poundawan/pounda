import React, { Component } from "react";

import Icon from "./Icon";
import { Navbar, Nav, NavItem } from "react-bootstrap";

class TicketDetails extends Component {
  state = {
    display: "general"
  };
  render() {
    const { ticket } = this.props;
    let classDate = "col-md-12";
    if (ticket.to.length > 0) classDate = "col-md-6";
    return (
      <div className="container-fluid row">
        <Navbar className="navbar navbar-dark bg-dark">
          <Nav>
            <NavItem eventKey={1} href={"#general" + ticket.id}>
              Général
            </NavItem>
            <NavItem eventKey={2} href={"#prevision" + ticket.id}>
              Prévision
            </NavItem>
            <NavItem eventKey={3} href="#">
              Carnet de bord
            </NavItem>
            <NavItem eventKey={4} href="#">
              Dépenses
            </NavItem>
            <NavItem eventKey={5} href="#">
              Agenda
            </NavItem>
            <NavItem eventKey={6} href="#">
              Photos
            </NavItem>
          </Nav>
        </Navbar>
        <div className="col-md-12">
          <div id={"general" + ticket.id} show="true">
            <h4>{ticket.title}</h4>
            <div className="container-fluid">
              {ticket.places.length > 0 ? (
                <span className="col-md-12" title={ticket.places}>
                  Lieux: {ticket.places}
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
              {ticket.status === "finished" ? (
                <div className="col-md-12 rating">
                  <Icon
                    name="angry"
                    className={
                      ticket.rating === "angry" ? "rating-selected" : ""
                    }
                    onClick={e => this.updateRating(e, ticket.id, "angry")}
                  />
                  <Icon
                    name="frown"
                    className={
                      ticket.rating === "frown" ? "rating-selected" : ""
                    }
                    onClick={e => this.updateRating(e, ticket.id, "frown")}
                  />
                  <Icon
                    name="meh"
                    className={ticket.rating === "meh" ? "rating-selected" : ""}
                    onClick={e => this.updateRating(e, ticket.id, "meh")}
                  />
                  <Icon
                    name="smile"
                    className={
                      ticket.rating === "smile" ? "rating-selected" : ""
                    }
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TicketDetails;
