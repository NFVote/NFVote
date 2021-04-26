import { Component } from 'react';
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import MemorializedQuestion from './MemorializedQuestion.jsx'


class Memo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            memoQuestions: [],
        }
    }

    componentDidMount() {
        fetch('/server/memoquestions') // this will be fetch request to table of memoized questions
        .then((res) => res.json())
        .then((response) => {
            //setstate to response from the request
            console.log('client side response for memo qs' + response)
            const arr = []
            response.forEach(e => {
                if (e.majority) {
                    arr.push(e);
                }
            })
            this.setState({
                memoQuestions: arr
            })

        })
        .catch(err => console.log(`Error when fetching the memo: ${err}`))
    }


    render(){
        let memoquestions = [];
        for (let i = 0; i < this.state.memoQuestions.length; i++){
            //add in props to the questions
            memoquestions.push(<MemorializedQuestion 
                question={this.state.memoQuestions[i].questions} 
                upvote={this.state.memoQuestions[i].votefor} 
                downvote={this.state.memoQuestions[i].voteagainst}
                 />);
        }

        return(
            <div>
                {/* Link back to questions */}
                <div className="memoHeaderContainer">
                    <h1 className="memoHeader">Memorialized</h1>
                    <Link to="/questions"><button className="questionsRouter" type="button">Back to Questions</button></Link>
                </div>

                {/* Memorialized questions */}
                <div className='memoQuestionBox'>
                    {memoquestions}
                </div>
                
            </div>
        );
    }

}

export default withRouter(Memo);