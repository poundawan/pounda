import React, { Component } from "react";
import "./App.css";

import Table from "./table.js";
import NewTicket from "./newTicket";

class App extends Component {
  state = {
    lastID: 7,
    tables: ["desire", "planned", "current", "finished"],
    tickets: [
      {
        id: 1,
        status: "desire",
        title: "Amerique du Sud",
        places: "Colombie - Pérou",
        from: "",
        to: "",
        transport: "",
        resume: "un jour peut-être",
        forecasts: [
          { id: 1, wording: "Pérou", status: "none" },
          { id: 2, wording: "Colombie", status: "none" },
          { id: 3, wording: "Brésil", status: "none" },
          { id: 4, wording: "Argentine", status: "none" }
        ]
      },
      {
        id: 2,
        status: "finished",
        title: "Japan",
        places: "Japon",
        from: "21/05/2016",
        to: "10/06/2016",
        transport: "plane",
        resume: "ZEeeeeeen !!!",
        rating: "grin-stars",
        forecasts: [
          { id: 1, wording: "tokyo", status: "done" },
          { id: 2, wording: "kyoto", status: "done" },
          { id: 3, wording: "Mont Fuji", status: "fail" },
          { id: 4, wording: "Nara", status: "done" }
        ]
      },
      {
        id: 3,
        status: "planned",
        title: "Sri Lanka",
        places: "Sri lanka",
        from: "",
        to: "",
        transport: "plane",
        resume: "Bientôt !!!"
      },
      {
        id: 4,
        status: "finished",
        title: "Norway",
        places: "Norvège",
        from: "28/05/2017",
        to: "07/06/2017",
        transport: "plane",
        resume: "Mouillé !!!",
        rating: "grin-stars"
      },
      {
        id: 5,
        status: "current",
        title: "Chez les parents",
        places: "Lyon",
        from: "01/12/2018",
        to: "",
        transport: "",
        resume: "Trop long !!!"
      },
      {
        id: 6,
        status: "finished",
        title: "Asia 2k18",
        places:
          "Cambodge, Vietnam, Laos, Thaïlande, Malaisie, Singapour, Bali, Hong Kong, Séoul ",
        from: "23/01/2018",
        to: "07/06/2018",
        transport: "plane",
        resume: "Enorme !!!",
        rating: "grin-stars"
      }
    ]
  };
  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    let tickets = this.state.tickets.filter(ticket => {
      if (ticket.id == id) {
        ticket.status = cat;
      }
      return ticket;
    });
    this.setState({ tickets });
  };

  onDeleteTicket = id => {
    const tickets = this.state.tickets;
    let index = tickets.findIndex(x => x.id === id);
    tickets.splice(index, 1);
    this.setState({ tickets });
  };

  onUpdateTicket = patch => {
    let tickets = this.state.tickets.map(ticket => {
      if (ticket.id === patch.id) {
        return { ...ticket, ...patch };
      }
      return ticket;
    });
    this.setState({ tickets });
  };

  onSendTicket = (
    newTitle,
    newPlaces,
    newFrom,
    newTo,
    newTransport,
    newStatus,
    newResume
  ) => {
    const tickets = this.state.tickets;
    let lastID = this.state.lastID;
    tickets.push({
      id: lastID,
      title: newTitle,
      places: newPlaces,
      from: newFrom,
      to: newTo,
      transport: newTransport,
      status: newStatus,
      resume: newResume
    });
    this.setState({ tickets, lastID: lastID + 1 });
  };

  orderingTable = (tables, tickets) => {
    let currentTable = [];
    let currentTickets;
    tables.map(table => {
      currentTickets = tickets.filter(ticket => ticket.status === table);
      currentTable.push({ status: table, tickets: currentTickets });
    });
    return currentTable;
  };

  render() {
    const { tables, tickets } = this.state;
    let orderedTable = this.orderingTable(tables, tickets);
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <span className="navbar-brand mb-0 h1">Pounda</span>
        </nav>
        <div className="main-container container-fluid ">
          <div className="form-container col-md-12  margin-bottom ">
            <NewTicket onSendTicket={this.onSendTicket} />
          </div>
          <div className="tables-container col-md-12">
            {orderedTable.map(table => (
              <div key={table.status} className="table-container col-md-3 ">
                <Table
                  status={table.status}
                  tickets={table.tickets}
                  onDrop={this.onDrop}
                  onDeleteTicket={this.onDeleteTicket}
                  onUpdateTicket={this.onUpdateTicket}
                  onUpdateTicketRating={this.onUpdateTicketRating}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
