import { useEffect, useState } from 'react'
import "../output.css"
import "../Login/SignIn.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function SignIn() {    
 
  const navigate = useNavigate();
  const [data, setData] =useState([])
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Send the username and password to the backend for validation
    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      // Check if login is successful
      if (data.success) {
        window.alert('Login successful!');
        setLoginStatus('Login successful!');
        localStorage.setItem('userEmail', email);
        navigate('/Home');
      } else {
        setLoginStatus('Invalid email or password');
      }
    } catch (err) {
      console.error('Error:', err);
      setLoginStatus('An error occurred');
    }
  };

 

  useEffect(() =>
    {
      fetch('http://localhost:8081/users')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
    }, [])

  return (
  <div className='w-screen h-screen  flex justify-center items-center'>
    
     <div className='leftdiv w-[30%] h-[75%] bg-violet-500 rounded-tl-xl rounded-bl-xl'>
        <div className='w-[100%] h-[50%] flex items-center justify-center'>
           <div className='w-[80%]'>
              <h1 className='text-8xl font-bold text-white'>Guys & Gals</h1>
           </div>
        </div>
     </div>

     <div className='w-[30%] h-[75%] bg-gray-100 rounded-tr-xl rounded-br-xl flex items-center justify-center'>
       
        <form className='w-[70%] h-[80%] bg-white rounded-lg flex flex-col items-center justify-center border' onSubmit={handleLogin}>
           
            <div className='w-[100%] h-[20%] flex items-center justify-center'>
                <h1 className='font-extrabold text-3xl'><span className='text-violet-500'>Guys</span><span className='text-gray-600'> &</span><span className='text-blue-500'> Gals</span></h1>
            </div>
            
            <div className='w-[100%] h-[30%] flex flex-col items-center justify-center'>
                <div className='w-[80%] h-[20%]'>
                    <h1 className='text-lg font-thin'>Welcome Back</h1>
                </div>
                <div className='w-[80%] h-[25%] border border-gray-500 mb-2.5'>
                    <input
                      className='w-[100%] h-[100%] p-3 focus:outline-violet-400'
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                </div>
                <div className='w-[80%] h-[25%] border border-gray-500'>
                    <input
                      className='w-[100%] h-[100%] p-3 focus:outline-violet-400'
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                </div>
                <div className='w-[80%] h-[20%] flex items-center justify-center'>
                   {loginStatus && <p className='text-red-400'>{loginStatus}</p>}
               </div>
            </div>
            <div className='w-[100%] h-[10%] flex items-center justify-center'>
                <button className='w-[80%] h-[70%] bg-violet-500 rounded-md text-white' type="submit">Login</button>
            </div>
            <div className='w-[100%] h-[7%] flex items-center justify-center'>
                <div className='w-[80%] h-[100%] flex'>
                    <div className='h-[100%] w-[15%] flex items-center justify-center border-r-0 border border-gray-600'><div className='google w-[70%] h-[70%]'></div></div>
                    <button className='w-[85%] h-[100%] border border-l-0 border-gray-600 text-gray-600' type="submit">Continue With Google</button>
                </div> 
            </div> 
            <div className='w-[100%] h-[23%] flex items-center flex-col'>
              <div className='w-[100%] h-[40%] flex items-center justify-center mb-5'>
                <Link to={'Admin'}>
                  <h1 className='font-semibold text-gray-700 hover:cursor-pointer hover:text-blue-400'>Log In as Admin</h1>
                </Link>
              </div>
               <Link to={'SignUp'} className='w-[80%] h-[32%]'>
                  <button className='text-lg border border-violet-400 text-violet-400 w-[100%] h-[100%]'>Create Account</button>
               </Link>
            </div>
        </form>

        <div className='w-[3%] h-[74%] flex flex-col'>
            <div className='w-[100%] h-[13%] bg-pink-300'></div>
            <div className='w-[100%] h-[13%] bg-violet-300'></div>
            <div className='w-[100%] h-[13%] bg-violet-400'></div>
            <div className='w-[100%] h-[13%] bg-violet-500'></div>
        </div>
    
     </div>
   
  </div>
  )
}

export default SignIn
