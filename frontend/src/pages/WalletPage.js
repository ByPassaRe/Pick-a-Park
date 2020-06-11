import React, { useState, useEffect } from 'react';
import axios from "../services/axiosService";
import { Input, Form } from 'antd';
import '../App.css';
import { PayPalButton } from "react-paypal-button-v2";
import Swal from 'sweetalert2'

function WalletPage() {
    const [statusMessage, setStatusMessage] = useState(null);
    const [walletAmount, setWalletAmount] = useState(null);
    const [amountToAdd, setAmountToAdd] = useState(0);


    useEffect(() => {
        (async function fetchWallet() {
            setStatusMessage('Loading...');

            try {
                const response = await axios.get("http://localhost:5000/users/balance");
                setWalletAmount(response.data.balance);
            } catch (err) {
                setStatusMessage('Error retrieving data.');
            };

        })();

    }, []);

    const handleChange = (e) => {
        if(e.target.value < 0) {
            Swal.fire("You can't delete cash!")
            setAmountToAdd(0); 
            return;
        }
        setAmountToAdd(e.target.value);
    }

    function order(data, actions) {
        return actions.order.create({
            purchase_units: [{
                description: "Charge Pick-a-Park account",
                amount: {
                    value: amountToAdd,
                }
            }]
        });
    }

    function approve(data, actions) {
        // Capture the funds from the transaction
        return actions.order.capture().then(async function(details) {
            //If you click "Update" with 0$, It is to avoid an useless call to API
            if (amountToAdd === 0)
                return

            try {
                await axios.patch(`http://localhost:5000/users/chargeBalance`, {
                    amount: amountToAdd
                });
            } catch (err) {
                Swal.fire(err);
            }

            /*
                Why +num1 + +num2?
                Because num1,num2 are strings and I need to convert them to number
            */
            setWalletAmount(+walletAmount + +amountToAdd);
            setAmountToAdd(0);
            Swal.fire("Transaction completed by " + details.payer.email_address);
        })
        .catch(()=>{
            Swal.fire("Transaction error!");
        });
    }

    return (
        <div className="container-registration">
            <h2>Wallet</h2>
            {
                walletAmount !== null ? 
                <>
                    <Form
                        name="issue-form"
                        className="issue-form"
                    >
                        <Form.Item
                            label="You have:"
                            name="you-have"
                        >
                            <b>{walletAmount} $</b>
                        </Form.Item>

                        <Form.Item
                            label="Set amount to add:"
                            name="amount-to-add"
                        >
                            <Input style={{ width: 200 }} type="number" min="0" step="any" value={amountToAdd} onChange={handleChange}/> 
                        </Form.Item>
                        
                    </Form>
                    <PayPalButton
                        createOrder={order}
                        onApprove={approve}
                    />
                </>
                :
                    <p>{statusMessage}</p>
            }
        
        </div>
    );
}

export default WalletPage;