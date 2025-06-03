import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
uuidv4();
import { ToastContainer, toast } from 'react-toastify';

function Manager() {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {

        let Passwords = localStorage.getItem("Passwards");

        if (Passwords) {

            setPasswordArray(JSON.parse(Passwords))
        }


    }, [])
    const copyText = (text) => {
        toast('🦄 copy to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        {
            passwordref.current.type = "text"
            console.log(ref.current.src)
            if (ref.current.src.includes("/crosseye.png")) {
                ref.current.src = "/eye.png"
                passwordref.current.type = "password"
            }
            else {
                passwordref.current.type = "text"
                ref.current.src = "/crosseye.png"
            }
        }
    }

    const savePassward = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log(passwordArray)
            setform({ site: "", username: "", password: "" })
            toast('🦄password saved !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        }
        else {
            toast("error:password does not saved!")
        }

    }
    const deletePassword = (id) => {


        if (window.confirm("confirm if you want to passwoard  deleting")) {
            const filteredArray = passwordArray.filter(item => item.id !== id);
            setPasswordArray(filteredArray);
            localStorage.setItem("passwords", JSON.stringify(filteredArray));

        }
        toast('🦄 password deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });

    }




    const editPassword = (id) => {
        const selected = passwordArray.find(item => item.id === id);
        setform(selected);
        deletePassword(id);


        // optional: remove old entry so it gets updated on save
    };



    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            // transition="Bounce"
            />
            {/* //this is navbar */}
            <div className="absolute inset-0 -z-10 h-100% w-100% [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
            <div className=" main mr-10 ml-10 p-2 md:p-0 md:min-h-[80.8vh]">

                {/* this is title */}
                <h1 className=' text-3xl font-bold
text-center mt-5' >
                    <span className='text-green-800'>&lt;</span>key
                    <span className='text-green-800'>Locker/&gt;</span>

                </h1>
                <p className='text-green-900 text-lg text-center p-5'>Your Own Passward Manager</p>
                {/* this is input boxes */}
                <div className='text-black flex flex-col p-4 gap-10 items-center md:flex-col'>
                    <input name="site"
                        value={form.site} onChange={handleChange}
                        className='rounded-full border border-green-600 w-full text-black py-1 p-4' type="text" placeholder='enter website url' />
                    <div className='flex gap-8 w-full justify-between'>
                        <input name="username"
                            value={form.username} onChange={handleChange}
                            className='rounded-full border border-green-600 w-full text-black py-1 p-4' type="text" placeholder='Enter Username' />




                        <div className="relative w-full">
                            <input
                                ref={passwordref}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className='rounded-full border border-green-600 w-full text-black py-1 p-4'
                                type="password"
                                placeholder='Enter Password'
                            />
                            <span
                                className='absolute right-3   top-1 cursor-pointer '
                                onClick={showPassword}
                            >
                                <img ref={ref} className="p-2" width={"40"} src="/eye.png" alt="Toggle" />
                            </span>
                        </div>




                    </div>
                    {/* this is save button */}
                    <button
                        onClick={savePassward}

                        className='text-white font-medium flex justify-center items-centerrounded-full px-4 py-4 w-fit hover:text-black bg-red-500 gap-4 border-2 border-green-700'>

                        <lord-icon
                            src="https://cdn.lordicon.com/sbnjyzil.json"
                            trigger="hover">
                        </lord-icon>

                        Save Password</button>
                </div>


                {/* this is table of passwords */}

                <div className="passwords m-4">
                    <h2 className='font-bold text-2xl mb-2'>Your Passwords</h2>



                    {passwordArray.length === 0 &&
                        <div>No password to show</div>
                    }

                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden  mb-1">
                            <thead className=' bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>site</th>
                                    <th className='py-2'>username</th>
                                    <th className='py-2'>password</th>
                                    <th className='py-2'>action</th>
                                </tr>
                            </thead>

                            <tbody className='bg-green-200'>

                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>

                                        <td className='text-center py-2 border border-white '>
                                            <div className='flex items-center justify-center'>

                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='size-7 flexcursor-pointer copyicon' onClick={() => { copyText(item.site) }}            ><lord-icon
                                                    style={{
                                                        "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px"
                                                    }}
                                                    src="https://cdn.lordicon.com/tsrgicte.json"
                                                    trigger="hover" ></lord-icon>
                                                </div>

                                            </div>
                                        </td>

                                        <td className=' text-center py-2 border border-white'>
                                            <div className='flex items-center justify-center'>

                                                <span>{item.username}</span>


                                                <div className='size-7 cursor-pointer copyicon' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/tsrgicte.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px", "paddinTop": "3px", "paddingLeft": "3px" }}>
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=' text-center  py-2 border border-white'>
                                            <div className='flex items-center justify-center'>
                                                <span>{"*".repeat(item.password.length)}</span>

                                                <div className='size-7 cursor-pointer copyicon '
                                                    onClick={() => { copyText(item.password) }}
                                                > <lord-icon
                                                    src="https://cdn.lordicon.com/tsrgicte.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px", "paddinTop": "3px", "paddingLeft": "3px" }}>
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>


                                        <td className=' text-center  py-2 border border-white'>

                                            <span className='cursor-pointer mx-2' onClick={() => { editPassword(item.id) }} >
                                                <lord-icon src="https://cdn.lordicon.com/exymduqj.json" trigger="hover" style={{ "width": "25px", "height": "25px", "paddinTop": "3px", "paddingLeft": "3px" }}>

                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-2'
                                                onClick={() => { deletePassword(item.id) }}
                                            >
                                                <lord-icon src="https://cdn.lordicon.com/nhqwlgwt.json" trigger="hover" style={{ "width": "25px", "height": "25px", "paddinTop": "3px", "paddingLeft": "3px" }}></lord-icon>
                                            </span>
                                        </td>


                                    </tr>
                                })}
                            </tbody>

                        </table>

                    }



                </div>
            </div>

        </>
    )
}


export default Manager;

