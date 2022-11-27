import axios from "axios";
import { useState } from "react";
// import {Razorpay} from 'razorpay';
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
import "../recruiter/file.css";


// const razor = new Razorpay({
//     key_id: 'rzp_test_ajith05f4vTdiL',
//     key_secret: '3ZNvkwhfE65UXsZ35i90lsFW',
//   });

function App() {
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

	return (
		<div className="App">
			{/* <div className="book_container">
				<img src={book.img} alt="book_img" className="book_img" />
				<p className="book_name">{book.name}</p>
				<p className="book_author">By {book.author}</p>
				<p className="book_price">
					Price : <span>&#x20B9; {book.price}</span>
				</p> */}
				{/* <button onClick={handlePayment} className="buy_btn">
					Payment
				</button> */}
                
                <Button
                variant="contained"
                color="primary"
                // className={classes.statusBlock}
                onClick={handlePayment}
              >
                    Payment

              </Button> 
                
			{/* </div> */}
		</div>
	);
}

export default App;