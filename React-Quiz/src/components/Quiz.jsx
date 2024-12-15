import React, { useState } from 'react';
import QUESTIONS from '../questions';

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  function handleSelectedAnswer(answer) {
    setUserAnswers((prev) => [...prev, answer]);
  }

  return (
    <div id="quiz">
      <div id="question"></div>
      <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
      <ul id="answers">
        {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
          <li className="answer" key={answer}>
            <button onClick={() => handleSelectedAnswer(answer)}>
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
