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
            memoquestions.push(<MemorializedQuestion question={this.state.memoQuestions[i].questions} />);
        }

        return(
            <div>
                {/* Link back to questions */}
                <div>
                    <Link to="/questions"><button id="questionsRouter" type="button">Questions</button></Link>
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