import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
const Dashboard = () => {
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

    // request boards
    
    const [title, setTitle] = useState("")

    const [validation, setValidation] = useState([])

    const requestBoards = async(e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title', title)

        await axios.post('http://127.0.0.1:8000/api/requestLists', formData)
        .then(() => {
            alert('Successfully add lists')
            navigate('/dashboard')
        }).catch((error) => {
            setValidation(error.response.data)
        })
    }

    // get boards

    const [getBoards, setBoards] = useState([])

    const checkBoards = useRef(false)

    useEffect(() => {
        if(checkBoards.current === true){
            const fetchBoards = async() => {
                axios.get('http://127.0.0.1:8000/api/getLists')
                .then((response) => {
                    const boardData = response.data.data;
                    if(boardData != ""){
                        setBoards(boardData)
                    }
                })
            }
            fetchBoards()
        }

        return () => {
            checkBoards.current = true;
        }
    }, [])

    // request cards 

    const [cardTitle, setCardTitle] = useState("")
    const [list_id, setListId] = useState("")

    const requestCard = async(e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('cardtitle', cardTitle)
        formData.append('list_id', list_id)
        await axios.post('http://127.0.0.1:8000/api/requestCards', formData)
        .then(() => {
            alert("Successfully request cards")
            navigate('/dashboard')
        }).catch((error) => {
            setValidation(error.response.data)
        })
    }

    // get cards

    const [getCards, setCards] = useState([])

    const checkCards = useRef(false)

    useEffect(() => {
        if(checkCards.current === true){
            const catchCard = async() => {
                await axios.get('http://127.0.0.1:8000/api/getCards')
                .then((response) => {
                    const data = response.data.data 
                    if(data != ""){
                        setCards(data)
                    }
                })
            }
            catchCard()
        }
        return () => {
            checkCards.current = true;
        }
    }, [])


    // delete cards 

    const destroyCards = async(id) => {
        await axios.delete("http://127.0.0.1:8000/api/deleteCards?id="+id)
        .then(() => {
            alert("Successfully delete data")
        })
    }
    return(
        <div className='bg-blue-100 h-screen'>
            <div className="bg-indigo-500 py-3 w-full">
                <div className="container mx-auto">
                    <div className="flex justify-between">
                    <h4 className='text-white font-bold'>
                        TRELLO CLONE
                        <button 
                            className='rounded-md bg-blue-300 text-white py-2 text-center hover:bg-blue-200 ms-3 px-5'
                            onClick={()=>window.my_modal_1.showModal()}
                            >
                            + REQUEST BOARD
                        </button>
                    </h4>
                    <p className='text-white font-bold mt-2'>
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
            <dialog id="my_modal_1" className="modal py-3 rounded-md w-2.0">
                <form className="modal-box ms-2" onSubmit={requestBoards}>
                    <div className="container mx-auto">
                        <h3 className="font-bold text-lg mb-2">ADD LISTS</h3>
                        <hr />
                        <br />
                        <label htmlFor="">Title</label>
                        <input 
                            type="text" 
                            className='mb-3 py-2 w-full border-2 border-rose-500 pl-2 outline-none rounded-md' 
                            placeholder='Input title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {
                            validation.title && (
                                <div className='mb-5 py-2 w-full bg-yellow-500 text-white text-center'>
                                    {validation.title[0]}
                                </div>
                            )
                        }
                        <div className="modal-action">
                            <button className="bg-indigo-500 hover:bg-indigo-400 text-white text-center px-5 rounded-lg shadow-md py-2">+ TAMBAH LIST</button>
                            <form method='dialog'>
                                <button className="mt-3 bg-red-500 hover:bg-red-400 text-white text-center px-5 rounded-lg shadow-md py-2 ms-2">Close</button>
                            </form>
                        </div>
                    </div>
                </form>

            </dialog>
            
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row">
                    {
                        getBoards.map((post) => (
                        <div>
                            <div className="flex flex-row gap-5 ms-5">
                                <div className="mt-3 bg-blue-800 text-white py-3 px-10 rounded-md">
                                    <h4 className='mb-3'>{post.id}.{post.title}</h4>
                                    <hr />
                                    {
                                        getCards.map((letpost) => (
                                            <>
                                                <br />
                                                <div className='mt-2 bg-indigo-600 mb-3 text-white py-2 px-5 border-2 border-cyan-500 outline-none rounded-lg hover:bg-indigo-500 cursor-pointer w-full'>
                                                    {letpost.cardtitle}
                                                    <Link
                                                        to={{
                                                            pathname:'./'+letpost.cardtitle+'/'+letpost.description+'/'+letpost.order+'/'+
                                                            letpost.label+'/'+letpost.list_id+'/'+letpost.due_date+'/edit/'+letpost.id
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} className='ms-3'/>
                                                    </Link>
                                                    <FontAwesomeIcon icon={faTrash} className='ms-3 pr-1' onClick={() => destroyCards(letpost.id)}/>
                                                </div>
                                            </>
                                        ))
                                    }
                                    <br />
                                    <details class="group">
                                        <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
                                            <span className='mt-3 bg-indigo-400 text-white hover:bg-indigo-300 px-5 rounded-md py-2'> 
                                                + ADD A CARD
                                            </span>
                                            <span class="transition group-open:rotate-180"></span>
                                        </summary>
                                        <p class="text-white-600 mt-3 group-open:animate-fadeIn">
                                        <form onSubmit={requestCard}>
                                            <input 
                                                type="text"
                                                className='bg-indigo-700 text-white shadow-md border-4 border-cyan-500 w-1/1 pl-2 py-1 outline-0'
                                                placeholder='Enter title for this card'
                                                value={cardTitle}
                                                onChange={(e) => setCardTitle(e.target.value)}
                                            /> 
                                            <br /><br />
                                            <input 
                                                type="number" 
                                                className='bg-indigo-700 text-white shadow-md border-4 border-cyan-500 w-1/1 pl-2 py-1 outline-0'
                                                value={list_id}
                                                placeholder='Input number card'
                                                onChange={(e) => setListId(e.target.value)}
                                            /> 
                                            <br />
                                            <button className='bg-blue-600 text-white px-5 mt-5 py-2 hover:bg-blue-500'>TAMBAH KARTU</button>                                  
                                        </form>
                                        </p>
                                    </details>
                                </div>
                            </div>
                            
                        </div>
                        ))
                    }
                </div>
            </div>
        </div>
            
    )
}
export default Dashboard;