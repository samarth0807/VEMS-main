import React, { useState, useEffect } from "react";
import StepNavigation from "../recruiter/stepNavigation";
import  '../recruiter/indexs.css';
import axios from "axios";
function ProgressBar(props) {
  const labelArray = ['Applied', 'Interview 1', 'Interview 2', 'Interview 3', 'Accepted']
  const [currentStep, updateCurrentStep] = useState(1);

  function updateStep(currentStep) {
    let val;
    if(currentStep==1){
      val='technical';
      updateCurrentStep(2);
    }else if(currentStep==2){
      val='managerial';
      updateCurrentStep(3);
    }else if(currentStep==3){
      val='hr';
      updateCurrentStep(4);
    }else if(currentStep==4){
      val='accepted';
      updateCurrentStep(5);
    }else{
      val="accepted";
    }
    const data = {
      jobId:props.jobId,
      applicantId: props.applicantId,
      state: val
    };
    axios
    .put('http://localhost:4444/api/progress', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
  
  }
console.log(props.jobId);
console.log(props.applicantId);
console.log(props.jobId);
  useEffect(() => {
    const statusData = {
      jobId:props.jobId,
      applicantId: props.applicantId,
      // status:'shortlisted'
    };
    //let address
    axios
    .post("http://localhost:4444/api/applications/status", statusData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {

    //  console.log(response.data);
     var val=response.data.state;
     if(val=='shortlisted'){
      updateCurrentStep(1);
     }else if(val=='technical'){
      updateCurrentStep(2);
     }else if(val=='managerial'){
      updateCurrentStep(3);
     }else if(val=='hr'){
      updateCurrentStep(4);
     }else{
      updateCurrentStep(5);
     }
    })
    .catch((err) => {
      // setPopup({
      //   open: true,
      //   severity: "error",
      //   message: err.response.data.message,
      // });
      console.log(err.response);
    });
  });
  //disabled={currentStep === 1}
  //disabled={currentStep === labelArray.length}
  return (
    // <div>Hello</div>
    <div className="Hello">
      <StepNavigation labelArray={labelArray} currentStep={currentStep} updateStep={updateStep} className="abc"></StepNavigation>
      {/* <p>Selected Step: {currentStep}</p> */}
      {/* <button className="primaryButton"  onClick={() => updateStep(currentStep - 1)}>Previous Step</button> */}
      <button className="primaryButton"  onClick={() => updateStep(currentStep)}>Next Step</button>
    </div>
  );
}

export default ProgressBar;