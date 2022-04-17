const terminalQuest = document.getElementById('terminalQuest');
const startButton = document.getElementById('start-button');
const terminalInput = document.getElementById('terminal-input');
const optionsList = document.getElementById('options-list');
const kbsound = document.getElementById('audio');
const kbsoundOther = document.getElementById('audio2');



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
        kbsoundOther.play()
        if (e.code === "Enter") {
            kbsound.play();
                if (terminalInput.value.toLowerCase() === option.answer) {
                    getAcess(option, option.nextText);
        }
}})}


function selectOption(option) {
    const nextTextScreenId = option.nextText;
    if (nextTextScreenId === 1) {
        return welcomeScreen();
    }
    state = Object.assign(state, option.setState);
    if (state.virus != true && state.passwordGame != true) {
    showScreen(nextTextScreenId);
    terminalInput.value = "";
    } else if (state.virus == true) {
        terminalInput.value = "";
        showScreen(9);
        setTimeout(virusTimer(10), 1000);
    } else if (state.passwordGame == true) {
        passwordGame(option);
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
        while (optionsList.firstChild) {
            optionsList.removeChild(optionsList.firstChild);
        }
        terminalQuest.innerHTML = 'BOOM';
        optionsList.innerHtml = '';
        clearTimeout(timeId);
        setTimeout(welcomeScreen, 2000);
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



function scramble(a){
    a=a.split("");
    for(let b=a.length-1;0<b;b--){
        let c=Math.floor(Math.random()*(b+1));
        d=a[b];a[b]=a[c];a[c]=d}
        return a.join("")
    }


function passwordGame() {
    let passwords = ["cleric", "ritual", "desperation", "javascript"];
    let password = passwords[Math.floor(Math.random() * passwords.length)];
    let scrambledPassword = scramble(password);
    terminalInput.value = '';
    terminalQuest.classList.add('password__game')
    while (optionsList.firstChild) {
        optionsList.removeChild(optionsList.firstChild);
    }
    const hint = document.createElement('li');
    hint.classList.add("password__hint");
    terminalQuest.innerHTML = `${scrambledPassword}`;
    hint.innerHTML = `${password}`;
    optionsList.appendChild(hint);
    terminalInput.addEventListener('keyup', (e) => {
        kbsoundOther.play()
        if (e.code === "Enter") {
            kbsound.play();
                if (terminalInput.value.toLowerCase() === password) {
                    terminalQuest.classList.remove('password__game')
                    showScreen(22);
                    state.passwordGame = false;
                    terminalInput.value = ''
            }
        }
    })
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
                answer: 'i wanna play games',
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
        text: `Big boys and girls don't play games!<br>
                (maybe if you restore system, something will happen...)`,
        options: [
            {
                answer: 'back',
                nextText: 2,
                acess: 4,
            },
            {
                answer: 'please(speechcraft 100lvl)',
                nextText: 12,
                requiredState: (currentState) => currentState.hacker,
                acess: 4,
                setState: {arm: true,
                            life: true,
                            mind: true,
                            pneumonia: false,
                            armInjury: false,
                            skeletonBone: false,
                            emotionalDamage: false
                        }
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
        text: `Looking around, you've suspected a pile of bones in the left corner, and a sleeping bag in another. `,
        options: [
            {
                answer: `search a pile of bones`,
                nextText: 15,
                acess: 13,
                setState: { skeletonBone: true },
            },
            {
                answer: `try to sleep and forget about this`,
                nextText: 16,
                acess: 13,
            },
        ],
    },
    {
        id: 14,
        text: `You're trying to break the door, but you broke your hand, you're weak meatbag`,
        options: [
            {
                answer: 'look around',
                nextText: 13,
                acess: 14,
                setState: { arm: false, armInjury: true},
            },
        ]
    },
    {
        id: 15,
        text: `In the pile of bones of weak human creature you found a sharp bone, you think it's enough sharp to kill yourself or try to pick a lock`,
        options: [
            {
                answer: `kill yourself`,
                nextText: 4,
                acess: 15,
                setState: {arm: true,
                        armInjury: false,
                        life: true,
                        pneumonia: false,
                        skeletonBone: false
                    },
            },
            {
                answer: `try to pick a lock`,
                nextText: 17,
                acess: 15,
                setState: {skeletonBone: false},
            },
        ]
    },
    {
        id: 16,
        text: `You're trying to sleep in a dirty sleepbag, and you woke up with pneumonia, because dungeon is too cold and wet`,
        options: [
            {
                answer: `search a pile of bones`,
                acess: 16,
                nextText: 15,
                setState: {pneumonia: true, life: false},
            },
        ]
    },
    {
        id: 17,
        text: `You're trying to pick a lock, and door is opened, you entering the dark castle`,
        options: [
            {
                answer: `explore the castle`,
                nextText: 18,
                acess: 17,
            },
        ]
    },
    {
        id: 18,
        text: `Castle seems very old and abandoned, but you hear a something like ritual chants afar, in front of you, you see a skeleton with a warm coat`,
        options: [
            {
                answer: `pickup the coat and go`,
                nextText: 19,
                acess: 18,
                setState: {life: true, pneumonia: false, coat: true},
            },
            {
                answer: `ignore skeleton and go further`,
                nextText: 19,
                acess: 18,
            },
        ]
    },
    {
        id: 19,
        text: `You've entered a hall with broken windows, hall is a full of snow it's too cold here`,
        options: [
            {
                answer: `enter the hall`,
                nextText: 20,
                requiredState: (currentState) => currentState.pneumonia,
                acess: 19,
            },
            {
                answer: `step in the hall`,
                nextText: 21,
                requiredState: (currentState) => currentState.life,
                acess: 19,
            },

        ]
    },
    {
        id: 20,
        text: `Once you've entered the hall, you begin to suffocate, it's too cold, and you're naked and sick, you're dying`,
        options: [
            {
                answer: 'restart',
                nextText: 12,
                acess: 20,
                setState: {arm: true,
                    armInjury: false,
                    life: true,
                    pneumonia: false,
                    skeletonBone: false,
                    coat: false,
                    sword: false,
                },
            },
        ]
    },
    {
        id: 21,
        text: `You've entered the hall and you feel cold, but you're safe, you see a massive door with strange symbols looks like kinda puzzle`,
        options: [
            {
                answer: `come closer to the door`,
                nextText: 22,
                acess: 21,
                setState: {passwordGame : true},
            }
        ]
    },
    {
        id: 22,
        text: `Door opened and in front of you you see a yard, snow is falling, a lot of corpses everywhere, maybe it was a battleground before. More forward the're is the gate, seems, leading to exit, they're open`,
        options: [
            {
                answer: 'move strictly to the gate',
                nextText: 23,
                acess: 22,
            },
            {
                answer: 'look around',
                nextText: 24,
                acess: 22,
            }
        ],
    },
    {
        id: 23,
        text: `You approaching to the gate and you see the zombie, running towards you`,
        options: [
            {
                answer: `fight zombie`,
                nextText: 25,
                acess: 23,
                requiredState: (currentState) => currentState.arm,
            },
            {
                answer: 'strike zombie with a sword',
                nextText: 26,
                acess: 23,
                requiredState: (currentState) => currentState.sword,
            },
            {
                answer: 'try to fight zombie',
                nextText: 27,
                acess: 23,
                requiredState: (currentState) => currentState.armInjury,
            },
            {
                answer: 'run away',
                nextText: 28,
                acess: 23,
            }
        ]
    },
    {
        id: 24,
        text: `You've suspected a sword in one of the corpses`,
        options: [
            {
                answer: `pick up the sword and go to gate`,
                nextText: 23,
                acess: 24,
                setState: {sword: true},
            },
            {
                answer: `leave sword and go to the gate`,
                nextText: 23,
                acess: 24,
            },
        ]
    },
    {
        id: 25,
        text: `You fighting zombie with a bare hands, and after hard battle, you lost a lot of blood, you need something to tie up wounds`,
        options: [
            {
                answer: `tear a part from coat and tie up wounds`,
                nextText: 29,
                acess: 25,
                requiredState: (currentState) => currentState.coat,
            },
            {
                answer: `leave it alone and go to gate`,
                nextText: 30,
                acess: 25,
            },
        ]
    },
    {
        id: 26,
        text: `you hitted zombie with a sword very hard and cut his head off`,
        options: [
            {
                answer: `go to gate`,
                nextText: 31,
                acess: 26,
            },
        ]
    },
    {
        id: 27,
        text: `You're trying to fight zombie, but your arm is injured, zombie killed you and have eaten your brain, if you still have some`,
        options: [
            {
                answer: `restart`,
                nextText: 4,
                acess: 27,
                setState: {arm: true,
                    armInjury: false,
                    life: true,
                    pneumonia: false,
                    skeletonBone: false,
                    coat: false,
                    sword: false,
                },
            }
        ]
    },
    {
        id: 28,
        text: `you tried to run away, but stumbled, and more zombies heard that, they're laughing, and then they're killing you`,
        options: [
            {
                answer: `restart`,
                nextText: 4,
                acess: 27,
                setState: {arm: true,
                    armInjury: false,
                    life: true,
                    pneumonia: false,
                    skeletonBone: false,
                    coat: false,
                    sword: false,
                },
            }
        ]
    },
    {
        id: 29,
        text: `You tied your wonds, seems it's enough to get to the town`,
        options: [
            {
                answer: `go to the gate`,
                nextText: 31,
                acess: 29,
            }
        ]
    },
    {
        id: 30,
        text: `You walk towards the gate, but you're bleeding, you're dropping dead`,
        options: [
            {
                answer: `restart`,
                nextText: 4,
                acess: 30,
                setState: {arm: true,
                    armInjury: false,
                    life: true,
                    pneumonia: false,
                    skeletonBone: false,
                    coat: false,
                    sword: false,
                },
            }
        ]
    },
    {
        id: 31,
        text: `You coming to the gate, and nobody sees you, walking through it, and you see a road, seems it will be a long way home, good luck, champion!`,
        options: [
            {
                answer: `the end`,
                nextText: 2,
                acess: 31,
                setState: {arm: true,
                    armInjury: false,
                    life: true,
                    pneumonia: false,
                    skeletonBone: false,
                    coat: false,
                    sword: false,
                    completedQuest: true,
                },
            }
        ]
    }
    

]

launchTerminal();