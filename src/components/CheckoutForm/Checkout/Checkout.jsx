import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from "@material-ui/core";
import useStyles from './styles';
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { commerce } from "../../../lib/commerce";
import {Link, useHistory} from "react-router-dom";

const steps = [ 'Shipping Address', 'Payment details'];

const Checkout = ({ cart, order, onCaptureCheckout,error }) => {

    const classes = useStyles();

    const [shippingData, setShippingData] = useState({});
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [ isFinished, setIsFinished ] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
                //console.log(token);
                setCheckoutToken(token);
            } catch (error) {
                history.push('/');
            }
        }
        generateToken();
    }, [cart]);


    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);
        nextStep();
    };

    const timeOut = () => {
      setTimeout(()=> {
          setIsFinished(true);
      })  ;
    };

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h6">Thank you for your purchase, { order.customer.firstname } { order.customer.lastname }</Typography>
                <Divider className={classes.divider}/>
                <Typography variant="subtitle2">Order ref: { order.customer_reference }</Typography>
            </div>
            <br/>
            <Button variant="outlined" type="button" component={Link} to="/">Back to Home</Button>
        </>
    ) : isFinished ? (
        <>
            <div>
                <Typography variant="h6">Thank you for your purchase!</Typography>
                <Divider className={classes.divider}/>
            </div>
            <br/>
            <Button variant="outlined" type="button" component={Link} to="/">Back to Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress/>
        </div>
    );

    if (error)
    {
        return (
            <>
               <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',  height: '90vh'}}>
                   <Typography variant="h5" gutterBottom>Error: {error}</Typography>
                   <br/>
                   <Button variant="outlined" type="button" component={Link} to="/">Back to Home</Button>
               </div>
            </>
        );
    }

    const Form = () => {
        return activeStep === 0 ? <AddressForm checkoutToken={ checkoutToken } next={ next } /> : <PaymentForm shippingData={ shippingData } checkoutToken={ checkoutToken } nextStep={ nextStep } backStep={ backStep } onCaptureCheckout={ onCaptureCheckout } timeOut={ timeOut } />
    };

    return (
        <>
            <CssBaseline />
          <div className={ classes.toolbar }/>
            <main className={ classes.layout }>
                <Paper className={ classes.paper }>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={ activeStep } className={classes.stepper}>
                        {steps.map( ( step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                            )
                        )}
                    </Stepper>
                    { activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form/>}
                </Paper>
            </main>
        </>
    );
};

export default Checkout;
