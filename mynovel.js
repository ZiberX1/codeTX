// Function //
// function lazyLoadImagesXXX() {
//     const lazyImages = document.querySelectorAll(".lazy");

//     const options = {
//         root: null, // Use the viewport as the root
//         rootMargin: "0px",
//         threshold: 0.1 // Specify the threshold for intersection
//     };

//     const handleIntersection = (entries, observer) => {
//         entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//                 const img = entry.target;
//                 const src = img.getAttribute("data-src");

//                 // Replace the placeholder with the actual image source
//                 img.src = src;

//                 // Stop observing the image
//                 observer.unobserve(img);
//             }
//         });
//     };

//     const observer = new IntersectionObserver(handleIntersection, options);

//     lazyImages.forEach((image) => {
//         observer.observe(image);
//     });
// }

async function createZibDiv() {
    console.log('Create Div [zibx]');
    const mainDiv = document.querySelector('.mt-2');
    const div1 = document.createElement('div');
    div1.setAttribute('id', 'zibx');
    div1.setAttribute('class', 'lazy row pl-4 pr-4 unselectable');

    mainDiv.insertBefore(div1, mainDiv.querySelector('.p-4'));
    zibx = document.getElementById('zibx');
    await loadImages();
}

// print Product Name
async function Nzib() {
    const zibH1 = await fetchHTML();
    const zibJSON1 = await fetchJSON(zibH1);

    const name = zibJSON1.props.pageProps.product.ProductName
    console.log(name);
}

// The loadImages function loads images onto the page
async function loadImages() {
    // Retrieves the main container and the ZiberX container
    var zibx = document.getElementById('zibx');

    // Creates a new ZiberX container if it doesn't exist
    if (!zibx) {
        createZibDiv();
        return 0;
    }

    if (zibx) {
        // Removes all existing images from the ZiberX container
        zibx.innerHTML = '';
    }

    // Fetches the HTML from the page
    const htmlString = await fetchHTML();

    // Extracts the JSON data from the HTML
    const jsonData = await fetchJSON(htmlString);

    await addButtonListeners();

    // Retrieves the image URLs from the JSON data
    const imageUrlLists = jsonData.props.pageProps.epMain.ImageUrlLists;

    // Iterates through each image URL and adds it to the ZiberX container
    imageUrlLists.forEach(imageUrl => {
        const img = new Image();
        img.dataset.src = imageUrl;
        img.classList.add('lazy');
        img.style.width = '100%';
        zibx.appendChild(img);
    });

    // Initializes the lazy loading functionality for the images
    console.log('Load Images');
    lazyLoadImages();
    // lazyLoadImagesXXX(); 
}

// The fetchHTML function fetches the HTML from the page
async function fetchHTML() {
    try {
        const response = await fetch(window.location.href); // Fetch the HTML as text/html
        return await response.text(); // Return the result
    } catch (error) {
        console.error('Error: ' + error);
    }
}

// The fetchJSON function fetches the JSON data from the HTML
async function fetchJSON(htmlString) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(htmlString, 'text/html');
    let script = doc.getElementById('__NEXT_DATA__');
    return JSON.parse(script.textContent);
}

// The addButtonListeners function adds event listeners to the arrow buttons
function addButtonListeners() {
    let faArrowRight = document.querySelector('.fa-arrow-right');
    let faArrowLeft = document.querySelector('.fa-arrow-left');
    var zibx = document.getElementById('zibx');

    if (faArrowRight) {
        faArrowRight.parentElement.onclick = function() {
            zibx.innerHTML = '';
            // console.log('click');
        };
    }

    if (faArrowLeft) {
        faArrowLeft.parentElement.onclick = function() {
            zibx.innerHTML = '';
            // console.log('click');
        };
    }
}

// The lazyLoadImages function initializes the lazy loading functionality for the images
function lazyLoadImages() {
    const options = {
        rootMargin: "0px",
        threshold: 0.1 // Specify the threshold for intersection
    };

    const handleIntersection = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute("data-src");

                // Replace the placeholder with the actual image source
                img.src = src;

                // Stop observing the image
                observer.unobserve(img);
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    const lazyImages = document.querySelectorAll('.lazy');
    lazyImages.forEach((image) => {
        observer.observe(image);
    });
}

// Creates a button to trigger the loadImages function
function createLoadButton() {
    const button = document.createElement("button");
    button.innerHTML = "Load";
    button.classList.add("btn", "btn-sm", "btn-ghost-secondary");
    // button.style.position = "absolute";
    // button.style.top = "100px";
    // button.style.left = "0px";
    button.onclick = function() {
        loadImages();
    }

    const div = document.createElement('div');
    div.id = 'ziberx_load'
    div.appendChild(button)
    document.getElementsByClassName('d-flex justify-content-center flex-nowrap')[1].insertAdjacentElement('afterbegin', div);
    // document.querySelector('.mt-2').appendChild(button);
}

createLoadButton();
// $.getScript('https://ziberx1.github.io/codeTX/mynovel.js')