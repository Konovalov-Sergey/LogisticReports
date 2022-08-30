export type reportInMonthType = {
    'Рік': string,
    'Місяць': string,
    'Склад': string,
    'Поставки': string,
    'Носії': string,
    'Артикула': string,
    'Лінії': string,
    'Об\'єм': string,
    'Вага': string
}

export type reportInDayType = {
    'Дата': string,
    'Склад': string,
    'Поставки': string,
    'Носії': string,
    'Артикула': string,
    'Лінії': string,
    'Об\'єм': string,
    'Вага': string
}

export type reportInOnOffMonthType = {
    'Рік': string,
    'Місяць': string,
    'Склад': string,
    'Онлайн_офлайн': string,
    'Поставки': string,
    'Носії': string,
    'Артикула': string,
    'Лінії': string,
    'Об\'єм': string,
    'Вага': string
}
export type reportInOnOffDayType = {
    'Дата': string,
    'Склад': string,
    'Онлайн_офлайн': string,
    'Поставки': string,
    'Носії': string,
    'Артикула': string,
    'Лінії': string,
    'Об\'єм': string,
    'Вага': string
}
export type reportInFlowType = {
    "Дата носія": string,
    "Пнк офлайн док-ти": number,
    "Пнк офлайн лінії": number,
    "Ппт офлайн док-ти": number,
    "Ппт офлайн лінії": number,
    "Кросдок офлайн док-ти": number,
    "Кросдок офлайн лінії": number,
    "Пнк онлайн док-ти": number,
    "Пнк онлайн лінії": number,
    "Ппт онлайн док-ти": number,
    "Ппт онлайн лінії": number,
    "Забезпечення док-ти": number,
    "Забезпечення лінії": number,
    "Повернення док-ти": number,
    "Повернення лінії": number,
    "Кросдок онлайн док-ти": number,
    "Кросдок онлайн лінії": number,
    "Зовнішні постач док-ти": number,
    "Зовнішні постач лінії": number,
    "Інші док-ти": number,
    "Інші лінії": number
}
export type reportInFlowDetType = {
    Дата: Date,
    Склад: string,
    Постачальник: string,
    Артикул: string,
    Назва: string,
    Кількість: number,
    Відділ: string,
    Заявник: string,
    Поставка: number,
    'Замовлення п-ка': null | string,
    Замовлення: null | string,
    Резерв: null | string,
    Носій: string,
    Тип: string,
    id: null | string
}