let htmlString;
let jsonData;

// Function //
function lazyLoadImages() {
    const lazyImages = document.querySelectorAll(".lazy");

    const options = {
        root: null, // Use the viewport as the root
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

    lazyImages.forEach((image) => {
        observer.observe(image);
    });
}

function getHtml() {
    $.ajax({
        url: window.location.href, // text/html
        type: 'GET', // use GET request as the default method for $.ajax
        success: function(data) {
            // If the request is successful, data contains the result
            // console.log(data);
            htmlString = data
            console.log('Get HTML')
            getJson();
        },
        error: function(xhr, status, error) {
            // If the request fails, the error will be displayed in the console
            console.log('Error: ' + error);
        }
    });
}

function getJson() {
    let parser = new DOMParser();
    let doc = parser.parseFromString(htmlString, 'text/html');
    let script = doc.getElementById('__NEXT_DATA__');
    jsonData = JSON.parse(script.textContent);
    console.log('Get JSON')
}

function btnClick() {
    let faArrowRight = document.querySelector('.fa-arrow-right');
    let faArrowLeft = document.querySelector('.fa-arrow-left');
    var zibx = document.getElementById('zibx');
    
    if (faArrowRight) {
        faArrowRight.parentElement.onclick = function() {
            zibx.innerHTML = '';
            console.log('click');
        };
    }
    
    if (faArrowLeft) {
        faArrowLeft.parentElement.onclick = function() {
            zibx.innerHTML = '';
            console.log('click');
        };
    }
}

function createELzibx() {
    var mainDiv = document.querySelector('.mt-2');
    var zibx = document.getElementById('zibx');

    if (!zibx) {
        var div1 = document.createElement('div');
        div1.setAttribute('id', 'zibx')
        div1.setAttribute('class', 'lazy row pl-4 pr-4 unselectable')
        
        mainDiv.insertBefore(div1, mainDiv.querySelector('.p-4'));
        btnClick();
    }
}

async function load() {
    await createELzibx();
    await getHtml();

    let imageUrlLists = jsonData.props.pageProps.epMain.ImageUrlLists;

    ziberX.innerHTML = '';
    imageUrlLists.forEach(imageUrl => {
        const img = new Image();
        img.dataset.src = imageUrl;
        img.classList.add('lazy');
        // img.src = imageUrl; // Add a default image source
        img.style.width = '100%';
        ziberX.appendChild(img);
    });
    lazyLoadImages();
}

var button = document.createElement("button");
button.innerHTML = "Load";
button.style.position = "absolute";
button.style.top = "100px";
button.style.left = "0px";
button.onclick = function() {
    load();
}
document.querySelector('.mt-2').appendChild(button);

// $.getScript('https://cdn.jsdelivr.net/gh/ZiberX1/codeTX@main/mynovel.js')