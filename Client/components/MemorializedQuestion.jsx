import { Component } from 'react';
import React, { useState } from 'react';


class MemorializedQuestion extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        return(
            <div>
                <div className = "memorialized-question">
                {this.props.question}
                    <div className = "memoVotes">
                        <div className = "memoVotes">Votes for: {this.props.upvote}</div>
                        <div className = "memoVotes">Votes against: {this.props.downvote}</div>
                    </div>
                </div>
            </div>
        )

    }

}

export default MemorializedQuestion;