import logoImg from '../assets/quiz-logo.png';
import React from 'react';

export default function Hearder() {
  return (
    <header>
      <img src={logoImg} alt="quiz logo" />
      <h1>React-Quiz</h1>
    </header>
  );
}
