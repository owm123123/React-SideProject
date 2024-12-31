import React, { useCallback, useRef, useState } from 'react';
import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions';
import QuestionTimer from './QuestionTimer';
import Answer from './Answer';

export default function Quiz() {
  const [answerState, setAnswerState] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === '' ? userAnswers.length : userAnswers.length - 1;

  const isQuizComplete = QUESTIONS.length === activeQuestionIndex;

  const handleSelectedAnswer = useCallback(
    function handleSelectedAnswer(answer) {
      setAnswerState('answered');
      setUserAnswers((prev) => [...prev, answer]);

      setTimeout(() => {
        if (answer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState('correct');
        } else {
          setAnswerState('wrong');
        }
        setTimeout(() => {
          setAnswerState('');
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectedAnswer(null),
    [handleSelectedAnswer]
  );

  // 如果一個條件是包含所有content把判斷寫在外面會比較乾淨,就不要寫成三元判斷了。
  if (isQuizComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="quiz complete icon" />
        <h2>Quiz Complete</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <div id="question" key={activeQuestionIndex}>
        {/* 當傳入的props沒有state可以觸發render的時候,可以用 key來觸發 */}
        <QuestionTimer timeOut={10000} onTimeOut={handleSkipAnswer} />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <Answer
          answers={QUESTIONS[activeQuestionIndex].answers}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          answerState={answerState}
          onSelect={handleSelectedAnswer}
        />
      </div>
    </div>
  );
}
