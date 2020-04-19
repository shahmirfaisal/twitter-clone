const input = document.querySelector(".form__input--file");
input.addEventListener("change", changeInputFile);
const currentImage = document.querySelector(".form__current-img").value;

function changeInputFile(e) {
  const img = document.querySelector(".form__img > img");

  if (e.target.files && e.target.files[0]) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      console.log(fileReader.result);
      img.src = fileReader.result;
    };
    fileReader.readAsDataURL(e.target.files[0]);
  } else {
    img.src = currentImage;
  }
}
