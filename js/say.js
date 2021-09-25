/* global Yun, CONFIG */

/**
 * 显示一句话
 * @param {string} content
 * @param {string} author
 * @param {string} from
 */
console.log("say success");

function say(content, author, from) {
  document.querySelector("#say-content").innerText = content;
  console.log(content);
  if (author) {
    document.querySelector("#say-author").innerText = author;
    console.log(author);
  }
  if (from) {
    document.querySelector("#say-from").innerText = "「" + from + "」";
  }
}

/**
 * 获取在线 API
 */
function fetchApiToSay() {
  if (CONFIG.say.api) {
    fetch(CONFIG.say.api)
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (CONFIG.say.hitokoto) {
              say(data.hitokoto, data.from_who, data.from);
            } else {
              let sentence = data[Math.floor(Math.random() * data.length)];
              if (sentence.content) {
                say(sentence.content, sentence.author, sentence.from);
              } else {
                say(sentence);
              }
            }
          });
        } else {
          throw new Error(
            CONFIG.say.api + ", HTTP error, status = " + res.status
          );
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }
}

document.addEventListener("DOMContentLoaded", fetchApiToSay);
document.addEventListener("pjax:success", () => {
  Yun.utils.isHome() ? fetchApiToSay() : null;
});