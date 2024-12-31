import React, { useRef } from 'react';

export default function Answer({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  // 處理排序問題(三個選擇)
  // (X)一般變數: const shuffledAnswers; 因為沒有辦法持久化,會導致排序在render的時候,又被打亂
  // (X)useState:const [shuffledAnswers, setShuffledAnswers] = useState([]); 造成不必要的render,導致畫面有閃爍的問題
  // (O)useRef: const shuffledAnswers = useRef(); 靜態持久化,保存資料的同時又不會使畫面重新render

  // useState VS useRef
  // 相同: 畫面在被render的時資料仍存在
  // 差異: useState會觸發render的機制, useRef不會

  // useRef VS 一般變數
  // 相同: 都不會觸發render的機制
  // 差異: useRef在render後資料仍保存, 一般變數會清空

  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    // 展開運算符: 不會影響原本的資料。
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClasses = '';

        if (answerState === 'answered' && isSelected) {
          cssClasses = 'selected';
        }
        if (
          (answerState === 'correct' || answerState === 'wrong') &&
          isSelected
        ) {
          cssClasses = answerState;
        }

        return (
          <li className="answer" key={answer}>
            <button onClick={() => onSelect(answer)} className={cssClasses}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
