const terminalQuest = document.getElementById('terminalQuest');
const startButton = document.getElementById('start-button');
const terminalInput = document.getElementById('terminal-input');
const optionsList = document.getElementById('options-list');
const kbsound = document.getElementById('audio');



const terminalBody = document.querySelector('.terminal-wrap');
const terminalLogo = document.querySelector('.terminal__logo');

let state = {};

function launchTerminal () {
    startButton.addEventListener('click', () => {
        terminalBody.classList.add("terminal-wrap-launched");
        terminalLogo.classList.add("terminal__logo-launched");
        setInterval(welcomeScreen(), 2000);
        startButton.remove();
    })
}

function welcomeScreen() {
    terminalInput.value = "";
    clearScreen();
    state = {};
    setTimeout(showScreen(1), 1000);
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
        if (terminalInput.value != '') {
        kbsound.play();
        if (terminalInput.value.toLowerCase() === option.answer) {
        selectOption(option);
        console.log(state);
        }
    }}})}


function selectOption(option) {
    const nextTextScreenId = option.nextText;
    if (nextTextScreenId <= 0) {
        return welcomeScreen();
    }
    state = Object.assign(state, option.setState);
    if (state.virus != true) {
    showScreen(nextTextScreenId);
    terminalInput.value = "";
    } else {
        terminalInput.value = "";
        showScreen(9);
    }
    }


function clearScreen() {
    terminalQuest.innerText = "";
}




const textScreens = [
    {
        id: 1,
        text: 'Welcome, friend! Please, type "start" to start work!',
        options: [
            {
                answer: 'start',
                nextText: 2,
                
            },
            {
                answer: 'reset',
                nextText: -1,
                
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
                
            },
            {
                answer: 'great computer launch me some games!',
                nextText: 4,
                
            },
            {
                answer: 'porn',
                requiredState: (currentState) => currentState.hacker,
                nextText: 11,
            },
            {
                answer: 'reset',
                nextText: -1,
                
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
                
            },
            {
                answer: 'reset',
                nextText: -1,
                
            },
            {
                answer: 'kill all humans',
                nextText: 6,
                
            },
        ],
    },
    {
        id: 4,
        text: `Big boys and girls don't play games!`,
        options: [
            {
                answer: 'menu',
                nextText: 2,
                
            },
            {
                answer: 'please(use speechcraft 100%)',
                nextText: 12,
                requiredState: (currentState) => currentState.hacker,
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
                
            },
        ],
    },
    {
        id: 6,
        text: "Congratulations! All humans were killed! Also, you're dead too!",
        options: [
            {
                answer: 'reset',
                nextText: -1,
                
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
                
            },
            {
                answer: 'open do_not_open.exe',
                setState: {virus: true},
                nextText: 9,
                
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
                answer: 'files',
                nextText: 7,
                
            },
            {
                answer: 'save',
                setState: { kitties: true },
                nextText: 7,
                
            }
        ]
    },
    {
        id: 9,
        text: `System alert!!!<br>
                Undefined file!<br>
                terminal self-explode starts now!`,
        options: [
            {
                answer: 'reset',
                nextText: -1,
                
            },
            {
                answer: 'use kitties.jpg antivirus',
                requiredState: (currentState) => currentState.kitties,
                requiredState: (currentState) => currentState.virus,
                setState: { hacker: true , virus: false},
                nextText: 10,
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
            },
            {
                answer: 'try to break the door',
                nextText: 14,
            }
        ]
    },
    {
        id: 13,
        text: 'Looking around you '
    }
    

]

launchTerminal();