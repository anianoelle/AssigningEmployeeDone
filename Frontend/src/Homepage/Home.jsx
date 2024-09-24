import { useEffect, useState } from 'react'
import "../output.css"
import { Link, replace } from 'react-router-dom'
import "../Homepage/Home.css"
import { useNavigate } from 'react-router-dom';
import p4 from "../assets/p4.jpg"


function Home() {    

    const [cartItems, setCartItems] = useState([]); // State to store cart items
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isFormOpen2, setIsFormOpen2] = useState(false);
    const [formContent, setFormContent] = useState({ title: '', description: '', price: '', serviceID: ''});
    const userEmail = localStorage.getItem('userEmail');
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const today = new Date();


    const f = new Intl.DateTimeFormat("en-us", {dateStyle: "full"})
 
    const handleLogout = () => {
        localStorage.removeItem('userToken'); 
        navigate('/'); 
    };

    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);


    const fetchUserAppointments = async () => {
        const userEmail = localStorage.getItem('userEmail');

        try {
            const response = await fetch('http://localhost:8081/userAppointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userEmail }),
            });

            const result = await response.json();
            console.log('Fetch result:', result);

            if (result.success) {
                setAppointments(result.data);
                setTotalPrice(result.totalPrice);
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError('Error fetching appointments');
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchUserAppointments();
    }, []);

    const handleBooking = async () => {
        const userEmail = localStorage.getItem('userEmail'); // Fetch userEmail from localStorage
    
        const bookingData = {
            date,
            time,
            serviceName: formContent.title,  // serviceName from form
            userEmail,  // Add userEmail here
        };
    
        try {
            const response = await fetch('http://localhost:8081/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });
    
            const result = await response.json();
            if (result.success) {
                alert('Booking successful!');
            } else {
                alert('Booking failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleBilling = async () => {
        const billingDate = f.format(today); // Format today's date
        const totalAmount = totalPrice; // Use calculated total price from cart
        const userEmail = userData.Email; // Or customerID if you have it available
    
        try {
            const checkoutResponse = await fetch('http://localhost:8081/billing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    totalAmount,
                    billingDate,
                    userEmail,
                }),
            });
    
            const checkoutData = await checkoutResponse.json();
    
            if (checkoutResponse.ok) {
                console.log('Billing successful:', checkoutData.message);
                // You might want to handle any additional logic here, such as updating the UI or redirecting
            } else {
                console.error('Billing failed:', checkoutData.message);
            }
        } catch (error) {
            console.error('Error during billing:', error);
        }
    };

    
    
    
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch('http://localhost:8081/getUserDetails', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: userEmail }), // or use CustomerID
            });
    
            const result = await response.json();
            if (result.success) {
              setUserData(result.data);
            } else {
              console.error(result.message);
            }
          } catch (err) {
            console.error('Error fetching user data:', err);
          }
        };
    
        if (userEmail) {
          fetchUserData();
        }
      }, [userEmail]);

      const handleAddToCart = (title, price) => {
        price = itemPrices[title];
     // Check if the item is already in the cart
     const existingItem = cartItems.find(item => item.title === title);
 
     if (!existingItem) {
       // If item doesn't exist, add new item
       setCartItems([...cartItems, { title, price }]);
       window.alert("Added to cart")
     }
 
     console.log('Item added to cart:', title); // For testing
   };

   const openForm = (title, description, price, serviceID) => {
    setFormContent({ title, description, price, serviceID});
    setIsFormOpen(true);
};

