import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import IndividualQuestion from './IndividualQuestion.jsx';

const useInput = init => {
  const [ value, setValue ] = useState(init);
  const onChange = e => {
    setValue(e.target.value);
  };
  // return the value with the onChange function instead of setValue function
  return [ value, onChange ];
};

const IPFS = `https://gateway.pinata.cloud/ipfs/QmPBJAGR82jiRUCzuannkFqmkwWPQtHufYKsNi7fUxd57P`;
let IPFS_DATA = {};




class Questions extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      question: '',
      questionError: null,
      questionArray: [],
    }
    this.saveSubject = this.saveSubject.bind(this);
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getNFVoteSecret = this.getNFVoteSecret.bind(this);
  }
  // const [ question, questionOnChange ] = useInput('');
  // const [ questionError, setQuestionError ] = useState(null);
  // const [ questionArray, setQuestionArray ] = useState([]);
  // const [cookies] = useCookies(['ssid'])
  // console.log(Cookies.get('ssid'));
  saveSubject (){
    // check if name is empty
    if (this.state.question === ''){
      setQuestionError('required');
    } else {
      const body = {
        'question': this.state.question,
        'ssid': Cookies.get('ssid')
      };
      fetch('/server/qPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .then(resp => resp.json())
        .then(data => {
          // console.log(data);
        })
        .catch(err => console.log(' ERROR: ', err));
    }
    this.setState({question: ''})
  };

  handleChange(event) {
    event.preventDefault();
    this.setState({question: event.target.value});
  }

  //get questions from the database and store them into local array holding individual question components
  async fetchQuestions () {
    // console.log('doing fetch questions request')
    let questionsResponse = [];
    let questions = [];
    await fetch('/server/getQuestions', {
      method: 'GET',
    })
      .then(resp => resp.json())
      .then(data => {
          questionsResponse = data;
          // console.log(questionsResponse[0])
          questionsResponse.sort((a, b) => {
            return a.date_asked - b.date_asked
          })
          for (let i=0; i<questionsResponse.length; i+=1){
            questions.push(<IndividualQuestion 
              question={questionsResponse[i].questions} 
              upvotes={questionsResponse[i].votefor}
              downvotes={questionsResponse[i].voteagainst}
              ssid={Cookies.get('ssid')}/>
              );
            // questions.push(questionsResponse[i].questions)
          }
          this.setState({questionArray: questions})
          return questions;
      })
      .catch(err => console.log('getQuestions failed, error:', err))
  }

  async getNFVoteSecret(IPFS) {
    return await fetch(IPFS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        IPFS_DATA = data;
        console.log("***** NFT META DATA *****");
        console.log('IPFS_DATA',IPFS_DATA);
      })
      .catch((err) => console.log(err));
  }


  componentDidMount(){
    this.fetchQuestions();
    this.getNFVoteSecret(IPFS);
  }

  render (){
    // console.log('questionArray:',this.state.questionArray);
    return(
      <section id='subject-creator'>
        <div className="homepageHeader">
        <div className="subjectStart"><h3 className="subjectStartFont">Start A New Poll</h3></div>
        <div className="voteSecret"><img src={IPFS_DATA.voteSecret} ></img></div>
        </div>
        <div><h3>    </h3></div>
        {/* question Input  */}
        <div className="createSubjectField">
          <label htmlFor="question"></label>
          <br/>
          <textarea className="textinput" rows="4" cols="50" name="question" placeholder="An opinion for thought..." value={this.state.question} onChange={this.handleChange} />
          {this.state.questionError ? (<span className="errorMsg">{this.state.questionError}</span>) : null}
        </div>

        <div className="newQuestionsBtns">
        {/* Memorialized Button */}
        <div className="createSubContainer">
          <button type="button" className="questionsRouter" onClick={this.saveSubject}>Save</button>
        </div>
        <Link to="/memo"><button className="questionsRouter" type="button">Memorialized Questions</button></Link>

        {/* Submit Buttons  */}

        </div>
        <hr/>
        {/* <div className="divider"><h3>~~         ~~~         ~~</h3></div> */}

        <div className="questions-display-container">
          {this.state.questionArray}
        </div>


      </section>
    )
  }


}


export default withRouter(Questions);
