"use strict";
const tasks = document.querySelector(".tasks");
const btn = document.querySelector(".addtask");
const input = document.querySelector("input");
const rendertasks = function () {
  const html = `<div class='frame'>
  <input type='checkbox' class='confirm'> <span class='name'>${input.value}</span>
  <button class='delete'>Delete</button>
</div>`;
  input.value
    ? tasks.insertAdjacentHTML("beforeend", html)
    : alert("Empty field");
  input.value = "";
  const cut = (e) => {
    e.target.classList.contains("confirm") && e.target.checked
      ? e.target.nextElementSibling.classList.add("finish")
      : e.target.nextElementSibling.classList.remove("finish");
  };
  const deleting = (e) => {
    e.target.classList.contains("delete")
      ? e.target.parentElement.remove()
      : "";
  };
  tasks.addEventListener("change", cut);
  tasks.addEventListener("click", deleting);
};
btn.addEventListener("click", rendertasks);
