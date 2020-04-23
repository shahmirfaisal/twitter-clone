const writeTweetBtn = document.querySelector(".write-tweet__btn");
const writeTweetText = document.querySelector(".write-tweet__text");
writeTweetText.addEventListener("keyup", changeWriteTweetText);

function changeWriteTweetText({ target: { value } }) {
  if (value.trim().length > 0) {
    writeTweetBtn.removeAttribute("disabled");
  } else {
    writeTweetBtn.setAttribute("disabled", "true");
  }
}
