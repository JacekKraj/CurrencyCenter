import React from 'react';

import classes from './feature.module.scss';

interface Props {
  icon: string;
  description: string;
}

const Feature: React.FC<Props> = ({ icon, description }) => {
  return (
    <div className={classes.feature}>
      <img src={icon} alt='feature icon' className={classes.featureIcon} />
      <p className={classes.featureDescription}>{description}</p>
    </div>
  );
};

export default Feature;
