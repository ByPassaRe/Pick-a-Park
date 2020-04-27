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

  return (
        <>
        <h2>Wallet</h2>
        {
            walletAmount? <p>You have {walletAmount} €</p> : <p>{statusMessage}</p>
        }
        
        </>
  );
}

export default WallerPage;