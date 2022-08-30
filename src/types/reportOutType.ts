export type reportOutMonthType = {
    Рік: string,
    Місяць: string,
    Склад: string,
    Рейс: string,
    Відправка: string,
    Заявка: string,
    Носії: string,
    Артикула: string,
    Лінії: string,
    'Об\'єм': string,
    Вага: string
}
export type reportOutDayType = {
    Дата: string,
    Склад: string,
    Рейс: string,
    Відправка: string,
    Заявка: string,
    Носії: string,
    Артикула: string,
    Лінії: string,
    'Об\'єм': string,
    Вага: string
}

export type reportOutOnOffMonthType = {
    Рік: string,
    Місяць: string,
    Склад: string,
    Онлайн_офлайн: string,
    Рейс: string,
    Відправка: string,
    Заявка: string,
    Носії: string,
    Артикула: string,
    Лінії: string,
    'Об\'єм': string,
    Вага: string
}
export type reportOutOnOffDayType = {
    Дата: string,
    Склад: string,
    Онлайн_офлайн: string,
    Рейс: string,
    Відправка: string,
    Заявка: string,
    Носії: string,
    Артикула: string,
    Лінії: string,
    'Об\'єм': string,
    Вага: string
}
export type reportOutFlowType = {
    Дата: string,
    'ЦВЗ д-ти': null | number,
    'ЦВЗ лінії': null | number,
    'Поштові оператори д-ти': null | number,
    'Поштові оператори лінії': null | number,
    'Кросдок онлайн д-ти': null | number,
    'Кросдок онлайн лінії': null | number,
    'R1 забезпечення д-ти': null | number,
    'R1 забезпечення лінії': null | number,
    'ППТ офлайн д-ти': null | number,
    'ППТ офлайн лінії': null | number,
    'Кросдок офлайн д-ти': null | number,
    'Кросдок офлайн лінії': null | number,
    'Інше д-ти': null | number,
    'Інше лінії': null | number
}
export type reportOutFlowDetType = {
    Дата: Date,
    Склад: string,
    Відправка: string,
    Артикул: string,
    Назва: string,
    Відділ: null | string,
    Кількість: number,
    Одержувач: string,
    Заявка: null | string,
    Носій: string,
    'Номер ТЗ': null | string,
    Постачальник:  string,
    Рейс: string,
    Тип: string
}