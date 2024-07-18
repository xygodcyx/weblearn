"use strict";
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const right_item = document.querySelector(".right .right-item");
const left_item = document.querySelector(".left .left-item");
const cssStr = `
      color:red;
      border:1px solid yellow;
      border-radius: 50%;
      background-color:black;
`;
let cssFinishArr = [];
let analysisIndex = -1;
let cssAnalysisStr = "";
let htmlAnalysisStr = "";
let typingCssSpeed = 1000;
let count = 0;
let typeHtmlSpeed = 0;
const analysisCssStr2Css = (_cssStr) => {
    _cssStr = _cssStr.trim();
    let cssArr = _cssStr.split("\n");
    for (let i = 0; i < cssArr.length; i++) {
        const css = cssArr[i].trim();
        cssFinishArr.push(css);
    }
    console.log(cssFinishArr);
    typeHtmlWithSlowTime();
};
const typeHtmlWithSlowTime = () => {
    htmlAnalysisStr = cssFinishArr.join("\n");
    console.log(htmlAnalysisStr);
    const typeInterval = setInterval(() => {
        var _a;
        if (count > htmlAnalysisStr.length - 1) {
            count = 0;
            clearInterval(typeInterval);
            return;
        }
        left_item.innerHTML += htmlAnalysisStr[count];
        if (htmlAnalysisStr[count] == ";") {
            left_item.innerHTML += "<br>";
            analysisIndex++;
            const css = cssFinishArr[analysisIndex];
            console.log(css);
            cssAnalysisStr += css;
            right_item.setAttribute("style", cssAnalysisStr);
        }
        count++;
        typeHtmlSpeed = typingCssSpeed / ((_a = htmlAnalysisStr[count]) === null || _a === void 0 ? void 0 : _a.length);
    }, typeHtmlSpeed);
};
analysisCssStr2Css(cssStr);
//# sourceMappingURL=index.js.map