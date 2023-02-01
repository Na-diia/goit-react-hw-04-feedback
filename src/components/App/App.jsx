import React, { useState } from "react";

import { Section } from "../Section/Section";
import { FeedbackOptions } from "../FeedbackOptions/FeedbackOptions";
import { Statistics } from "../Statistics/Statistics";
import { Notification } from "../Notification/Notification";
import styles from "./app.module.css";

export const App =() => {
  const [answer, setAnswer] = useState({
    good: 0,
    neutral:0,
    bad:0}
  );

  const onLeaveFeedBack = name => {
    setAnswer(prevState => {
      const value = prevState[name];

      return {...prevState, [name] : value +1};
    });
  };

  const countTotalFeedback = () => {
    const result = answer.good + answer.neutral + answer.bad;

    return result;
  };

  const countPositiveFeedbackPercentage = (good) => {
     const positiveAnswers = answer.good;
     
     if( positiveAnswers === 0) {
       return 0;
     }

     return Math.round((positiveAnswers / countTotalFeedback()) * 100);
  };

    return (
      <div className={styles.box}>
      <Section title="Please leave feedback">
      <FeedbackOptions 
         options={Object.keys(answer)} 
         onLeaveFeedback={onLeaveFeedBack} />
      </Section>
      <Section title="Statistics">
      {countTotalFeedback() > 0 ? (
      <Statistics 
       good={answer.good} 
       neutral={answer.neutral} 
       bad={answer.bad} 
       total={countTotalFeedback()} 
       positivePercentage={countPositiveFeedbackPercentage()} />) :
       (<Notification message="There is no feedback" />)}
      </Section>
      </div>
    )
};
