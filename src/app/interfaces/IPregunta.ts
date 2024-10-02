export interface IPregunta
{
    id : string;
    category: string;
    format: string;
    question: string;
    correctAnswer: string;
    incorrectAnswers : Array<string>;
}