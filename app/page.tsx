"use client"
import Image from "next/image";
import {useAuth} from "@/context/useAuth";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React from "react";
import {items} from "@/app/_components/Sidebar";
import {DropdownMenuTrigger, DropdownMenu, DropdownMenuContent} from "@/components/ui/dropdown-menu";
import {usePathname} from "next/navigation";
import {ThreeDMarquee} from "@/components/ui/3d-marquee";
import {images} from "next/dist/build/webpack/config/blocks/images";
import {StickyScroll} from "@/components/ui/sticky-scroll-reveal";
import {LayoutGrid} from "@/components/ui/layout-grid";
import {InfiniteMovingCards} from "@/components/ui/infinite-moving-cards";
import {TextGenerateEffect} from "@/components/ui/text-generate-effect";
import Link from "next/link";
import {FaInstagram, FaVk} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";
import { motion } from 'framer-motion'
import {Loader2Icon} from "lucide-react";

export default function Home() {

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.6, ease: 'easeOut' },
    }),
  }
  let {user, loading} = useAuth()
  const path = usePathname();
  console.log(user)
  const images = [
    "/ai-content-generator.png",
    "/ai-keywords.png",
    "/ai-outlier.png",
    "/thumbnail-search.png",
    "/ai-content-generator.png",
    "/ai-keywords.png",
    "/ai-outlier.png",
    "/thumbnail-search.png",
    "/logo.png",
    "/ai-keywords.png",
    "/ai-outlier.png",
    "/thumbnail-search.png",
    "/ai-content-generator.png",
    "/ai-keywords.png",
    "/ai-outlier.png",
    "/logo.png",
    "/ai-content-generator.png",
    "/ai-keywords.png",
    "/ai-outlier.png",
    "/thumbnail-search.png",
    "/ai-content-generator.png",
    "/logo.png",
    "/ai-outlier.png",
    "/thumbnail-search.png",
    "/ai-content-generator.png",
    "/ai-keywords.png",
    "/ai-outlier.png",
    "/thumbnail-search.png",
    "/ai-content-generator.png",
    "/ai-keywords.png",
    "/ai-outlier.png",

  ];
  const content = [
    {
      title: "ИИ генератор контента",
      description:
          "Сгенерируйте ваш контент за секунды используя вообразительный мозг искуственного интелекта и станьте популярным блогером в любой социальной сети.",
      content: (
          <Image
              src="/ai-content-generator.png"
              width={300}
              height={300}
              className="h-full w-full object-cover"
              alt="linear board demo"
          />
      ),
    },
    {
      title: "ИИ Аутлаер",
      description:
          "Смотри как скрытую статистику каждого вашего-блогера конкурента используя самые новые технологии ИИ",
      content: (

            <Image
                src="/ai-outlier.png"
                width={300}
                height={300}
                className="h-full w-full object-cover"
                alt="linear board demo"
            />

      ),
    },
    {
      title: "ИИ ключевые слова",
      description:
          "Узнайте какие ключевые слова нужно использовать чтобы выходить в тренды по конкретной теме.",
      content: (

            <Image
                src="/ai-keywords.png"
                width={300}
                height={300}
                className="h-full w-full object-cover"
                alt="linear board demo"
            />

      ),
    },
    {
      title: "Пойск по превью",
      description:
          "найдите похожее видео по картинке или по пойску используя ИИ технологии",
      content: (
          <Image
              src="/thumbnail-search.png"
              width={300}
              height={300}
              className="h-full w-full object-cover"
              alt="linear board demo"
          />
      ),
    },
  ];

  const SkeletonOne = () => {
    return (
        <div>
          <p className="font-bold md:text-4xl text-xl text-white">
            Генератор ИИ
          </p>
          <p className="font-normal text-base text-white"></p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
            Это передовой генератор на основе ИИ, который помогает создавать уникальный контент: текст, изображения и многое другое. Он адаптируется под ваши нужды и предоставляет впечатляющие результаты.
          </p>
        </div>
    );
  };

  const SkeletonTwo = () => {
    return (
        <div>
          <p className="font-bold md:text-4xl text-xl text-white">
            Обнаружение выбросов
          </p>
          <p className="font-normal text-base text-white"></p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
            Используйте передовые алгоритмы ИИ для обнаружения выбросов в ваших данных, помогая выявить аномалии, которые могут остаться незамеченными. Идеально для специалистов по данным и аналитиков.
          </p>
        </div>
    );
  };

  const SkeletonThree = () => {
    return (
        <div>
          <p className="font-bold md:text-4xl text-xl text-white">
            Поиск миниатюр
          </p>
          <p className="font-normal text-base text-white"></p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
            Мощный инструмент для поиска релевантных миниатюр для вашего контента, работающий на основе ИИ. Это поможет вам сэкономить время и найти идеальные изображения для ваших проектов.
          </p>
        </div>
    );
  };

  const SkeletonFour = () => {
    return (
        <div>
          <p className="font-bold md:text-4xl text-xl text-white">
            Трендовые ключевые слова
          </p>
          <p className="font-normal text-base text-white"></p>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
            Узнайте последние трендовые ключевые слова в вашей отрасли или нише, чтобы оставаться на шаг впереди и работать с наиболее актуальными темами.
          </p>
        </div>
    );
  };

  const cards = [
    {
      id: 1,
      content: <SkeletonOne />,
      className: "col-span-1",
      thumbnail: '/ai-content-generator.png',
    },
    {
      id: 2,
      content: <SkeletonTwo />,
      className: "col-span-1",
      thumbnail: '/ai-outlier.png',
    },
    {
      id: 4,
      content: <SkeletonFour />,
      className: "col-span-1",
      thumbnail: '/thumbnail-search.png',
    },
    {
      id: 3,
      content: <SkeletonThree />,
      className: "col-span-1",
      thumbnail: "/ai-keywords.png"
    },
  ];
  const testimonials = [
    {
      quote:
          "AI-TUBE изменила наш подход к искусственному интеллекту. Инновационные решения компании помогли нам ускорить проекты и оптимизировать рабочие процессы. Это настоящий прорыв в отрасли.",
      name: "Иван Петров",
      title: "Генеральный директор, Tech Innovators",
    },
    {
      quote:
          "Работа с AI-TUBE стала для нас трансформационным опытом. Их передовые инструменты ИИ и оперативная поддержка помогли нашей компании оставаться впереди конкурентов и эффективно масштабировать операции.",
      name: "Мария Сидорова",
      title: "Технический директор, FutureTech Solutions",
    },
    {
      quote:
          "Платформа AI-TUBE невероятно интуитивно понятна и мощна. Их ИИ-аналитика значительно улучшила наш процесс принятия решений, и результаты говорят сами за себя.",
      name: "Алексей Кузнецов",
      title: "Data Scientist, NextGen Analytics",
    },
    {
      quote:
          "Я никогда не встречала компанию, так приверженную инновациям в области ИИ, как AI-TUBE. Их решения сделали нашу цифровую трансформацию более плавной и эффективной. Настоящие лидеры в своей области.",
      name: "Елена Васильева",
      title: "Менеджер продукта, DigitalX",
    },
    {
      quote:
          "Инструменты AI-TUBE — это не просто программное обеспечение, а комплексное решение, которое идеально вписывается в стратегию ИИ любой компании. Мы увидели измеримые улучшения после внедрения их решений.",
      name: "Дмитрий Иванов",
      title: "Руководитель операций, SmartTech Inc.",
    },
  ];
  const companies = [
    { name: "Google", logo: "https://avatars.mds.yandex.net/i?id=fa359d1f813a19f1f2c8dc20d95840c5e9e895f4-4266310-images-thumbs&n=13" },
    { name: "Яндекс", logo: "https://avatars.mds.yandex.net/get-yapic/39249/cCwHXslKqacQAtNwRN0vVtZ8xpU-1/orig" },
    { name: "Spotify", logo: "https://maxsum.in/assets/images/logo/logo-1.svg" },
    { name: "ВКонтакте", logo: "https://avatars.mds.yandex.net/i?id=90c6b452e2a07da18af431b8679d6fe9_l-5668792-images-thumbs&n=13" },
    { name: "Сбер", logo: "https://pic.rutubelist.ru/video/e0/95/e0958732d03b09c68b26a7fa61d8041f.jpg" },
    { name: "Shopify", logo: "https://avatars.mds.yandex.net/i?id=f9468550c4d5281b7e21a0e4d4e55b2d_l-8195016-images-thumbs&n=13" },
    { name: "Google", logo: "https://avatars.mds.yandex.net/i?id=fa359d1f813a19f1f2c8dc20d95840c5e9e895f4-4266310-images-thumbs&n=13" },
    { name: "Яндекс", logo: "https://avatars.mds.yandex.net/get-yapic/39249/cCwHXslKqacQAtNwRN0vVtZ8xpU-1/orig" },
    { name: "Spotify", logo: "https://maxsum.in/assets/images/logo/logo-1.svg" },
    { name: "ВКонтакте", logo: "https://avatars.mds.yandex.net/i?id=90c6b452e2a07da18af431b8679d6fe9_l-5668792-images-thumbs&n=13" },
    { name: "Сбер", logo: "https://pic.rutubelist.ru/video/e0/95/e0958732d03b09c68b26a7fa61d8041f.jpg" },
    { name: "Shopify", logo: "https://avatars.mds.yandex.net/i?id=f9468550c4d5281b7e21a0e4d4e55b2d_l-8195016-images-thumbs&n=13" },
    { name: "Google", logo: "https://avatars.mds.yandex.net/i?id=fa359d1f813a19f1f2c8dc20d95840c5e9e895f4-4266310-images-thumbs&n=13" },
    { name: "Яндекс", logo: "https://avatars.mds.yandex.net/get-yapic/39249/cCwHXslKqacQAtNwRN0vVtZ8xpU-1/orig" },
    { name: "Spotify", logo: "https://maxsum.in/assets/images/logo/logo-1.svg" },
    { name: "ВКонтакте", logo: "https://avatars.mds.yandex.net/i?id=90c6b452e2a07da18af431b8679d6fe9_l-5668792-images-thumbs&n=13" },
    { name: "Сбер", logo: "https://pic.rutubelist.ru/video/e0/95/e0958732d03b09c68b26a7fa61d8041f.jpg" },
    { name: "Shopify", logo: "https://avatars.mds.yandex.net/i?id=f9468550c4d5281b7e21a0e4d4e55b2d_l-8195016-images-thumbs&n=13" },
    { name: "Google", logo: "https://avatars.mds.yandex.net/i?id=fa359d1f813a19f1f2c8dc20d95840c5e9e895f4-4266310-images-thumbs&n=13" },
    { name: "Яндекс", logo: "https://avatars.mds.yandex.net/get-yapic/39249/cCwHXslKqacQAtNwRN0vVtZ8xpU-1/orig" },
    { name: "Spotify", logo: "https://maxsum.in/assets/images/logo/logo-1.svg" },
    { name: "ВКонтакте", logo: "https://avatars.mds.yandex.net/i?id=90c6b452e2a07da18af431b8679d6fe9_l-5668792-images-thumbs&n=13" },
    { name: "Сбер", logo: "https://pic.rutubelist.ru/video/e0/95/e0958732d03b09c68b26a7fa61d8041f.jpg" },
    { name: "Shopify", logo: "https://avatars.mds.yandex.net/i?id=f9468550c4d5281b7e21a0e4d4e55b2d_l-8195016-images-thumbs&n=13" },

  ];
  const words = `AI-TUBE открывает новые горизонты. В критической ситуации, мы делаем огромные шаги вперед. 
  Вдруг вы становитесь вдохновленными, продуктивными. Вы принимаете вызовы, потому что они — часть пути. 
  Всё здесь. Искусственный интеллект в реальном времени, миллионы операций в секунду. 
  Спокойные лица, уверенные, как математические алгоритмы.`

  return (
      <div className='relative'>
        <header className="sticky top-0 z-50 w-full bg-neutral-800 border-b border-gray-700 text-sm py-3 sm:py-0">
          <nav className="relative max-w-[85rem] bg-neutral-800 w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8" aria-label="Global">
            <div className="flex items-center justify-between py-3">
              <div>
                <Image src={'/logo.png'} className='rounded-xl w-[70px] h-[60px]' alt="logo" width={80} height={70} />
              </div>
            </div>
            <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end sm:ps-7 cursor-pointer">
                {!user && !loading ?
                    <Link href='/sign-up' className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-green-600 sm:border-s sm:border-gray-800 py-2 sm:py-0 sm:ms-4 sm:my-6 sm:ps-6 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-green-500">

                       <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                         <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                       </svg>
                       Начать


                    </Link>
                    : loading && !user ? <div className='flex items-center justify-center'>
                          <Loader2Icon className='animate-spin text-green-600 '/>
                        </div> :
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Avatar>
                          <AvatarImage src={user?.avatarUrl} />
                          <AvatarFallback className='bg-green-600 text-white'>{user?.userName.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {items.map((item, index) => (
                            <a href={item.url} key={index} className={`p-2 text-lg flex gap-2 items-center hover:bg-gray-100 rounded-lg`}>
                              <item.icon className='h-5 w-5' />
                              <span>{item.title}</span>
                            </a>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                }
              </div>
            </div>
          </nav>
        </header>  <div className="relative mx-auto mb-10 flex h-screen w-full  flex-col items-center justify-center overflow-hidden ">
        <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
        >
          <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-bold text-balance text-white md:text-4xl lg:text-6xl">
            Последний шаг к твоей блогерской мечте вместе с{" "}
            <span className="relative z-20 inline-block rounded-xl bg-green-500/40 px-4 py-1 text-white underline decoration-green-500 decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
      AI-Tube
    </span>
          </h2>
        </motion.p>

        <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
            className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base"
        >
          Попробуйте наши ИИ инструменты и станьте популярным в любой социальной сети с помощью нашего ИИ абсолютно бесплатно, со скоростью света
        </motion.p>

          <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4">
            <button className="rounded-md bg-green-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none">
              <Link href='/dashboard' >
                Попробовать сейчас
              </Link>
            </button>
            <button className="rounded-md border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black focus:outline-none">
              <Link href='/dashboard'>
                Подробнее
              </Link>

            </button>
          </div>

          {/* overlay */}
          <div className="absolute inset-0 z-10 h-full w-full bg-black/80 dark:bg-black/40" />
          <ThreeDMarquee
              className="pointer-events-none absolute inset-0 h-full w-full"
              images={images}
          />
        </div>
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
            className="h-screen py-20 w-full"
        >
          <LayoutGrid cards={cards} />
        </motion.div>


        <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
          />
        </div>
        <div className='px-20 my-20'>
          <TextGenerateEffect words={words} />
        </div>



        <div className="relative overflow-hidden py-10">
          <div className="absolute inset-0 flex animate-marquee">
            <div className="flex space-x-10 px-10">
              {companies.map((company, index) => (
                  <div key={index} className="flex items-center">
                    <img
                        src={company.logo}
                        alt={company.name}
                        className="h-12 w-auto"
                    />
                  </div>
              ))}
            </div>

            <div className="flex space-x-10 px-10">
              {companies.map((company, index) => (
                  <div key={index} className="flex items-center">
                    <img
                        src={company.logo}
                        alt={company.name}
                        className="h-12 w-auto"
                    />
                  </div>
              ))}
            </div>
          </div>
        </div>







        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-2">

            {/* Автоматическая генерация */}
            <a className="group transition-all flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800" href="#">
              <div className="flex justify-center items-center size-12 bg-green-600 rounded-xl">
                <svg className="flex-shrink-0 size-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
              <div className="mt-5">
                <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">Автогенерация контента</h3>
                <p className="mt-1 text-gray-600 dark:text-neutral-400">ИИ создаёт видео, посты и обложки за секунды — просто введи идею.</p>
                <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-green-600 decoration-2 group-hover:underline font-medium">
        Узнать больше
        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </span>
              </div>
            </a>

            {/* Оптимизация для соцсетей */}
            <a className="group transition-all flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800" href="#">
              <div className="flex justify-center items-center size-12 bg-green-600 rounded-xl">
                <svg className="flex-shrink-0 size-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M4 4h16v16H4z" /><path d="M9 9h6v6H9z" />
                </svg>
              </div>
              <div className="mt-5">
                <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">Оптимизация под платформы</h3>
                <p className="mt-1 text-gray-600 dark:text-neutral-400">Контент адаптируется для TikTok, YouTube, Instagram и других соцсетей.</p>
                <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-green-600 decoration-2 group-hover:underline font-medium">
        Узнать больше
        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </span>
              </div>
            </a>

            {/* SEO + рекомендации */}
            <a className="group transition-all flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800" href="#">
              <div className="flex justify-center items-center size-12 bg-green-600 rounded-xl">
                <svg className="flex-shrink-0 size-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div className="mt-5">
                <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">SEO и рекомендации</h3>
                <p className="mt-1 text-gray-600 dark:text-neutral-400">ИИ подбирает теги, описания и хэштеги, чтобы твой контент попадал в топ.</p>
                <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-green-600 decoration-2 group-hover:underline font-medium">
        Узнать больше
        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </span>
              </div>
            </a>

            {/* Аналитика */}
            <a className="group flex transition-all flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800" href="#">
              <div className="flex justify-center items-center size-12 bg-green-600 rounded-xl">
                <svg className="flex-shrink-0 size-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" />
                </svg>
              </div>
              <div className="mt-5">
                <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400">Аналитика и рост</h3>
                <p className="mt-1 text-gray-600 dark:text-neutral-400">Отслеживай просмотры, подписки и получай советы для увеличения охвата.</p>
                <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-green-600 decoration-2 group-hover:underline font-medium">
        Узнать больше
        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </span>
              </div>
            </a>

          </div>
        </div>
        <footer className="bg-green-600 text-white py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <Image src='/logo.png' className='w-[80px] h-[80px] rounded-xl' width={80} height={80} alt='logo'/>
                <p className="mt-2 text-sm mt-3 text-neutral-200">
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
      </div>
  );
}
