import React, { Component } from "react";

import Ticket from "./ticket.js";
import TicketEdit from "./ticketEdit.js";
import "./table.css";
class Table extends Component {
  state = {
    editTicket: ""
  };

  showForm = id => {
    this.state.editTicket === id
      ? this.setState({ editTicket: "" })
      : this.setState({ editTicket: id });
  };

  onDragOver = ev => {
    ev.preventDefault();
  };

  onDropTicket(e, status) {
    e.preventDefault();
    this.props.onDrop(e, status);
  }
  onUpdateTicket = (id, title, places, from, to, transport, resume) => {
    this.setState({ editTicket: "" });
    this.props.onUpdateTicket(id, title, places, from, to, transport, resume);
  };

  render() {
    const { status, tickets, onDeleteTicket } = this.props;
    return (
      <div
        className={
          "table-droppable col-md-12 table-" +
          status +
          " droppable container-fluid"
        }
        onDragOver={e => this.onDragOver(e)}
        onDrop={e => {
          this.onDropTicket(e, status);
        }}
      >
        <div className={"col-md-12 margin-bottom"}>
          <span className={"label label-ticket col-md-12"}>{status}</span>
        </div>
        <div className="col-md-12">
          {tickets.map(ticket =>
            this.state.editTicket === ticket.id ? (
              <TicketEdit
                key={ticket.id}
                ticket={ticket}
                status={status}
                onDeleteTicket={onDeleteTicket}
                showForm={this.showForm}
                onUpdateTicket={this.onUpdateTicket}
              />
            ) : (
              <Ticket
                key={ticket.id}
                ticket={ticket}
                status={status}
                onDeleteTicket={onDeleteTicket}
                showForm={this.showForm}
                onUpdateTicket={this.onUpdateTicket}
                draggable={true}
              />
            )
          )}
        </div>
      </div>
    );
  }
}

export default Table;
