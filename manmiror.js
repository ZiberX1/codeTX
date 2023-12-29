const g_id = 0
const g_ep = 0

// remove all element
var elements = document.getElementsByClassName("read_img");
while(elements.length > 0){
    elements[0].parentNode.removeChild(elements[0]);
}

const mainEL = document.getElementById('main')

var mainDiv = document.getElementById("main");
for (var i = 0; i <= 150; i++) {
    var div = document.createElement("div");
    div.className = "ex read_img";
    div.id = i.toString();
    div.setAttribute("data-src", `test/${g_id}/${g_ep}/` + i);
    div.textContent = i.toString() + ".png";

    mainDiv.appendChild(div);
}

(function($) {
    $(document).ready(function() {
        loop_await($('.ex'));

        var main = document.getElementById('main');

        [].map.call(main.children, Object).sort(function(a, b) {
            return +a.id.match(/\d+/) - +b.id.match(/\d+/);
        }).forEach(function(elem) {
            main.appendChild(elem);
        });

    });

})(jQuery);