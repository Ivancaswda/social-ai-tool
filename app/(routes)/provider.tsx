"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { SidebarProvider, SidebarTrigger} from '@/components/ui/sidebar';
import axios from "axios";
import AppHeader from '../_components/AppHeader';
import Sidebar from "@/app/_components/Sidebar";
import {useAuth} from "@/context/useAuth";
import {Loader2Icon} from "lucide-react";
import {FaInstagram, FaVk} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";
import Image from "next/image";

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
                <footer className="bg-green-600 text-white py-12">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-wrap justify-between">
                            <div className="w-full md:w-1/3 mb-6 md:mb-0">
                                <Image src='/logo.png' className='w-[80px] h-[80px] rounded-xl' width={80} height={80} alt='logo'/>
                                <p className=" text-sm mt-3 text-neutral-200">
                                    Развиваем инновационные решения с использованием искусственного интеллекта для вашего бизнеса.
                                </p>
                            </div>
                            <div className="w-full md:w-1/3 mb-6 md:mb-0">
                                <h4 className="text-lg font-semibold">Ссылки</h4>
                                <ul className="mt-4">
                                    <li><a href="/" className="text-neutral-200 hover:text-white">Главная</a></li>
                                    <li><a href="/dashboard" className="text-neutral-200 hover:text-white">Услуги</a></li>
                                    <li><a href="/" className="text-neutral-200 hover:text-white">О нас</a></li>
                                    <li><a href="/privacy-policy" className="text-neutral-200 hover:text-white">Конфидециальность</a></li>
                                </ul>
                            </div>
                            <div className="w-full md:w-1/3 mb-6 md:mb-0">
                                <h4 className="text-lg font-semibold">Следите за нами</h4>
                                <div className="mt-4 flex space-x-4">
                                    <a href="#" className="text-neutral-200 hover:text-white">
                                        <FaInstagram/>
                                    </a>
                                    <a href="#" className="text-neutral-200 hover:text-white">
                                        <FaXTwitter/>
                                    </a>
                                    <a href="#" className="text-neutral-200 hover:text-white">
                                        <FaVk/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 border-t border-neutral-200 pt-6">
                            <p className="text-center text-neutral-200 text-sm">
                                &copy; 2025 AI-TUBE. Все права защищены.
                            </p>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    )
}

export default DashboardProvider