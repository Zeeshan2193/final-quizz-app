import React, { useState, useEffect } from 'react';
import {Pie} from 'react-chartjs-2';
import TextField from '@material-ui/core/TextField';
import { getQuiz } from './services/Api';
import Paper from '@material-ui/core/Paper';
import { Quiz } from './../types/QuizTypes';
import Button from '@material-ui/core/Button';

export const QuestionCard = () => {
  let [quiz, setQuiz] = useState<Quiz[]>([]);
  
  const [nextBtn, SetNextBtn] = useState<boolean>(false);
  const [showResultBtn, setShowResultBtn] = useState<boolean>(false);
  //Option Select Code
  const [selectOption, setSelectOption] = useState(false);
  //for hidding and showing the quiz component
  const [quizComponentShow, setQuizComponentShow] = useState(true);


  let [secore, setSecore] = useState<number>(0);
  let [num, setNum] = useState<number>(0); // Question Counter
  const totalQues = 5;// total Questions
  useEffect(() => {
    async function fetchApi() {
      const question = await getQuiz(5, 'easy');
      setQuiz(question);
    }
    fetchApi();
  }, [quizComponentShow]);
  //Next Question or Quiz Module
  const nextQuestion = () => {
    SetNextBtn(false);
    setSelectOption(false);
    if (num + 1 < totalQues) { setNum(++num); }

    // if((num+1)==totalQues){setNextBtn(false)}
  }
  const data = {
    labels: [
      'Incorrect',
      'Correct',
     
    ],
    datasets: [{
      data: [totalQues-secore, secore ],
      backgroundColor: [
      '#FF6384',
      '#36A2EB'
      ],
      hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB'
      ]
    }]
  };

  const showResult = () => {
 setShowResultBtn(true);
 setQuizComponentShow(false);
  }
  const quizAgain= () =>{
    setShowResultBtn(false);
    setQuizComponentShow(true);
    setSecore(0);
    setNum(0);
    setSelectOption(false);

  }
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.value);
    setSelectOption(true);
    SetNextBtn(true);

    // if((num+1)==totalQues){setNextBtn(false)}
    if (quiz[num].answer === e.currentTarget.value) {
      setSecore(++secore);
      console.log("Done")
    }
  }
  if (!quiz.length) {
    return (<h1>Loading ..</h1>)
  }


  return (
    <div>
      { quizComponentShow ?(<div>
      <TextField id="outlined-disabled" label="Score" defaultValue="0" variant="outlined" value={secore} />
      <br />
      <h1>{num + 1}/{totalQues}</h1>
      <Paper elevation={3} className="page">
        <div>
          <strong dangerouslySetInnerHTML={{ __html: quiz[num].question }} />
        </div>
        <form>
          {
            quiz[num].option.map((obj: string, ind: number) => {
              return (
                <div key={ind}>
                  <Button disabled={selectOption} variant="contained" className="optionBtn" value={obj} onClick={handleSubmit} >
                    <span dangerouslySetInnerHTML={{ __html: obj }} />
                  </Button>
                </div>
              )
            })
          }

        </form>
        {nextBtn && selectOption && !(num + 1 === totalQues) ? (<Button variant="contained" color="primary" onClick={nextQuestion} >Next</Button>) : null}
        {selectOption && (num + 1 === totalQues) ?  <Button variant="contained" color="secondary" onClick={showResult}> Show Result</Button>: null}
      </Paper>
      </div>) :null }
{showResultBtn? (<>
      <h2>Your Quiz Result</h2>
      <div className="quizGraph">
        <Pie data={data} /><br /><Button variant="contained" color="primary" onClick={quizAgain}>Try Again</Button></div></>) : null}
    </div>
  )
}
