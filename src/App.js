import React, { Component } from "react";
import "./App.css";

import Table from "./table.js";
import NewTicket from "./newTicket";
import Icon from "./Icon";
import Map from "./map.js";

class App extends Component {
  /*state = {
    mode:"ticket",
    lastID: 8,
    tables: ["desire", "planned", "current", "finished"],
    tickets: [
      {
        id: 1,
        status: "desire",
        title: "Amerique du Sud",
        places: [ 170, 604],
        from: "",
        to: "",
        resume: "un jour peut-être",
        forecasts: [
          { id: 1, title: "Pérou", status: "none", priority: 3 },
          { id: 2, title: "Colombie", status: "none", priority: 2 },
          { id: 3, title: "Brésil", status: "none", priority: 0 },
          { id: 4, title: "Argentine", status: "none", priority: 1 }
        ]
      },
      {
        id: 2,
        status: "finished",
        title: "Japan",
        places: [392],
        from: "21/05/2016",
        to: "10/06/2016",
        transports: [
          {
            id: 1,
            category: "plane",
            label: "Avion",
            from: "Lyon",
            to: "Tokyo",
            start: "21/05/2016 11h01",
            end: "22/05/2016 8h34",
            amount: 600,
            currency: "EUR"
          }
        ],
        resume: "ZEeeeeeen !!!",
        rating: "grin-alt",
        forecasts: [
          { id: 1, title: "tokyo", status: "done", priority: 3 },
          { id: 2, title: "kyoto", status: "done", priority: 3 },
          { id: 3, title: "Mont Fuji", status: "fail", priority: 3 },
          { id: 4, title: "Nara", status: "done", priority: 1 }
        ],
        expenses: [
          {
            id: 1,
            category: "transport",
            title: "Avion",
            amount: 600,
            currency: "EUR"
          },
          {
            id: 2,
            category: "fooddrink",
            title: "Sushi",
            amount: 6000,
            currency: "YEN"
          },
          {
            id: 3,
            category: "transport",
            title: "Train",
            amount: 250,
            currency: "EUR"
          },
          {
            id: 4,
            category: "accommodation",
            title: "Airbnb",
            amount: 500,
            currency: "GBP"
          },
          {
            id: 5,
            category: "gift",
            title: "Souvenirs",
            amount: 100,
            currency: "EUR"
          },
          {
            id: 6,
            category: "gift",
            title: "Souvenirs",
            amount: 1000,
            currency: "YEN"
          }
        ],
        travelogue: [
          {
            id: 1,
            title: "Jour 1",
            resume:
              "Arrivée aéroport, train jusqu'à Tokyo direction Shibuya, airbnb",
            from: "21/05/2016",
            to: null
          }
        ]
      },
      {
        id: 3,
        status: "planned",
        title: "Sri Lanka",
        places: [144],
        from: "",
        to: "",
        resume: "Bientôt !!!"
      },
      {
        id: 4,
        status: "finished",
        title: "Norway",
        places: [ 578],
        from: "28/05/2017",
        to: "07/06/2017",
        resume: "Mouillé !!!",
        rating: "smile"
      },
      {
        id: 5,
        status: "current",
        title: "Tour de France",
        places: [250],
        from: "01/12/2018",
        to: "",
        resume: ""
      },
      {
        id: 6,
        status: "finished",
        title: "Asia 2k18",
        places: [ 116,704,418,764,458,702,360,344,410],
        from: "23/01/2018",
        to: "07/06/2018",
        resume: "Enorme !!!",
        rating: "grin-stars"
      },
      {
        id: 7,
        status: "planned",
        title: "Lisbonne",
        places: [620],
        from: "",
        to: "",
        resume: "Visite Mathieu et Pauline"
      },
      {
        id: 8,
        status: "finished",
        title: "Greece",
        places: [300],
        from: "01/08/2015",
        to: "10/08/2015",
        resume: "",
        rating: "grin-alt",
      },
      {
        id: 9,
        status: "finished",
        title: "Malta",
        places: [470],
        from: "01/08/2013",
        to: "10/08/2013",
        resume: "",
        rating: "smile"
      },
      {
        id: 10,
        status: "finished",
        title: "Croatia",
        places: [191],
        from: "01/08/2016",
        to: "15/08/2016",
        resume: "",
        rating: "grin-alt",
      },
      {
        id: 11,
        status: "finished",
        title: "London",
        places: [826],
        from: "20/04/2017",
        to: "23/04/2017",
        resume: "",
        rating: "smile"
      },
      {
        id: 12,
        status: "finished",
        title: "South Africa",
        places: [710],
        from: "20/11/2018",
        to: "01/12/2018",
        resume: "",
        rating: "smile"
      },
      {
        id: 13,
        status: "finished",
        title: "Maurice",
        places: [480],
        from: "20/11/2017",
        to: "01/12/2017",
        resume: "",
        rating: "grin-stars"
      },
      {
        id: 14,
        status: "finished",
        title: "Italie",
        places: [380,336],
        from: "20/02/2015",
        to: "01/03/2015",
        resume: "",
        rating: "smile"
      },
      {
        id: 15,
        status: "finished",
        title: "Van",
        places: [756,250],
        from: "01/07/2018",
        to: "07/07/2018",
        resume: "",
        rating: "smile"
      },
      {
        id: 16,
        status: "finished",
        title: "Asia 2nd Part",
        places: [764,104],
        from: "10/10/2018",
        to: "15/11/2018",
        resume: "",
        rating: "grin-stars"
      },
      {
        id: 17,
        status: "finished",
        title: "Europapark",
        places: [276],
        from: "10/06/2013",
        to: "12/06/2013",
        resume: "",
        rating: "smile"
      },
      {
        id: 18,
        status: "finished",
        title: "Barcelona",
        places: [724],
        from: "10/07/2011",
        to: "17/07/2011",
        resume: "",
        rating: "smile"
      },
      {
        id: 19,
        status: "planned",
        title: "Tokyo JO",
        places: [392],
        from: "15/07/2020",
        to: "7/08/2020",
        resume: "",
      },
    ]
  };*/

