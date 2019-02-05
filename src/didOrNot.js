import React, { Component } from "react";
import Icon from "./Icon";
class DidOrNot extends Component {
  render() {
    const { status, ticket, id, onUpdate, onDelete, both = true } = this.props;
    let trash = "";
    //if (both && ticket.status !== "finished") {
    trash = (
      <Icon
        name="trash-alt"
        title="Supprimer"
        className="theme-trash"
        onClick={e => onDelete(e, ticket, id)}
      />
    );
    // }
    return (
      <div className="didOrNot">
        {ticket.status === "desire" || ticket.status === "planned" ? (
          <Icon
            name="trash-alt"
            title="Supprimer"
            className="theme-trash"
            onClick={e => onDelete(e, ticket, id)}
          />
        ) : (
          <div title="Fait ou pas">
            {status === "done" ? (
              <Icon
                name="check-square"
                fa="fas"
                className="active theme-done"
                onClick={e => onUpdate(e, ticket, id, "none")}
              />
            ) : (
              <Icon
                name="square"
                fa="fas"
                className="action-icon"
                onClick={e => onUpdate(e, ticket, id, "done")}
              />
            )}
            {trash}
          </div>
        )}
      </div>
    );
  }
}

export default DidOrNot;
