import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './formInfo.module.scss';

interface Props {
  question: string;
  answer: string;
  path: string;
}

const FormInfo: React.FC<Props> = ({ question, path, answer }) => {
  return (
    <div className={classes.formInfo}>
      <p className={classes.question}>{question}</p>
      <NavLink to={`/${path}`}>
        <p className={classes.answer}>{answer}</p>
      </NavLink>
    </div>
  );
};

export default FormInfo;
