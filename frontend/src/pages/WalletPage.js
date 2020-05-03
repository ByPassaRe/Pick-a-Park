import React, {useState, useEffect} from 'react';
import axios from "../services/axiosService";

function WalletPage() {
    const [statusMessage, setStatusMessage] = useState(null);
    const [walletAmount, setWalletAmount] = useState(null);

    useEffect(() => {
        (async function fetchWallet () {
            setStatusMessage('Loading...');

            try {
                const response = await axios.get("http://localhost:5000/users/balance");
                setWalletAmount(response.data.balance);
            } catch (err) {
                setStatusMessage('Error retrieving data.');
            };
            
        })();

    }, []);

    const AmountAdder = () => {
        const [amountToAdd, setAmountToAdd] = useState(0);

        const handleSend = async () => {
            //If you click "Update" with 0€, It is to avoid an useless call to API
            if(amountToAdd === 0)
                return 
            
            try {
                await axios.patch(`http://localhost:5000/users/chargeBalance`, {
                    amount: amountToAdd
                });
                alert("New amount set succesfully");
            } catch (err) {
                alert(err);
            }

            /*
                Why +num1 + +num2?
                Because num1,num2 are strings and I need to convert them to number
            */
            setWalletAmount(+walletAmount + +amountToAdd);

        }

        const handleChange = (e) => {
            if(e.target.value < 0) {
                alert("You can't delete cash!")
                setAmountToAdd(0); 
                return;
            }
            setAmountToAdd(e.target.value);
        }

        return (
            <>
                Set amount to add:
                <input type="number" min="0" step="any" value={amountToAdd} onChange={handleChange}/> 
                <button onClick={handleSend}>Update</button>
            </>
        )
    }

  return (
        <>
        <h2>Wallet</h2>
        {
            walletAmount ? 
                <div>
                    <p>You have {walletAmount} €</p> 
                    <AmountAdder/>
                </div>
                :
                <p>{statusMessage}</p>
        }
        
        </>
  );
}

export default WalletPage;