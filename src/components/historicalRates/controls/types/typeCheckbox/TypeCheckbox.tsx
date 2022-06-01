import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import classes from './typeCheckbox.module.scss';

interface Props {
  label: string;
  className?: string;
}

const TypeCheckbox: React.FC<Props> = ({ label, className }) => {
  return <FormControlLabel control={<Checkbox defaultChecked className={className} />} label={label} />;
};

export default TypeCheckbox;
