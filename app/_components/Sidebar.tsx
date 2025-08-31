// components/NewSidebar.tsx
"use client"
import React from "react"
import {usePathname, useRouter} from "next/navigation"
import {
    Home,
    BookType,
    GalleryThumbnails,
    ChartNoAxesColumn,
    HistoryIcon,
    LightbulbIcon,
    Settings,
    User2Icon,
    Sun, Moon, LogOut, Search
} from "lucide-react"
import Link from "next/link"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {useTheme} from "next-themes";
import {useAuth} from "@/context/useAuth";
import {toast} from "sonner";
import {FaMagic} from "react-icons/fa";
import {BiMoney} from "react-icons/bi";

export const items = [
    { title: "Главная", url: "/dashboard", icon: Home },
    { title: "ИИ Аутлаер", url: "/outlier", icon: GalleryThumbnails },
    { title: "Ключевые слова", url: "/trending-keywords", icon: BookType },
    { title: "Сгенерировать ", url: "/ai-content-generator", icon: FaMagic },
    { title: "Ваши ключевые слова", url: "/ai-keywords", icon: HistoryIcon },
    { title: "Генерации", url: "/ai-contents", icon: LightbulbIcon },

    { title: "Искать по превью", url: "/thumbnail-search", icon: Search },
    { title: "Получить премиум", url: "/buy-pro", icon: BiMoney },
    { title: "Настройки", url: "#", icon: Settings, isSettings: true },
    { title: "Профиль", url: "/profile", icon: User2Icon },
]

const Sidebar = () => {
    const path = usePathname()
    const {setTheme} = useTheme()
    const {logout} = useAuth()
    const router = useRouter()
    return (
        <nav className="fixed top-0 left-1/2 -translate-x-1/2 flex gap-6 bg-white dark:bg-neutral-900 shadow-lg px-6 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 z-50">
            {items.map((item, idx) => {
                const active = path === item.url

                // если это Settings → рендерим поповер
                if (item.isSettings) {
                    return (
                        <Popover key={idx}>
                            <PopoverTrigger asChild>
                                <button
                                    className={`flex flex-col text-center items-center text-xs font-medium transition-colors ${
                                        active ? "text-green-600" : "text-gray-500 hover:text-green-500"
                                    }`}
                                >
                                    <item.icon className="h-6 w-6 mb-1" />
                                    {item.title}
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48">
                                <div className="flex flex-col gap-2">
                                    <Button onClick={() => setTheme('light')}  variant="ghost" className="flex justify-start gap-2">
                                        <Sun className="w-4 h-4" /> Светлая тема
                                    </Button>
                                    <Button  onClick={() => setTheme('dark')} variant="ghost" className="flex justify-start gap-2">
                                        <Moon className="w-4 h-4" /> Тёмная тема
                                    </Button>
                                    <Button onClick={() => {

                                        logout()

                                        toast.success('Вы успешно вышли!')
                                        router.push('/sign-up')
                                    }} variant="ghost" className="flex justify-start gap-2 text-red-600">
                                        <LogOut className="w-4 h-4" /> Выйти
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )
                }


                return (
                    <Link
                        key={idx}
                        href={item.url}
                        className={`flex flex-col text-center items-center text-xs font-medium transition-colors ${
                            active ? "text-green-600" : "text-gray-500 hover:text-green-500"
                        }`}
                    >
                        <item.icon className={`h-6 w-6 mb-1 ${active && "scale-110"}`} />
                        {item.title}
                    </Link>
                )
            })}
        </nav>
    )
}

export default Sidebar
