import "base.scss";
import axios from "axios";
import secondFunc from "second";
import img from "./assets/js-icon.png";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "loaders.css";

const IS_DEVELOP = process.env.NODE_ENV == "dev";
console.log(process.env.NODE_ENV);
console.log(IS_DEVELOP);

const button = document.getElementById("button");
const loader = document.getElementById("loader");
const imgContainer = document.getElementById("imgContainer");

// スリープ
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

// ローディング開始
export const startLoading = () => {
  loader.classList.remove("hidden");
  // 画面内の要素をクリックさせない
  document.body.onkeydown = () => event.preventDefault();
};

// ローディング終了
export const endLoading = () => {
  loader.classList.add("hidden");
  document.body.onkeydown = null;
};

button.addEventListener("click", async () => {
  startLoading();
  await sleep(1000);
  endLoading();
});

imgContainer.src = img;
