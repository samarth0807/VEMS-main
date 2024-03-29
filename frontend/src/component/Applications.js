import { useState, useEffect, useContext } from "react";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Modal,
  Slider,
  FormControlLabel,
  FormGroup,
  MenuItem, 
  Checkbox,
} from "@material-ui/core";
// import  '../recruiter/indexs';
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import Stepper from 'react-stepper-horizontal';
import { SetPopupContext } from "../App";
import TestPayment from './recruiter/TestPayment'


import apiList from "../lib/apiList";
import ProgressBar from "./recruiter/ProgressBar";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  statusBlock: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  },
  jobTileOuter: {
    padding: "30px",
    margin: "20px 0",
    boxSizing: "border-box",
    width: "100%",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ApplicationTile = (props) => {
  const classes = useStyles();
  const { application } = props;
  const setPopup = useContext(SetPopupContext);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(application.job.rating);

  const appliedOn = new Date(application.dateOfApplication);
  const joinedOn = new Date(application.dateOfJoining);

  const [book, setBook] = useState({
  name: "Training Module",
  author: "Samarth Datir",
  img: "",
  price: 5000,
});

const initPayment = (data) => {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  document.body.appendChild(script);
  // script.onload = display;
  console.log("initPayment")
  const options = {
      key: "rzp_test_ajith05f4vTdiL",
      amount: data.amount,
      currency: data.currency,
      name: book.name,
      description: "Test Transaction",
      image: book.img,
      order_id: data.id,
      handler: async (response) => {
          try {
              const verifyUrl = "http://localhost:4444/payment/verify";
              const { data } = await axios.post(verifyUrl, response);
              console.log(data);
          } catch (error) {
              console.log(error);
          }
      },
      theme: {
          color: "#3399cc",
      },
  };
  const razor = new window.Razorpay(options);
  console.log(" after initPayment")
  razor.open();
};

const handlePayment = async () => {
  try {
    const orderUrl = "http://localhost:4444/payment/orders";
    const { data } = await axios.post(orderUrl, { amount: book.price });
    console.log(data);
    initPayment(data.data);
  } catch (error) {
    console.log(error);
  }
};
  // const fetchRating = () => {
  //   axios
  //     .get(`${apiList.rating}?id=${application.job._id}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     })
  //     .then((response) => {
  //       setRating(response.data.rating);
  //       console.log(response.data);
  //     })
  //     .catch((err) => {
  //       // console.log(err.response);
  //       console.log(err.response.data);
  //       setPopup({
  //         open: true,
  //         severity: "error",
  //         message: "Error",
  //       });
  //     });
  // };

  // const changeRating = () => {
  //   axios
  //     .put(
  //       apiList.rating,
  //       { rating: rating, jobId: application.job._id },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //       setPopup({
  //         open: true,
  //         severity: "success",
  //         message: "Rating updated successfully",
  //       });
  //       fetchRating();
  //       setOpen(false);
  //     })
  //     .catch((err) => {
  //       // console.log(err.response);
  //       console.log(err);
  //       setPopup({
  //         open: true,
  //         severity: "error",
  //         message: err.response.data.message,
  //       });
  //       fetchRating();
  //       setOpen(false);
  //     });
  // };



  const handleClose = () => {
    setOpen(false);
  };
 const onClickNext =() => {
    const { steps, currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  }
  const colorSet = {
    applied: "#3454D1",
    shortlisted: "#DC851F",
    accepted: "#09BC8A",
    rejected: "#D1345B",
    deleted: "#B49A67",
    cancelled: "#FF8484",
    finished: "#4EA5D9",
  };

  return (
    <Paper className={classes.jobTileOuter} elevation={3}>
      <Grid container>
        <Grid container item xs={9} spacing={1} direction="column">
          <Grid item>
            <Typography variant="h5">   <Button  onClick={() => {
                  setOpen(true);
                }}>{application.job.title}</Button></Typography>
          </Grid>
          <Grid item>Posted By: {application.recruiter.name}</Grid>
          <Grid item>Role : {application.job.jobType}</Grid>
          <Grid item>Salary : &#8377; {application.job.salary} per month</Grid>
          <Grid item>
            Duration :{" "}
            {application.job.duration !== 0
              ? `${application.job.duration} month`
              : `Flexible`}
          </Grid>
          <Grid item>
            {application.job.skillsets.map((skill) => (
              <Chip label={skill} style={{ marginRight: "2px" }} />
            ))}
          </Grid>
          <Grid item>Applied On: {appliedOn.toLocaleDateString()}</Grid>
          {application.status === "accepted" ||
          application.status === "finished" ? (
            <Grid item>Joined On: {joinedOn.toLocaleDateString()}</Grid>
          ) : null}
        </Grid>
        <Grid item container direction="column" xs={3}>
          <Grid item xs>
            <Paper
              className={classes.statusBlock}
              style={{
                background: colorSet[application.status],
                color: "#ffffff",
              }}
            >
              {application.status}
            </Paper>
          </Grid>
          {application.status === "accepted" ||
          application.status === "finished" ? (
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={classes.statusBlock}
                onClick={handlePayment}
              >
                    Payment

              </Button>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
      {/* <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
        <Paper
          style={{
            padding: "20px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "30%",
            alignItems: "center",
          }}
        > */}
          <div>
    
      {/* <Stepper steps={ [{title: 'Application Submitted'}, {title: 'Interview 1'}, {title: 'Interview 2'}, {title: 'Accepted'}] } activeStep={ 1 } /> */}
      {/* <div  onClick={ this.onClickNext }>Next</div> */}
      {/* <ProgressBar/> */}
    </div>
        {/* </Paper>
      </Modal> */}
    </Paper>
  );
};

const Applications = (props) => {
  const setPopup = useContext(SetPopupContext);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.applications, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setApplications(response.data);
      })
      .catch((err) => {
        // console.log(err.response);
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Applications</Typography>
      </Grid>
      <Grid
        container
        item
        xs
        direction="column"
        style={{ width: "100%" }}
        alignItems="stretch"
        justify="center"
      >
        {applications.length > 0 ? (
          applications.map((obj) => (
            <Grid item>
              <ApplicationTile application={obj} />
            </Grid>
          ))
        ) : (
          <Typography variant="h5" style={{ textAlign: "center" }}>
            No Applications Found
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Applications;
