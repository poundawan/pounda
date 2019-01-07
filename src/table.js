import React, { Component } from 'react'

import Ticket from './ticket.js'
import './table.css'
class Table extends Component {

    state ={
        title:"",
        status:"desire",
        detail:"",
        showForm: "hide",
    }

    onDragOver  = (ev) => {
        ev.preventDefault();
    }

    onDropTicket(e,status) {
        e.preventDefault();
        this.props.onDrop(e,status);
    }

    render() {
        const {status,tickets,onDeleteTicket} = this.props;
        return(
            <div className={'table-droppable col-md-12 table-'+status+' droppable container-fluid row'} 
                onDragOver={(e)=>this.onDragOver(e)} 
                onDrop={(e)=>{this.onDropTicket(e, status)}}
            >
                <div className={"col-md-12"}><span className={"label label-default"}>{status}</span></div>
                <div 
                    className="col-md-12" 
                >
                {tickets.map((ticket) =>(
                    <Ticket key={ticket.id} ticketID={ticket.id} title={ticket.title} date="20190101" detail={ticket.detail} status={status} onDeleteTicket={onDeleteTicket} />
                ))}
                </div>
            </div>
        )
        }
    }


export default Table