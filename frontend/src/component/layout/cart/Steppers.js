import React from 'react';
import { Stepper } from 'react-form-stepper';


const Steppers = ({currentStep}) => {
    return (
        <Stepper
        steps={[{ label: 'Shipping Info' }, { label: 'Confirm Order' }, { label: 'Payment' }]}
        activeStep ={currentStep}
      />
    );
};

export default Steppers;