const openForm2 = () => {
    setIsFormOpen2(true);
};
    
    const handleRemoveFromCart = (title) => {
      // Remove the item from the cart
      setCartItems(cartItems.filter(item => item.title !== title));
  
      console.log('Item removed from cart:', title); // For testing
    };
  
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen); // Toggle modal visibility
    };

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        // Change state based on scroll position
        if (window.scrollY > 100) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);


  return (
  <div className='w-screen h-screen flex flex-col bg-white'>
     
      <div className='w-[100%] h-[100%]'>

       
        <div className='main w-[100%] h-[60%] flex'>
           
            <div  className='w-[100%] h-[5%] absolute flex z-40 bg-gray-800 bg-opacity-60'>
                
                <div className='w-[20%] h-[100%]'>
               
                </div>

                <div className='w-[20%] h-[100%]'>

                </div>
                <div className='w-[20%] h-[100%]'>

                </div>
               
                <div className='w-[40%] h-[100%] flex items-center justify-end'>
                   
                    <div className='w-[20%] h-[100%] flex items-center justify-center'>
                        <button className='text-white font-semibold' onClick={toggleModal}>My Booking</button>
                    </div>
                    <div className='w-[20%] h-[100%] flex'>
                        <div className='w-[70%] h-[100%] flex items-center justify-center'>
                            <h1 className='text-white font-semibold'>{userData.FName}</h1>
                        </div>
                        <div className='w-[30%] h-[100%] flex items-center justify-center'>
                            <button className='w-[70%] h-[70%] flex items-center justify-center bg-white rounded-[100%]' onClick={handleLogout}><h1></h1></button>
                        </div>
                    </div>
                    
                    {
                        isFormOpen2 && 
                        (
                            <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-40'>
                                <div className='w-[30%] h-[25%] rounded-md bg-white p-5 flex items-center justify-center flex-col'>
                                    <div className='w-[100%] h-[20%] flex items-center'>
                                        <h1 className='text-2xl font-semibold text-red-400'>Confirm Booking?</h1>
                                    </div>
                                    <div className='w-[100%] h-[40%] flex items-center'>
                                        <h1 className='text-sm font'>Please be aware that once you confirm your booking, it will be considered final. We are unable to accommodate any changes or cancellations to your appointment. Ensure all details are correct before finalizing your booking. Thank you for your understanding.</h1>
                                    </div>
                                    <div className='w-[100%] h-[40%] flex items-center justify-end pt-5'>
                                       <button className='border-2 text-violet-400 border-violet-400 rounded-sm pl-10 pr-10 pt-2 pb-2 mr-3' onClick={() => setIsFormOpen2(false)}>Not now</button>
                                       <button className='text-white bg-violet-400 rounded-sm pl-10 pr-10 pt-2 pb-2' onClick={handleBooking}>Confirm Booking</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {isFormOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-30">
                            
                            <div className="bg-white rounded-lg w-[30%] h-[75%]">
                                <div className="flex items-center justify-end h-[5%] bg-red-300">
                                    <button type="button" onClick={() => setIsFormOpen(false)} className="text-gray-600 hover:text-gray-800 p-2"> Close</button>
                                </div>
                                <div className="flex flex-col h-[95%] bg-blue-300">
                                    <div className='w-[100%] h-[30%] bg-red-400'>
                                        <img src={p4}></img>
                                    </div>
                                    <div className='w-[100%] h-[20%] bg-green-500 flex items-center justify-center flex-col pl-5 pr-5'>
                                         <div className='w-[100%] h-[60%] flex items-center bg-blue-500'>
                                            <h1 className='text-6xl font-thin'>{formContent.title}</h1>
                                        </div>
                                        <div className='w-[100%] h-[20%] flex items-start bg-red-300'>        
                                            <h1>Service ID: {formContent.serviceID}</h1>            
                                        </div>                            
                                    </div>
                                    <div className='w-[100%] h-[20%] bg-green-700 flex items-center pl-5 pr-5'>
                                        <h1>{formContent.description}</h1> 
                                    </div>
                                    <div className='w-[100%] h-[10%] bg-green-300 flex items-center pl-5 pr-5'>
                                        <h1 className='text-3xl'>P {formContent.price}</h1> 
                                        <img>{formContent.img}</img>
                                    </div>
                                    <div className='w-[100%] h-[20%] bg-red-400 pl-5 pr-5'>
                                        <div className='w-[100%] h-[100%] bg-blue-300 border-t border-gray-400'>
                                           
                                            <div className='w-[100%] h-[100%] flex'>
                                                <div className='w-[100%] h-[100%]'>
                                                    <div className='w-[100%] h-[25%] flex items-center'>
                                                        <h1 className='text-md'>What date and time work best for you?</h1>
                                                    </div>
                                                    <div className='w-[100%] h-[30%] flex'>
                                                        <div className='w-[27%] mr-2'>
                                                            <input  value={date} onChange={(e) => setDate(e.target.value)} className='w-[100%] h-[100%] p-2 focus:outline-violet-400' aria-label="Date" type="Date" />
                                                        </div>
                                                        <div className='w-[27%]'>
                                                            <input  value={time} onChange={(e) => setTime(e.target.value)}  className='w-[100%] h-[100%] p-2 focus:outline-violet-400' aria-label="Time" type="Time" />
                                                        </div>
                                                        <div className='w-[46%] h-[100%] bg-blue-400 flex items-centerj justify-center pl-2 pr-2'>
                                                            <button  onClick={() => openForm2()} className='w-[100%] h-[100%] bg-violet-400 text-white'>BOOK</button>
                                                        </div>
                                                    </div>
                                                    <div className='w-[100%] h-[30%] flex'>
                                                        <div className='w-[27%] mr-2'>
                                                             <h1>Date</h1>
                                                        </div>
                                                        <div className='w-[27%]'>
                                                             <h1>Time</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                          
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='w-[30%] h-[2%] flex justify-end pr-8'>
                                   <div className='w-[12%] h-[100%] bg-pink-300'></div>
                                   <div className='w-[12%] h-[100%] bg-violet-300'></div>
                                   <div className='w-[12%] h-[100%] bg-violet-400'></div>
                                   <div className='w-[12%] h-[100%] bg-violet-500'></div>
                            </div>

                        </div>
                    )}


                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                    
                            <div className="bg-gray-800 h-[70%] w-[45%] rounded-md">
                              <div className='w-[100%] h-[3%]'></div>
                               <div className='w-[100%] h-[72%] bg-white flex'>
                                    <div className='w-[65%] h-[100%]'>
                                        <div className='w-[100%] h-[10%] flex items-center pl-5'>                                            
                                            <h1 className='text-4xl font-thin text-gray-600'>INVOICE</h1>
                                        </div>
                                        <div className='w-[100%] h-[90%] bg-white p-5'>
                                            <div className='w-[100%] h-[10%]     flex items-center'>
                                                <h1 className='text-2xl font-bold text-gray-700'>Booking</h1>
                                            </div>
                                            <div className='w-[100%] h-[10%] flex border-b border-gray-400'>
                                                <div className='w-[50%] h-[100%] flex items-center'>
                                                    <h1 className='text-md font-semibold text-gray-500'>Service</h1>
                                                </div>
                                                <div className='w-[16.66%] h-[100%] flex items-center justify-center'>
                                                    <h1 className='text-md font-semibold text-gray-500'>Price</h1>
                                                </div>
                                                <div className='w-[16.66%] h-[100%] flex items-center justify-center'>
                                                    <h1 className='text-md font-semibold text-gray-500'>Quantity</h1>
                                                </div>
                                                <div className='w-[16.66%] h-[100%] flex items-center justify-center'>
                                                    <h1 className='text-md font-semibold text-gray-500'>Total</h1>
                                                </div>
                                            </div>
                                            <div className='items w-[100%] h-[80%] overflow-y-scroll'>
                                                {appointments.length === 0 ? (
                                                    <div className='w-[100%] h-[100%] flex items-center justify-center'>
                                                        <h1 className='text-xl font-thin'>No appointments found.</h1>
                                                    </div>
                                                ) : (
                                                    <ul>
                                                        {appointments.map((appointment, index) => (
                                                            <li  key={index} className="mb-1 h-[70px] w-[100%] flex border-b border-gray-300">
                                                                <div  className='w-[50%] h-[100%] flex items-center justify-start text-gray-500 text-xl font-thin'>
                                                                    <h1>{appointment.serviceName}</h1>
                                                                </div>
                                                                <div className='w-[16.66%] h-[100%] flex items-center justify-center text-xl font-thin text-gray-500'>
                                                                    <h1>P{appointment.Price}</h1>
                                                                </div>
                                                                <div  className='w-[16.66%] h-[100%] flex items-center justify-center'>
                                                                    <h1 className="text-sm font-semibold text-gray-500">{appointment.quantity}</h1>
                                                                </div>
                                                                <div  className='w-[16.66%] h-[100%] flex items-center justify-center'>
                                                                    <h1 className="text-sm font-semibold text-gray-500">P {appointment.Price * appointment.quantity}</h1>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                   
                                    <div className='w-[35%] h-[100%]'>
                                        <div className='w-[100%] h-[10%]'>
                                            <div className='w-[100%] h-[50%] pl-5'>
                                                <h1 className='text-lg font-semibold text-gray-700'>Date:</h1>
                                            </div>
                                            <div className='w-[100%] h-[50%] pl-5'>
                                                <h1 className='text-gray-700'>{f.format(today)}</h1>
                                            </div>
                                        </div>
                                        <div className='w-[100%] h-[90%] p-5'>

                                            <div className='w-[100%] h-[30%] mb-2 border-t border-b border-gray-500 flex flex-col justify-center ite'>
                                                <div className='w-[100%] h-[20%] flex items-center'>
                                                    <h1 className='font-bold text-gray-600'>Billed to</h1>
                                                </div>
                                                <div className='w-[100%] h-[20%] flex items-center'>
                                                    <h1 className='font-thin text-sm text-gray-600'>{userData.FName} {userData.LName}</h1>
                                                </div>
                                                <div className='w-[100%] h-[20%] flex items-center'>
                                                    <h1 className='font-bold text-gray-600'>Form of payment</h1>
                                                </div>
                                                <div className='w-[100%] h-[20%] flex items-center'>
                                                    <h1 className='font-thin text-sm text-gray-600'>GCASH</h1>
                                                </div>
                                            </div>
                                            <div className='w-[100%] h-[45%] border border-gray-200 rounded-md p-2'>
                                               
                                                <div className='w-[100%] h-[20%] flex'>
                                                    <div className='w-[50%] h-[100%] flex items-center'>
                                                        <h1 className='text-sm font-bold text-gray-500'>Subtotal</h1>
                                                    </div>
                                                    <div className='w-[50%] h-[100%] flex items-center justify-end'>
                                                        <h1 className="text-md font-bold text-gray-600">P{totalPrice}</h1>
                                                    </div>
                                                </div>
                                                <div className='w-[100%] h-[20%] flex'>
                                                    <div className='w-[50%] h-[100%] flex items-center'>
                                                        <h1 className='text-sm font-bold text-gray-500'>Discount</h1>
                                                    </div>
                                                    <div className='w-[50%] h-[100%] flex items-center justify-end'>
                                                        <h1 className="text-md font-bold text-gray-600">P0</h1>
                                                    </div>
                                                </div>
                                                <div className='w-[100%] h-[0.5%] bg-gray-400'></div>
                                                <div className='w-[100%] h-[30%] flex'>
                                                    <div className='w-[50%] h-[100%]     flex items-center'>
                                                        <h1 className='text-sm font-bold text-gray-500'>Grand total</h1>
                                                    </div>
                                                    <div className='w-[50%] h-[100%] flex items-center justify-end'>
                                                        <h1 className="text-md font-bold text-gray-600">P{totalPrice}</h1>
                                                    </div>
                                                </div>
                                                <div className='w-[100%] h-[29.5%] flex items-center justify-center'>
                                                    <Link to={"/Payment"} state={{ totalPrice }} className='w-[100%]'>
                                                        <button onClick={handleBilling}  className="bg-gray-600 text-white p-2 rounded w-[100%]">Check Out</button>
                                                    </Link> 
                                                </div>
                                               
                                            </div>    
                                            <div className='w-[100%] h-[15%] flex items-center justify-center p-2'>
                                                <button onClick={toggleModal} className=" w-[100%] bg-violet-400 text-white p-2 rounded">Back</button>
                                            </div>
                                        </div> 
                                    </div>
                                </div>

                                <div className='w-[100%] h-[25%] bg-gray-100 flex flex-col pl-10 pr-10 border-t border-gray-300'>
                                    <div className='w-[100%] h-[75%] flex'>
                                        <div className='w-[25%] h-[100%] flex flex-col items-center justify-center'>
                                            <div className='w-[100%]'>
                                                <h1 className='text-3xl font-extrabold text-gray-600'><span className='text-violet-500'>Guys</span> & <span className='text-blue-500'>Gals</span></h1>
                                            </div>   
                                            <div className='w-[100%]'>
                                                <h1 className='font-thin'>Salon and spa.</h1>
                                            </div>             
                                        </div>
                                        <div className='w-[50%] h-[100%] flex flex-col items-center justify-center'>
                                            <div className='w-[100%] h-[45%] flex justify-center items-center flex-col'>
                                                <h1 className='text-xl'>San Pedro Street</h1>
                                                <h1 className='text-xs border-b border-gray-400'>Poblacion District, Davao City, 8000 Davao del Sur</h1>
                                            </div>
                                            <div className='w-[100%] h-[45%] flex justify-center items-center flex-col'>
                                                <h1 className='text-xl'>Illustre Street</h1>
                                                <h1 className='text-xs'>Poblacion District, Davao City, 8000 Davao del Sur</h1>
                                            </div>   
                                        </div>
                                        <div className='w-[25%] h-[100%] flex flex-col justify-center items-center'>
                                            <h1 className='text-xl'>Contact</h1>
                                            <h1 className='text-xs'>0925 655 0522</h1>
                                        </div>
                                    </div>
                                    <div className='w-[100%] h-[25%] flex items-center justify-center border-t border-gray-400'>
                                        <h1 className='text-xs font-medium text-gray-600'>Copyright©2024Guys&Gals. All rights reserved</h1>
                                    </div>

                                </div>
                              
                            </div>

                        </div>
                    )}

                </div>
          
            </div>

            <div className='w-[50%] h-[100%] flex flex-col items-center justify-center'> 
              <div className='w-[100%] h-[23%] flex items-center pl-[20%]'>
                  <h1 className='text-8xl font-bold text-white'><span className='text-violet-500'>Guys</span> & <span className='text-blue-500'>Gals</span></h1>
              </div>
              <div className='w-[100%] h-[10%] pl-[20%]'>
                  <h1 className='text-3xl font-thin text-white'>Salon and Spa</h1>
              </div>
              <div className='w-[100%] h-[15%] pl-[20%]'>
                 <div className='book w-[15%] hover:cursor-pointer rounded-md flex items-center justify-center pt-1.5 pb-1.5'>
                    <button className='text-xl text-white'>BOOK NOW</button>
                 </div>
              </div>
            </div>
            
            <div className='w-[50%] h-[100%] flex items-center justify-center'>

            </div>

        </div>

        <div className='w-[100%] flex items-center justify-center'>

            <div className='w-[75%] flex flex-col'>

              <div className='w-[100%] flex flex-col justify-center items-center'>
                  <div className='w-[100%] h-[100px] flex items-end justify-center'>
                      <h1 className='text-3xl font-thin text-gray-700'>WELCOME TO GUYS & GALS SALON</h1>
                  </div>
                  <div className='w-[100%] h-[150px] flex items-center justify-center'>
                      <h1 className='w-[65%] text-center text-xl text-gray-700'>Step into a world of relaxation and elegance at our salon and spa, where every visit is a journey to rejuvenation. Let us pamper you with exceptional beauty treatments and serene spa experiences, tailored to your every need.</h1>
                  </div>
              </div>

              <div className='w-[100%] h-[100px] flex items-center justify-center bg-gray-200'>
                  <h1 className='text-3xl font-thin text-gray-700'>SERVICES WE OFFER</h1>
              </div>

              <div className='w-[100%] h-[50px] flex items-center mt-10'>
                  <h1 className='text-xl text-gray-700'>COMBO RATES</h1>
              </div>

                <div className='w-[100%] flex flex-col'>
                   
                    <div className='w-[100%] h-[300px] flex items-center justify-between '>
                        
                        <div className='hcspa w-[32.7%] h-[95%] bg-white rounded-sm '>   
                            <div className='w-[100%] h-[100%] bg-black opacity-45 rounded-sm'>
                                <div className='w-[100%] h-[30%] flex items-center p-5'>
                                    <h1 id="item-title" className='text-3xl font-thin text-white'>HAIRCUT + SPA</h1>
                                </div>
                                <div className='w-[100%] h-[50%] pl-5 flex'>
                                    <h2 className='text-white'>Indulge in a lavish experience where, in a single luxurious appointment, you'll be treated to a deeply nourishing hair spa treatment that revitalizes your locks, followed by a refreshing haircut tailored to enhance your look and leave you feeling rejuvenated.</h2>
                                </div>
                                <div className='w-[100%] h-[20%] flex'>
                                    <div className='w-[50%] h-[100%] items-center flex pl-5'>
                                        <h1 className='text-2xl text-white'>P 499</h1>
                                    </div>
                                    <div className='w-[50%] flex justify-end items-center pr-5'>
                                        <button className='pl-5 pr-5 pt-1 pb-1 text-white text-lg font-thin hover:border-violet-500 border rounded'  onClick={() => openForm('HAIRCUT + SPA', "Indulge in a lavish experience where, in a single luxurious appointment, you'll be treated to a deeply nourishing hair spa treatment that revitalizes your locks, followed by a refreshing haircut tailored to enhance your look and leave you feeling rejuvenated.", 499, 101)}>Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='rbkr w-[32.7%] h-[95%] bg-white rounded-sm'>
                            <div className='w-[100%] h-[100%] bg-black opacity-45 rounded-sm'>
                                <div className='w-[100%] h-[30%] flex items-center p-5'>
                                    <h1 id="item-title" className='text-3xl font-thin text-white'>REBOND + KERATIN</h1>
                                </div>
                                <div className='w-[100%] h-[50%] pl-5 flex'>
                                    <h2 className='text-white'>This treatment offers long-lasting smoothness and shine by strengthening and straightening the hair. It nourishes each strand, reducing frizz and enhancing manageability, leaving your hair sleek, healthy, and glossy for an extended period.</h2>
                                </div>
                                <div className='w-[100%] h-[20%] flex'>
                                    <div className='w-[50%] h-[100%] items-center flex pl-5'>
                                        <h1 className='text-2xl text-white'>P 1,999</h1>
                                    </div>
                                    <div className='w-[50%] flex justify-end items-center pr-5'>
                                        <button className='pl-5 pr-5 pt-1 pb-1 text-white text-lg font-thin hover:border-violet-500 border rounded' onClick={() => openForm('REBOND + KERATIN', "This treatment offers long-lasting smoothness and shine by strengthening and straightening the hair. It nourishes each strand, reducing frizz and enhancing manageability, leaving your hair sleek, healthy, and glossy for an extended period.", 1999,102)}>Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='bbhc w-[32.7%] h-[95%] bg-white rounded-sm'>
                            <div className='w-[100%] h-[100%] bg-black opacity-45 rounded-sm'>
                                <div className='w-[100%] h-[30%] flex items-center p-5'>
                                    <h1 id="item-title" className='text-3xl font-thin text-white'>BRIZILIAN  BLOWOUT + HAIR COLOR</h1>
                                </div>
                                <div className='w-[100%] h-[50%] pl-5 flex'>
                                    <h2 className='text-white'>In just one treatment, you can achieve shiny, frizz-free hair with vibrant, long-lasting color. The formula works to deeply nourish and protect each strand, locking in moisture for smoothness while ensuring your color stays rich and brilliant over time. You'll enjoy sleek, manageable hair with a radiant finish that lasts.</h2>
                                </div>
                                <div className='w-[100%] h-[20%] flex'>
                                    <div className='w-[50%] h-[100%] items-center flex pl-5'>
                                        <h1 className='text-2xl text-white'>P 1,499</h1>
                                    </div>
                                    <div className='w-[50%] flex justify-end items-center pr-5'>
                                        <button className='pl-5 pr-5 pt-1 pb-1 text-white text-lg font-thin hover:border-violet-500 border rounded' onClick={() => openForm('BRIZILIAN BLOWOUT + HAIR COLOR',"In just one treatment, you can achieve shiny, frizz-free hair with vibrant, long-lasting color. The formula works to deeply nourish and protect each strand, locking in moisture for smoothness while ensuring your color stays rich and brilliant over time. You'll enjoy sleek, manageable hair with a radiant finish that lasts.", 1499,103)}>Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>   

                    <div className='w-[100%] h-[300px] flex items-center justify-between '>
                        
                        <div className='hc w-[32.7%] h-[95%] bg-white rounded-sm '>   
                            <div className='w-[100%] h-[100%] bg-black opacity-45 rounded-sm'>
                                <div className='w-[100%] h-[30%] flex items-center p-5'>
                                    <h1 id="item-title" className='text-3xl font-thin text-white'>HAIRCUT</h1>
                                </div>
                                <div className='w-[100%] h-[50%] pl-5 flex'>
                                    <h2 className='text-white'>
                                    Layers create movement and volume, giving your hair a dynamic, effortless flow that enhances texture and adds depth. By strategically cutting different lengths throughout your hair, layers allow for natural movement, making it easier to style with a carefree, tousled look.</h2>
                                </div>
                                <div className='w-[100%] h-[20%] flex'>
                                    <div className='w-[50%] h-[100%] items-center flex pl-5'>
                                        <h1 className='text-2xl text-white'>P 150</h1>
                                    </div>
                                    <div className='w-[50%] flex justify-end items-center pr-5'>
                                        <button className='pl-5 pr-5 pt-1 pb-1 text-white text-lg font-thin hover:border-violet-500 border rounded'  onClick={() => openForm('HAIRCUT', "Layers create movement and volume, giving your hair a dynamic, effortless flow that enhances texture and adds depth. By strategically cutting different lengths throughout your hair, layers allow for natural movement, making it easier to style with a carefree, tousled look.", 150, 104)}>Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='b w-[32.7%] h-[95%] bg-white rounded-sm'>
                            <div className='w-[100%] h-[100%] bg-black opacity-45 rounded-sm'>
                                <div className='w-[100%] h-[30%] flex items-center p-5'>
                                    <h1 id="item-title" className='text-3xl font-thin text-white'>BALAYAGE</h1>
                                </div>
                                <div className='w-[100%] h-[50%] pl-5 flex'>
                                    <h2 className='text-white'>Our balayage process gives you natural-looking highlights with a sun-kissed glow. The technique blends seamlessly with your hair for a soft, radiant finish. It's the perfect way to add a touch of summer to your style year-round.</h2>
                                </div>
                                <div className='w-[100%] h-[20%] flex'>
                                    <div className='w-[50%] h-[100%] items-center flex pl-5'>
                                        <h1 className='text-2xl text-white'>P 1,499</h1>
                                    </div>
                                    <div className='w-[50%] flex justify-end items-center pr-5'>
                                        <button className='pl-5 pr-5 pt-1 pb-1 text-white text-lg font-thin hover:border-violet-500 border rounded' onClick={() => openForm('BALAYAGE', "Our balayage process gives you natural-looking highlights with a sun-kissed glow. The technique blends seamlessly with your hair for a soft, radiant finish. It's the perfect way to add a touch of summer to your style year-round.", 1499,105)}>Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='pct w-[32.7%] h-[95%] bg-white rounded-sm'>
                            <div className='w-[100%] h-[100%] bg-black opacity-45 rounded-sm'>
                                <div className='w-[100%] h-[30%] flex items-center p-5'>
                                    <h1 id="item-title" className='text-3xl font-thin text-white'>PERM CURL + TREATMENT</h1>
                                </div>
                                <div className='w-[100%] h-[50%] pl-5 flex'>
                                    <h2 className='text-white'>Curls and Care! Our specialized treatment provides long-lasting, nourished curls that are easy to manage. Say goodbye to frizz and dryness, as we enhance the health of your hair while keeping your curls beautifully defined. Enjoy soft, bouncy curls that look vibrant and stay healthy with minimal effort.</h2>
                                </div>
                                <div className='w-[100%] h-[20%] flex'>
                                    <div className='w-[50%] h-[100%] items-center flex pl-5'>
                                        <h1 className='text-2xl text-white'>P 1,299</h1>
                                    </div>
                                    <div className='w-[50%] flex justify-end items-center pr-5'>
                                        <button className='pl-5 pr-5 pt-1 pb-1 text-white text-lg font-thin hover:border-violet-500 border rounded' onClick={() => openForm('PERM CURL + TREATMENT',"Curls and Care! Our specialized treatment provides long-lasting, nourished curls that are easy to manage. Say goodbye to frizz and dryness, as we enhance the health of your hair while keeping your curls beautifully defined. Enjoy soft, bouncy curls that look vibrant and stay healthy with minimal effort.", 1299,106)}>Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>   


                    <div className='w-[100%] h-[300px] flex items-center justify-between'>
                        
                        <div className='rs w-[32.7%] h-[95%] bg-white rounded-sm '>   
                            <div className='w-[100%] h-[100%] bg-black opacity-45 rounded-sm'>
                                <div className='w-[100%] h-[30%] flex items-center p-5'>
                                    <h1 id="item-title" className='text-3xl font-thin text-white'>REBOND + SINGLE COLOR</h1>
                                </div>
                                <div className='w-[100%] h-[50%] pl-5 flex'>
                                    <h2 className='text-white'>For long-lasting smoothness and shine, this treatment strengthens and straightens your hair. It works to deeply fortify each strand, reducing frizz and improving manageability. The result is sleek, glossy hair that stays smooth and healthy for an extended period.</h2>
                                </div>
                                <div className='w-[100%] h-[20%] flex'>
                                    <div className='w-[50%] h-[100%] items-center flex pl-5'>
                                        <h1 className='text-2xl text-white'>P 1,499</h1>
                                    </div>
                                    <div className='w-[50%] flex justify-end items-center pr-5'>
                                        <button className='pl-5 pr-5 pt-1 pb-1 text-white text-lg font-thin hover:border-violet-500 border rounded'  onClick={() => openForm('REBOND + SINGLE COLOR', "For long-lasting smoothness and shine, this treatment strengthens and straightens your hair. It works to deeply fortify each strand, reducing frizz and improving manageability. The result is sleek, glossy hair that stays smooth and healthy for an extended period.", 1499, 107)}>Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='rct w-[32.7%] h-[95%] bg-white rounded-sm'>
                            <div className='w-[100%] h-[100%] bg-black opacity-45 rounded-sm'>
                                <div className='w-[100%] h-[30%] flex items-center p-5'>
                                    <h1 id="item-title" className='text-3xl font-thin text-white'>REBOND + COLOR + TREATMENT</h1>
                                </div>
                                <div className='w-[100%] h-[50%] pl-5 flex'>
                                    <h2 className='text-white'>With Rebonding for repair, Color for added vibrancy, and Treatment for deep nourishment, you can experience the ultimate in hair restoration. This comprehensive approach targets every aspect of hair care, leaving your strands healthier, shinier, and more resilient. Achieve beautifully restored hair that looks and feels revitalized from root to tip.</h2>
                                </div>
                                <div className='w-[100%] h-[20%] flex'>
                                    <div className='w-[50%] h-[100%] items-center flex pl-5'>
                                        <h1 className='text-2xl text-white'>P 1,999</h1>
                                    </div>
                                    <div className='w-[50%] flex justify-end items-center pr-5'>
                                        <button className='pl-5 pr-5 pt-1 pb-1 text-white text-lg font-thin hover:border-violet-500 border rounded' onClick={() => openForm('REBOND + COLOR + TREAMENT', "With Rebonding for repair, Color for added vibrancy, and Treatment for deep nourishment, you can experience the ultimate in hair restoration. This comprehensive approach targets every aspect of hair care, leaving your strands healthier, shinier, and more resilient. Achieve beautifully restored hair that looks and feels revitalized from root to tip.", 1999,108)}>Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='h w-[32.7%] h-[95%] bg-white rounded-sm'>
                            <div className='w-[100%] h-[100%] bg-black opacity-45 rounded-sm'>
                                <div className='w-[100%] h-[30%] flex items-center p-5'>
                                    <h1 id="item-title" className='text-3xl font-thin text-white'>HIGHLIGHTS</h1>
                                </div>
                                <div className='w-[100%] h-[50%] pl-5 flex'>
                                    <h2 className='text-white'>Add dimension and vitality to your hair with the help of our skilled highlighting techniques. Our experts carefully apply highlights to enhance your natural look, creating depth and movement. The result is a vibrant, multi-dimensional style that brings out the best in your hair.</h2>
                                </div>
                                <div className='w-[100%] h-[20%] flex'>
                                    <div className='w-[50%] h-[100%] items-center flex pl-5'>
                                        <h1 className='text-2xl text-white'>P 499</h1>
                                    </div>
                                    <div className='w-[50%] flex justify-end items-center pr-5'>
                                        <button className='pl-5 pr-5 pt-1 pb-1 text-white text-lg font-thin hover:border-violet-500 border rounded' onClick={() => openForm('HIGHLIGHTS',"Add dimension and vitality to your hair with the help of our skilled highlighting techniques. Our experts carefully apply highlights to enhance your natural look, creating depth and movement. The result is a vibrant, multi-dimensional style that brings out the best in your hair.", 499,109)}>Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>   

                    <div className='w-[100%] h-[50px] flex items-center mt-10'>
                         <h1 className='text-xl text-gray-700'>NAIL SERVICES</h1>
                    </div>

                    <div className='w-[100%] h-[300px] flex items-center justify-between'>
                        
                        <div className='rs w-[32.7%] h-[95%] bg-white rounded-sm '>   
                            <div className='w-[100%] h-[100%] bg-black opacity-45 rounded-sm'>
                                <div className='w-[100%] h-[30%] flex items-center p-5'>
                                    <h1 id="item-title" className='text-3xl font-thin text-white'>REBOND + SINGLE COLOR</h1>
                                </div>
                                <div className='w-[100%] h-[50%] pl-5 flex'>
                                    <h2 className='text-white'>For long-lasting smoothness and shine, this treatment strengthens and straightens your hair. It works to deeply fortify each strand, reducing frizz and improving manageability. The result is sleek, glossy hair that stays smooth and healthy for an extended period.</h2>
                                </div>
                                <div className='w-[100%] h-[20%] flex'>
                                    <div className='w-[50%] h-[100%] items-center flex pl-5'>
                                        <h1 className='text-2xl text-white'>P 1,499</h1>
                                    </div>
                                    <div className='w-[50%] flex justify-end items-center pr-5'>
                                        <button className='pl-5 pr-5 pt-1 pb-1 text-white text-lg font-thin hover:border-violet-500 border rounded'  onClick={() => openForm('REBOND + SINGLE COLOR', "For long-lasting smoothness and shine, this treatment strengthens and straightens your hair. It works to deeply fortify each strand, reducing frizz and improving manageability. The result is sleek, glossy hair that stays smooth and healthy for an extended period.", 1499, 107)}>Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='rct w-[32.7%] h-[95%] bg-white rounded-sm'>
                            <div className='w-[100%] h-[100%] bg-black opacity-45 rounded-sm'>
                                <div className='w-[100%] h-[30%] flex items-center p-5'>
                                    <h1 id="item-title" className='text-3xl font-thin text-white'>REBOND + COLOR + TREATMENT</h1>
                                </div>
                                <div className='w-[100%] h-[50%] pl-5 flex'>
                                    <h2 className='text-white'>With Rebonding for repair, Color for added vibrancy, and Treatment for deep nourishment, you can experience the ultimate in hair restoration. This comprehensive approach targets every aspect of hair care, leaving your strands healthier, shinier, and more resilient. Achieve beautifully restored hair that looks and feels revitalized from root to tip.</h2>
                                </div>
                                <div className='w-[100%] h-[20%] flex'>
                                    <div className='w-[50%] h-[100%] items-center flex pl-5'>
                                        <h1 className='text-2xl text-white'>P 1,999</h1>
                                    </div>
                                    <div className='w-[50%] flex justify-end items-center pr-5'>
                                        <button className='pl-5 pr-5 pt-1 pb-1 text-white text-lg font-thin hover:border-violet-500 border rounded' onClick={() => openForm('REBOND + COLOR + TREAMENT', "With Rebonding for repair, Color for added vibrancy, and Treatment for deep nourishment, you can experience the ultimate in hair restoration. This comprehensive approach targets every aspect of hair care, leaving your strands healthier, shinier, and more resilient. Achieve beautifully restored hair that looks and feels revitalized from root to tip.", 1999,108)}>Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='h w-[32.7%] h-[95%] bg-white rounded-sm'>
                            <div className='w-[100%] h-[100%] bg-black opacity-45 rounded-sm'>
                                <div className='w-[100%] h-[30%] flex items-center p-5'>
                                    <h1 id="item-title" className='text-3xl font-thin text-white'>HIGHLIGHTS</h1>
                                </div>
                                <div className='w-[100%] h-[50%] pl-5 flex'>
                                    <h2 className='text-white'>Add dimension and vitality to your hair with the help of our skilled highlighting techniques. Our experts carefully apply highlights to enhance your natural look, creating depth and movement. The result is a vibrant, multi-dimensional style that brings out the best in your hair.</h2>
                                </div>
                                <div className='w-[100%] h-[20%] flex'>
                                    <div className='w-[50%] h-[100%] items-center flex pl-5'>
                                        <h1 className='text-2xl text-white'>P 499</h1>
                                    </div>
                                    <div className='w-[50%] flex justify-end items-center pr-5'>
                                        <button className='pl-5 pr-5 pt-1 pb-1 text-white text-lg font-thin hover:border-violet-500 border rounded' onClick={() => openForm('HIGHLIGHTS',"Add dimension and vitality to your hair with the help of our skilled highlighting techniques. Our experts carefully apply highlights to enhance your natural look, creating depth and movement. The result is a vibrant, multi-dimensional style that brings out the best in your hair.", 499,109)}>Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>   

                    <div className='w-[100%] h-[300px] flex items-center justify-between'>
                        
                        <div className='rs w-[32.7%] h-[95%] bg-white rounded-sm '>   
                            <div className='w-[100%] h-[100%] bg-black opacity-45 rounded-sm'>
                                <div className='w-[100%] h-[30%] flex items-center p-5'>
                                    <h1 id="item-title" className='text-3xl font-thin text-white'>REBOND + SINGLE COLOR</h1>
                                </div>
                                <div className='w-[100%] h-[50%] pl-5 flex'>
                                    <h2 className='text-white'>For long-lasting smoothness and shine, this treatment strengthens and straightens your hair. It works to deeply fortify each strand, reducing frizz and improving manageability. The result is sleek, glossy hair that stays smooth and healthy for an extended period.</h2>
                                </div>
                                <div className='w-[100%] h-[20%] flex'>
                                    <div className='w-[50%] h-[100%] items-center flex pl-5'>
                                        <h1 className='text-2xl text-white'>P 1,499</h1>
                                    </div>
                                    <div className='w-[50%] flex justify-end items-center pr-5'>
                                        <button className='pl-5 pr-5 pt-1 pb-1 text-white text-lg font-thin hover:border-violet-500 border rounded'  onClick={() => openForm('REBOND + SINGLE COLOR', "For long-lasting smoothness and shine, this treatment strengthens and straightens your hair. It works to deeply fortify each strand, reducing frizz and improving manageability. The result is sleek, glossy hair that stays smooth and healthy for an extended period.", 1499, 107)}>Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='rct w-[32.7%] h-[95%] bg-white rounded-sm'>
                            <div className='w-[100%] h-[100%] bg-black opacity-45 rounded-sm'>
                                <div className='w-[100%] h-[30%] flex items-center p-5'>
                                    <h1 id="item-title" className='text-3xl font-thin text-white'>REBOND + COLOR + TREATMENT</h1>
                                </div>
                                <div className='w-[100%] h-[50%] pl-5 flex'>
                                    <h2 className='text-white'>With Rebonding for repair, Color for added vibrancy, and Treatment for deep nourishment, you can experience the ultimate in hair restoration. This comprehensive approach targets every aspect of hair care, leaving your strands healthier, shinier, and more resilient. Achieve beautifully restored hair that looks and feels revitalized from root to tip.</h2>
                                </div>
                                <div className='w-[100%] h-[20%] flex'>
                                    <div className='w-[50%] h-[100%] items-center flex pl-5'>
                                        <h1 className='text-2xl text-white'>P 1,999</h1>
                                    </div>
                                    <div className='w-[50%] flex justify-end items-center pr-5'>
                                        <button className='pl-5 pr-5 pt-1 pb-1 text-white text-lg font-thin hover:border-violet-500 border rounded' onClick={() => openForm('REBOND + COLOR + TREAMENT', "With Rebonding for repair, Color for added vibrancy, and Treatment for deep nourishment, you can experience the ultimate in hair restoration. This comprehensive approach targets every aspect of hair care, leaving your strands healthier, shinier, and more resilient. Achieve beautifully restored hair that looks and feels revitalized from root to tip.", 1999,108)}>Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='h w-[32.7%] h-[95%] bg-white rounded-sm'>
                            <div className='w-[100%] h-[100%] bg-black opacity-45 rounded-sm'>
                                <div className='w-[100%] h-[30%] flex items-center p-5'>
                                    <h1 id="item-title" className='text-3xl font-thin text-white'>HIGHLIGHTS</h1>
                                </div>
                                <div className='w-[100%] h-[50%] pl-5 flex'>
                                    <h2 className='text-white'>Add dimension and vitality to your hair with the help of our skilled highlighting techniques. Our experts carefully apply highlights to enhance your natural look, creating depth and movement. The result is a vibrant, multi-dimensional style that brings out the best in your hair.</h2>
                                </div>
                                <div className='w-[100%] h-[20%] flex'>
                                    <div className='w-[50%] h-[100%] items-center flex pl-5'>
                                        <h1 className='text-2xl text-white'>P 499</h1>
                                    </div>
                                    <div className='w-[50%] flex justify-end items-center pr-5'>
                                        <button className='pl-5 pr-5 pt-1 pb-1 text-white text-lg font-thin hover:border-violet-500 border rounded' onClick={() => openForm('HIGHLIGHTS',"Add dimension and vitality to your hair with the help of our skilled highlighting techniques. Our experts carefully apply highlights to enhance your natural look, creating depth and movement. The result is a vibrant, multi-dimensional style that brings out the best in your hair.", 499,109)}>Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>   

                    <div className='w-[100%] h-[300px] flex items-center justify-between'>
                        
                        <div className='rs w-[32.7%] h-[95%] bg-white rounded-sm '>   
                            <div className='w-[100%] h-[100%] bg-black opacity-45 rounded-sm'>
                                <div className='w-[100%] h-[30%] flex items-center p-5'>
                                    <h1 id="item-title" className='text-3xl font-thin text-white'>REBOND + SINGLE COLOR</h1>
                                </div>
                                <div className='w-[100%] h-[50%] pl-5 flex'>
                                    <h2 className='text-white'>For long-lasting smoothness and shine, this treatment strengthens and straightens your hair. It works to deeply fortify each strand, reducing frizz and improving manageability. The result is sleek, glossy hair that stays smooth and healthy for an extended period.</h2>
                                </div>
                                <div className='w-[100%] h-[20%] flex'>
                                    <div className='w-[50%] h-[100%] items-center flex pl-5'>
                                        <h1 className='text-2xl text-white'>P 1,499</h1>
                                    </div>
                                    <div className='w-[50%] flex justify-end items-center pr-5'>
                                        <button className='pl-5 pr-5 pt-1 pb-1 text-white text-lg font-thin hover:border-violet-500 border rounded'  onClick={() => openForm('REBOND + SINGLE COLOR', "For long-lasting smoothness and shine, this treatment strengthens and straightens your hair. It works to deeply fortify each strand, reducing frizz and improving manageability. The result is sleek, glossy hair that stays smooth and healthy for an extended period.", 1499, 107)}>Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>   

                    <div className='w-[100%] h-[350px] bg-gray-800 mt-36 flex flex-col'>
                            <div className='w-[100%] h-[50%] flex items-center justify-center border-b border-gray-400'>
                                <div className='w-[50%] h-[100%] flex flex-col items-center justify-center'>
                                    <div className='w-[100%] h-[50%] pl-10 flex items-center z-40'>
                                        <h1 className='text-7xl font-bold text-white'><span className='text-violet-500'>Guys</span> & <span className='text-blue-500'>Gals</span></h1>
                                    </div>
                                    <div className='w-[100%] h-[30%] pl-10 flex items-center'>
                                        <h1 className='text-2xl text-white'>Salon and Spa</h1>
                                    </div>
                                </div>
                                <div className='w-[50%] h-[100%] flex flex-col items-center justify-center'>
                                    <div className='w-[100%] h-[20%] items-center flex'>
                                        <div className='w-[60%] h-[100%] flex items-center'> 
                                            <h1 className='font-bold text-lg text-white'>Services</h1>
                                        </div> 
                                        <div className='w-[40%] h-[100%] flex items-center justify-center'> 
                                            <h1 className='font-bold text-lg text-white'>Contact us</h1>
                                        </div> 
                                    </div>
                                    <div className='w-[100%] h-[50%] flex'>
                                        <div className='w-[20%] h-[100%] flex flex-col justify-center'>
                                            <h1 className='text-white hover:text-gray-500 cursor-pointer'>Cutting</h1>
                                            <h1 className='text-white hover:text-gray-500 cursor-pointer'>Hair Color</h1>
                                            <h1 className='text-white hover:text-gray-500 cursor-pointer'>Spa</h1>
                                        </div>
                                        <div className='w-[20%] h-[100%] flex flex-col justify-center'>
                                            <h1 className='text-white hover:text-gray-500 cursor-pointer'>Treatment</h1>
                                            <h1 className='text-white hover:text-gray-500 cursor-pointer'>Pedicure</h1>
                                            <h1 className='text-white hover:text-gray-500 cursor-pointer'>Manicure</h1>
                                        </div>
                                        <div className='w-[20%] h-[100%] flex flex-col pt-2'>
                                            <h1 className='text-white hover:text-gray-500 cursor-pointer'>Nail Extension</h1>
                                            <h1 className='text-white hover:text-gray-500 cursor-pointer'>Wax Treatment</h1>
                                        </div>
                                        <div className='w-[40%] h-[100%] flex flex-col pt-2 items-center'>
                                            <h1 className='text-white hover:text-gray-500 cursor-pointer'>0925 655 0522</h1>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='w-[100%] h-[50%] flex flex-col'>
                                <div className='w-[100%] h-[70%] flex items-center justify-center'>
                                        <div className='w-[35%] h-[100%] flex items-center justify-center'>
                                                <div className='w-[99.5%] h-[100%] flex flex-col items-center justify-center'>
                                                    <div className='w-[100%] h-[30%] flex items-center justify-center'>
                                                        <h1 className='text-3xl font-thin text-white'>San Pedro Street</h1>
                                                    </div>
                                                    <div className='w-[100%] h-[20%] flex items-center justify-center'>
                                                        <h1 className='text-white'>Poblacion DIsctrict, Davao City, 8000 Davao del Sur</h1>
                                                    </div>
                                                </div>
                                                <div className='w-[0.3%] h-[45%] bg-white'></div>
                                        </div>
                                         <div className='w-[35%] h-[100%] flex items-center justify-center'>
                                                <div className='w-[99.5%] h-[100%] flex flex-col items-center justify-center'>
                                                    <div className='w-[100%] h-[30%] flex items-center justify-center'>
                                                        <h1 className='text-3xl font-thin text-white'>Illustre Street</h1>
                                                    </div>
                                                    <div className='w-[100%] h-[20%] flex items-center justify-center'>
                                                        <h1 className='text-white'>Poblacion DIsctrict, Davao City, 8000 Davao del Sur</h1>
                                                    </div>
                                                </div>
                                        </div>
                                </div>

                                <div className='w-[100%] h-[30%] flex items-center justify-center'>
                                    <h1 className='text-white font-thin'>Copyright©2024Guys&Gals. All rights reserved</h1>
                                </div>

                            </div>

                    </div>


                </div>

        </div>

      </div>

      </div> 

  </div>
  )
}

export default Home
