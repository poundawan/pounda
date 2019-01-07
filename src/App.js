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
         this.setState({           
            ...this.state.tickets,           
            tickets       
         });    
      }
    
    onDeleteTicket = (id) => {
        const tickets = this.state.tickets
        var index = tickets.findIndex(x => x.id ===id)
        tickets.splice(index,1)
        this.setState({tickets:tickets})
    }

    onSendTicket = (newTitle,newStatus,newDetail) => {
        const tickets = this.state.tickets
        var lastID = this.state.lastID
        tickets.push({
          id:lastID,
          title: newTitle,
          status: newStatus,
          detail:newDetail
        })
        this.setState({tickets: tickets})
        this.setState({lastID: lastID+1})
      }
      
    render() {
      const {tables,tickets} = this.state
      var currentTickets
      return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <span className="navbar-brand mb-0 h1">Pounda</span>
            </nav>
            <div className='main-container container-fluid row'>
                {tables.map((table) => (
                    currentTickets = [],
                    tickets.map((ticket) =>(
                        table === ticket.status ? currentTickets.push(ticket) : 0
                    )),
                    <div  key={table} className={"table-container col-md-3 container-fluid row"}>
                        <Table status={table} tickets={currentTickets} onDrop={this.onDrop} onDeleteTicket={this.onDeleteTicket}/>
                    </div>
                ))}
                <div className={"form-container col-md-2 container-fluid row"}><NewTicket onSendTicket={this.onSendTicket} /></div>
            </div>
        </div>
      )
    }
  }
  
  export default App