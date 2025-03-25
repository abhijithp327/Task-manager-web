import React from 'react'
import Profile from '../profile/Profile'
import RadialChart from '../radialChart/RadialChart'


const Sidebar = () => {



    return (
        <div className="w-[20rem] mt-[5rem] h-[calc(100%-5rem)] fixed right-0 top-0 bg-secondary flex flex-col">
            <Profile />
            <div>
                <RadialChart />
            </div>
        </div>
    )
}

export default Sidebar