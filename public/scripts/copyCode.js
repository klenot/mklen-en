export function copyTextHandler() {
  const text = document.getElementsByClassName("rich-code-content");
  var button = document.getElementsByClassName("copy-code-button");
  var successMessage = document.getElementsByClassName("success-message");
  const copyText = text[0].innerText;

  navigator.clipboard
    .writeText(copyText)
    .then(() => {
        button[0].classList.add("hide-copy-code-button")
        successMessage[0].classList.add("show-success-message")
        successMessage[0].classList.remove("success-message")
        setTimeout(() => {
          var successMessage = document.getElementsByClassName("show-success-message");
          successMessage[0].classList.add("success-message")
          button[0].classList.remove("hide-copy-code-button")
        }, 2000);
    })
    .catch(() => {
      alert("Code was not copied 😔");
    });
}
