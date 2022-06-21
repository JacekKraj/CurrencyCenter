import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { HistoricalRatesContext } from './../../../../../context/providers/HistoricalRatesContextProvider';
import { ChartsTypes } from './../../../../../context/reducers/historicalRatesReducer';

interface Props {
  label: string;
  className?: string;
  type: ChartsTypes;
}

const TypeCheckbox: React.FC<Props> = ({ label, className, type }) => {
  const [isChecked, setIsChecked] = React.useState<boolean>(true);
  const { setActiveStatus, isActiveStatus } = React.useContext(HistoricalRatesContext);

  const isToSetTrue = (currStatus: boolean) => !currStatus;

  const anyAnotherStatusIsTrue = () => {
    const duplicatedActiveStatus = { ...isActiveStatus };
    delete duplicatedActiveStatus[type];
    return !!Object.values(duplicatedActiveStatus).filter((status) => status).length;
  };

  const isAbleToChangeStatus = () => {
    if (isToSetTrue(isActiveStatus[type]) || anyAnotherStatusIsTrue()) return true;

    return false;
  };

  const onChangeHandler = () => {
    if (isAbleToChangeStatus()) {
      setActiveStatus(type);
      setIsChecked(!isChecked);
      return;
    }
    setIsChecked(true);
  };

  return <FormControlLabel control={<Checkbox checked={isChecked} onChange={onChangeHandler} className={className} />} label={label} />;
};

export default TypeCheckbox;
