import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
const EditData = () => {
    const [username, setUsername] = useState({})
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const checkUser = useRef(false)
    useEffect(() => {
        if(!token){
            navigate('/')
        }

        if(checkUser.current === true){
            const fetchName = async () => {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                await axios.get('http://127.0.0.1:8000/api/me')
                .then((response) => {
                    setUsername(response.data)
                })
            }
            fetchName()
        }
        return () => {
            checkUser.current = true;
        }
    }, [])

    const logoutHandler = async() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios.post('http://127.0.0.1:8000/api/logout')
        .then(() => {
            localStorage.removeItem('token')
            alert('Successfully log out!')
            navigate('/')
        })
    }

    const params = useParams();

    let paramTitle = params.paramTitle;
    let paramDescription = params.paramDescription;
    let paramOrder = params.paramOrder;
    let paramLabel = params.paramLabel;
    let paramListId = params.paramListId;
    let paramDueDate = params.paramDueDate;
    let paramId = params.paramId;

    // edit cards 

    const [id, setId] = useState(paramId)
    const [cardtitle, setCardTitle] = useState(paramTitle)
    const [description, setDescription] = useState(paramDescription)
    const [order, setOrder] = useState(paramOrder)
    const [label, setLabel] = useState(paramLabel)
    const [list_id, setListId] = useState(paramListId)
    const [due_date, setDueDate] = useState(paramDueDate)

    const editCard = async(e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('id', id)
        formData.append('cardtitle', cardtitle)
        formData.append('description', description)
        formData.append('order', order)
        formData.append('label', label)
        formData.append('list_id', list_id)
        formData.append('due_date', due_date)

        await axios.put('http://127.0.0.1:8000/api/editCards?'+
                        'id='+id+
                        '&cardtitle='+cardtitle+
                        '&description='+description+
                        '&order='+order+
                        '&label='+label+
                        '&list_id='+list_id+
                        '&due_date='+due_date,
                         formData
                        )
        .then(() => {
            alert('Successfully edit card')
            navigate('/dashboard')
        })
    }

    return(
        <>
            <div className='bg-blue-100 h-screen'>
                <div className="bg-indigo-500 py-3 w-full">
                    <div className="container mx-auto">
                        <div className="flex justify-between">
                        <h4 className='text-white font-bold'>
                            <Link to={{
                                pathname:'/dashboard'
                            }}>
                                TRELLO CLONE
                            </Link>
                        </h4>
                        <p className='text-white font-bold'>
                            Hello, {username.username}
                            <Link 
                                onClick={() => logoutHandler()}
                                style={{textDecoration:"none"}}
                                className='ms-2 text-blue-200 hover:text-blue-100 font-bold'
                            >
                                Log out
                            </Link>
                        </p>
                        </div>
                    </div>
                </div>
                <div class="min-w-screen min-h-screen bg-blue-100 flex items-center justify-center px-5 py-5">
                <div class="bg-white text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{maxWidth:"600px"}}>
                    <div class="md:flex w-full">
                        <div class="w-full md:w-1/1 py-10 px-5 md:px-10">
                            <div class="text-center mb-10">
                                <h1 class="font-bold text-3xl text-gray-900">EDIT CARDS</h1>
                                <p>Edit your cards</p>
                            </div>
                            <form onSubmit={editCard}>
                                <input 
                                    type="hidden" 
                                    value={id} 
                                    onChange={(e) => setId(e.target.value)}
                                    className='w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 mb-3 '
                                />
                                <input 
                                    type="hidden" 
                                    value={list_id} 
                                    onChange={(e) => setListId(e.target.value)}
                                    className='w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 mb-3 '
                                />
                                <div class="flex -mx-3">
                                    <div class="w-1/2 px-3 mb-5">
                                        <label for="" class="text-xs font-semibold px-1">Title</label>
                                        <div class="flex">
                                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                            <input 
                                                type="text" 
                                                class="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 mb-3" 
                                                placeholder="Ex: 209120"
                                                value={cardtitle}
                                                onChange={(e) => setCardTitle(e.target.value)}
                                            />
                                        </div>
                                        
                                    </div>
                                    <div class="w-1/2 px-3 mb-5">
                                        <label for="" class="text-xs font-semibold px-1">Label</label>
                                        <div class="flex">
                                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                            <input 
                                                type="text" 
                                                class="mb-3 w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                                placeholder="example@gmail.com"
                                                value={label}
                                                onChange={(e) => setLabel(e.target.value)}
                                                
                                            />
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <label className="text-xs font-semibold px-1">Description</label>
                                        <div className="flex">
                                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                            <textarea  
                                                class="mb-3 w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                                placeholder="Describe your cards "
                                                rows={10}
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                            </div>
                                           
                                        </div>
                                    </div>
                                <div class="flex -mx-3 mb-12">
                                    <div class="w-1/2 px-3">
                                        <label for="" class="text-xs font-semibold px-1">Order</label>
                                        <div class="flex">
                                            <div class="mb-3 w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                            <input 
                                                type="text" 
                                                class="mb-3 w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                                placeholder="Input orders"
                                                value={order}
                                                onChange={(e) => setOrder(e.target.value)}
                                              
                                            />
                                        </div>
                                        
                                    </div>
                                    <div class="w-1/2 px-3 ">
                                        <label for="" class="text-xs font-semibold px-1">Due Date</label>
                                        <div class="flex">
                                            <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                            <input 
                                                type="date" 
                                                class="mb-3 w-full -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                                value={due_date}
                                                onChange={(e) => setDueDate(e.target.value)}
                                            />
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="flex -mx-3">
                                    <div class="w-full px-3 mb-5">
                                        <button class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">Update</button>
                                    </div>
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
            </div>
        </>
    )
}
export default EditData;