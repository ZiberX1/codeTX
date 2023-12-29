let g_id = 3;
let g_ep = 100;

removeAndCreateElements();
load();

function removeAndCreateElements() {
    // remove all element
    const elements = document.querySelectorAll(".read_img");
    elements.forEach(element => element.remove());

    const mainEL = document.getElementById('main');

    for (let i = 0; i <= 100; i++) {
        const div = document.createElement("div");
        div.className = "ex read_img";
        div.id = i.toString();
        div.setAttribute("data-src", `test/${g_id}/${g_ep}/` + i);
        div.textContent = i.toString() + ".png";

        mainEL.appendChild(div);
    }
}

async function load() {
    await loop_await($('.ex'));

    const main = document.getElementById('main');
    const childElements = Array.from(main.children);

    childElements.sort((a, b) => +a.id.match(/\d+/) - +b.id.match(/\d+/));

    childElements.forEach(elem => main.appendChild(elem));
}

// remove top tab
const navbarx = document.querySelector('.navbar.navbar-expand-md');
navbarx.remove();

// Function to create buttons
function createButton(name, id, className, onClickFunction) {
    const button = document.createElement('button');
    button.textContent = name;
    button.id = id;
    button.className = className;
    button.onclick = onClickFunction;
    return button;
}

// Function to append buttons
function appendButtons(buttonArray) {
    const buttonDiv = document.createElement('div');
    buttonDiv.id = 'button-div';
    buttonDiv.style.position = 'fixed';
    buttonDiv.style.top = '0';
    buttonDiv.style.right = '0';
    buttonDiv.style.zIndex = '1000';

    buttonArray.forEach(button => buttonDiv.appendChild(button));

    document.body.appendChild(buttonDiv);
}

async function navigate(direction) {
    if (direction === "next") {
        g_ep = g_ep > 0 ? g_ep + 1 : 1;
    } else if (direction === "previous") {
        g_ep = g_ep > 1 ? g_ep - 1 : 1;
    }

    removeAndCreateElements();
    await load();
}

// Creating the buttons
const prevButton = createButton('Previous', 'prev-button', 'prev-next-button', () => navigate('previous'));
const nextButton = createButton('Next', 'next-button', 'prev-next-button', () => navigate('next'));

// Appending the buttons to the DOM
appendButtons([prevButton, nextButton]);