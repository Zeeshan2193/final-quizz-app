 
import {Quiz, QuizList} from './../../types/QuizTypes';
const shuffleArray = (array : any[]) => [...array].sort(()=>Math.random() - 0.5);

export async function getQuiz(amount:number, difficulty:string):Promise<Quiz[]>{
const res =await fetch(`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`)
const {results} = await res.json();
//return results;
const final:Quiz[]= results.map((QuizObj:QuizList, ind:number)=>{
   return{question: QuizObj.question,
    answer: QuizObj.correct_answer,
    //option: shuffleArray(QuizObj.incorrect_answers.concat(QuizObj.correct_answer)),
    option: shuffleArray(QuizObj.incorrect_answers.concat(QuizObj.correct_answer)),
   }
});
return final;

}
