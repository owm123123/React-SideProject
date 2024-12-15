import React, { useCallback, useState } from 'react';
import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions';
import QuestionTimer from './QuestionTimer';

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const shuffledAnswers = QUESTIONS.sort(() => Math.random() - 0.5);
  const isQuizComplete = QUESTIONS.length === activeQuestionIndex;

  const handleSelectedAnswer = useCallback(function handleSelectedAnswer(
    answer
  ) {
    setUserAnswers((prev) => [...prev, answer]);
  },
  []);

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
      <div id="question">
        {/* 當傳入的props沒有state可以觸發render的時候,可以用 key來觸發 */}
        <QuestionTimer
          key={activeQuestionIndex}
          timeOut={10000}
          onTimeOut={handleSkipAnswer}
        />
        <h2>{shuffledAnswers[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers[activeQuestionIndex].answers.map((answer) => (
            <li className="answer" key={answer}>
              <button onClick={() => handleSelectedAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
