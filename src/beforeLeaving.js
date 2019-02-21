import React, { Component } from "react";
import "./ticket.css";
import { Tab, Row, Nav, NavItem, Col } from "react-bootstrap";
import ToDoListBL from "./toDoListBL.js";
import MyLuggage from "./myluggage.js";
import Forecasts from "./forecasts.js";

class BeforeLeaving extends Component {
  render() {
    const { ticket, onUpdateTicket } = this.props;
    return (
      <div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <Col sm={3}>
              <Nav bsStyle="pills" stacked>
                <NavItem className="tab-detail" eventKey="first">
                  ToDo Liste
                </NavItem>
                <NavItem className="tab-detail" eventKey="second">
                  Ma valise
                </NavItem>
                <NavItem className="tab-detail" eventKey="third">
                  Mes envies
                </NavItem>
              </Nav>
            </Col>
            <Col sm={8} className={ticket.status}>
              <Tab.Content animation>
                <Tab.Pane eventKey="first">
                  <ToDoListBL ticket={ticket} onUpdateTicket={onUpdateTicket} />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <MyLuggage ticket={ticket} onUpdateTicket={onUpdateTicket} />
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <Forecasts ticket={ticket} onUpdateTicket={onUpdateTicket} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

export default BeforeLeaving;
