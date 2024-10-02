export interface IPregunta
{
    id : string;
    category: string;
    question: string;
    correctAnswers: string;
    incorrectAnswers : Array<string>;
}