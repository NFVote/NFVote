import { Component } from 'react';
import React, { useState } from 'react';


class IndividualQuestion extends Component {
    constructor(props) {
        super(props)
    }
    render(){
    //     const { questions } = this.props.question;
        console.log('rendering individual q', props)
        return(
            <div className = "qList">
                {this.props.question}
            </div>
        )

    }

}

export default IndividualQuestion;