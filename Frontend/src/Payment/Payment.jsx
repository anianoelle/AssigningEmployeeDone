import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import gcash from "../assets/gcash.png"
import logo from "../assets/gcashlogo.png"

function Payment() {

  const location = useLocation();
  const { totalPrice } = location.state || { totalPrice: 0 };

  const handlePayment = async (retries = 3) => {
    try {
        const response = await axios.post('https://api.paymongo.com/v1/links', {
            data: {
                attributes: {
                    amount: totalPrice * 100, // Convert to integer (in cents)
                    description: "Due",
                    remarks: "none"
                }
            }
        }, {
            headers: {
                'accept': 'application/json',
                'authorization': 'Basic c2tfdGVzdF93dlRmbTJaZW81ajU0MWpYSkFwTXUzanI6', // Use your actual PayMongo key here
                'content-type': 'application/json'
            }
        });

        console.log('Payment link created:', response.data);
        // Optionally handle the response, e.g., redirect the user to the payment link
        if (response.data && response.data.data && response.data.data.attributes) {
            window.open(response.data.data.attributes.checkout_url, '_blank'); // Redirect to the checkout URL
        }
    } catch (error) {
        if (error.response && error.response.status === 429 && retries > 0) {
            console.log(`Rate limit exceeded. Retrying... (${retries} attempts left)`);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
            return handlePayment(retries - 1); // Retry
        }
        console.error('Payment error:', error);
        // Handle the error appropriately
    }
};






  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">

      <div className='w-[30%] h-[70%] bg-white flex items-center flex-col border'>
        <div className='w-[100%] h-[25%] bg-white p-1.5'>
          <div className='w-[100%] h-[100%] bg-gray-200'>
              <div className='w-[100%] h-[60%] flex items-center justify-center'><img src={gcash} className='w-[23%]'></img></div>
          </div>
        </div>

        <div className='w-[65%] h-[60%] bg-white bottom-16 relative border rounded-3xl'>
            <div className='w-[100%] h-[25%] p-2 flex flex-col items-center justify-center bg-white'>
              <div className='w-[100%] h-[40%] flex items-center pl-4'>
                  <h1 className='font-medium text-sm'>Merchant <span className='ml-10 font-bold text-sm'>Guys & Gals</span></h1>
              </div>    
              <div className='w-[100%] h-[40%] flex items-center pl-4'>
                  <h1 className='font-medium text-sm'>Amount Due <span className='ml-5 text-sm font-medium text-blue-400'>PHP {totalPrice}</span></h1>
              </div>          
            </div>

            <div className='w-[100%] h-[10%] flex items-center justify-center'>
                <h1 className='font-medium'>Pay with GCash</h1>
            </div>

            <div className='w-[100%] h-[65%] bg-white flex items-center justify-center'>
                <img src={logo} className='w-[70%]'></img>
            </div>

        </div>

        <div className='w-[100%] h-[7%] bottom-14 relative flex justify-center'>
           <button onClick={handlePayment} className="bg-blue-500 text-white text-lg font-semibold rounded w-[65%] h-[100%]">Pay</button>
        </div>
       
        <div className='w-[100%] h-[8%] bg-gray-200 flex items-center justify-center'>
            <h1 className='text-sm text-gray-600'>Copyright©2024Guys&Gals. All rights reserved</h1>
        </div>

      </div>
    </div>
  );
}

export default Payment;
