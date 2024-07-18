const left = document.querySelector(".left");
const right = document.querySelector(".right");
const start = document.getElementById("start");
const startArea = document.getElementById("startArea");
const html = document.getElementById("html") as HTMLInputElement;
const css = document.getElementById("css") as HTMLInputElement;
const js = document.getElementById("js") as HTMLInputElement;
const htmlCheck = document.getElementById("htmlCheck") as HTMLInputElement;
const cssCheck = document.getElementById("cssCheck") as HTMLInputElement;
const jsCheck = document.getElementById("jsCheck") as HTMLInputElement;

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

// const right_item = document.querySelector(".right .right-item") as HTMLElement;
const left_item = document.querySelector(".left .left-item") as HTMLElement;
let str = `${css?.value}`;
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
        } catch (e) {
          console.error(e);
        }
      }
      clearInterval(typeInterval);
      left_item.innerHTML += "<h1>写完啦！！！</h1>";

      return;
    }
  }, 1);
}
let htmlElementStr = `${html?.value}`;
const createHtmlByHtmlStr = () => {
  let wrap = document.createElement("div");
  wrap.innerHTML = htmlElementStr;
  right?.appendChild(wrap);
};
start?.addEventListener("click", () => {
  left_item.innerHTML = "";
  if (right) right.innerHTML = "";
  str = `${css?.value}`;
  htmlElementStr = `${html?.value}`;
  console.log(htmlElementStr);
  if (str == "" || htmlElementStr == "") {
    left_item.innerHTML = "没数据";
    if (right) right.innerHTML = "没数据";
    return;
  }
  if (startArea) startArea.style.display = "none";
  typeStr();
});
