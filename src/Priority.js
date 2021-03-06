import React, { Component } from "react";
import "./ticket.css";
import Icon from "./Icon";

class Priority extends Component {
  state = {
    currentPriority: this.props.priority,
    hoverPriority: 0
  };

  handleMouseHover = (e, hoverPriority) => {
    e.preventDefault();
    this.setState({ hoverPriority });
  };

  render() {
    const { ticket, id, priority, onUpdate } = this.props;
    const { hoverPriority } = this.state;
    return (
      <div className="priority" title="Priorité">
        {ticket.status === "finished" ? (
          <div>
            <Icon
              name="star"
              fa={priority === 0 ? "far" : "fas"}
              className="prio"
            />
            <Icon
              name="star"
              fa={priority < 2 ? "far" : "fas"}
              className="prio"
            />
            <Icon
              name="star"
              fa={priority < 3 ? "far" : "fas"}
              className="prio"
            />
          </div>
        ) : (
          <div>
            <Icon
              name="star"
              fa={priority > 0 || hoverPriority >= 1 ? "fas" : "far"}
              className="prio"
              onClick={e => onUpdate(e, ticket, id, 1)}
              onMouseEnter={e => this.handleMouseHover(e, 1)}
              onMouseLeave={e => this.handleMouseHover(e, 0)}
            />
            <Icon
              name="star"
              fa={
                (priority > 1 && hoverPriority === 0) || hoverPriority >= 2
                  ? "fas"
                  : "far"
              }
              className="prio"
              onClick={e => onUpdate(e, ticket, id, 2)}
              onMouseEnter={e => this.handleMouseHover(e, 2)}
              onMouseLeave={e => this.handleMouseHover(e, 0)}
            />
            <Icon
              name="star"
              fa={
                (priority > 2 && hoverPriority === 0) || hoverPriority === 3
                  ? "fas"
                  : "far"
              }
              className="prio"
              onClick={e => onUpdate(e, ticket, id, 3)}
              onMouseEnter={e => this.handleMouseHover(e, 3)}
              onMouseLeave={e => this.handleMouseHover(e, 0)}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Priority;
