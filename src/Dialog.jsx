import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import TimerIcon from '@mui/icons-material/AccessTime';

export default function Dialog() {


    return (
    <div className='absolute h-screen w-screen flex justify-center items-center backdrop-brightness-75 text-slate-800'>
        <div className='h-2/3  w-1/4 bg-neutral-100 '>
        <div>
            <div className='w-full  text-center text-neutral-500 font-semibold border-b-2 py-2'>
               <span className='ml-4'>
                Settings
               </span>
               
                <CloseIcon className='float-right mr-1'/>
            </div>
            <div>
                <TimerIcon/>

            </div>


            


        </div>
        </div>  
        
    </div>
  )
}
