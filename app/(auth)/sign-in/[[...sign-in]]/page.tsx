'use client'
import React, {useEffect, useState} from 'react'
import { Input } from '@/components/ui/input'
import axios from "axios";
import {toast} from "sonner";
import {signInWithPopup} from 'firebase/auth'
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/useAuth";
import {Label} from "@/components/ui/label";
import {IconBrandGithub, IconBrandGoogle, IconBrandOnlyfans} from "@tabler/icons-react";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {auth, provider, githubProvider} from "@/lib/firebase";
import {Loader2Icon} from "lucide-react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {FaGithub, FaGoogle} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";

function SignIn() {
    const {user, setUser} = useAuth()

    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const res = await axios.post('/api/auth/login', form)

        const data = await res.data
        localStorage.setItem("token", data.token)
        // получаем пользователя
        const userRes = await fetch("/api/auth/user", {
            headers: {
                Authorization: `Bearer ${data.token}`,
            },
        });

        if (!userRes.ok) throw new Error("Failed to fetch user");

        const userData = await userRes.json();
        setUser(userData?.user); // обновляем контекст
        setIsLoading(false)
        router.replace('/dashboard')

        toast.success('Вы успешно вошли в аккаунт')
    }
    const handleGoogleSignIn = async () => {
        try {

            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: user.email,
                    userName: user.displayName,
                    avatarUrl: user.photoURL
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Ошибка входа");

            setUser(data.user);
            localStorage.setItem("token", data.token);

            router.push("/dashboard");
            toast.success("Успешный вход через Google!");
        } catch (err: any) {
            toast.error(err.message);
        }
    };


    useEffect(() => {
        if (user) {
            router.replace("/dashboard");
        }
    }, [user, router]);
    return (
        <div className="min-h-screen flex items-center gap-20 justify-center md:flex-row flex-col bg-gradient-to-tr from-green-100 to-green-50 p-6">
            <Image src='/logo.png' alt='logo' className='w-[500px] h-full rounded-xl object-cover' width={200} height={200}/>

            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 space-y-6">
                <h1 className="text-3xl font-bold text-green-600 text-center">AI-Tube</h1>
                <p className="text-center text-gray-600 dark:text-gray-300">
                    Войдите в ваш аккаунт AI-Tube
                </p>

                <Button onClick={handleGoogleSignIn} className='w-full hover:scale-105 transition-all cursor-pointer' variant='outline'>
                    <FaGoogle/>
                    С помощью Google
                </Button>

                <form onSubmit={handleLogin} className="space-y-4">
                    <LabelInputContainer>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="you@example.com"
                        />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="password">Пароль</Label>
                        <Input
                            id="password"
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            placeholder="••••••••"
                        />
                    </LabelInputContainer>
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
                        disabled={isLoading}
                    >
                        {isLoading && <Loader2Icon className="animate-spin" />}
                        Войти
                    </button>
                </form>
                <p className="text-center text-gray-500 dark:text-gray-400">
                    Нет аккаунта?{' '}
                    <Link href="/sign-up" className="text-green-600 hover:underline">
                        Зарегистрироваться
                    </Link>
                </p>
            </div>
         </div>
    )
}

const LabelInputContainer = ({
                                 children,
                             }: {
    children: React.ReactNode
}) => <div className="flex flex-col space-y-2">{children}</div>
export default SignIn