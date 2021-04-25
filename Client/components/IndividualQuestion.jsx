import { Component } from 'react';
import React, { useState } from 'react';


class IndividualQuestion extends Component {
    constructor(props) {
        super(props)
    }
    render(){
        console.log('rendering individual q', props)
        return(
            <div className = "memoizedQuestion">{this.props.question}</div>
        )

    }

}

export default IndividualQuestion;