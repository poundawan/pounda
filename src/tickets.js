import PropTypes from 'prop-types'
import React from 'react'

const Ticket = ({title,date,detail,status}) => (
    <div className={`ticket ${status}`} date={date}>
        <h3>{title}</h3>
        <span>{detail}</span>
    </div>
)
/*
Ticket.proTypes = {
    title: PropTypes.string.isRequired,
    status: PropTypes.oneOf([
        'desire',
        'planned',
        'current',
        'finiched',
    ]).isRequired,  
    date: PropTypes.date.isRequired,
}*/

export default Ticket