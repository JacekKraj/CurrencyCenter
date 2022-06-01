import React from 'react';
import FormGroup from '@material-ui/core/FormControl';

import classes from './types.module.scss';
import TypeCheckbox from './typeCheckbox/TypeCheckbox';

const Types: React.FC = () => {
  return (
    <FormGroup>
      <div className={classes.typesCheckboxes}>
        <TypeCheckbox label='Best buy rate' className={classes.checkboxRed} />
        <TypeCheckbox label='Best sell rate' className={classes.checkboxBlue} />
        <TypeCheckbox label='Average rate in the world' className={classes.checkboxGray} />
      </div>
    </FormGroup>
  );
};

export default Types;
