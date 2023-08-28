import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios";
const Register = () => {
    
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const [password, setPassword] = useState("")
    const [password_confirmation, setPasswordConfirmation] = useState("")

    const [validation, setValidation] = useState([])

    const registerHandler = async(e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('username', username)
        formData.append('email', email)
        formData.append('role', role)
        formData.append('password', password)
        formData.append('password_confirmation', password_confirmation)

        await axios.post('http://127.0.0.1:8000/api/register', formData)
        .then(() => {
            alert('Successfully register!')
            navigate('/')
        }).catch((error) => {
            setValidation(error.response.data)
        })
    }
    return(
        <>
            <div class="min-w-screen min-h-screen bg-blue-100 flex items-center justify-center px-5 py-5">
                <div class="bg-white text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{maxWidth:"600px"}}>
                    <div class="md:flex w-full">
                        <div class="w-full md:w-1/1 py-10 px-5 md:px-10">
                            <div class="text-center mb-10">
                                <h1 class="font-bold text-3xl text-gray-900">REGISTER PAGES</h1>
                                <p>Enter your information to register</p>
                            </div>
                            <form onSubmit={registerHandler}>
                                <div class="flex -mx-3">
                                    <div class="w-1/2 px-3 mb-5">
                                        <label for="" class="text-xs font-semibold px-1">Username</label>
                                        <div class="flex">
                                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                            <input 
                                                type="text" 
                                                class="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 mb-3" 
                                                placeholder="Ex: 209120"
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
                                    <div class="w-1/2 px-3 mb-5">
                                        <label for="" class="text-xs font-semibold px-1">Email</label>
                                        <div class="flex">
                                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                            <input 
                                                type="email" 
                                                class="mb-3 w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                                placeholder="example@gmail.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        {
                                            validation.email && (
                                                <div className="bg-yellow-500 text-white py-3 w-full px-3 text-center border-r-4">
                                                    {validation.email[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div class="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <label className="text-xs font-semibold px-1">Role</label>
                                        <div className="flex">
                                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                                <select 
                                                    name={role}
                                                    onChange={(e) => setRole(e.target.value)}
                                                    class="mb-4 w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                                >
                                                    <option>Choose Role</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="user">User</option>
                                                </select>
                                            </div>
                                            {
                                                validation.role && (
                                                    <div className="bg-yellow-500 text-white py-3 w-full px-3 text-center border-r-4">
                                                        {validation.role[0]}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                <div class="flex -mx-3 mb-12">
                                    <div class="w-1/2 px-3">
                                        <label for="" class="text-xs font-semibold px-1">Password</label>
                                        <div class="flex">
                                            <div class="mb-3 w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                            <input 
                                                type="password" 
                                                class="mb-3 w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                                placeholder="***********"
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
                                    <div class="w-1/2 px-3 ">
                                        <label for="" class="text-xs font-semibold px-1">Password Confirmation</label>
                                        <div class="flex">
                                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                            <input 
                                                type="password" 
                                                class="mb-3 w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                                placeholder="************"
                                                value={password_confirmation}
                                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                            />
                                        </div>
                                        {
                                            validation.password_confirmation && (
                                                <div className="bg-yellow-500 text-white py-3 w-full px-3 text-center border-r-4">
                                                    {validation.password_confirmation}
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div class="flex -mx-3">
                                    <div class="w-full px-3 mb-5">
                                        <button class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">REGISTER NOW</button>
                                    </div>
                                </div>
                                <div className="text-center">
                                    Sudah punya akun ? &nbsp;
                                    <Link 
                                        className="text-blue-500"
                                        to={{
                                            pathname:'/'
                                        }}
                                    >
                                        Silahkan Login
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
export default Register