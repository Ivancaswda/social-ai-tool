"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { SidebarProvider, SidebarTrigger} from '@/components/ui/sidebar';
import axios from "axios";
import AppHeader from '../_components/AppHeader';
import Sidebar from "@/app/_components/Sidebar";
import {useAuth} from "@/context/useAuth";
import {Loader2Icon} from "lucide-react";


function DashboardProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter()
    const { user, loading } = useAuth(); // например так, зависит от реализации

    useEffect(() => {
        if (!loading && !user) {
            router.push("/sign-up");
        }
    }, [user, loading, router]);

    if (loading) {
        return <div className='flex mt-20 items-center font-semibold text-green-600 justify-center w-full h-full flex-col gap-3'>
            <Loader2Icon className='animate-spin text-green-600'/>
            Загрузка...
        </div>;
    }

    if (!user) {
        return <div className='flex  mt-20 items-center font-semibold text-green-600 justify-center w-full h-full flex-col gap-3'>
            <Loader2Icon className='animate-spin text-green-600'/>
            Загрузка...
        </div>;
    }
    return (
        <>
            <Sidebar />
            <main className='w-full'>
                <AppHeader />
                <div className='p-10'>{children}</div>
            </main>
        </>
    )
}

export default DashboardProvider