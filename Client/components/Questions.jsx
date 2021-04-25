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


const Questions = props => {
  const [ question, questionOnChange ] = useInput('');
  const [ questionError, setQuestionError ] = useState(null);
  // const [cookies] = useCookies(['ssid'])
  console.log(Cookies.get('ssid'));
  const saveSubject = () => {
    // check if name is empty
    if (question === ''){
      setQuestionError('required');
    } else {
      const body = {
        question,
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
  };

  //get questions from the database and store them into local array holding individual question components
  let questionsResponse = [];
  let questions = [];
  const fetchQuestions = async () => {
    await fetch('/server/getQuestions', {
      method: 'GET',
    })
      .then(resp => resp.json())
      .then(data => {
          questionsResponse = data;
          for (let i=0; i<questionsResponse.length; i+=1){
            questions.push(<IndividualQuestion question={questionsResponse[i].question}/>);
            // questions.push(questionsResponse[i].question)
          }
          return questions;
      })
      .catch(err => console.log('getQuestions failed, error:', err))
  }
  const QUESTIONS = fetchQuestions();
  console.log(`OUTPUT QUESTIONS:`,questions)
  // >>> useEffect to clear nameError when `name` is changed <<<
  useEffect(()=>{
    setQuestionError(null);
  }, [question]);


  return(
    <section id='subject-creator'>

      <h3>Start a new Subject?</h3>

      {/* question Input  */}
      <div className="createSubjectField">
        <label htmlFor="question">Question: </label>
        <br/>
        <textarea rows="4" cols="50" name="question" placeholder="First steps..." value={question} onChange={questionOnChange} />
        {questionError ? (<span className="errorMsg">{questionError}</span>) : null}
      </div>

      {/* Submit Buttons  */}
      <div className="createSubContainer">
        <button type="button" className="btnMain" onClick={saveSubject}>Save</button>
        {/* <Link to="/" className="backLink">
          <button type="button" className="btnSecondary">
            Cancel
          </button>
        </Link> */}
      </div>

      <div className="questions-display-container">

      </div>

      <div>
        placeholder for questions

        {questions}
      </div>

    </section>
  )
}


export default withRouter(Questions);
