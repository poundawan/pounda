import React, { Component }  from 'react'

import './ticket.css'

class Ticket extends Component {
   
    onDragStart = (ev,id) => {
        ev.dataTransfer.setData("id",id);
    }

    onDeleteTicket = (ev,id) => {
        ev.preventDefault();
        this.props.onDeleteTicket(id);
    }
    render(){
        const {ticketID,title,date,detail,status} = this.props;

        return(
            <div 
                onDragStart = {(e) => this.onDragStart(e,ticketID)}
                draggable 
                className={`ticket ${status} draggable badge col-md-12`} 
                date={date} 
            >
                <button type="button" className="close" aria-label="Close" onClick={e => this.onDeleteTicket(e,ticketID)}>
                    <span aria-hidden="true">&times;</span>
                </button>
                <h3>{title}</h3>
                <span>{detail}</span>
            </div>
        )
    }
}
export default Ticket