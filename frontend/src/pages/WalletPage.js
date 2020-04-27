import React, {useState, useEffect} from 'react';
import axios from 'axios';

function WallerPage() {
    const [statusMessage, setStatusMessage] = useState(null);
    const [walletAmount, setWalletAmount] = useState(null);

    useEffect(() => {
        (async function fetchWallet () {
            setStatusMessage('Loading...');
            try {
                const response = {
                    data: {
                        wallet: 10
                    }
                };
                setWalletAmount(response.data.wallet);
            } catch (err) {
                setStatusMessage('Error retrieving data.');
            };
            
        })();

    }, []);

    const AmountAdder = () => {
        const [amountToAdd, setAmountToAdd] = useState(0);

        const handleSend = async () => {
            try {
                //CHIAMATA API Per cambiare il prezzo sul db
                /*await axios.patch(`http://localhost:5000/parkingSpots/${props.parkingSpot._id}`, {
                    price: newPrice
                });*/
            } catch (err) {
                alert(err);
            }

            alert("New amount set succesfully");
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
            walletAmount? 
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

export default WallerPage;