  state = {
    mode: "ticket",
    style: "light",
    lastID: JSON.parse(localStorage.getItem("lastId") || 0),
    tables: ["desire", "planned", "current", "finished"],
    tickets: JSON.parse(localStorage.getItem("travels")) || []
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

    localStorage.setItem("travels", JSON.stringify(tickets));
    this.setState({ tickets });
  };

  onUpdateTicket = patch => {
    let tickets = this.state.tickets.map(ticket => {
      if (ticket.id === patch.id) {
        return { ...ticket, ...patch };
      }
      return ticket;
    });
    localStorage.setItem("travels", JSON.stringify(tickets));
    this.setState({ tickets });
  };

  onSendTicket = (title, places, from, to, status, resume) => {
    const tickets = this.state.tickets;
    let lastID = this.state.lastID;
    tickets.push({
      id: lastID,
      title,
      places,
      from,
      to,
      status,
      resume
    });
    localStorage.setItem("travels", JSON.stringify(tickets));
    localStorage.setItem("lastId", JSON.stringify(lastID + 1));
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

  displayMap = e => {
    e.preventDefault();
    let mode = this.state.mode;
    if (mode === "ticket") {
      this.setState({ mode: "map" });
    } else {
      this.setState({ mode: "ticket" });
    }
  };

  setStyle = e => {
    e.preventDefault();
    let style = this.state.style;
    if (style === "light") {
      this.setState({ style: "dark" });
    } else {
      this.setState({ style: "light" });
    }
  };

  render() {
    const { tables, tickets, mode, style } = this.state;

    let interactivity = false;
    if (mode == "map") {
      interactivity = true;
    }
    let orderedTable = this.orderingTable(tables, tickets);
    return (
      <div className={style}>
        <nav className="navbar navbar-light">
          <div className="navbar-header">
            <span className="navbar-brand mb-0 h1">
              Pounda <Icon name="compass" className="fa-spin" />
            </span>
          </div>
          <div id="gotomap">
            <ul className="nav navbar-nav">
              <li>
                <a onClick={e => this.displayMap(e)}>
                  <Icon name="map" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <Map
          tickets={tickets}
          interactivity={interactivity}
          mapName="all-countries"
        />
        {mode === "ticket" ? (
          <div className="pounda main-container container-fluid ">
            <div className="form-container col-md-12  margin-bottom ">
              <NewTicket onSendTicket={this.onSendTicket} />
            </div>
            <div className="tables-container col-md-12">
              {orderedTable.map(table => (
                <div
                  key={table.status}
                  className="table-container col-md-3 col-sm-6 col-xs-12 "
                >
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
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
