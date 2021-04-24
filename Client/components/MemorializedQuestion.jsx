import { Component } from 'react';
import React, { useState } from 'react';


class MemorializedQuestion extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        return(
            <div className = "memoizedQuestion">{this.props}</div>     
        )

    }
    
}

export default MemorializedQuestion;