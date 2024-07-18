/**
 * 手写简单css解析器
 */
// {
//   const left = document.querySelector(".left");
//   const right = document.querySelector(".right");
//   const right_item = document.querySelector(
//     ".right .right-item"
//   ) as HTMLElement;
//   const left_item = document.querySelector(".left .left-item") as HTMLElement;

//   const cssStr = `
//       color:red;
//       border:1px solid yellow;
//       border-radius: 50%;
//       background-color:black;
// `;

//   let cssFinishArr: string[] = [];
//   let analysisIndex: number = -1;

//   /**
//    * 最终解析到html上的css
//    */
//   let cssAnalysisStr: string = "";
//   /**
//    *
//    */
//   let htmlAnalysisStr: string = "";

//   let typingCssSpeed: number = 1000;
//   let count: number = 0;

//   let typeHtmlSpeed: number = 0;

//   const analysisCssStr2Css = (_cssStr: string) => {
//     _cssStr = _cssStr.trim();
//     let cssArr = _cssStr.split("\n");
//     for (let i = 0; i < cssArr.length; i++) {
//       const css = cssArr[i].trim();
//       cssFinishArr.push(css);
//     }
//     console.log(cssFinishArr);
//     // TypeCss(cssFinishArr);
//     typeHtmlWithSlowTime();
//   };

//   const typeHtmlWithSlowTime = () => {
//     htmlAnalysisStr = cssFinishArr.join("\n");
//     console.log(htmlAnalysisStr);

//     const typeInterval = setInterval(() => {
//       if (count > htmlAnalysisStr.length - 1) {
//         count = 0;
//         clearInterval(typeInterval);
//         return;
//       }
//       left_item.innerHTML += htmlAnalysisStr[count];
//       if (htmlAnalysisStr[count] == ";") {
//         left_item.innerHTML += "<br>";
//         analysisIndex++;
//         const css = cssFinishArr[analysisIndex];
//         console.log(css);
//         cssAnalysisStr += css;
//         right_item.setAttribute("style", cssAnalysisStr);
//       }
//       count++;
//       typeHtmlSpeed = typingCssSpeed / htmlAnalysisStr[count]?.length;
//     }, typeHtmlSpeed);
//   };

//   analysisCssStr2Css(cssStr);
// }
