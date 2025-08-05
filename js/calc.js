document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.form');

    const blocks = container.querySelectorAll('.form_data');

    blocks.forEach(block => {
        block.addEventListener('click', () => {
            const blockRect = block.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            const scrollLeft = container.scrollLeft;
            const offset = blockRect.left - containerRect.left;
            const centerOffset = offset - (containerRect.width / 2) + (blockRect.width / 2);

            container.scrollTo({
                left: scrollLeft + centerOffset, behavior: 'smooth'
            });
        });
    });
});

// Переменные для перетаскивания верхнего диска:
let isDragging = false;
let startX = 0;
let offsetX2 = 0;

// Переменные для рассчета координат первого и второго диска:
let xPositionOut = {1: null, 2: null} // Относительно арки
let xPositionInner = {1: null, 2: null} // Относительно стойки
// Переменные для разницы диаметров и ширины дисков/шин
let diamTire = {1: null, 2: null} // Диаметр шины
let heightProfile = {1: null, 2: null} // профиль шин
let diamWheel = {1: null, 2: null} // Диаметр 1-го и второго диска
let widthWheel = {1: null, 2: null} // Ширина диска

// Функция рисования:
function myPaint(number = 1, color = '#5c636a') {
    // Меняем цвет каждого блока для отличия:
    document.querySelector('.form_data[data-id="' + number + '"] hr').style.backgroundImage = 'linear-gradient(to right, transparent, ' + color + ', transparent)';

    // Переменные и координаты диска:
    let diameterValue = document.getElementById('d' + number).value;
    if (diameterValue.length < 1) return;
    let diameter = parseFloat(diameterValue.replace(",", "."));
    diameter *= 25.4;

    let widthValue = document.getElementById('w' + number).value;
    if (widthValue.length < 1) return;
    let width = parseFloat(widthValue.replace(",", "."));
    width *= 25.4;

    let etValue = document.getElementById('et' + number).value;
    if (etValue.length < 1) return;
    let et = parseFloat(etValue.replace(",", "."));


    if (number === 2) {
        et += offsetX2; // Смещаем только второй объект
    }

    // работаем с канвасом
    let canvas = document.getElementById('myCanvas' + number);
    let ctx = canvas.getContext('2d');

    let hamP = 20;


    let xWheelLeft = (canvas.width / 2) - (width / 2) + et;
    let yWheelUp = (canvas.height / 2) - (diameter / 2);
    let xWheelRight = (canvas.width / 2) + (width / 2) + et;
    let yWheelDown = (canvas.height / 2) + (diameter / 2);

    // Переменные и координаты шины
    let tireWidthValue = document.getElementById('tw' + number).value;
    let tireWidth = parseFloat(tireWidthValue.replace(",", "."));

    let profileValue = document.getElementById('pr' + number).value;
    let profile = parseFloat(profileValue.replace(",", "."));
    profile *= 0.01; // процент от ширины шины

    // Общий диаметр диска
    let allDiam = diameter + (tireWidth * profile * 2);

    let xTireUpLeft = (canvas.width / 2) - (tireWidth / 2) + et;
    let xTireUpRight = (canvas.width / 2) + (tireWidth / 2) + et;
    let yTireUp = (canvas.height / 2) - (diameter / 2) - (tireWidth * profile); // Y шины по верхнему краю
    let yTireDown = (canvas.height / 2) + (diameter / 2) + (tireWidth * profile);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let colorObj = hexToRgb(color);
    let colorTire = combineColors([0, 0, 0], [colorObj.r, colorObj.g, colorObj.b, 0.5]);

    // Рисуем шину сверху
    ctx.beginPath();
    ctx.lineWidth = '4';
    ctx.lineJoin = 'bevel';
    ctx.strokeStyle = colorTire;
    ctx.moveTo(xWheelLeft - hamP, yWheelUp);
    ctx.bezierCurveTo(xTireUpLeft, yTireUp, xTireUpLeft, yTireUp, xTireUpLeft + hamP, yTireUp);
    ctx.lineTo(xTireUpRight - hamP, yTireUp);
    ctx.bezierCurveTo(xTireUpRight, yTireUp, xTireUpRight, yTireUp, xWheelRight + hamP, yWheelUp);
    ctx.stroke();

    // Рисуем шину снизу
    ctx.beginPath();
    ctx.lineJoin = 'bevel';
    ctx.strokeStyle = colorTire;
    ctx.moveTo(xWheelLeft - hamP, yWheelDown);
    ctx.bezierCurveTo(xTireUpLeft, yTireDown, xTireUpLeft, yTireDown, xTireUpLeft + hamP, yTireDown);
    ctx.lineTo(xTireUpRight - hamP, yTireDown);
    ctx.bezierCurveTo(xTireUpRight, yTireDown, xTireUpRight, yTireDown, xWheelRight + hamP, yWheelDown);
    ctx.stroke();

    // Рисуем диск
    ctx.beginPath();
    ctx.lineJoin = 'bevel';
    ctx.strokeStyle = color;
    ctx.rect(xWheelLeft - hamP, yWheelUp, width + hamP * 2, diameter);
    ctx.stroke();

    // Выводим значения в блок информации
    // Положение относительно арки
    xPositionOut[number] = xWheelLeft;
    if (xPositionOut[1] !== null && xPositionOut[2] !== null && xPositionOut[2] < xPositionOut[1]) {
        let deltaOut = xPositionOut[1] - xPositionOut[2];
        document.getElementById('main-info').innerHTML = 'Новый диск будет на ' + deltaOut.toFixed(1) + ' мм ближе к арке';
    }
    if (xPositionOut[1] !== null && xPositionOut[2] !== null && xPositionOut[2] > xPositionOut[1]) {
        let deltaOut = xPositionOut[2] - xPositionOut[1];
        document.getElementById('main-info').innerHTML = 'Новый диск будет на ' + deltaOut.toFixed(1) + ' мм глубже в арке';
    }
    if (xPositionOut[1] !== null && xPositionOut[2] !== null && xPositionOut[2] === xPositionOut[1]) {
        document.getElementById('main-info').innerHTML = 'Новый диск не изменит положения относительно арки';
    }
    // Положение относительно стойки
    xPositionInner[number] = xWheelRight;
    if (xPositionInner[1] !== null && xPositionInner[2] !== null && xPositionInner[2] > xPositionInner[1]) {
        let deltaInner = xPositionInner[2] - xPositionInner[1];
        document.getElementById('main-info-2').innerHTML = 'и будет на ' + deltaInner.toFixed(1) + ' мм ближе к стойке';
    }
    if (xPositionInner[1] !== null && xPositionInner[2] !== null && xPositionInner[2] < xPositionInner[1]) {
        let deltaInner = xPositionInner[1] - xPositionInner[2];
        document.getElementById('main-info-2').innerHTML = 'и будет на ' + deltaInner.toFixed(1) + ' мм дальше от стойки';
    }
    if (xPositionInner[1] !== null && xPositionInner[2] !== null && xPositionInner[2] === xPositionInner[1]) {
        document.getElementById('main-info-2').innerHTML = 'и не изменит положения относительно стойки';
    }

    // Вывод параметров дисков
    document.getElementById('main-setting' + number).innerHTML = diameterValue + 'x' + widthValue + ' ET' + etValue + '  ' + tireWidthValue + '/' + profileValue;

    // Разница в параметрах
    diamWheel[number] = diameter;
    widthWheel[number] = width;
    diamTire[number] = allDiam;
    heightProfile[number] = tireWidth * profile;

    // Диаметр шины
    if ((!isNaN(diamTire[1]) && diamTire[1] !== null) || (!isNaN(diamTire[2])  && diamTire[2] !== null)) {
        document.getElementById('tire-change' + number).innerHTML = allDiam.toFixed(1) + ' мм';
    }


    // Разница диаметров шин
    if (!isNaN(diamTire[1]) && !isNaN(diamTire[2]) && diamTire[1] !== null && diamTire[2] !== null) {
        let deltaWheel = diamTire[2] - diamTire[1];
        document.getElementById('tire-height-difference').innerHTML = '(разница ' + deltaWheel.toFixed(1) + ' мм)';
    }


    // Профиль
    if ((!isNaN(heightProfile[1]) && heightProfile[1] !== null) || (!isNaN(heightProfile[2])  && heightProfile[2] !== null)) {
        document.getElementById('profile-change' + number).innerHTML = (tireWidth * profile).toFixed(1) + ' мм';
    }
    // Разница профилей
    if (heightProfile[1] !== null && heightProfile[2] !== null && !isNaN(heightProfile[1]) && !isNaN(heightProfile[2])) {
        let deltaWheel = heightProfile[2] - heightProfile[1];
        document.getElementById('profile-height-difference').innerHTML = '(разница ' + deltaWheel.toFixed(1) + ' мм)';
    }

    // Диаметр диска
    document.getElementById('diam-change' + number).innerHTML = diameter.toFixed(1) + ' мм';
    // Разница диаметров диска
    if (diamWheel[1] !== null && diamWheel[2] !== null) {
        let deltaWheel = diamWheel[2] - diamWheel[1];
        document.getElementById('diam-difference').innerHTML = '(разница ' + deltaWheel.toFixed(1) + ' мм)';
    }
    //Ширина диска
    document.getElementById('width-change' + number).innerHTML = width.toFixed(1) + ' мм';
    // Разница ширины дисков
    if (widthWheel[1] !== null && widthWheel[2] !== null) {
        let deltaWheel = widthWheel[2] - widthWheel[1];
        document.getElementById('wheel-width-difference').innerHTML = '(разница ' + deltaWheel.toFixed(1) + ' мм)';
    }



    console.log('логи:')
    console.log('diamTire[1]' + diamTire[1])
    console.log('diamTire[2]' + diamTire[2])

    // Ширина диска: ТОЖЕ НУЖНА РАЗНИЦА:
}


