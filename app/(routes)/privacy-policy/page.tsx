'use client'

import React from 'react'

const PrivacyPolicy = () => {
    return (
        <div className="px-6 sm:px-12 lg:px-24 py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Политика конфиденциальности</h1>
                <p className="text-lg text-gray-700 mb-6">
                    В этой политике конфиденциальности объясняется, как мы собираем, используем и защищаем вашу информацию,
                    когда вы используете AI-TUBE. Мы ценим вашу конфиденциальность и стремимся обеспечивать вашу безопасность в интернете.
                </p>

                <div className="space-y-6">

                    <section>
                        <h2 className="text-2xl font-semibold text-green-600 mb-3">1. Сбор данных</h2>
                        <p className="text-gray-700">
                            Мы собираем определённую информацию о пользователях при использовании нашего сервиса:
                        </p>
                        <ul className="list-disc pl-5 text-gray-700">
                            <li>Личную информацию, такую как имя и контактные данные (если они предоставлены).</li>
                            <li>Информацию о вашем устройстве, включая IP-адрес, тип устройства и браузера.</li>
                            <li>Данные о взаимодействии с сайтом, включая действия, выполненные вами на платформе.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-green-600 mb-3">2. Использование данных</h2>
                        <p className="text-gray-700">
                            Собранные данные используются для:
                        </p>
                        <ul className="list-disc pl-5 text-gray-700">
                            <li>Предоставления и улучшения функционала нашего сервиса.</li>
                            <li>Оповещения вас о важных обновлениях и новостях.</li>
                            <li>Анализа работы платформы для улучшения качества услуг.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-green-600 mb-3">3. Безопасность данных</h2>
                        <p className="text-gray-700">
                            Мы предпринимаем необходимые меры для защиты вашей информации от несанкционированного доступа, использования или раскрытия. Это включает:
                        </p>
                        <ul className="list-disc pl-5 text-gray-700">
                            <li>Шифрование данных при передаче через интернет.</li>
                            <li>Использование безопасных серверов для хранения данных.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-green-600 mb-3">4. Передача данных третьим лицам</h2>
                        <p className="text-gray-700">
                            Мы не продаем, не передаем и не делаем доступными ваши данные третьим лицам, за исключением случаев, предусмотренных законом или если это необходимо для выполнения наших услуг:
                        </p>
                        <ul className="list-disc pl-5 text-gray-700">
                            <li>При необходимости раскрытия данных в соответствии с законом.</li>
                            <li>При передаче данных нашим партнерам для обработки, если это необходимо для функционирования наших услуг.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-green-600 mb-3">5. Ваши права</h2>
                        <p className="text-gray-700">
                            Вы имеете право:
                        </p>
                        <ul className="list-disc pl-5 text-gray-700">
                            <li>Запрашивать информацию о том, какие данные о вас мы храним.</li>
                            <li>Запрашивать изменение или удаление ваших данных.</li>
                            <li>Отказаться от получения маркетинговых материалов и уведомлений.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-green-600 mb-3">6. Изменения в политике конфиденциальности</h2>
                        <p className="text-gray-700">
                            Мы оставляем за собой право время от времени изменять или обновлять эту политику конфиденциальности. Обо всех значимых изменениях мы будем уведомлять вас через уведомления на платформе или по электронной почте.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-green-600 mb-3">7. Контактная информация</h2>
                        <p className="text-gray-700">
                            Если у вас есть вопросы или замечания по поводу нашей политики конфиденциальности, не стесняйтесь обращаться к нам:
                        </p>
                        <p className="text-gray-700">
                            Email: <a href="mailto:support@aitube.com" className="text-green-600">support@aitube.com</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy
