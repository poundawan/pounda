import React, { Component } from "react";
import "./ticket.css";
import { Tab, Row, Nav, NavItem, Col } from "react-bootstrap";
import Transports from "./transports.js";
//import Accommodations from "./accommodations.js";

class Organized extends Component {
  render() {
    const { ticket, onUpdateTicket } = this.props;
    return (
      <div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <Col sm={3}>
              <Nav bsStyle="pills" stacked>
                <NavItem className="tab-detail" eventKey="first">
                  Transports
                </NavItem>
                <NavItem className="tab-detail" eventKey="second">
                  Logements
                </NavItem>
              </Nav>
            </Col>
            <Col sm={8} className={ticket.status}>
              <Tab.Content animation>
                <Tab.Pane eventKey="first">
                  <Transports ticket={ticket} onUpdateTicket={onUpdateTicket} />
                </Tab.Pane>
                <Tab.Pane eventKey="second" />
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

export default Organized;
