
export type VolumeWhArrType = {
    'Рік': string,
    'Місяць': string,
    'Склад': string,
    'Об\'єм': string
};

export type PickedLinesPblType = {
    'Дата закриття': string,
    A: number,
    B: number,
    C: number,
    C_conveyor: number,
    C_depacking: number,
    F: number,
    G: number
}

export type UnpickedLinesPblType = {
    'Дата створення': string,
    'Склад': string,
    'Лінії': string
}
export type UnpickedLinesSupPblType = {
    'Дата створення': Date,
    'Постачальник': string,
    'Склад': string,
    'Лінії': number,
    'id': string
}
export type UnpickedLinesScuPblType = {
    'Дата': Date,
    'Склад': string,
    'Номер постачальника': string,
    'Постачальник': string,
    'Заявка': string,
    'Артикул': string,
    'Товар': string,
    'Кількість': number,
    'Носій': string,
    'Клас місця': string,
    'Місце': string
}

export type linesPickingType = {
    'Склад': string,
    'Дата звіту': Date,
    'Створено': number,
    'Не зібрано': number,
    'Зібрано': number
}
export type linesPickingDetType = {
    "Дата створення": Date,
    "Склад": string,
    "Відправка": string,
    "Артикул": string,
    "Назва": string,
    "К-сть для збору": number,
    "Складська зона": string,
    "З місця": string,
    "На місце": string,
    "З носія": string,
    "На носій": string       
}
