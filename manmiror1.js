function removeAndCreateElements() {
    // remove all element
    const elements = document.querySelectorAll(".read_img");
    elements.forEach(element => element.remove());

    const mainEL = document.getElementById('main');

    for (let i = 0; i <= 150; i++) {
        const div = document.createElement("div");
        div.className = "ex read_img";
        div.id = i.toString();
        div.setAttribute("data-src", `test/${document.getElementById('z_id').value}/${document.getElementById('z_ep').value}/` + i);
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
    const z_ep = document.getElementById('z_ep');

    if (direction === "next") {
        z_ep.value++;
    } else if (direction === "previous") {
        z_ep.value--;
    }

    if (z_ep.value < 1) {
        z_ep.value = 1;
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

function AddLoad() {
    // label
    const labelID = document.createElement('label');
    labelID.textContent = "ID:";
    const labelEP = document.createElement('label');
    labelEP.textContent = "Ep:";
    
    // Input
    const inpID = document.createElement('input');
    inpID.type = "number";
    inpID.id = 'z_id';

    const inpEP = document.createElement('input');
    inpEP.type = "number";
    inpEP.id = 'z_ep';

    // Button
    const LoadBTN = document.createElement('button');
    LoadBTN.textContent = 'Load';
    LoadBTN.style.position = "absolute";
    LoadBTN.style.top = '0px';
    LoadBTN.style.zIndex = '1000';
    LoadBTN.onclick = function() {
        console.log('Load')
        load();
    };

    const zibDiv = document.createElement('div');
    zibDiv.style.position = "absolute";
    zibDiv.style.color = 'white';
    zibDiv.appendChild(labelID);
    zibDiv.appendChild(inpID);
    zibDiv.appendChild(labelEP);
    zibDiv.appendChild(inpEP);
    zibDiv.appendChild(LoadBTN);
    document.querySelector('.comic-wrapper').insertAdjacentElement('afterbegin', zibDiv)
}
AddLoad();

// $.getScript('https://cdn.jsdelivr.net/gh/ZiberX1/codeTX@main/manmiror1.js');