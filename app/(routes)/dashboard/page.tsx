import React from 'react'
import WelcomeBanner from "@/app/(routes)/dashboard/_components/WelcomeBanner";
import FeatureList from "@/app/(routes)/dashboard/_components/FeatureList";


function Dashboard() {
    return (
        <div>
            <WelcomeBanner/>
            <FeatureList/>

        </div>
    )
}

export default Dashboard