import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import Navbar from '../components/navbar'
import SideBar from '../components/sidebar'
import jwtDecode from 'jwt-decode'



export default function Home() {

  const router = useRouter()

  const [file, setFile] = useState("");
  const hiddenFileInput = React.useRef(null);

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [intro, setIntro] = useState('')
  const [skills, setSkills] = useState('')
  const [clgName, setClgName] = useState('')
  const [branch, setBranch] = useState('')
  const [clgDesc, setClgDesc] = useState('')
  const [year, setYear] = useState('')
  const [certificate, setCertificate] = useState({
    certificates: '',
    organizations: '',
  });
  const [experience, setExperience] = useState({
    yearCompany: '',
    work: '',
    company: '',
    position: '',
  })
  const [certificateArr, setCertificateArr] = useState([])
  const [experienceArr, setExperienceArr] = useState([])
  const [user, setUser] = useState({ value: null })


  useEffect(() => {


    const myuser = JSON.parse(localStorage.getItem('myuser'));
    
    
    if( myuser && myuser.token ){
      const decodedToken = jwtDecode( myuser.token )
      const currentTime = Date.now() / 1000;

      if(decodedToken.exp < currentTime){
        localStorage.removeItem("myuser");
        router.push('/login');
      }else{
        router.push("/")
      }
    }else {
      router.push("/login")
    }
    
    if (myuser && myuser.token) {
      setUser(myuser)
      fetchData(myuser.token)
    }
  }, [])


  const fetchData = async (token) => {
    let data = { token: token }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUser`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let res = await a.json();

    setName(res.name)
    setBranch(res.branch)
    setClgDesc(res.clgDesc)
    setClgName(res.clgName)
    setIntro(res.intro)
    setPhone(res.phone)
    setSkills(res.skills)
    setYear(res.year)
    setCertificateArr(res.certification)
    setExperienceArr(res.experience)
    setFile(res.uploadPhoto)
  }


  const handleClick = () => {
    hiddenFileInput.current.click();
  }

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "user_profile")
    data.append("cloud_name", "disc51cgq")

    let b = await fetch("https://api.cloudinary.com/v1_1/disc51cgq/image/upload", {
      method: 'POST',
      body: data
    })

    let response = await b.json();
    let newImage = response.url;
    

    let data1 = { token: user.token, name, phone, skills, year, experienceArr, certificateArr, intro, clgDesc, clgName, branch, newImage }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`,
      {
        method: "POST",
        body: JSON.stringify(data1),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let res = await a.json();
    if (res.success) {
      toast.success("Your Profile image SuccessFully updated !", {
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

    setFile(newImage)
  }



  const changeHandle = (e) => {
    if (e.target.name == 'name') {
      setName(e.target.value)
    } else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    } else if (e.target.name == 'aboutDesc') {
      setIntro(e.target.value)
    } else if (e.target.name == 'branch') {
      setBranch(e.target.value)
    } else if (e.target.name == 'year') {
      setYear(e.target.value)
    } else if (e.target.name == 'clgName') {
      setClgName(e.target.value)
    } else if (e.target.name == 'clgIntro') {
      setClgDesc(e.target.value)
    }
  }

  const handleUpdate = async () => {
    let data = { token: user.token, name, phone, skills, year, experienceArr, certificateArr, intro, clgDesc, clgName, branch, file }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let res = await a.json();

    if (res.success) {
      toast.success("Your personal Details SuccessFully updated !", {
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


  let { yearCompany, company, work, position } = experience;
  const handleUpdte = async () => {
    setExperienceArr([...experienceArr, { yearCompany, company, work, position }])

    let data = { token: user.token, name, phone, skills, year, experienceArr, certificateArr, intro, clgDesc, clgName, branch, file }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let res = await a.json();

    if (res.success) {
      toast.success("Your experience Details SuccessFully updated !", {
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


  let { certificates, organizations } = certificate;
  const handleUpdte1 = async () => {
    setCertificateArr([...certificateArr, { certificates, organizations }])

    let data = { token: user.token, name, phone, skills, year, experienceArr, certificateArr, intro, clgDesc, clgName, branch, file }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let res = await a.json();
    setCertificate("");

    if (res.success) {
      toast.success("Your certification Details SuccessFully updated !", {
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



  return (
    <div>
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
      <Head>
        <title>Connect with your friends !</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <>

        <Navbar file={file} name={name} />
        <SideBar />
        <div className='flex bg-blue-950 h-28 mt-8 rounded-md mr-6 index-1 w-[100%]' >
          <div className="mt-4 ml-8 text-xl font-bold text-white ">
            MY PROFILE
          </div>
        </div>

        <div className=' bg-slate-100 rounded-md shadow-lg mr-10 -mt-10 mb-5 index-2 w-[100%]'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-6 lg:gap-6 p-5">
            <div className=" text-blue-950 text-lg font-semibold p-4">

              <div className="flex justify-between items-center">
                {!file && <div style={{ "width": "15vh", "height": "15vh" }} className='bg-zinc-400 rounded-full shadow-sm'></div>}
                {file && <img style={{ "width": "15vh", "height": "15vh" }} className='rounded-full shadow-sm' src={`${file}`} alt="" />}
                <button id='btn' className='bg-slate-300 text-sm px-5 py-2 rounded-2xl shadow-sm' onClick={() => { handleClick(); }}>Choose Image</button>
                <button className='bg-slate-300 text-sm px-5 py-2 rounded-2xl shadow-sm' onClick={handleSubmit}>Upload</button>
                <input onChange={(e) => handleChange(e)} ref={hiddenFileInput} type="file" accept='image/*' className='hidden' />
              </div>

              <div className="text-md shadow-md outline-slate-200 my-10 rounded-sm mx-2 p-7 outline">
                <div className='mb-3 text-black font-bold'>Your Name</div>
                <div id='disply' className="text-sm flex justify-between items-center">
                  <span>{name}</span>
                  <button className='bg-slate-300 text-sm px-5 py-1 rounded-2xl shadow-sm' onClick={() => { disply.classList.add("hidden"); inpt.classList.remove("hidden") }}>Edit</button>
                </div>

                <div id='inpt' className="text-sm flex justify-between items-center hidden">
                  <input onChange={changeHandle} name='name' value={name} className='text-md font-semibold px-3 py-1 rounded-md shadow-md outline outline-slate-300' type="text" />
                  <button className='bg-slate-300 text-sm px-5 py-1 rounded-2xl shadow-sm' onClick={() => { inpt.classList.add("hidden"); disply.classList.remove("hidden"); handleUpdate() }}>Save</button>
                </div>

                <div className='mb-3 mt-7 text-black font-bold'>Email(can not be updated)</div>
                <div id='disply1' className="text-sm flex justify-between items-center">
                  <span>{user.email}</span>
                </div>

                <div className='mb-3 mt-7 text-black font-bold'>Phone Number</div>
                <div id='disply2' className="text-sm flex justify-between items-center">
                  <span>{phone}</span>
                  <button className='bg-slate-300 text-sm px-5 py-1 rounded-2xl shadow-sm' onClick={() => { disply2.classList.add("hidden"); inpt2.classList.remove("hidden") }}>Edit</button>
                </div>

                <div id='inpt2' className="text-sm flex justify-between items-center hidden">
                  <input onChange={changeHandle} name='phone' className='text-md font-semibold px-3 py-1 rounded-md shadow-md outline outline-slate-300' type="phone" />
                  <button className='bg-slate-300 text-sm px-5 py-1 rounded-2xl shadow-sm' onClick={() => { inpt2.classList.add("hidden"); disply2.classList.remove("hidden"); handleUpdate() }}>Save</button>
                </div>

              </div>

              <div className="text-md shadow-md outline-slate-200 my-10 rounded-sm mx-2 p-7 outline">

                <div id='disply3'>
                  <div className="flex justify-between items-center p-4">
                    <span className='text-black font-bold'>About {name}</span>
                    <button className='bg-slate-300 text-sm px-5 py-1 rounded-2xl shadow-sm' onClick={() => { disply3.classList.add("hidden"); inpt3.classList.remove("hidden") }}>Edit</button>
                  </div>
                  <p className='p-4 text-sm'>
                    {intro}
                  </p>
                </div>

                <div id='inpt3' className='hidden'>
                  <div className="flex justify-between items-center p-4">
                    <span className='text-black font-bold'>About Mohit</span>
                    <button className='bg-slate-300 text-sm px-5 py-1 rounded-2xl shadow-sm' onClick={() => { inpt3.classList.add("hidden"); disply3.classList.remove("hidden"); handleUpdate() }}>Save</button>
                  </div>
                  <textarea onChange={changeHandle} className='rounded-lg mt-3 border-x-2 w-80 p-2 text-sm bg-white' name="aboutDesc" placeholder='Introduce yourself with your key skills and achievements...' id="collegedesc" cols="4" rows="5"></textarea>
                </div>
              </div>

              <div className="text-md shadow-md outline-slate-200 my-10 rounded-sm mx-2 p-7 outline">

                <div id="disply4">
                  <div className="flex justify-between items-center p-4">
                    <span className='text-black font-bold'>Skills</span>
                    <button className='bg-slate-300 text-sm px-5 py-1 rounded-2xl shadow-sm' onClick={() => { disply4.classList.add("hidden"); inpt4.classList.remove("hidden") }}>Edit</button>
                  </div>
                  <div className="p-4 text-sm">
                    {skills ? (
                      skills.map((skill, index) => (
                        <div className='pb-4' key={index}>{skill}</div>
                      ))) : (
                      <p>Loading Skills ...</p>
                    )}

                  </div>
                </div>

                <div id="inpt4" className='hidden'>
                  <div className="flex justify-between items-center p-4">
                    <span className='text-black font-bold'>Skills</span>
                    <button className='bg-slate-300 text-sm px-5 py-1 rounded-2xl shadow-sm' onClick={() => { inpt4.classList.add("hidden"); disply4.classList.remove("hidden"); handleUpdate() }}>Save</button>
                  </div>
                  <input className='text-md font-semibold px-3 py-1 rounded-md shadow-md outline outline-slate-300' type="text" />
                </div>
              </div>

            </div>

            <div className=" text-blue-950 text-lg font-semibold p-4">
              <div className="text-md shadow-md outline-slate-200 my-5 rounded-sm mx-2 p-7 outline">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col mr-10">
                    <span className='font-bold text-black'>Professional Details</span>
                    <span className='font-normal mt-4'>This are the professional details shown to users in the app.</span>
                  </div>
                  <Image src={"/logiin.jpg"} className='rounded-full' width={80} height={80} />
                </div>
              </div>

              <div id="disply5">
                <div className="flex justify-between mt-8 mx-2 p-3">
                  <div className='font-bold text-black'>Certifications</div>
                  <button className='bg-slate-300 text-sm px-5 py-1 rounded-2xl shadow-sm' onClick={() => { disply5.classList.add("hidden"); inpt5.classList.remove("hidden") }}>Edit</button>
                </div>


                <div className="flex flex-col items-center text-md shadow-md outline-slate-300 outline my-5 rounded-full mx-2 p-3">
                  {certificateArr ? (
                    (certificateArr).map((item) => (
                      <div className="flex flex-col items-center my-3" key={item._id}>
                        <span className='font-bold '>{item.certificates}</span>
                        <span className='font-normal'>{item.organizations}</span>
                      </div>)))
                    : (<p>No Certificates !</p>)}
                </div>
              </div>

              <div id="inpt5" className='hidden'>
                <div className="flex justify-between mt-8 mx-2 p-3">
                  <div className='font-bold text-black'>Certifications</div>
                  <button className='bg-slate-300 text-sm px-5 py-1 rounded-2xl shadow-sm' onClick={() => { inpt5.classList.add("hidden"); disply5.classList.remove("hidden"); handleUpdte1() }}>Save</button>
                </div>

                <div className="flex flex-col text-md shadow-md outline-slate-300 outline my-5 rounded-full mx-2 p-3">
                  <input onChange={(e) => setCertificate({ ...certificate, certificates: e.target.value })} value={certificate.certificates} name='certificate' placeholder='certificate' className='my-3 mx-10 text-md font-semibold px-3 py-1 rounded-md shadow-md outline outline-slate-300' type="text" />
                  <input onChange={(e) => setCertificate({ ...certificate, organizations: e.target.value })} value={certificate.organizations} name='organization' placeholder='organization' className='my-3 mx-10 text-md font-semibold px-3 py-1 rounded-md shadow-md outline outline-slate-300' type="text" />
                </div>
              </div>


              <div id="disply6" >
                <div className="flex justify-between mt-8 mx-2 p-3">
                  <div className='font-bold text-black'>Experience</div>
                  <button className='bg-slate-300 text-sm px-5 py-1 rounded-2xl shadow-sm' onClick={() => { disply6.classList.add("hidden"); inpt6.classList.remove("hidden") }}>Edit</button>
                </div>

                <div className=" overflow-hidden text-md shadow-md outline-slate-300 outline my-5 rounded-2xl mx-2 p-3">
                  {experienceArr ? (
                    (experienceArr).map((exp) => (
                      <div key={exp._id} className='mb-5'>

                        <div className='flex justify-between items-center font-bold'>


                          <div>7 Years ( {exp.yearCompany} )</div>
                          <div>{exp.work}</div>
                        </div>


                        <div >
                          <span className='font-normal mr-4'>{exp.company}</span>
                          <span className='text-sm font-normal ml-7'>--{exp.position}</span>
                        </div>
                      </div>))
                  ) : (<p>No Experience !</p>)}
                </div>

              </div>

              <div id="inpt6" className='hidden'>
                <div className="flex justify-between mt-8 mx-2 p-3">
                  <div className='font-bold text-black'>Experience</div>
                  <button className='bg-slate-300 text-sm px-5 py-1 rounded-2xl shadow-sm' onClick={() => { inpt6.classList.add("hidden"); disply6.classList.remove("hidden"); handleUpdte() }}>Save</button>
                </div>

                <div className="text-md shadow-md outline-slate-300 outline my-5 rounded-2xl mx-2 p-3 overflow-hidden">
                  <div className='flex flex-col items-start font-bold'>
                    <div className="flex justify-evenly">
                      <input onChange={(e) => setExperience({ ...experience, yearCompany: e.target.value })} value={experience.yearCompany} name='yearCompany' placeholder='start year - end year' className=' mt-3 text-md font-semibold px-3 py-1 rounded-md shadow-md outline outline-slate-300' type="text" />
                    </div>
                    <input onChange={(e) => setExperience({ ...experience, work: e.target.value })} value={experience.work} name='work' placeholder='work' className='mt-3 text-md font-semibold px-3 py-1 rounded-md shadow-md outline outline-slate-300' type="text" />

                  </div>
                  <div>
                    <span className='font-normal'><input onChange={(e) => setExperience({ ...experience, company: e.target.value })} name='company' value={experience.company} placeholder='company name' className='mt-3 text-md font-semibold px-3 py-1 rounded-md shadow-md outline outline-slate-300' type="text" /></span>
                    <span className='text-sm font-normal ml-7'><input onChange={(e) => setExperience({ ...experience, position: e.target.value })} name='position' placeholder='position' value={experience.position} className='mt-3 text-md font-semibold px-3 py-1 rounded-md shadow-md outline outline-slate-300' type="text" /></span>
                  </div>
                </div>
              </div>

              <div id="disply7">
                <div className="flex justify-between mt-8 mx-2 p-3">
                  <div className='font-bold text-black'>Education</div>
                  <button className='bg-slate-300 text-sm px-5 py-1 rounded-2xl shadow-sm' onClick={() => { disply7.classList.add("hidden"); inpt7.classList.remove("hidden") }}>Edit</button>
                </div>

                <div className="text-md shadow-md outline-slate-300 outline my-5 rounded-2xl mx-2 p-3 overflow-hidden">
                  <div className="my-3 font-bold">{clgName}</div>
                  <div className="flex justify-between items-center font-normal text-black">
                    <div>( {year} )</div>
                    <div className='mr-10'>{branch}</div>
                  </div>
                  <p className='text-sm mt-4'>
                    {clgDesc}
                  </p>
                </div>
              </div>

              <div id="inpt7" className='hidden'>
                <div className="flex justify-between mt-8 mx-2 p-3">
                  <div className='font-bold text-black'>Education</div>
                  <button className='bg-slate-300 text-sm px-5 py-1 rounded-2xl shadow-sm' onClick={() => { inpt7.classList.add("hidden"); disply7.classList.remove("hidden"); handleUpdate() }}>Save</button>
                </div>

                <div className="text-md shadow-md outline-slate-300 outline my-5 rounded-2xl mx-2 p-3 overflow-hidden">
                  <input onChange={changeHandle} name='clgName' placeholder='Institute name' className='mt-3 text-md font-semibold px-3 py-1 rounded-md shadow-md outline outline-slate-300' type="text" />
                  <div className="flex justify-between items-center font-normal text-black">
                    <input onChange={changeHandle} name='year' placeholder='start year - end year' className=' mt-3 text-md font-semibold px-3 py-1 rounded-md shadow-md outline outline-slate-300' type="text" />
                    <input onChange={changeHandle} name='branch' placeholder='course' className='mt-3 text-md font-semibold px-3 py-1 rounded-md shadow-md outline outline-slate-300' type="text" />
                  </div>
                  <textarea onChange={changeHandle} className='outline outline-slate-300 rounded-lg mt-3 border-x-2 w-80 p-2 text-sm bg-white' name="clgIntro" placeholder='Introduce your college...' id="collegedesc" cols="4" rows="5"></textarea>
                </div>
              </div>



            </div>
          </div>
        </div>
      </>




    </div>
  )
}
