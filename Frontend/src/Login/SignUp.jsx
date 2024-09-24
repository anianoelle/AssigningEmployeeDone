import { useEffect, useState } from 'react'
import "../output.css"
import "../Login/SignIn.css"
import email from "../assets/email.png"
import password from "../assets/password.png"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';



function SignUp() {    
 
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [firstnameInput, setFirstnameInput] = useState('');
  const [lastnameInput, setLastnameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [streetInput, setStreetInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [signupStatus, setSignupStatus] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8081/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailInput, password: passwordInput, fname: firstnameInput, lname: lastnameInput, phone: phoneInput, street: streetInput, city: cityInput }),
      });

      const result = await response.json();
      
      if (result.success) {
        setSignupStatus('Sign up successful!');
        window.alert('Sign up successful!');
        navigate('/Home');

      } else {
        setSignupStatus('Sign up failed. Please try again.');
        window.alert('Sign up failed. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      setSignupStatus('An error occurred during sign up.');
    }
  };
  
  
  return (
  <div className='w-screen h-screen  flex flex-col justify-center items-center bg-gray-100'>
    <div className='w-[100%] h-[50%] flex'>
        <div className='w-[50%] h-[100%] flex items-center justify-center'>
            <div className='w-[55%] h-[100%] flex items-center justify-end pt-36'>
                <h1 className='font-extrabold text-9xl text-violet-500'>Guys</h1>
            </div>
        </div>
         <div className='w-[50%] h-[100%]'></div>
    </div>
    
    <div className='w-[100%] h-[50%] flex'>
        <div className='w-[50%] h-[100%]'></div>
         <div className='w-[50%] h-[100%] flex items-center justify-center'>
            <div className='w-[58%] h-[100%] flex items-center justify-start pb-36'>
                <h1 className='font-extrabold text-9xl text-blue-500'>Gals</h1>
            </div>
        </div>
    </div>

    <div className='w-[100%] h-[100%] bg-brown-200 absolute flex items-center justify-center'>
       
        <form className='w-[24%] h-[75%] bg-white border rounded-lg flex flex-col'  onSubmit={handleSignUp}>
           
            <div className='w-[100%] h-[20%] p-5 pl-8 flex items-center justify-center flex-col'>
                <div className='w-[100%] h-[40%] flex items-end z-0'>
                    <h1 className='text-3xl font-thin text-gray-500'>Sign Up</h1>
                </div>
                <div className='w-[100%] h-[40%]flex items-start'>
                    <h1 className='text-xl font-thin text-gray-500'>it's quick and easy.</h1>
                </div>
            </div>

            <div className='w-[100%] h-[0.2%] bg-gray-400'></div>
           
            <div className='w-[100%] h-[9%] flex'>  
                <div className='w-[50%] h-[100%] flex items-center justify-center'>
                    <input 
                     className='w-[92%] h-[65%] bg-gray-100 border border-gray-400 rounded-md pl-3 focus:outline-violet-400'
                     placeholder='First name'
                     value={firstnameInput}
                        onChange={(e) => setFirstnameInput(e.target.value)}
                        required
                    >
                    </input>
                </div>
                <div className='w-[50%] h-[100%] flex items-center justify-center'>
                    <input 
                     className='w-[92%] h-[65%] bg-gray-100 border border-gray-400 rounded-md pl-3 focus:outline-violet-400'
                     placeholder='Last name'
                     value={lastnameInput}
                     onChange={(e) => setLastnameInput(e.target.value)}
                     required
                    >
                    </input>
                </div>
            </div>

            <div className='w-[100] h-[5.8%] flex items-center justify-center'> 
                    <input 
                     className='w-[96%] h-[100%] bg-gray-100 border border-gray-400 rounded-md pl-3 focus:outline-violet-400'
                     placeholder='Phone number'
                     value={phoneInput}
                     onChange={(e) => setPhoneInput(e.target.value)}
                     required
                    >
                    </input>
            </div>
            <div className='w-[100] h-[7.8%] flex items-center justify-center'> 
                    <input 
                     className='w-[96%] h-[74%] bg-gray-100 border border-gray-400 rounded-md pl-3 focus:outline-violet-400'
                     placeholder='Email'
                     value={emailInput}    
                     onChange={(e) => setEmailInput(e.target.value)}
                     required 
                    >
                    </input>
            </div>
            <div className='w-[100] h-[5.8%] flex items-center justify-center'> 
                    <input 
                     className='w-[96%] h-[100%] bg-gray-100 border border-gray-400 rounded-md pl-3 focus:outline-violet-400'
                     placeholder='Password'
                     type='password'
                     value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        required
                    >
                    </input>
            </div>
            <div className='w-[100%] h-[4%] pl-3 flex items-end'>
                <h1 className='text-gray-400 text-md'>Address</h1>
            </div>
            <div className='w-[100] h-[5.8%] flex items-center justify-center'> 
                    <div className='w-[50%] h-[100%] flex items-start justify-center'>
                      <input 
                      className='w-[92%] h-[100%] bg-gray-100 border border-gray-400 rounded-md pl-3 focus:outline-violet-400'
                      placeholder='Street'
                      value={streetInput}
                      onChange={(e) => setStreetInput(e.target.value)}
                      required
                      >
                      </input>
                    </div>   
                    <div className='w-[50%] h-[100%] flex items-start justify-center'>
                      <input 
                      className='w-[92%] h-[100%] bg-gray-100 border border-gray-400 rounded-md pl-3 focus:outline-violet-400'
                      placeholder='City'
                      value={cityInput}
                      onChange={(e) => setCityInput(e.target.value)}
                      required
                      >
                      </input>
                    </div>   
            </div>
            <div className='w-[100%] h-[7%] flex items-end justify-center'>
                <h5 className='text-xs w-[93%] text-gray-500 m-1'>People who use our service may have uploaded your contact information to Guys & Gals.</h5>    
            </div>
            <div className='w-[100%] h-[6%] flex items-start justify-center'>
                <h5 className='text-xs w-[93%] text-gray-500 m-1'>By clicking Sign Up, you agree to our <span className='text-blue-500'>Terms</span>, <span className='text-blue-500'>Privacy Policy</span> and <span className='text-blue-500'>Cookies Policy</span>.</h5>
            </div>

            <div className='w-[100%] h-[5.8%] flex items-center justify-center'>
                <button className='w-[85%] h-[100%] bg-violet-500 text-white text-lg rounded-md' type='submit'>Sign Up</button>
            </div>

            <div className='w-[100%] h-[7%] flex items-end justify-center'>
                <h1 className='text-gray-500 text-lg'>Already have an account?</h1>
            </div>
           
            <div className='w-[100%] h-[5.8%] flex items-center justify-center mt-3'>
               <Link to={'/'} className='w-[85%] h-[100%]'>
                <button className='w-[100%] h-[100%] bg-white border border-violet-400 text-violet-400 text-lg'>Login</button>
               </Link>
            </div>
        
        </form>
       
        <div className='w-[1%] h-[69%]'>
            <div className='w-[100%] h-[13%] bg-pink-300'></div>
            <div className='w-[100%] h-[13%] bg-violet-300'></div>
            <div className='w-[100%] h-[13%] bg-violet-400'></div>
            <div className='w-[100%] h-[13%] bg-violet-500'></div>
        </div>
    </div>
 
 </div>
  )
}

export default SignUp
