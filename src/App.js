import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

import './App.css'
import './bootstrap.css'

import Table from './table.js'
import NewTicket from './newTicket';

class App extends Component {

    state = {
        lastID: 7,
        tables : ['desire','planned','current','finished'],
        tickets :[
            {
              id:1,
              status:'desire',
              title:'Amerique du Sud',
              detail:'un jour peut-être',
            },
            {
              id:2,
              status:'finished',
              title:'Japan',
              detail:'ZEeeeeeen !!!',
            },
            {
                id:3,
              status:'planned',
              title:'Sri Lanka',
              detail:'Bientôt !!!',
            },
            {
                id:4,
              status:'finished',
              title:'Norway',
              detail:'Mouillé !!!',
            },
            {
                id:5,
              status:'current',
              title:'Lyon',
              detail:'Trop long !!!',
            },
            {
                id:6,
              status:'finished',
              title:'Asia 2k18',
              detail:'Enorme !!!',
            },
        ]
    }

    onDrop = (ev, cat) => {
        let id = ev.dataTransfer.getData("id");
        let tickets = this.state.tickets.filter((tiket) => {
            if (tiket.id == id) {
                tiket.status = cat;           
            }              
             return tiket;       
         });        
         this.setState({tickets, tickets });    
      }
    
    onDeleteTicket = (id) => {
        const tickets = this.state.tickets
        let index = tickets.findIndex(x => x.id ===id)
        tickets.splice(index,1)
        this.setState({tickets})
    }

    onSendTicket = (newTitle,newStatus,newDetail) => {
        const tickets = this.state.tickets
        let lastID = this.state.lastID
        tickets.push({
          id:lastID,
          title: newTitle,
          status: newStatus,
          detail:newDetail
        })
        this.setState({tickets: tickets,lastID: lastID+1})
      }

    orderingTable = (tables,tickets) => {
        let currentTable = []
        let currentTickets
        tables.map((table) => {
            currentTickets = []
            tickets.map((ticket) => {
                if(table === ticket.status)
                {
                    currentTickets.push(ticket)
                }
            })
            currentTable.push({status:table,tickets:currentTickets})
        })
        return currentTable
    }
      
    render() {
      const {tables,tickets} = this.state
      let orderingTable = this.orderingTable(tables,tickets)
      console.log(orderingTable)
      return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <span className="navbar-brand mb-0 h1">Pounda</span>
            </nav>
            <div className='main-container container-fluid row'>
                {orderingTable.map((table) => (
                    <div  key={table.status} className={"table-container col-md-3 container-fluid row"}>
                        <Table status={table.status} tickets={table.tickets} onDrop={this.onDrop} onDeleteTicket={this.onDeleteTicket}/>
                    </div>
                ))}
                <div className={"form-container col-md-2 container-fluid row"}><NewTicket onSendTicket={this.onSendTicket} /></div>
            </div>
        </div>
      )
    }
  }
  
  export default App