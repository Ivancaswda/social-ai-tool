import React from 'react'
import WelcomeBanner from "@/app/(routes)/dashboard/_components/WelcomeBanner";
import FeatureList from "@/app/(routes)/dashboard/_components/FeatureList";
import Image from "next/image";
import {FaInstagram, FaVk} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";


function Dashboard() {
    return (
        <div>
            <WelcomeBanner/>
            <FeatureList/>

        </div>
    )
}

export default Dashboard