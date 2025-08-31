'use server'

import React from 'react'
import getServerUser from "@/lib/auth-server";

const ServertTest = async () => {

    const user = await getServerUser()
    console.log(user)
    return (
        <div>ServertTest</div>
    )
}
export default ServertTest
