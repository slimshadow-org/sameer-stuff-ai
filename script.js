// Timer variables
let timeLeft = 1500; // 25 minutes in seconds
let timerId = null;
let isRunning = false;

// DOM Elements
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const modeBtns = document.querySelectorAll('.mode-btn');

// Timer Functions
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.textContent = 'Pause';
        timerId = setInterval(() => {
            timeLeft--;
            updateTimer();
            if (timeLeft === 0) {
                clearInterval(timerId);
                isRunning = false;
                startBtn.textContent = 'Start';
                playNotification();
            }
        }, 1000);
    } else {
        clearInterval(timerId);
        isRunning = false;
        startBtn.textContent = 'Start';
    }
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    startBtn.textContent = 'Start';
    timeLeft = parseInt(document.querySelector('.mode-btn.active').dataset.time);
    updateTimer();
}

function playNotification() {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play();
}

// Task Manager Functions
function addTask(text) {
    const li = document.createElement('li');
    li.className = 'task-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '×';
    
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    
    // Event Listeners for task items
    checkbox.addEventListener('change', () => {
        taskText.classList.toggle('completed');
    });
    
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
        addTask(text);
        taskInput.value = '';
    }
});

modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        timeLeft = parseInt(btn.dataset.time);
        updateTimer();
        if (isRunning) {
            clearInterval(timerId);
            isRunning = false;
            startBtn.textContent = 'Start';
        }
    });
});

// Initialize timer display
updateTimer();