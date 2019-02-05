import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import Ticket from "./ticket.js";
import BeforeLeaving from "./beforeLeaving.js";
import Expenses from "./expenses.js";
import "./ticketDetails.css";

class TicketDetails extends Component {
  state = {
    active: "general"
  };
  changeActive = (e, active) => {
    e.preventDefault();
    this.setState({ active });
  };

  render() {
    const { ticket, onUpdateTicket, onHide } = this.props;
    const active = this.state.active;
    return (
      <div className="container-fluid detail">
        <Navbar className="navbar navbar-dark bg-dark">
          <Navbar.Header>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
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
                href={"#forecasts" + ticket.id}
                className={active === "forecasts" ? "active" : ""}
                onClick={e => this.changeActive(e, "forecasts")}
              >
                Avant le départ
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
                href={"#expenses" + ticket.id}
                className={active === "expenses" ? "active" : ""}
                onClick={e => this.changeActive(e, "expenses")}
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

              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={onHide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="col-md-12 details">
          <div className={active === "general" ? "" : "hidden"}>
            <Ticket
              key={ticket.id}
              ticket={ticket}
              status={ticket.status}
              showForm={false}
              onUpdateTicket={onUpdateTicket}
              detail="open"
              draggable={false}
            />
          </div>
          <div className={active === "forecasts" ? "" : "hidden"}>
            <BeforeLeaving ticket={ticket} onUpdateTicket={onUpdateTicket} />
          </div>
          <div className={active === "expenses" ? "" : "hidden"}>
            <Expenses ticket={ticket} onUpdateTicket={onUpdateTicket} />
          </div>
          <div className={active === "carnet" ? "" : "hidden"}>
            Carnet de bord
          </div>
          <div className={active === "agenda" ? "" : "hidden"} />
          <div className={active === "photos" ? "" : "hidden"}>
            Ajoutez vos photos et vidéos
          </div>
        </div>
      </div>
    );
  }
}

export default TicketDetails;
