function parseLrc() {
  var lrc_data = lrc.split("\n");
  var result_data = [];
  for (let i = 0; i < lrc_data.length; i++) {
    var lrc_line_obj = {
      time: "",
      word: "",
    };
    const lrc_line = lrc_data[i].split("]");
    lrc_line_obj.time = parseTime(lrc_line[0]);
    lrc_line_obj.word = lrc_line[1];
    result_data.push(lrc_line_obj);
  }
  return result_data;
}
function parseTime(time) {
  var time_data = time.substring(1).split(":");
  var time_parse = +time_data[0] * 60 + +time_data[1];
  return time_parse;
}

var lrc_data = parseLrc();

var doms = {
  aud: document.querySelector("audio"),
  ul: document.querySelector(".lrc_list"),
  container: document.querySelector(".container"),
};

console.log(lrc_data);

function findIndex() {
  var current_time = doms.aud.currentTime;
  for (let i = 0; i < lrc_data.length; i++) {
    const lrc_line = lrc_data[i];
    if (current_time < lrc_line.time) {
      return i - 1;
    }
  }
  return lrc_data.length - 1; //如果还没有找到，说明到了最后一句，返回最后一句的索引
}

function createLrcElements() {
  var fragment = document.createDocumentFragment();
  for (let i = 0; i < lrc_data.length; i++) {
    const lrc_line = lrc_data[i];
    var lic_li = document.createElement("li");
    lic_li.textContent = lrc_line.word;
    fragment.appendChild(lic_li);
  }
  doms.ul.appendChild(fragment);
}
createLrcElements();

const li_height = doms.ul.children[0].clientHeight;
const ul_height = doms.ul.clientHeight;
const container_height = doms.container.clientHeight;
const max_offset = ul_height - container_height;

function setOffset() {
  var index = findIndex();
  console.log(index);
  var offset = li_height * index + li_height / 2 - container_height / 2;
  console.log(offset);
  if (offset < 0) {
    offset = 0;
  } else if (offset > max_offset) {
    offset = max_offset;
  }
  doms.ul.style.transform = `translateY(${-offset}px)`;
  var li = document.querySelector(".active");
  if (li) {
    li.classList.remove("active");
  }
  li = doms.ul.children[index];
  if (li) {
    li.classList.add("active");
  }
}
doms.aud.addEventListener("timeupdate", setOffset);
