function removeAndCreateElements() {
    // remove all element
    const elements = document.querySelectorAll(".read_img");
    elements.forEach(element => element.remove());

    const mainEL = document.getElementById('main');

    for (let i = 0; i <= 150; i++) {
        const div = document.createElement("div");
        div.className = "ex read_img";
        div.id = i.toString();
        div.setAttribute("data-src", `test/${zib_id}/${zib_ep}/` + i);
        div.textContent = i.toString() + ".png";

        mainEL.appendChild(div);
    }
}

async function load() {
    await removeAndCreateElements();
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
        zib_ep = zib_ep > 0 ? zib_ep + 1 : 1;
    } else if (direction === "previous") {
        zib_ep = zib_ep > 1 ? zib_ep - 1 : 1;
    }

    await removeAndCreateElements();
    await load();
}

// Creating the buttons
const prevButton = createButton('Previous', 'prev-button', 'prev-next-button', () => navigate('previous'));
const nextButton = createButton('Next', 'next-button', 'prev-next-button', () => navigate('next'));

// Appending the buttons to the DOM
appendButtons([prevButton, nextButton]);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let zib_id = 0;
let zib_ep = 0;

load();

// $.getScript('https://cdn.jsdelivr.net/gh/ZiberX1/codeTX@main/manmiror.js');