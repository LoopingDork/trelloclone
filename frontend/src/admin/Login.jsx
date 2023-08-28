import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios";
const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const [validation, setValidation] = useState([])

    useEffect(() => {
        if(localStorage.getItem('token')){
            navigate('/dashboard')
        }
    }, [])

    const loginHandler = async(e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)

        await axios.post('http://127.0.0.1:8000/api/login', formData)
        .then((response) => {
            localStorage.setItem('token', response.data.token)
            alert('Successfully login!')
            navigate('/dashboard')
        }).catch((error) => {
            setValidation(error.response.data)
        })
    }
    return(
        <>
            {
                validation.message && (
                    <div className="w-full bg-red-500 py-3 text-center text-white font-sans">
                        {validation.message}
                    </div>
                )
            }
            <div class="min-w-screen min-h-screen bg-blue-100 flex items-center justify-center px-5 py-5">
                <div class="bg-white text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{maxWidth:"430px"}}>
                    <div class="md:flex w-full">
                        <div class="w-full md:w-1/1 py-10 px-5 md:px-10">
                            <div class="text-center mb-10">
                                <h1 class="font-bold text-3xl text-gray-900">LOGIN PAGES</h1>
                                <p>Enter your dashboard to Login</p>
                            </div>
                            <form onSubmit={loginHandler}>
                                <div class="flex -mx-3">
                                    <div class="w-full px-3 mb-5">
                                        <label for="" class="text-xs font-semibold px-1">Username</label>
                                        <div class="flex">
                                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                            <input 
                                                type="text" 
                                                class="mb-3 w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                                placeholder="Ex: 201903"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </div>
                                        {
                                            validation.username && (
                                                <div className="bg-yellow-500 text-white py-3 w-full px-3 text-center border-r-4">
                                                    {validation.username[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div class="flex -mx-3">
                                    <div class="w-full px-3 mb-12">
                                        <label for="" class="text-xs font-semibold px-1">Password</label>
                                        <div class="flex">
                                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                            <input 
                                                type="password" 
                                                class="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                                placeholder="************"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        {
                                            validation.password && (
                                                <div className="bg-yellow-500 text-white py-3 w-full px-3 text-center border-r-4">
                                                    {validation.password[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div class="flex -mx-3">
                                    <div class="w-full px-3 mb-5">
                                        <button class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">LOG IN</button>
                                    </div>
                                </div>
                                <div className="text-center">
                                    Belum punya akun ? &nbsp;
                                    <Link 
                                        className="text-blue-500"
                                        to={{
                                            pathname:'/register'
                                        }}
                                    >
                                        Silahkan Register
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
                <div>
                    <a title="Buy me a beer" href="https://www.buymeacoffee.com/scottwindon" target="_blank" class="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
                        <img class="object-cover object-center w-full h-full rounded-full" src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg"/>
                    </a>
                </div>
            </div>
        </>
    )
}
export default Login;