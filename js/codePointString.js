let pointString = '😊😍🚀🌟🎉'

String.prototype.pointLength = function () {
  let len = 0
  for (let i = 0; i < this.length; ) {
    let code = this.codePointAt(i)
    i += code > 65535 ? 2 : 1
    len++
  }
  return len
}
String.prototype.pointCharAt = function (index) {
  let curIndex = 0 // 当前字符的码点下表
  // 字符的长度是码元的长度
  for (let i = 0; i < this.length; ) {
    let code = this.codePointAt(i) //码点 是真正的字符
    if (curIndex === index) {
      return String.fromCodePoint(code)
    }
    i += code > 65535 ? 2 : 1 // 码元位置
    curIndex++
  }
}
String.prototype.sliceByPoint = function (start, end = this.pointLength()) {
  let result = ''
  for (let i = start; i < end; i++) {
    result += this.pointCharAt(i)
  }
  return result
}

console.log(pointString.pointLength()) // 5
console.log(pointString.pointCharAt(1)) // 😊
console.log(pointString.sliceByPoint(0, 4))
