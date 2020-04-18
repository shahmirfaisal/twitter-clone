const writeTweetBtn = document.querySelector(".write-tweet__btn");
const writeTweetText = document.querySelector(".write-tweet__text");
writeTweetText.addEventListener("change", changeWriteTweetText);

function changeWriteTweetText({ target: { value } }) {
  console.log(value);
  if (value.trim().length > 0) {
    writeTweetBtn.removeAttribute("disabled");
    console.log("Greater");
  } else {
    writeTweetBtn.setAttribute("disabled", "true");
    console.log("Less");
  }
  console.log(writeTweetBtn);
}

console.log("Hey");
