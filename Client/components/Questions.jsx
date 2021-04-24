import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';


const useInput = init => {
  const [ value, setValue ] = useState(init);
  const onChange = e => {
    setValue(e.target.value);
  };
  // return the value with the onChange function instead of setValue function
  return [ value, onChange ];
};


const QuestionsCreator = props => {
  const [ instructions, instructionsOnChange ] = useInput('');
  const [ instructionsError, setinstructionsError ] = useState(null);
  
  const saveSubject = () => {
    // check if name is empty
    if (instructions === ''){
      setinstructionsError('required');
    } else {
      const body = {
        instructions,
      };
      fetch('/server/WHATEVERWEDECIDEFORTHISCONTROLLER', {
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

  // >>> useEffect to clear nameError when `name` is changed <<<
  useEffect(()=>{
    setinstructionsError(null);
  }, [instructions]);




  //   >>> CREATING THE CURRENT QUESTIONS DIV <<<






    return(
      <section id='subject-creator'>

        <h3>Start a new Subject?</h3>

        {/* Instructions Input  */}
        <div className="createSubjectField">
          <label htmlFor="instructions">Instructions: </label>
          <br/>
          <textarea rows="4" cols="50" name="instructions" placeholder="First steps..." value={instructions} onChange={instructionsOnChange} />
          {instructionsError ? (<span className="errorMsg">{instructionsError}</span>) : null}
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

      </section>
    )
}


export default QuestionsCreator;
