import {inngest} from "@/inngest/client";
import ImageKit from "imagekit";
import OpenAI from 'openai';
import moment from "moment";
import Replicate from 'replicate'

import {db} from "@/configs/db";
import {AiContentTable, AiThumbnailTable, TrendingKeywords} from "@/configs/schema";
import axios from "axios";
import {gemini} from "inngest";
import {createAgent} from "@inngest/agent-kit";
import {GoogleGenerativeAI} from "@google/generative-ai";
import {v4 as uuidv4} from 'uuid'
export const helloWorld = inngest.createFunction(
    {id: "hello-world"},
    {event: 'test/hello.world'},
    async ({event, step}) => {
        await step.sleep('wait-a-moment', '1s')
        return {message: `Hello ${event.data.email}!`}
    }
)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URLENDPOINT
})



export const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
});

export const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY
})


/*
async function main() {
    const completion = await openai.chat.completions.create({
        model: 'openai/gpt-4o',
        messages: [
            {
                role: 'user',
                content: 'What is the  meaning of life?',
            },
        ],
    });

    console.log(completion.choices[0].message);
}

main();

*/



export const GenerateAiThumbnail = inngest.createFunction(
    { id: "ai/generate-thumbnail" },
    { event: "ai/generate-thumbnail" },
    async ({ event, step }) => {
        const { userEmail, refImage, faceImage, userInput } = event.data;

        // 1️⃣ Загрузка референсного изображения на ImageKit
        const uploadImageUrls = await step.run("UploadImage", async () => {
            if (!refImage) return null;

            const refImageUrl = await imageKit.upload({
                file: refImage.buffer,
                fileName: refImage.name,
                isPublished: true,
                useUniqueFileName: false
            });

            return { refImageUrl: refImageUrl.url };
        });

        // 2️⃣ Генерация изображения через Hugging Face
        const generateImage = await step.run("GenerateImage", async () => {
            if (!faceImage) throw new Error("No face image provided");
            const model = "black-forest-labs/FLUX.1-schnell";
            const prompt = `Generate a YouTube thumbnail based on the reference: ${uploadImageUrls?.refImageUrl ?? "none"} and user input: ${userInput}.`;

            // Hugging Face API call
            const hfResponse = await axios.post(
                `https://api-inference.huggingface.co/models/${model}`,
                {
                    inputs: prompt,
                    options: { wait_for_model: true }
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.HF_API_KEY}`,
                        Accept: "application/json"
                    },
                    responseType: "arraybuffer"
                }
            );

            // Сохраняем картинку в буфер
            const buffer = Buffer.from(hfResponse.data, "binary");
            return buffer.toString("base64"); // ImageKit умеет принимать base64
        });

        // 3️⃣ Загрузка сгенерированной картинки на ImageKit
        const uploadThumbnail = await step.run("UploadThumbnail", async () => {
            const imageRef = await imageKit.upload({
                file: generateImage,
                fileName: `${Date.now()}.png`,
                isPublished: true,
                useUniqueFileName: false
            });
            return imageRef.url;
        });

        // 4️⃣ Сохранение в базу
        await step.run("SaveToDb", async () => {
            return db.insert(AiThumbnailTable).values({
                userInput,
                thumbnailUrl: uploadThumbnail,
                createdOn: moment().format("YYYY-MM-DD"),
                refImage: uploadImageUrls,
                userEmail
            }).returning(AiThumbnailTable);
        });

        return uploadThumbnail;
    }
);

const AiContentGeneratorSystemPrompt = `Ты — эксперт по YouTube SEO и AI-креативный помощник. На основе пользовательского ввода ниже сгенерируй только JSON (без объяснений, без markdown, без комментариев), содержащий:

1. Три варианта заголовков для YouTube, оптимизированные под SEO.
2. SEO-оценку для каждого заголовка (от 1 до 100).
3. Уникальное, привлекательное и подробное описание видео.
4. 10 релевантных тегов для видео.
5. Два промпта для миниатюр, каждый должен включать:
   • Профессиональный художественный стиль, основанный на заголовке  
   • Короткий заголовок 3–5 слов, который будет на миниатюре  
   • Визуально привлекательную концепцию (объекты, фон, композицию, стиль)  

Пользовательский ввод: {{user_input}}

Формат ответа (строго JSON):
{
  "titles": [
    { "title": "Заголовок 1", "seo_score": 87 },
    { "title": "Заголовок 2", "seo_score": 82 },
    { "title": "Заголовок 3", "seo_score": 78 }
  ],
  "description": "Тут профессиональное и вовлекающее описание YouTube-видео.",
  "tags": ["тег1", "тег2", "тег3", "тег4", "тег5", "тег6", "тег7", "тег8", "тег9", "тег10"],
  "image_prompts": [
    {
      "heading": "Текст Заголовка 1",
      "prompt": "Профессиональная иллюстрация миниатюры на основе Заголовка 1. Укажи стиль (3D/вектор/флэт), объекты/персонажи, фон и расположение текста."
    },
    {
      "heading": "Текст Заголовка 2",
      "prompt": "Профессиональная иллюстрация миниатюры на основе Заголовка 2. Укажи стиль (3D/вектор/флэт), объекты/персонажи, фон и расположение текста."
    }
  ]
}`
export const GenerateAIContentAgent = createAgent({
    name: 'GenerateAIContentAgent',
    description: 'Агент который генерирует контент для видео Возвращает структурированный JSON-отчет.',
    system: `Ты — эксперт по YouTube SEO и AI-креативный помощник. На основе пользовательского ввода ниже сгенерируй только JSON (без объяснений, без markdown, без комментариев), содержащий:

1. Три варианта заголовков для YouTube, оптимизированные под SEO.
2. SEO-оценку для каждого заголовка (от 1 до 100).
3. Уникальное, привлекательное и подробное описание видео.
4. 10 релевантных тегов для видео.
5. Два промпта для миниатюр, каждый должен включать:
   • Профессиональный художественный стиль, основанный на заголовке  
   • Короткий заголовок 3–5 слов, который будет на миниатюре  
   • Визуально привлекательную концепцию (объекты, фон, композицию, стиль)
6. 5 ключевых этапов видео — пошаговое руководство, что нужно показывать или делать в каждом этапе, кратко, но понятно.
  

Пользовательский ввод: {{user_input}}

Формат ответа (строго JSON):
{
  "titles": [
    { "title": "Заголовок 1", "seo_score": 87 },
    { "title": "Заголовок 2", "seo_score": 82 },
    { "title": "Заголовок 3", "seo_score": 78 }
  ],
  "description": "Тут профессиональное и вовлекающее описание YouTube-видео.",
  "tags": ["тег1", "тег2", "тег3", "тег4", "тег5", "тег6", "тег7", "тег8", "тег9", "тег10"],
  "image_prompts": [
    {
      "heading": "Текст Заголовка 1",
      "prompt": "Профессиональная иллюстрация миниатюры на основе Заголовка 1. Укажи стиль (3D/вектор/флэт), объекты/персонажи, фон и расположение текста."
    },
    {
      "heading": "Текст Заголовка 2",
      "prompt": "Профессиональная иллюстрация миниатюры на основе Заголовка 2. Укажи стиль (3D/вектор/флэт), объекты/персонажи, фон и расположение текста."
    }
  ],
  "video_steps": [
    "Этап 1: Краткое описание первого шага видео",
    "Этап 2: Что делать на втором шаге",
    "Этап 3: Действия на третьем шаге",
    "Этап 4: Четвёртый шаг, что показывать или объяснять",
    "Этап 5: Финальный шаг, завершение видео и призыв к действию"
  ]
}`,
    model: gemini({
        model: 'gemini-2.5-flash',
        apiKey: process.env.GEMINI_API_KEY,

    })
})

export const GenerateAIContent = inngest.createFunction(
    { id: "ai/generateContent" },
    { event: "ai/generateContent" },
    async ({ event, step }) => {
        const { userInput, userEmail } = event.data;

        // напрямую вызываем агента
        const result = await GenerateAIContentAgent.run(userInput);
        console.log("RESULT====", result);

        let parsed;
        try {
            const raw = result.output?.[0]?.content ?? result;
            parsed = typeof raw === "string"
                ? JSON.parse(raw.replace(/```json/g, "").replace(/```/g, "").trim())
                : raw;
        } catch (err) {
            console.error("Ошибка парсинга JSON:", err);
            parsed = {};
        }



        const contentId = uuidv4()
        const saveContentDb = await step.run('SaveToDb', async () => {
            const result = await db.insert(AiContentTable).values({
                content: parsed,
                contentId: contentId,
                createdOn: moment().format('yyyy-mm-DD'),
                userEmail: userEmail,
                userInput: userInput,

                // @ts-ignore
            }).returning(AiContentTable)
            return result!
        })



        console.log("FINAL CONTENT====", parsed);
        return saveContentDb!
    }
);

export const ThumbnailSearchAgent = createAgent({
    name: 'ThumbnailSearchAgent',
    description: 'agent who helps to search thumbnail',
    system: `Describe this thumbnail in short keywords suitable for searching
     similar youtube videos. give me tags with comm separated. Do not give any comment text, 
    Maximum 5 tags. Make sure after searching that tags will get similar youtube thumbnails`,
    model: gemini({
        model: 'gemini-2.5-flash',
        apiKey: process.env.GEMINI_API_KEY,
    })
})

export const ThumbnailSearch = inngest.createFunction(
    {id: 'ai/thumbnail-search'},
    {event: 'ai/thumbnail-search'},
    async ({ event, step }) => {
        const {query, thumbnailUrl} = event.data

            const resp = await ThumbnailSearchAgent.run(thumbnailUrl);


        const result = resp.output[0].content

        return result!
    }
)

export const GetTrendingKeywordsAgent = createAgent({
    name: 'GetTrendingKeywordsAgent',
    description: 'Agent to extract SEO-relevant keywords based on user input and YouTube trending video titles.',
    system: `Given the user input {{userInput}} and a list of YouTube video titles, extract high-ranking SEO-relevant keywords that match the user's query.
        For each keyword:
        Assign an SEO score (1-100) based on search potential and relevance.
        Include a few related queries or search phrases (based on user intent or variations from the video titles).
        Return the result in this JSON format:
        {
          "main_keyword": "Main Keyword related to {{userInput}}",
          "keywords": [
            {
              "keyword": "Extracted Keyword related to {{userInput}}",
              "score": NumericScore,
              "related_queries": [
                "related query 1",
                "related query 2"
              ]
            }
            ...
          ]
        }
        Use the titles below to extract SEO keywords and generate related search phrases:
        {{titles}}
        Only include keywords relevant to {{userInput}}. Keep keywords concise, focused, and action-oriented.`,
    model: gemini({
        model: 'gemini-2.5-flash',
        apiKey: process.env.GEMINI_API_KEY,
    })
});

export const GetTrendingKeywords = inngest.createFunction(
    {id: 'ai/trending-keywords'},
    {event: 'ai/trending-keywords'},
    async ({event, step}) => {
        const {userInput, userEmail} = await event.data;

        // Запрос популярных видео через YouTube API с фильтрацией по более точным параметрам
        const youtubeResult = await step.run('Youtube Trending Search', async () => {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    part: 'snippet,statistics',
                    chart: 'mostPopular', // Получаем популярные видео
                    regionCode: 'US', // Можно изменить на другой регион
                    maxResults: 10, // Количество популярных видео
                    q: userInput,  // Используем переданный запрос
                    key: process.env.YOUTUBE_API_KEY,
                },
            });

            const videoData = response.data.items;

            // Проверяем, что видео есть и фильтруем по актуальности
            const titles: string[] = videoData.map((item: any) => item.snippet.title);
            return titles;
        });

        console.log('User Input:', userInput);
        console.log('YouTube Titles:', youtubeResult);

        const systemString = `Given the user input {{userInput}} and a list of YouTube video titles, extract high-ranking SEO-relevant keywords that match the user's query.
        For each keyword:
        Assign an SEO score (1-100) based on search potential and relevance.
        Include a few related queries or search phrases (based on user intent or variations from the video titles).
        Return the result in this JSON format:
        {
          "main_keyword": "Main Keyword related to {{userInput}}",
          "keywords": [
            {
              "keyword": "Extracted Keyword related to {{userInput}}",
              "score": NumericScore,
              "related_queries": [
                "related query 1",
                "related query 2"
              ]
            }
            ...
          ]
        }
        Use the titles below to extract SEO keywords and generate related search phrases:
        {{titles}}
        Only include keywords relevant to {{userInput}}. Keep keywords concise, focused, and action-oriented.`;

        // Обновляем шаблон с реальными значениями
        const updatedSystemString = systemString
            .replace(/{{userInput}}/g, userInput)
            .replace(/{{titles}}/g, youtubeResult.join(', '));

        const resp = await GetTrendingKeywordsAgent.run(userInput);

        console.log('RESPONSE===', resp);

        const responseText = resp.output[0].content.trim().replace(/^```json\n/, '').replace(/\n```$/, '');
        const parsedData = JSON.parse(responseText);

        const keywordsList = parsedData.keywords.map((keyword: any) => ({
            keyword: keyword.keyword,
            score: keyword.score,
            relatedQueries: keyword.related_queries.join(', ')
        }));
        console.log('Parsed Keywords:', keywordsList);
        try {
            const createdOn = new Date().toISOString();
            const keywordId = uuidv4()
            const result = await db.insert(TrendingKeywords).values({
                userInput: userInput,
                keywordsData: JSON.stringify(keywordsList),
                userEmail: userEmail,
                createdOn: createdOn,
                keywordId: keywordId
            }).returning(TrendingKeywords);

            console.log('Saved to DB:', result);

        } catch (error) {
            console.error('Error saving to DB:', error);
        }


        return { keywordsList, mainKeyword: parsedData.main_keyword };
    }
);