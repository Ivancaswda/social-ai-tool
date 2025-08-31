'use client'
import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuth } from '@/context/useAuth'
import Link from 'next/link'
import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { FaGoogle, FaGithub } from 'react-icons/fa'

function SignUp() {
    const { user, loading, setUser } = useAuth()
    const [form, setForm] = useState({
        userName: '',
        email: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })
            const data = await res.json()
            localStorage.setItem('token', data.token)

            const userRes = await fetch('/api/auth/user', {
                headers: { Authorization: `Bearer ${data.token}` }
            })
            const userData = await userRes.json()
            setUser(userData.user)
            router.replace('/dashboard')
            toast.success('Вы успешно зарегистрировались')
        } catch (err) {
            toast.error('Ошибка при регистрации. Проверьте данные.')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (!loading && user) router.replace('/dashboard')
    }, [user, loading, router])

    return (
        <div className="min-h-screen flex items-center justify-center gap-20 flex-col md:flex-row bg-gradient-to-tr from-green-100 to-green-50 p-6">
            <Image src="/logo.png" alt="logo" className="w-[500px] h-full rounded-xl object-cover" width={200} height={200} />

            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 space-y-6">
                <h1 className="text-3xl font-bold text-green-600 text-center">AI-Tube</h1>
                <p className="text-center text-gray-600 dark:text-gray-300">
                    Создайте ваш аккаунт AI-Tube
                </p>

                <Button className="w-full hover:scale-105 transition-all" variant="outline">
                    <FaGoogle />
                    Зарегистрироваться через Google
                </Button>
                <Button className="w-full hover:scale-105 transition-all" variant="outline">
                    <FaGithub />
                    Зарегистрироваться через GitHub
                </Button>

                <form onSubmit={handleRegister} className="space-y-4 mt-4">
                    <LabelInputContainer>
                        <Label htmlFor="userName">Имя пользователя</Label>
                        <Input
                            id="userName"
                            type="text"
                            placeholder="Tyler"
                            value={form.userName}
                            onChange={(e) => setForm({ ...form, userName: e.target.value })}
                        />
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <Label htmlFor="password">Пароль</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </LabelInputContainer>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
                        disabled={isLoading}
                    >
                        {isLoading && <Loader2Icon className="animate-spin" />}
                        Создать аккаунт
                    </button>
                </form>

                <p className="text-center text-gray-500 dark:text-gray-400">
                    Уже есть аккаунт?{' '}
                    <Link href="/sign-in" className="text-green-600 hover:underline">
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    )
}

const LabelInputContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-col space-y-2">{children}</div>
)

export default SignUp
