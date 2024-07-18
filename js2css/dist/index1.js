"use strict";
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const start = document.getElementById("start");
const startArea = document.getElementById("startArea");
const html = document.getElementById("html");
const css = document.getElementById("css");
const js = document.getElementById("js");
const htmlCheck = document.getElementById("htmlCheck");
const cssCheck = document.getElementById("cssCheck");
const jsCheck = document.getElementById("jsCheck");
const config = {
    hasJs: true,
    hasCss: true,
    hasHtml: true,
};
function checkConfig() {
    config.hasCss = cssCheck.checked;
    config.hasHtml = htmlCheck.checked;
    config.hasJs = jsCheck.checked;
    css.style.display = config.hasCss ? "" : "none";
    html.style.display = config.hasHtml ? "" : "none";
    js.style.display = config.hasJs ? "" : "none";
}
const left_item = document.querySelector(".left .left-item");
let str = `${css === null || css === void 0 ? void 0 : css.value}`;
let count = 0;
const styleElement = document.createElement("style");
function typeStr() {
    createHtmlByHtmlStr();
    let top = 0;
    const typeInterval = setInterval(() => {
        left_item.innerHTML += str[count];
        if (str[count] == ";" || str[count] == "}") {
            left_item.innerHTML += "<br>";
            if (left_item.clientHeight > window.innerHeight / 1.6) {
                top = left_item.clientHeight - window.innerHeight / 1.6;
                left_item.style.marginTop = `${-top.toString()}px`;
            }
        }
        count++;
        styleElement.textContent += str[count];
        document.head.appendChild(styleElement);
        if (count == str.length) {
            console.log(config);
            if (config.hasJs) {
                const jsCode = js.value;
                console.log(`jsCode:${jsCode}`);
                try {
                    eval(jsCode);
                }
                catch (e) {
                    console.error(e);
                }
            }
            clearInterval(typeInterval);
            left_item.innerHTML += "<h1>写完啦！！！</h1>";
            return;
        }
    }, 1);
}
let htmlElementStr = `${html === null || html === void 0 ? void 0 : html.value}`;
const createHtmlByHtmlStr = () => {
    let wrap = document.createElement("div");
    wrap.innerHTML = htmlElementStr;
    right === null || right === void 0 ? void 0 : right.appendChild(wrap);
};
start === null || start === void 0 ? void 0 : start.addEventListener("click", () => {
    left_item.innerHTML = "";
    if (right)
        right.innerHTML = "";
    str = `${css === null || css === void 0 ? void 0 : css.value}`;
    htmlElementStr = `${html === null || html === void 0 ? void 0 : html.value}`;
    console.log(htmlElementStr);
    if (str == "" || htmlElementStr == "") {
        left_item.innerHTML = "没数据";
        if (right)
            right.innerHTML = "没数据";
        return;
    }
    if (startArea)
        startArea.style.display = "none";
    typeStr();
});
//# sourceMappingURL=index1.js.map