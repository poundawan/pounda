import React, { Component } from "react";

class TooltipMap extends Component {
    render() {
        const { country } = this.props;
        return (
            <div>
                <h4>{country.country}</h4>
                <div>
                    <span>You have {country.count} travel(s)</span>
                </div>
            </div>
          );
        }
      }
    
      
export default TooltipMap;