import { Component } from 'react';
import React, { useState } from 'react';


class MemorializedQuestion extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        return(
            <div className = "memorialized-question">{this.props.question}</div>
        )

    }

}

export default MemorializedQuestion;