document.querySelector(".top__button").addEventListener("click", function () {
  document.querySelector(".modal").classList.add("open");
  document.querySelector("body").style.overflow = "hidden";
});
document
  .querySelector(".modal .modal__box")
  .addEventListener("click", (event) => {
    event._isClickWhitInModel = true;
  });
document.querySelector(".modal").addEventListener("click", (event) => {
  if (event._isClickWhitInModel) return;
  event.currentTarget.classList.remove("open");
  document.querySelector("body").style.overflow = "auto";
});
document.querySelector('.remove').addEventListener("click", () => {
    document.querySelector(".modal").classList.remove("open");
    document.querySelector("body").style.overflow = "auto"
})

function validation(form) {
  let result = true;
  const inputs = form.children;

  for (let i = 0; i < 3; i++) {
    const ErrorLabel = document.createElement("label");
    ErrorLabel.textContent = "Поле не заполнено";
    if (inputs[i].children[1].value == "") {
      inputs[i].classList.add("error");
      inputs[i].append(ErrorLabel);
      result = false;
    } else {
      result = true;
      if (inputs[i].classList.contains("error")) {
        inputs[i].classList.remove("error");
        inputs[i].lastElementChild.remove();
      }
    }
  }
  if (result == true) {
    const dataJson = {
      inputValueOne: inputs[0].children[1].value,
      inputValueTwo: inputs[1].children[1].value,
      inputValueThree: inputs[2].children[1].value,
    };
    fetch("https://example.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataJson),
    }).then((data) => {
      console.log("Отправленно");
    });
  }
  return result;
}

document
  .getElementById("add-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    if (validation(this)) {
        document.querySelector('.modal__box').innerHTML = '<h1 class="modal__accept" >Your message successfully sent</h1>';
        document.querySelector('.modal__box').style.height = "300px";
        document.querySelector('.modal__box').style.boxSizing = "border-box";
        document.querySelector('.modal__box').style.paddingTop = "120px";
    }
  });
