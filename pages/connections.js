import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import SideBar from '../components/sidebar'
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import jwtDecode from 'jwt-decode';
import Head from 'next/head';

const Connections = () => {


    const [user, setUser] = useState('');
    const [file, setFile] = useState('')
    const [name, setName] = useState('')
    const [respArr, setRespArr] = useState([])
    const [connectArr, setConnectArr] = useState('');


    const router = useRouter();

    useEffect(() => {
        const myuser = JSON.parse(localStorage.getItem("myuser"));
        if (myuser && myuser.token) {
            const decodedToken = jwtDecode(myuser.token)
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
                localStorage.removeItem("myuser");
                router.push('/login');
            } else {
                router.push("/connections")
            }
        } else {
            router.push("/login")
        }

        if (myuser && myuser.token) {
            setUser(myuser)
            fetchData()
        }
    }, [])



    const fetchData = async () => {

        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getConnection`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        let res = await a.json();
        const myuser = JSON.parse(localStorage.getItem("myuser"));

        await res.map((response) => {
            if (response.email === myuser.email) {
                setRespArr(response.connection)
                setFile(response.uploadPhoto);
                setName(response.name)
            }
        })

        const myUserConn = await res.map((response) => {
            if (myuser.email === response.email) {
                return response;
            }
            return null;
        }).filter((item) => item !== null);


        const userConn = myUserConn[0].connection.map((user) => {
            return user;
        })

        const mappedArray = await res.map((response1) => {
            if (response1.email !== myuser.email) {
                for (let i = 0; i < userConn.length; i++) {
                    if (userConn[i].email == response1.email) {
                        return null
                    }
                }
                return response1;

            }
            return null;
        }).filter(item => item !== null);

        // console.log(mappedArray);

        await setConnectArr(mappedArray);
        // console.log(connectArr)
    }


    const handleSubmit = async (email1) => {
        await fetchConnect(email1);
        const itemIndex = connectArr.findIndex(item => item.email === email1);


        if (itemIndex !== -1) {
            connectArr.splice(itemIndex, 1);
        }

        // console.log(respArr);

        const data = { email: user.email, email1: email1, respArr: respArr };

        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateConnect`,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })

        let res = await a.json();

        if (res.success) {
            toast.success("Connection Successfull !", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

        else {
            toast.error("Something went wrong !", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }


    const fetchConnect = async (email1) => {
        const data1 = { email: email1 };

        let b = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getConnect`,
            {
                method: 'POST',
                body: JSON.stringify(data1),
                headers: {
                    "Content-Type": "application/json"
                }
            })

        let respo = await b.json();
        // console.log(respo);
        let name = respo.DbUser.name;
        let email = respo.DbUser.email;
        let intro = respo.DbUser.intro;
        let uploadPhoto = respo.DbUser.uploadPhoto;

        setRespArr([...respArr, { name, email, intro, uploadPhoto }])
    }



    const handleRemove = async (email1) => {
        let email = user.email;
        const data = { email, email1 };

        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/removeConnect`,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                }
            });

        let res = await a.json();
        if (res.success) {
            toast.success("Changes may be saved after Refresh the page !", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

        else {
            toast.error("Something went wrong !", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }


    const toggleFunc = () => {
        if (toggleBtn.innerHTML === "Remove Connection") {
            toggleBtn.innerHTML = "Connect";
            toggleBtn.classList.add("bg-blue-600");
            toggleBtn.classList.remove("bg-blue-950")
        }
    }

    return (
        <>
            <Head>
                <title>Explore Connections !</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar file={file} name={name} />
            <SideBar />
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className='mb-10 main'>
                <div className='flex bg-blue-950 h-28 w-[100%] md:mt-8 rounded-md md:mr-6' >
                    <div className="mt-10 md:mt-4 ml-8 text-xl font-bold text-white ">
                        MY CONNECTIONS
                    </div>
                </div>

                <div className="flex mt-10 flex-wrap" >
                    {(respArr.map((respon) =>
                    (
                        <div key={respon._id} className="flex justify-between shadow-md outline outline-slate-200 p-4 m-2 rounded-2xl w-96">
                            <div className="flex flex-col">
                                <span className='text-black font-bold '>{respon.name}</span>
                                <span className='text-sm mt-2 break-normal'>@{respon.intro}</span>
                                <button id='toggleBtn' className='text-white py-1 mt-6 px-7 rounded-full bg-blue-950' onClick={() => { toggleFunc(); handleRemove(respon._id); }}>Remove Connection</button>
                            </div>
                            <div className='w-96'><img className='bg-zinc-400 rounded-full shadow-sm ml-10' src={`${respon.uploadPhoto}`} style={{ "width": "15vh", "height": "15vh" }}></img></div>
                        </div>
                    )))}

                </div>

                <div className='mt-16 mb-8 text-2xl ml-4 md:ml-0 md:text-3xl text-black'>People you can also connect</div>

                <div className="flex mt-10 flex-wrap w-[100%]" >

                    {connectArr ? (connectArr.map((res, index) => (
                        <div key={index} className="flex justify-evenly shadow-md outline outline-slate-200 p-7 w-96 rounded-2xl m-2">
                            <div className="flex flex-col">
                                <span className='text-black font-bold '>{res.name}</span>
                                <span className='text-sm mt-2 flex flex-wrap'>@{res.intro}</span>
                                <button onClick={() => { handleSubmit(res.email) }} className='text-white py-1 mt-6 px-7 rounded-full bg-blue-600'>Connect</button>
                            </div>
                            <div className='w-96' ><img className='bg-zinc-400 rounded-full shadow-sm ml-10 ' src={`${res.uploadPhoto}`} style={{ "width": "15vh", "height": "15vh" }}></img></div>
                        </div>
                    ))) : (<p></p>)}

                </div>
            </div>
        </>
    )
}

export default Connections
