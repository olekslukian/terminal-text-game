const terminalQuest = document.getElementById('terminalQuest');
const startButton = document.getElementById('start-button');
const terminalInput = document.getElementById('terminal-input');
const optionsList = document.getElementById('options-list');
const kbsound = document.getElementById('audio');



const terminalBody = document.querySelector('.terminal-wrap');
const terminalLogo = document.querySelector('.terminal__logo');

let state = {};
let acess = 0;

function launchTerminal () {
    startButton.addEventListener('click', () => {
        terminalBody.classList.add("terminal-wrap-launched");
        terminalLogo.classList.add("terminal__logo-launched");
        setInterval(welcomeScreen(), 1000);
    })
}

function welcomeScreen() {
    terminalInput.value = "";
    terminalQuest.classList.remove('terminal__explosion');
    clearScreen();
    state = {};
    acess = 1;
    showScreen(1);
}

function showScreen(textScreenIndex) {
    const textScreen = textScreens.find(textScreen => textScreen.id === textScreenIndex);
    terminalQuest.innerHTML = textScreen.text;
    while (optionsList.firstChild) {
        optionsList.removeChild(optionsList.firstChild);
    }
    textScreen.options.forEach(option => {
        if(showOption(option)) {
            const optionElement = document.createElement('li');
            optionElement.innerText = `--${option.answer}--`;
            optionElement.classList.add('option');
            optionsList.appendChild(optionElement); 
            enterOption(option);
        }
    })
}


function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}



function enterOption(option) {
    terminalInput.addEventListener('keyup', (e) => {
        if (e.code === "Enter") {
            kbsound.play();
                if (terminalInput.value.toLowerCase() === option.answer) {
                    getAcess(option, option.nextText);
                    console.log(acess);
        }
}})}


function selectOption(option) {
    const nextTextScreenId = option.nextText;
    if (nextTextScreenId === 1) {
        return welcomeScreen();
    }
    state = Object.assign(state, option.setState);
    if (state.virus != true) {
    showScreen(nextTextScreenId);
    terminalInput.value = "";
    } else {
        terminalInput.value = "";
        showScreen(9);
        setTimeout(virusTimer(10), 1000);
    }
    }


function virusTimer(i) {
    if (state.virus == true) {
    terminalQuest.innerHTML = `System alert!!!<br>
                                Undefined file!<br>
                                terminal self-explosion starts in ${i}`;
    let timeId = setTimeout(virusTimer, 1000, --i);
    if (i == 0) {
        terminalQuest.classList.add('terminal__explosion');
        terminalQuest.innerHTML = 'BOOM';
        optionsList.innerHtml = '';
        clearTimeout(timeId);
        setInterval(welcomeScreen, 2000);
    }
}
}

function clearScreen() {
    terminalQuest.innerText = "";
}


function getAcess (option, setAcess) {
    if (acess === option.acess) {
        selectOption(option);
        acess = setAcess;
    }
}

const textScreens = [
    {
        id: 1,
        text: 'Welcome, friend! Please, type "start" to start work!',
        options: [
            {
                answer: 'start',
                nextText: 2, 
                acess: 1,
            },
            {
                answer: 'reset',
                nextText: 1,
                acess: 1,
            },
        ]
    },
    {
        id: 2,
        text: 'Systems running...',
        options: [
            {
                answer: 'help',
                nextText: 3,
                acess: 2,
            },
            {
                answer: 'great computer launch me some games!',
                nextText: 4,
                acess: 2,
            },
            {
                answer: 'porn',
                requiredState: (currentState) => currentState.hacker,
                nextText: 11,
                acess: 2,
            },
            {
                answer: 'reset',
                nextText: 1,
                acess: 2,
                changeAcess: 1,
            },
        ]
    },
    {
        id: 3,
        text: `~~~~~~~HELP~~~~~~~<br>
            type "scan" to check files<br>
            type "reset" to reset system<br>
            type "kill all humans" to kill all humans<br>`,
        options: [
            {
                answer: 'scan',
                nextText: 5,
                acess: 3,
            },
            {
                answer: 'back',
                nextText: 2,
                acess: 3,
            },
            {
                answer: 'kill all humans',
                nextText: 6,
                acess: 3,
            },
        ],
    },
    {
        id: 4,
        text: `Big boys and girls don't play games!`,
        options: [
            {
                answer: 'back',
                nextText: 2,
                acess: 4,
            },
            {
                answer: 'please(use speechcraft 100%)',
                nextText: 12,
                requiredState: (currentState) => currentState.hacker,
                acess: 4,
            }
        ]
    },
    {
        id: 5,
        text: `Scanning...0%`,
        options: [
            {
                answer: 'scan faster!',
                nextText: 7,
                acess: 5,
            },
        ],
    },
    {
        id: 6,
        text: "Congratulations! All humans were killed! Also, you're dead too!",
        options: [
            {
                answer: 'reset',
                nextText: 1,
                acess: 6,
            }
        ],
    },
    {
        id: 7,
        text: `Shut up! I'm scanning!<br>
        Scanned..... 100%<br>

        Found files:<br> 
        DO_NOT_OPEN.exe<br>
        Kitties.jpg<br>
        `,
        options: [
            {
                answer: 'open kitties.jpg',
                nextText: 8,
                setState: {kitties: true},
                acess: 7,
            },
            {
                answer: 'open do_not_open.exe',
                setState: {virus: true},
                nextText: 9,
                acess: 7,
            },
            {
                answer: 'back',
                nextText: 3,
                acess: 7,
            }
        ]
    },
    {
        id: 8,
        text: `
        <img src="img/kitties.jpg" alt="kitties">
        `,
        options: [
            {
                answer: 'return',
                nextText: 7,
                acess: 8,
            },
            {
                answer: 'save kitties',
                setState: { kitties: true },
                nextText: 7,
                acess: 8,
            }
        ]
    },
    {
        id: 9,
        text: ``,
        options: [
            {
                answer: 'use kitties.jpg antivirus',
                requiredState: (currentState) => currentState.kitties,
                setState: { hacker: true , virus: false },
                nextText: 10,
                acess: 9,
            },
        ]
    },
    {
        id: 10,
        text: `Systems are working!<br>
                Access restored!<br>`,
        options: [
            {
                answer: 'menu',
                nextText: 2,
                acess: 10,
            }
        ]
    },
    {
        id: 11,
        text: `Please, visit my GitHub! <br>
        <a href="https://github.com/Dethkrist">GITHUB</a>`,
        options: [
            {
                answer: 'menu',
                nextText: 2,
                acess: 11,
            }
        ]
    },
    {
        id: 12,
        text: `Okay, you woke up in a dirty dungeon, you feel smell of rats and mossy cobblestone<br>
                in your front side you see very old wooden door<br>
                You don't have anything`,
        options: [
            {
                answer: 'look around',
                nextText: 13,
                acess: 12,
            },
            {
                answer: 'try to break the door',
                nextText: 14,
                acess: 12,
            },
            {
                answer: 'exit',
                nextText: 2,
                acess: 12,
            }
        ]
    },
    {
        id: 13,
        text: 'Looking around you '
    }
    

]

launchTerminal();