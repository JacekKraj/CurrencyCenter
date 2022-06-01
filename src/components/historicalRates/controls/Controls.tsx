import React from 'react';

import classes from './controls.module.scss';
import TypesCheckboxes from './types/Types';
import Ranges from './ranges/Ranges';

const Controls: React.FC = () => {
  return (
    <div className={classes.controls}>
      <TypesCheckboxes />
      <Ranges />
    </div>
  );
};

export default Controls;
