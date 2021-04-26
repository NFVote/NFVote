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
          console.log(data);
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
    console.log('doing fetch questions request')
    let questionsResponse = [];
    let questions = [];
    await fetch('/server/getQuestions', {
      method: 'GET',
    })
      .then(resp => resp.json())
      .then(data => {
          questionsResponse = data;
          for (let i=0; i<questionsResponse.length; i+=1){
            questions.push(<IndividualQuestion question={questionsResponse[i].questions} ssid={Cookies.get('ssid')}/>);
            // questions.push(questionsResponse[i].questions)
          }
          this.setState({questionArray: questions})
          return questions;
      })
      .catch(err => console.log('getQuestions failed, error:', err))
  }
  // const QUESTIONS = fetchQuestions();
  // console.log(`FETCH QUESTIONS:`,questions)
  // >>> useEffect to clear nameError when `name` is changed <<<
  // useEffect(()=>{
  //   setQuestionError(null);
  //   console.log(questions)
  //   setQuestionArray(questions);
  // }, [question]);
  componentDidMount(){
    this.fetchQuestions();
  }

  render (){
    console.log('questionArray:',this.state.questionArray);
    return(
      <section id='subject-creator'>

        <h3>Start a new Subject?</h3>

        {/* question Input  */}
        <div className="createSubjectField">
          <label htmlFor="question">Question: </label>
          <br/>
          <textarea rows="4" cols="50" name="question" placeholder="First steps..." value={this.state.question} onChange={this.handleChange} />
          {this.state.questionError ? (<span className="errorMsg">{this.state.questionError}</span>) : null}
        </div>
        <Link to="/memo"><button id="memoRouter" type="button">Memorialized Questions</button></Link>
        {/* Submit Buttons  */}
        <div className="createSubContainer">
          <button type="button" className="btnMain" onClick={this.fetchQuestions}>Save</button>
          {/* <Link to="/" className="backLink">
            <button type="button" className="btnSecondary">
              Cancel
            </button>
          </Link> */}
        </div>

        <div className="questions-display-container">

        </div>

        <div>
          {this.state.questionArray}
        </div>

      </section>
    )
  }



}


export default withRouter(Questions);
