const toggleComments = document.querySelectorAll(".tweet__toggle-comments");
console.log(toggleComments);
toggleComments.forEach((toggleComment) =>
  toggleComment.addEventListener("click", toggleCommentHandler)
);

function toggleCommentHandler({ target: elem }) {
  const comments = elem.parentNode.querySelector(".comments");
  if (comments.getAttribute("data-show") === "true") {
    comments.setAttribute("data-show", "false");
    comments.style.display = "none";
    elem.innerHTML = "show comments";
  } else {
    comments.setAttribute("data-show", "true");
    comments.style.display = "block";
    elem.innerHTML = "hide comments";
  }

  console.log(comments);
}

const likeIcons = document.querySelectorAll(".tweet__like-icon");
likeIcons.forEach((likeIcon) => likeIcon.addEventListener("click", submitLike));

async function submitLike() {
  const elem = this;
  const likesArray = JSON.parse(
    elem.parentNode.querySelector("#likes-array").value
  );
  const tweetId = elem.parentNode.querySelector("#tweet-id").value;
  const userEmail = elem.parentNode.querySelector("#user-email").value;
  const totalLikes = elem.parentNode.querySelector("#total-likes");

  if (elem.classList.contains("tweet__like-icon--liked")) {
    const index = likesArray.indexOf(userEmail);
    likesArray.splice(index, 1);
    elem.classList.remove("tweet__like-icon--liked");
    totalLikes.innerHTML--;
  } else {
    if (!likesArray.includes(userEmail)) {
      likesArray.push(userEmail);
    }
    elem.classList.add("tweet__like-icon--liked");
    totalLikes.innerHTML++;
  }

  const res = await fetch("/toggle-like-tweet", {
    method: "POST",
    body: JSON.stringify({
      id: tweetId,
      likes: likesArray,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const addCommentBtns = document.querySelectorAll(".tweet__form > button");
addCommentBtns.forEach((addCommentBtn) =>
  addCommentBtn.addEventListener("click", addComment)
);

async function addComment() {
  const tweetId = this.parentNode.querySelector("#tweet-id").value;
  const commentsArray = JSON.parse(
    this.parentNode.querySelector("#comments-array").value
  );
  const commentText = this.parentNode.querySelector("#comment-text").value;
  let user = JSON.parse(this.parentNode.querySelector("#user").value);

  const comment = {
    user,
    comment: commentText,
  };
  commentsArray.push(comment);

  const res = await fetch("/comment", {
    method: "POST",
    body: JSON.stringify({ id: tweetId, comments: commentsArray }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  const li = document.createElement("li");
  li.className = "comment";
  li.innerHTML = `
  <header class="tweet__header">
    <a href="/profile/${comment.user._id}" class="tweet__profile-link">
      <div class="tweet__img">
        <img src="${comment.user.image}" alt="Profile Image" />
      </div>
      <h3 class="tweet__name">${comment.user.name}</h3>
      <h4 class="tweet__username">@${comment.user.username}</h4>
    </a>
  </header>

  <p class="tweet__text">
    ${comment.comment}
  </p>
`;
  const ul = this.parentNode.parentNode.querySelector(".comments");
  ul.appendChild(li);
  ul.removeChild(ul.querySelector(".tweet__no-comments"));
  console.log(ul);
}

const commentTexts = document.querySelectorAll(".tweet__form > #comment-text");
commentTexts.forEach((v) => v.addEventListener("change", changeCommentText));

function changeCommentText({ target }) {
  const btn = target.parentNode.querySelector("button");
  console.log(target.value);
  if (target.value.trim().length > 0) {
    btn.removeAttribute("disabled");
    console.log("Greater");
  } else {
    btn.setAttribute("disabled", "true");
    console.log("Less");
  }
  console.log(btn);
}
