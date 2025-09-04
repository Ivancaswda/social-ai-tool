import React from 'react';
import { ContentType } from "@/app/(routes)/ai-content-generator/page";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import {Loader2Icon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {FaMagic, FaRegCopy, FaWizardsOfTheCoast} from "react-icons/fa";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {toast} from "sonner";

type Props = {
    content?: ContentType;
    loading: boolean;
};

const ContentDisplay = ({ content, loading }: Props) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                <Skeleton className="h-40 w-full rounded-xl" />
                <Skeleton className="h-40 w-full rounded-xl" />
                <Skeleton className="h-40 w-full rounded-xl md:col-span-2" />
                <Skeleton className="h-40 w-full rounded-xl md:col-span-2" />
            </div>
        );
    }
    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Текст скопирован в буфер обмена!");
        } catch (err) {
            console.error("Ошибка при копировании:", err);
        }
    };

    if (!content) {
        return <p className="mt-10 text-center text-gray-500">Нет данных для отображения.</p>;
    }

    return (
        <div className="mt-10 space-y-8">

            {/* Titles with SEO score */}
            <div className="border rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Предложения заголовков для видео</h2>
                {content.content.titles.map((titleItem, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center bg-gray-100 p-3 rounded mb-2"
                    >
                        <span className="font-medium">{titleItem.title}</span>
                        <Badge className="text-sm">{titleItem.seo_score}</Badge>
                    </div>
                ))}
            </div>


            <div className="border rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-2">Описание видео</h2>
                <p className="text-gray-700">{content.content.description}</p>
            </div>


            <div className="border rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-2">Теги</h2>
                <div className="flex flex-wrap gap-2">
                    {content.content.tags.map((tag, index) => (
                        <Badge key={index} className="bg-blue-100 text-blue-700">{tag}</Badge>
                    ))}
                </div>
            </div>

            {content.content.video_steps && content.content.video_steps.length > 0 && (
                <div className="border rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Этапы видео</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {content.content.video_steps.map((step, index) => (
                            <div
                                key={index}
                                className="border-l-4 border-green-500 bg-gray-50 p-4 rounded shadow-sm hover:shadow-md transition flex flex-col"
                            >
                                <h3 className="font-semibold mb-1">Этап {index + 1}</h3>
                                <p className="text-gray-700 text-sm">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}


            <div className="border rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Промпты для генерации изображений</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.content.image_prompts.map((item, index) => (
                      <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div key={index} className="border rounded p-4 flex flex-col gap-2">
                                        <h3 className="font-semibold text-lg">{item.heading}</h3>
                                        <p className="text-gray-600">{item.prompt}</p>

                                        <Link
                                            href={`https://huggingface.co/spaces/stabilityai/stable-diffusion?prompt=${encodeURIComponent(item.prompt)}`}
                                            target="_blank"
                                            className="mt-2 inline-block text-white flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-center"
                                        >
                                            <FaMagic/>
                                            Сгенерировать изображение
                                        </Link>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <div className="flex items-end justify-between bg-gray-100 p-2 rounded">

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleCopy(item.prompt)}
                                        >
                                            <FaRegCopy className='text-black' />
                                        </Button>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                      </TooltipProvider>

                    ))}
                </div>
            </div>

        </div>
    );
};

export default ContentDisplay;