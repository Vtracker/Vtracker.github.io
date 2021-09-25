/**
 * @file 生成首页标语动画
 * @author YunYouJun <me@yunyoujun.cn>
 * @description https://github.com/YunYouJun/hexo-theme-yun
 */

/**
 * 生成介于 min 与 max 之间的随机数
 * @param {number} min
 * @param {number} max
 * @returns
 */
function random(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * 生成标语
 * @param {string} title
 */
function generateBanner(title) {
  let sumH = 0;
  const lineTop = document.querySelector(".vertical-line-top");
  const lineBottom = document.querySelector(".vertical-line-bottom");
  const charContainer = document.querySelector(".banner-char-container");
  charContainer.innerHTML = "";

  for (let i = 0; i < title.length; i++) {
    const char = title[i];
    let charBox = document.createElement("div");
    let rn = 4;
    charBox.innerHTML = "<span class='char'>" + char + "</span>";
    let charSize = rn + "rem";

    charBox.classList.add("char-box");
    charContainer.appendChild(charBox);

    charBox.style.setProperty("--banner-char-size", charSize);

    const width = window
      .getComputedStyle(document.getElementsByClassName("char-box")[i])
      .getPropertyValue("width");
    charBox.style.setProperty("--banner-empty-border-size", width);

    sumH += rn;
  }
  charContainer.style.padding = '1rem 0';
  let height = "calc(50vh - " + sumH / 2 + "rem)";
  lineTop.style.setProperty("--banner-line-height", height);
  let heightBot = "calc(40vh - " + sumH / 2 + "rem)";
  lineBottom.style.setProperty("--banner-line-height", heightBot);

  // set animation name
  lineTop.style.animationName = "extend-line";
  lineBottom.style.animationName = "extend-line";
}

/**
 * 初始化 banner
 */
function initBanner() {
  if (window.banner) {
    setTimeout(() => {
      generateBanner(CONFIG.title);
    }, 100);
  }
}

document.addEventListener("DOMContentLoaded", initBanner);
document.addEventListener("pjax:success", initBanner);