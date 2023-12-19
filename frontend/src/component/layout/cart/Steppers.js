import React, { useEffect, useState } from 'react';
import { Stepper } from 'react-form-stepper';

const Steppers = ({ currentStep }) => {
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    }
  }, [initialRender]);

  useEffect(() => {
    if (!initialRender) {
      // Perform any necessary actions when currentStep changes
    }
  }, [currentStep, initialRender]);

  return (
    <div>
      {!initialRender && (
        <Stepper
          steps={[
            { label: 'Shipping Info' },
            { label: 'Confirm Order' },
            { label: 'Payment' }
          ]}
          activeStep={currentStep}
        />
      )}
    </div>
  );
};

export default Steppers;
