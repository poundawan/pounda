import React, { Component } from "react";

import Ticket from "./ticket.js";
import TicketEdit from "./ticketEdit.js";
import "./table.css";
import Icon from "./Icon.js";

const STATUS = [
  { value: "desire", label: "Envie" },
  { value: "planned", label: "Prévu" },
  { value: "current", label: "En cours" },
  { value: "finished", label: "Terminé" }
];

class Table extends Component {
  state = {
    editTicket: "",
    showTable: "show"
  };
  showTable = e => {
    e.preventDefault();
    let show = this.state.showTable;
    if (show === "show") {
      this.setState({ showTable: "false" });
    } else {
      this.setState({ showTable: "show" });
    }
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
    const { showTable } = this.state;
    const labelStatus = STATUS.map(curStatus => {
      if (curStatus.value === status) {
        return curStatus.label;
      }
    });
    return (
      <div
        className={"table table-droppable table-" + status + " droppable"}
        onDragOver={e => this.onDragOver(e)}
        onDrop={e => {
          this.onDropTicket(e, status);
        }}
      >
        <div
          className={"label-ticket " + status + " col-md-12"}
          onClick={e => this.showTable(e)}
        >
          <span className="uppercase">{labelStatus} </span>
          <span className="small italic">{tickets.length + " voyage(s) "}</span>
          {showTable === "show" ? (
            <Icon name="caret-up" />
          ) : (
            <Icon name="caret-down" />
          )}
        </div>
        {showTable === "show" ? (
          <div className="col-md-12 travelsList">
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
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Table;
