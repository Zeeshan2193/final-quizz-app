import React, {useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {QuestionCard} from './QuestionCard';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(3),
      },
    },
  }),
);

export default function OutlinedButtons() {
  const classes = useStyles();
  const [start, setStart] = useState<boolean>(false);
  const [startBtn, setStartBtn] = useState<boolean>(true);
  const startQuiz = () =>{
    setStart(true);
    setStartBtn(false);
  }
  
  return (
    
    <div className={classes.root}>
    

      {startBtn ? (<Button variant="outlined" color="primary" onClick={startQuiz}>Start QUIZ</Button>)
      : null }
      {start ? ( <QuestionCard />): null}
       
    </div>
  );
}