function parseWords() {
  var word_data = words.trim().split("\n");
  var result = [];
  word_data_objs = {
    word: "",
    number: 0,
  };
  word_data.forEach((wd) => {
    var word_obj = {
      word: wd,
      number: computeWordNumber(wd, word_data),
    };
    //对象去重
    if (result.find((r) => r.word == word_obj.word)) {
    } else result.push({ ...word_obj });
  });
  console.log(result);
  return result;
}
function computeWordNumber(word, words) {
  var number = 0;
  words.forEach((w) => {
    word == w ? number++ : (number += 0);
  });
  return number;
}

var doms = {
  wrap: document.getElementsByClassName("wrap")[0],
};
var word_width = 100;
var word_height = 20;
var word_data = parseWords();
var word_sizes = createWordSize(word_data.length);
function createElements() {
  var word_fragment = document.createDocumentFragment();
  var positions = randomPosition(word_data.length);
  word_data.forEach((wd, index) => {
    var word = document.createElement("p");
    word.textContent = `${wd.word}(${wd.number})`;
    word.style.width = word_sizes[index].width + "px";
    word.style.height = word_sizes[index].height + "px";
    var scale = +wd.number == 1 ? +wd.number : Math.log1p(+wd.number);
    word.style.transform = `scale(${scale})`;
    //     word.style.left = randomPosition().x + "px";
    //     word.style.top = randomPosition().y + "px";
    //     word.style.marginLeft = 0 + "px";
    //     word.style.marginTop = 0 + "px";
    //     word.style.border = "1px solid saddlebrown";
    word.style.position = "absolute";
    //     word.style.left = wrap_width - word_width + "px";
    //     word.style.top = wrap_width - word_height + "px";
    word_fragment.appendChild(word);
  });
  word_fragment.childNodes.forEach((w, i) => {
    w.style.left = positions[i].x + "px";
    w.style.top = positions[i].y + "px";
  });
  doms.wrap.appendChild(word_fragment);
}
var wrap_width = doms.wrap.clientWidth;
var wrap_height = doms.wrap.clientHeight;
function randomPosition(number) {
  var random = [];
  var loop_number = 0;
  for (var i = 0; i < number; ) {
    var good_position;
    var good_distance = -999;
    var curr_distance;
    var position = {
      x: randomP(i).x,
      y: randomP(i).y,
    };
    console.log(i);
    try {
      loop_number++;
      // console.log(loop_number);
      random.forEach((r, index) => {
        //   console.log(position);
        var circle_distance = computeCircleDistance(position, r);
        curr_distance = circle_distance;
        var sum_width =
          word_sizes[i].width * 0.5 + word_sizes[index].width * 0.5;
        if (circle_distance - sum_width < 0) {
          //     console.log(circle_distance);
          i += 0;
          if (curr_distance > good_distance) {
            good_distance = curr_distance;
            good_position = position;
          }
          if (loop_number >= 1000) {
            random.push(good_position);
            i++;
            loop_number = 0;
            throw new Error("too nearly!");
          }
          throw new Error("too nearly!");
        }
      });
      i++;
      loop_number = 0;
      random.push(position);
    } catch (e) {
      // console.log("太近");
      if (e.message !== "too nearly!") {
        throw e;
      }
    }
  }
  return random;
}
function createWordSize(number) {
  var word_sizes = [];
  for (var i = 0; i < number; i++) {
    word = word_data[i];
    console.log(word);
    var scale = +word.number == 1 ? +word.number : Math.log1p(+word.number);
    word_sizes.push({
      width: word_width * scale,
      height: word_height * scale,
    });
  }
  console.log(word_sizes);
  return word_sizes;
}

function randomP(index) {
  var maxX = wrap_width - word_sizes[index].width;
  var maxY = wrap_height - word_sizes[index].height;
  return {
    x: Math.random() * maxX,
    y: Math.random() * maxY,
  };
}
function cube2circle(position, width, height) {
  return {
    x: position.x + width * 0.5,
    y: position.y + height * 0.5,
  };
}
function computeCircleDistance(p1, p2) {
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}
createElements();
