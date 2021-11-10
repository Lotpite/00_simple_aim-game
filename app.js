const screens = document.querySelectorAll('.screen'),
    startBtn = document.querySelector('.start'),
    timeEL = document.querySelector('#time'),
    timeList = document.querySelector('#time-list'),
    board = document.querySelector('#board'),
    colors = ['#9F3E9A', '#F66A98', '#FF8997','#64ADF1','#C15AA8', '#669933', '#3366FF', '#FF6633','FFFF33'];

let time = 0,
    score = 0;

startBtn.addEventListener('click', e => {
    e.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', e => {
    if (e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', e => {
    if (e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeEL.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEL.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
    const circle = document.createElement('div'),
    size = getRandomNumber(10, 70),
    {width, height} = board.getBoundingClientRect(),
    x = getRandomNumber(0, width - size),
    y = getRandomNumber(0, height - size),
    color = getRandomColor();

    circle.classList.add('circle');
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.background = color;
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;

    board.append(circle);
    console.log(color);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
   const idx = Math.floor(Math.random() * colors.length);
   return colors[idx];
}

function winTheGame() {
    function killCircle() {
        const circle = document.querySelector('.circle');
        if (circle) {
            circle.click();
        }
    }
    setInterval(killCircle, 75);
}