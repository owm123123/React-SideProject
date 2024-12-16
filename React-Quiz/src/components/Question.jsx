import React from 'react';

export default function Question() {
  return (
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
  );
}
