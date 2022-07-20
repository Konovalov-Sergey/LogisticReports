import React, { memo } from 'react';

const reportOutNote = memo(() => {
    return (
        <div>
            Рейс - кількість унікальних рейсів у розрізі складу  <br />
            Відправка - кількість відвантажених унікальних відправок за період <br />	
            Заявка - кількість відвантажених унікальних заявок за період <br />	
            Носій - кількість відвантажених унікальних носіїв за період <br />	
            Артикула - кількість відвантажених унікальних артикулів у розрізі відправки за період <br />	
            Лінії - кількість строк у звіті Report_Out <br />
            Об'єм - дані для розрахунку беруться з лог.даних, якщо CrossDock - з обмірів. Максимальний об'єм позиції може бути 8 кубів 	<br />
            Дату можливо обирати починаючи з попереднього дня. Звіт оновлюється щодня о 00.00
        </div>
    );
});

export default reportOutNote;