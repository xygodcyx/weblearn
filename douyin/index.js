const parseData = function () {
  const data_arr = data.trim().split("\n");
  let data_objs = [];
  data_objs = data_arr.map((d, i) => {
    return {
      index: i,
      data: d.trim(),
    };
  });
  return data_objs;
};

const doms = {
  wrap: document.getElementById("wrap"),
  video: document.getElementById("video"),
  img_wrap: document.getElementById("img_wrap"),
};
let user_var = {
  cur_index: 0,
  up_y: 20,
  down_y: -20,
};

const mouse_info = {
  last_x: 0,
  last_y: 0,
  x: 0,
  y: 0,
  isUp: false,
  isDown: false,
  left_mouse_down: false,
  left_mouse_up: false,
};

const parse_mouse = function (event) {
  set_mouse_info(event);
  set_video_index();
  show_video();
  reset_mouse_info(event);
};

const show_video = function () {
  console.log(user_data);
  doms.img_wrap.classList.remove("img_wrap_active");
  var src = user_data[user_var.cur_index].data + ".jpg";
  console.log(src);
  doms.img_wrap.classList.add("img_wrap_active");
  doms.img_wrap.src = src;
};
const user_data = parseData();
const set_video_index = function () {
  const { isUp, isDown } = mouse_info;
  if (isUp || isDown) {
    can_move = false;
  }
  if (isUp) {
    user_var.cur_index == 0 ? 0 : user_var.cur_index--;
    // doms.video.style.translatex;
  } else if (isDown) {
    user_var.cur_index >= user_data.length - 1
      ? user_var.cur_index
      : user_var.cur_index++;
  }
};

const set_mouse_info = function (event) {
  mouse_info.x = event.clientX;
  mouse_info.y = event.clientY;
  // const { last_y, y } = mouse_info;
  const { up_y, down_y } = user_var;
  if (event.movementY > up_y) {
    mouse_info.isUp = true;
    mouse_info.isDown = false;
  } else if (event.movementY < down_y) {
    mouse_info.isDown = true;
    mouse_info.isUp = false;
  }
};

const reset_mouse_info = function (event) {
  mouse_info.last_x = event.clientX;
  mouse_info.last_y = event.clientY;
  mouse_info.isDown = false;
  mouse_info.isUp = false;
};

let can_move = false;
let can_move_inter;
document.addEventListener("mousemove", (event) => {
  if (!can_move) return;
  parse_mouse(event);
});
document.addEventListener("mousedown", (event) => {
  mouse_button_left_down_handler(event);
});
document.addEventListener("mouseup", (event) => {
  mouse_button_left_up_handler(event);
});

const mouse_button_left_down_handler = function (event) {
  if (event.button == 0) {
    mouse_info.left_mouse_down = true;
    mouse_info.left_mouse_up = false;
  }
  if (mouse_info.left_mouse_down) {
    can_move = true;
  }
};
const mouse_button_left_up_handler = function (event) {
  if (event.button == 0);
  {
    mouse_info.left_mouse_down = false;
    mouse_info.left_mouse_up = true;
  }
  if (mouse_info.left_mouse_up) {
    can_move = false;
  }
};