document.addEventListener('DOMContentLoaded', () => {
    let allInput = document.querySelectorAll('.form-input');
    allInput.forEach(function (input) {
        let id = Number(input.closest('.form_data').getAttribute('data-id'));
        let color = input.closest('.form_data').getAttribute('data-color');

        myPaint(id, color);
        input.onkeyup = function () {
            myPaint(id, color);
        }
        input.onchange = function () {
            myPaint(id, color);
        }
        input.onclick = function () {
            myPaint(id, color);
        }
    });
});


// Переменная и функция для перетаскивания верхнего колеса:
let canvas2 = document.getElementById('myCanvas2');
let color2 = document.querySelector('.form_data[data-id="2"]').getAttribute('data-color');

function redraw() {
    myPaint(2, color2);
}

// Обработка мыши
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
        offsetX2 = 0;   // 🔁 Возврат в начальное положение
        redraw();
    }
});

// Обработка касания
canvas2.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
}, {passive: true});

window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - startX;
    offsetX2 += dx;
    startX = e.touches[0].clientX;
    redraw();
}, {passive: true});

window.addEventListener('touchend', () => {
    if (isDragging) {
        isDragging = false;
        offsetX2 = 0;   // 🔁 Возврат в начальное положение
        redraw();
    }
}, {passive: true});