// Прокрутка к блоку


// Переменные для перетаскивания верхнего диска:
let isDragging = false;
let startX = 0;
let offsetX2 = 0;

// Переменные для рассчета координат первого и второго диска:
let xPositionOut = {1: null, 2: null} // Относительно арки
let xPositionInner = {1: null, 2: null} // Относительно стойки

// Переменные для разницы значений
let diameterWheel = {1: null, 2: null}
let widthWheel = {1: null, 2: null} // Ширина диска
let outLip = {1: null, 2: null} // Полка
let etAll = {1: null, 2: null} // Вылет

// Расчет et2
function calculateET2() {
    let out1 = parseFloat(document.getElementById('out1').value || 0) * 25.4;
    let inner1 = parseFloat(document.getElementById('inner1').value || 0) * 25.4;
    let et1 = parseFloat(document.getElementById('et1').value || 0);

    let out2 = parseFloat(document.getElementById('out2').value || 0) * 25.4;
    let inner2 = parseFloat(document.getElementById('inner2').value || 0) * 25.4;

    if (!out1 || !inner1 || isNaN(et1) || !out2 || !inner2) return;

    widthWheel[1] = out1 + inner1;
    outLip[1] = out1;
    etAll[1] = et1;

    widthWheel[2] = out2 + inner2;
    outLip[2] = out2;

    let Suk = widthWheel[1]/2 - outLip[1] - etAll[1];
    etAll[2] = Number((widthWheel[2]/2 - outLip[2] - Suk).toFixed(1));

    document.getElementById('et2').value = etAll[2];
}
// Функция рисования:
function myPaint2(number = 1, color = '#5c636a') {
    // Обновление цвета линии под формой
    document.querySelector('.form_data[data-id="' + number + '"] hr').style.backgroundImage =
        'linear-gradient(to right, transparent, ' + color + ', transparent)';

    let canvas = document.getElementById('myCanvas' + number);
    // if (!canvas) return;
    let ctx = canvas.getContext('2d');

    // Получаем значения из input'ов
    let outValue = document.getElementById('out' + number).value;
    let innerValue = document.getElementById('inner' + number).value;
    let diameterValue = document.getElementById('diam' + number).value;
    let offSetValue = document.getElementById('et' + number).value;

    if (!outValue || !innerValue || !diameterValue || !offSetValue) return;

    // Переводим в мм
    let out = parseFloat(outValue.replace(",", ".")) * 25.4;
    let inner = parseFloat(innerValue.replace(",", ".")) * 25.4;
    let diameter = parseFloat(diameterValue.replace(",", ".")) * 25.4;
    let baseOffset = parseFloat(offSetValue.replace(",", "."));
    if (isNaN(out) || isNaN(inner) || isNaN(diameter) || isNaN(baseOffset)) return;

    // Сохраняем данные
    widthWheel[number] = out + inner;
    outLip[number] = out;
    etAll[number] = baseOffset;

    // Вычисляем смещение по вылету и добавляем перетаскивание
    let offSet = baseOffset + (number === 2 ? offsetX2 : 0);

    // xWheelLeft для первого — центр, для второго — относительно первого
    let xWheelLeft = (canvas.width / 2) - ((out + inner) / 2) + offSet;

    if (number === 2) {
        let xWheelLeft1 = (canvas.width / 2) - (widthWheel[1] / 2) + etAll[1];
        let xDiff = xWheelLeft - xWheelLeft1;
        xWheelLeft = xWheelLeft1 + xDiff;
    }
    // Координаты
    let xWheelRight = xWheelLeft + out + inner;
    let yWheelUp = (canvas.height / 2) - (diameter / 2);
    let yWheelDown = (canvas.height / 2) + (diameter / 2);
    let xOutRight = xWheelLeft + out;
    let xInnerLeft = xWheelRight - inner;

    // Очистка canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Цвет
    let colorObj = hexToRgb(color);
    let colorTire = combineColors([0, 0, 0], [colorObj.r, colorObj.g, colorObj.b, 0.5]);
    let canT = 10;

    // Рисуем:
    if (out <= 0) {
        // Рисуем полку:
        ctx.beginPath();
        ctx.lineWidth = '4';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'bevel';
        ctx.strokeStyle = colorTire;
        ctx.moveTo(xWheelLeft - canT * 2, yWheelUp - canT * 2);
        ctx.bezierCurveTo(xWheelLeft, yWheelUp - canT * 2, xWheelLeft - canT * 2, yWheelUp, xWheelLeft, yWheelUp); // Изгиб канта
        ctx.bezierCurveTo(xWheelLeft + canT, yWheelUp, xWheelLeft + canT, yWheelUp + canT * 2, xWheelLeft, yWheelUp + canT * 2); // Изгиб отрицательной полки
        ctx.bezierCurveTo(xOutRight - canT / 3, yWheelUp + canT * 2, xOutRight - canT / 3, yWheelUp + canT * 2, xOutRight - canT / 3, yWheelUp + canT * 3);
        ctx.lineTo(xOutRight - canT / 3, yWheelDown - canT * 3);
        ctx.bezierCurveTo(xOutRight - canT / 3, yWheelDown - canT * 2, xOutRight - canT / 3, yWheelDown - canT * 2, xWheelLeft, yWheelDown - canT * 2);
        ctx.bezierCurveTo(xWheelLeft + canT, yWheelDown - canT * 2, xWheelLeft + canT, yWheelDown, xWheelLeft, yWheelDown);
        ctx.bezierCurveTo(xWheelLeft - canT * 2, yWheelDown, xWheelLeft, yWheelDown + canT * 2, xWheelLeft - canT * 2, yWheelDown + canT * 2); // Изгиб канта
        ctx.stroke();
        // Рисуем иннер:
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'bevel';
        ctx.moveTo(xWheelRight + canT * 2, yWheelUp - canT * 2);
        ctx.bezierCurveTo(xWheelRight, yWheelUp - canT * 2, xWheelRight + canT * 2, yWheelUp, xWheelRight, yWheelUp); // Изгиб канта
        ctx.lineTo(xInnerLeft + canT * 5, yWheelUp); // Переход на больший диаметр
        ctx.lineTo(xInnerLeft + canT * 4, yWheelUp + canT * 2.5); // Переход на меньший
        ctx.lineTo(xInnerLeft + canT, yWheelUp + canT * 2.5);
        ctx.bezierCurveTo(xInnerLeft + canT / 3, yWheelUp + canT * 2.5, xInnerLeft + canT / 3, yWheelUp + canT * 2.5, xInnerLeft + canT / 3, yWheelUp + canT * 3);
        ctx.lineTo(xInnerLeft + canT / 3, yWheelDown - canT * 3);
        ctx.bezierCurveTo(xInnerLeft + canT / 3, yWheelDown - canT * 2.5, xInnerLeft + canT / 3, yWheelDown - canT * 2.5, xInnerLeft + canT, yWheelDown - canT * 2.5);
        ctx.lineTo(xInnerLeft + canT * 4, yWheelDown - canT * 2.5); // Переход на меньший
        ctx.lineTo(xInnerLeft + canT * 5, yWheelDown); // Переход на больший диаметр
        ctx.lineTo(xWheelRight, yWheelDown);
        ctx.bezierCurveTo(xWheelRight + canT * 2, yWheelDown, xWheelRight, yWheelDown + canT * 2, xWheelRight + canT * 2, yWheelDown + canT * 2);
        ctx.stroke();
    }
    if (out <= 12.7 && out > 0) { // 0,5 дюйма
        // Рисуем полку:
        ctx.beginPath();
        ctx.lineWidth = '4';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'bevel';
        ctx.strokeStyle = colorTire;
        ctx.moveTo(xWheelLeft - canT * 2, yWheelUp - canT * 2);
        ctx.bezierCurveTo(xWheelLeft, yWheelUp - canT * 2, xWheelLeft - canT * 2, yWheelUp, xWheelLeft, yWheelUp); // Изгиб канта
        ctx.lineTo(xOutRight - canT / 3, yWheelUp + canT * 2);
        ctx.lineTo(xOutRight - canT / 3, yWheelDown - canT * 2);
        ctx.lineTo(xWheelLeft, yWheelDown);
        ctx.bezierCurveTo(xWheelLeft - canT * 2, yWheelDown, xWheelLeft, yWheelDown + canT * 2, xWheelLeft - canT * 2, yWheelDown + canT * 2); // Изгиб канта
        ctx.stroke();
        // Рисуем иннер:
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'bevel';
        ctx.moveTo(xWheelRight + canT * 2, yWheelUp - canT * 2);
        ctx.bezierCurveTo(xWheelRight, yWheelUp - canT * 2, xWheelRight + canT * 2, yWheelUp, xWheelRight, yWheelUp); // Изгиб канта
        ctx.lineTo(xInnerLeft + canT * 4, yWheelUp); // Переход на больший диаметр
        ctx.lineTo(xInnerLeft + canT * 2, yWheelUp + canT * 2); // Переход на меньший
        ctx.bezierCurveTo(xInnerLeft + canT / 3, yWheelUp + canT * 2, xInnerLeft + canT / 3, yWheelUp + canT * 2, xInnerLeft + canT / 3, yWheelUp + canT * 3);
        ctx.lineTo(xInnerLeft + canT / 3, yWheelDown - canT * 3);
        ctx.bezierCurveTo(xInnerLeft + canT / 3, yWheelDown - canT * 2, xInnerLeft + canT / 3, yWheelDown - canT * 2, xInnerLeft + canT, yWheelDown - canT * 2);
        ctx.lineTo(xInnerLeft + canT * 2, yWheelDown - canT * 2); // Переход на меньший
        ctx.lineTo(xInnerLeft + canT * 4, yWheelDown); // Переход на больший диаметр
        ctx.lineTo(xWheelRight, yWheelDown);
        ctx.bezierCurveTo(xWheelRight + canT * 2, yWheelDown, xWheelRight, yWheelDown + canT * 2, xWheelRight + canT * 2, yWheelDown + canT * 2);
        ctx.stroke();
    }
    if (out > 12.7 && out < 38) { // меньше 1.25 дюйма
        // Рисуем полку:
        ctx.beginPath();
        ctx.lineWidth = '4';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'bevel';
        ctx.strokeStyle = colorTire;
        ctx.moveTo(xWheelLeft - canT * 2, yWheelUp - canT * 2);
        ctx.bezierCurveTo(xWheelLeft, yWheelUp - canT * 2, xWheelLeft - canT * 2, yWheelUp, xWheelLeft, yWheelUp); // Изгиб канта
        ctx.lineTo(xWheelLeft + canT, yWheelUp); // Переход ступеньки в больший диаметр
        ctx.lineTo(xOutRight - canT / 3, yWheelUp + canT * 2);
        ctx.lineTo(xOutRight - canT / 3, yWheelDown - canT * 2);
        ctx.lineTo(xWheelLeft + canT, yWheelDown);
        ctx.lineTo(xWheelLeft, yWheelDown);
        ctx.bezierCurveTo(xWheelLeft - canT * 2, yWheelDown, xWheelLeft, yWheelDown + canT * 2, xWheelLeft - canT * 2, yWheelDown + canT * 2); // Изгиб канта
        ctx.stroke();
        // Рисуем иннер:
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'bevel';
        ctx.moveTo(xWheelRight + canT * 2, yWheelUp - canT * 2);
        ctx.bezierCurveTo(xWheelRight, yWheelUp - canT * 2, xWheelRight + canT * 2, yWheelUp, xWheelRight, yWheelUp); // Изгиб канта
        ctx.lineTo(xInnerLeft + canT * 4, yWheelUp); // Переход на больший диаметр
        ctx.lineTo(xInnerLeft + canT * 2, yWheelUp + canT * 2); // Переход на меньший
        ctx.bezierCurveTo(xInnerLeft + canT / 3, yWheelUp + canT * 2, xInnerLeft + canT / 3, yWheelUp + canT * 2, xInnerLeft + canT / 3, yWheelUp + canT * 3);
        ctx.lineTo(xInnerLeft + canT / 3, yWheelDown - canT * 3);
        ctx.bezierCurveTo(xInnerLeft + canT / 3, yWheelDown - canT * 2, xInnerLeft + canT / 3, yWheelDown - canT * 2, xInnerLeft + canT, yWheelDown - canT * 2);
        ctx.lineTo(xInnerLeft + canT * 2, yWheelDown - canT * 2); // Переход на меньший
        ctx.lineTo(xInnerLeft + canT * 4, yWheelDown); // Переход на больший диаметр
        ctx.lineTo(xWheelRight, yWheelDown);
        ctx.bezierCurveTo(xWheelRight + canT * 2, yWheelDown, xWheelRight, yWheelDown + canT * 2, xWheelRight + canT * 2, yWheelDown + canT * 2);
        ctx.stroke();
    }
    if (out >= 38) {
        // Рисуем полку:
        ctx.beginPath();
        ctx.lineWidth = '4';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'bevel';
        ctx.strokeStyle = colorTire;
        ctx.moveTo(xWheelLeft - canT * 2, yWheelUp - canT * 2);
        ctx.bezierCurveTo(xWheelLeft, yWheelUp - canT * 2, xWheelLeft - canT * 2, yWheelUp, xWheelLeft, yWheelUp); // Изгиб канта
        ctx.lineTo(xWheelLeft + canT, yWheelUp); // Переход ступеньки в больший диаметр
        ctx.lineTo(xWheelLeft + canT * 2.5, yWheelUp + canT * 2); // Начало ступеньки (от центра)
        ctx.lineTo(xOutRight - canT, yWheelUp + canT * 2);
        ctx.bezierCurveTo(xOutRight - canT / 3, yWheelUp + canT * 2, xOutRight - canT / 3, yWheelUp + canT * 2, xOutRight - canT / 3, yWheelUp + canT * 3);
        ctx.lineTo(xOutRight - canT / 3, yWheelDown - canT * 3);
        ctx.bezierCurveTo(xOutRight - canT / 3, yWheelDown - canT * 2, xOutRight - canT / 3, yWheelDown - canT * 2, xOutRight - canT, yWheelDown - canT * 2);
        ctx.lineTo(xWheelLeft + canT * 2.5, yWheelDown - canT * 2); // Начало ступеньки (от центра)
        ctx.lineTo(xWheelLeft + canT, yWheelDown); // Переход ступеньки в больший диаметр
        ctx.lineTo(xWheelLeft, yWheelDown);
        ctx.bezierCurveTo(xWheelLeft - canT * 2, yWheelDown, xWheelLeft, yWheelDown + canT * 2, xWheelLeft - canT * 2, yWheelDown + canT * 2); // Изгиб канта
        ctx.stroke();
        // Рисуем иннер:
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'bevel';
        ctx.moveTo(xWheelRight + canT * 2, yWheelUp - canT * 2);
        ctx.bezierCurveTo(xWheelRight, yWheelUp - canT * 2, xWheelRight + canT * 2, yWheelUp, xWheelRight, yWheelUp); // Изгиб канта
        ctx.lineTo(xInnerLeft + canT * 4, yWheelUp); // Переход на больший диаметр
        ctx.lineTo(xInnerLeft + canT * 2, yWheelUp + canT * 2); // Переход на меньший
        ctx.bezierCurveTo(xInnerLeft + canT / 3, yWheelUp + canT * 2, xInnerLeft + canT / 3, yWheelUp + canT * 2, xInnerLeft + canT / 3, yWheelUp + canT * 3);
        ctx.lineTo(xInnerLeft + canT / 3, yWheelDown - canT * 3);
        ctx.bezierCurveTo(xInnerLeft + canT / 3, yWheelDown - canT * 2, xInnerLeft + canT / 3, yWheelDown - canT * 2, xInnerLeft + canT, yWheelDown - canT * 2);
        ctx.lineTo(xInnerLeft + canT * 2, yWheelDown - canT * 2); // Переход на меньший
        ctx.lineTo(xInnerLeft + canT * 4, yWheelDown); // Переход на больший диаметр
        ctx.lineTo(xWheelRight, yWheelDown);
        ctx.bezierCurveTo(xWheelRight + canT * 2, yWheelDown, xWheelRight, yWheelDown + canT * 2, xWheelRight + canT * 2, yWheelDown + canT * 2);
        ctx.stroke();
    }
    //Для вывода в строку информации
    diameterWheel[number] = diameterValue;
    widthWheel[number] = Number(outValue) + Number(innerValue);

    if(!isNaN(diameterWheel[1]) && diameterWheel[1] !== null) {
        document.getElementById('main-info').innerHTML = 'Текущие параметры: ' + diameterWheel[1] + 'x' + widthWheel[1] + ' ET' + etAll[1];
    }
    if(!isNaN(diameterWheel[2]) && diameterWheel[2] !== null) {
        document.getElementById('main-info-2').innerHTML = 'Текущие параметры: ' + diameterWheel[2] + 'x' + widthWheel[2] + ' ET' + etAll[2];
    }
}

// Перерисовка с расчетом
function redraw() {
    calculateET2();
    myPaint2(1, '#5c636a');
    myPaint2(2, '#990000');
}

// Обработка инпутов
document.addEventListener('DOMContentLoaded', () => {
    let allInput = document.querySelectorAll('.form-input');
    allInput.forEach(function (input) {
        input.addEventListener('input', () => {
            redraw();
        });
    });

    // Первый запуск
    redraw();
});

// Перетаскивание второго диска
let canvas2 = document.getElementById('myCanvas2');

canvas2.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
});
window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    offsetX2 += dx;
    startX = e.clientX;
    redraw();
});
window.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        offsetX2 = 0;
        redraw();
    }
});
canvas2.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
}, { passive: true });
window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - startX;
    offsetX2 += dx;
    startX = e.touches[0].clientX;
    redraw();
}, { passive: true });
window.addEventListener('touchend', () => {
    if (isDragging) {
        isDragging = false;
        offsetX2 = 0;
        redraw();
    }
}, { passive: true });