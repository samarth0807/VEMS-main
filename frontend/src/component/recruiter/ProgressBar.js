import React, { useState } from "react";
import StepNavigation from "../recruiter/stepNavigation";
import  '../recruiter/indexs.css';

function ProgressBar() {
  const labelArray = ['Applied', 'Interview 1', 'Interview 2', 'Interview 3', 'Accepted']
  const [currentStep, updateCurrentStep] = useState(1);

  function updateStep(step) {
    updateCurrentStep(step);
  }
  
  //disabled={currentStep === 1}
  //disabled={currentStep === labelArray.length}
  return (
    // <div>Hello</div>
    <div className="Hello">
      <StepNavigation labelArray={labelArray} currentStep={currentStep} updateStep={updateStep} className="abc"></StepNavigation>
      {/* <p>Selected Step: {currentStep}</p> */}
      {/* <button className="primaryButton"  onClick={() => updateStep(currentStep - 1)}>Previous Step</button> */}
      <button className="primaryButton"  onClick={() => updateStep(currentStep+1)}>Next Step</button>
    </div>
  );
}

export default ProgressBar;