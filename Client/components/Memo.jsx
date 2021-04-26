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
            const arr = []
            response.forEach(e => {
                if (e.memoized) {
                    arr.push(e);
                }
            })
            this.setState({
                memoQuestions: arr
            })

        })
    }


    render(){
        let memoquestions = [];
        for (let i = 0; i < this.state.memoQuestions.length; i++){
            //add in props to the questions
            memoquestions.push(<MemorializedQuestion question={this.state.memoQuestions[i].questions} />);
        }

        return(
            <div className='memoQuestionBox'>
            {memoquestions}
            </div>
        );
    }

}

export default withRouter(Memo);