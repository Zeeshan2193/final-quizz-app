import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        height: theme.spacing(16),
      },
    },
  }),
);

type questionPropsType = {
  question: string
  option: string[]
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void
  nextButton: boolean
}
export const QuizCard: React.FC<questionPropsType> = ({ question, option, callback, nextButton }) => {
  const classes = useStyles();
  const [nBtn, setNBtn] = useState<boolean>(false);
  //setNBtn(nextButton);
  console.log(nextButton, "button")
  const checkAns = () => {
    console.log("good")
  }
  const [selectOption, setSelectOption] = useState<boolean>(false);

  if (nextButton == false) {
    setNBtn(true);

  }
  const handle = () => {
    setSelectOption(true);
    setNBtn(true);

  }
  return (
    <div className={classes.root}>

      <Paper elevation={3}>
        <div>
          <strong dangerouslySetInnerHTML={{ __html: question }} />
        </div>
        <form>
          {
            option.map((obj: string, ind: number) => {
              return (
                <div key={ind}>
                  <button disabled={selectOption} value={obj} onClick={handle} >
                    <span dangerouslySetInnerHTML={{ __html: obj }} />
                  </button>
                </div>
              )
            })
          }

        </form>
        {nBtn ? (<button onClick={callback}>Next</button>) : null}
      </Paper>
    </div>
  );
}