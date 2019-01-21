import React, { Component } from "react";
import Icon from "./Icon";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { FaceIcons } from "./faceIcons.js";

class TicketDetails extends Component {
  state = {
    active: "general"
  };
  changeActive = (e, active) => {
    e.preventDefault();
    this.setState({ active });
  };

  render() {
    const { ticket, onUpdateTicketRating } = this.props;
    const active = this.state.active;
    let classDate = "col-md-12";
    if (ticket.to.length > 0) classDate = "col-md-6";
    return (
      <div className="container-fluid row">
        <Navbar className="navbar navbar-dark bg-dark">
          <Nav className="bold">
            <NavItem
              eventKey={1}
              href={"#general" + ticket.id}
              className={active === "general" ? "active" : ""}
              onClick={e => this.changeActive(e, "general")}
            >
              Général
            </NavItem>
            <NavItem
              eventKey={2}
              href={"#previsions" + ticket.id}
              className={active === "prevision" ? "active" : ""}
              onClick={e => this.changeActive(e, "previsions")}
            >
              Prévision
            </NavItem>
            <NavItem
              eventKey={3}
              href={"#carnet" + ticket.id}
              className={active === "carnet" ? "active" : ""}
              onClick={e => this.changeActive(e, "carnet")}
            >
              Carnet de bord
            </NavItem>
            <NavItem
              eventKey={4}
              href={"#depenses" + ticket.id}
              className={active === "depenses" ? "active" : ""}
              onClick={e => this.changeActive(e, "depenses")}
            >
              Dépenses
            </NavItem>
            <NavItem
              eventKey={5}
              href={"#agenda" + ticket.id}
              className={active === "agenda" ? "active" : ""}
              onClick={e => this.changeActive(e, "agenda")}
            >
              Agenda
            </NavItem>
            <NavItem
              eventKey={6}
              href={"#photos" + ticket.id}
              className={active === "photos" ? "active" : ""}
              onClick={e => this.changeActive(e, "photos")}
            >
              Photos
            </NavItem>
          </Nav>
        </Navbar>
        <div className="col-md-12">
          <div className={active === "general" ? "table" : "hidden"}>
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
                  <FaceIcons ticket={ticket} onUpdate={onUpdateTicketRating} />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className={active === "previsions" ? "table" : "hidden"}>
            Ajoutez vos prévisions
          </div>
          <div className={active === "depenses" ? "table" : "hidden"}>
            Ajoutez vos dépenses
          </div>
          <div className={active === "carnet" ? "table" : "hidden"}>
            Carnet de bord
          </div>
          <div className={active === "agenda" ? "table" : "hidden"} />
          <div className={active === "photos" ? "table" : "hidden"}>
            Ajoutez vos photos et vidéos
          </div>
        </div>
      </div>
    );
  }
}

export default TicketDetails;
