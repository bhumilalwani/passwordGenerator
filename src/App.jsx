import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {

    const [password,setPassword]=useState("")
    const [length,setLength]=useState(0)
    const [numAllowed,setNumallowed]=useState(false)
    const [charAllowed,setCharallowed]=useState(false)

const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed){
        str='0123456789'+str
    }
    else if(charAllowed){
    str+='~`!@#$%^&*(){}|[]?/'+str
    }
    for(let i=0;i<length;i++){
        pass+=str.charAt(Math.floor((Math.random()*str.length)+1))
    }
    setPassword(pass)
},[length,charAllowed,numAllowed])

   useEffect(()=>{
    passwordGenerator()
   },[length,charAllowed,numAllowed,passwordGenerator])

////IMP////""useeffect"" :->> first time jb page load hota hai tb apne callback func ko call krta hai and uske baad jb array me jo jo likhe hai unme se kise me koi kuch change hua tb only 

const passwordRef=useRef(null)

////IMP////"useRef":->> useref hook se hum koi bhe cheez jo humare webpage me hai uska ref le sakte hai and uske saath """"manipulation"""" kr skte hai (i.e. can make changes to a particular data by using its refrence)

const passwordCopyToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999)
    //just to show u can use range for selecton and max is 100 (by input range ) so 999 is just arbitary to select all
    // here ? means ke agar passwordRef me null ni hai i.e kuch hai to the only selet the passwordRef
    window.navigator.clipboard.writeText(password)   
    // note agar hum next pe kaam kr rahe hote to then we wouldnt have been able to use the windows kuke waha server-side rendering hote hai so windows obj wont be available there
}
,[password])

  return (
    <div className='w-full flex items-center flex-col gap-[50px]'>
      <h1 className='text-white font-bold text-5xl text-center mt-[20px]'>Password Generator</h1>
      <div className='w-full h-fit p-2 flex-col items-center justify-center bg--100'>
        <div className='w-full h-full flex items-center flex-col'>
      <div className='w-[40%] justify-center flex-row flex items-center h-fit'>
      <input value={password} ref={passwordRef} readOnly className='h-[5vh] w-full rounded-l-[5px] p-2' type="text" placeholder='Password'/>
      <button onClick={passwordCopyToClipboard} className='bg-blue-700 text-center h-[5vh] p-1 text-white text-xl font-bold rounded-[2px]'>Copy</button>
      </div>
        <div className='flex items-center justify-between flex-row mt-[40px]'>
        <input onChange={(e)=>{setLength(e.target.value)}} value={length} type="range" min={0} max={100} className='mr-[10px]'/>
        <label className='text-yellow-600 font-normal text-xl mr-[20px]'>Length:{length}</label>
        
        <label className='text-yellow-600 font-normal text-xl mr-[10px]'>Number Allowed</label>
        <input onChange={()=>{setNumallowed(prev=>!prev)}} value={numAllowed} type="checkbox" className='mr-[20px]'/>
{/* prev is just var name and hume previous value callback ke saath he milte hai u can name it anything prev/counter/anything */}
        <label className='text-yellow-600 font-normal text-xl mr-[10px]'>Character Allowed</label>
        <input onChange={()=>{setCharallowed(prev=>!prev)}} value={charAllowed} type="checkbox" className='mr-[10px]'/>

        </div>
        </div>
      </div>
    </div>
  )
}

export default App
