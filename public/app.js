/* const url = "http://localhost:3000/weather?address=Mailsi";

setTimeout(function(url) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);

  xhr.onload = () => {
    if (this.status === 200) {
      const data = JSON.parse(this.responseText);
      if (data.error) {
        console.log(data);
      } else {
        console.log(data);
      }
      console.log(this.responseText);
    }
  };

  xhr.send();
}, 1000);
 */
const weatherForm = document.querySelector("form");
const input = document.querySelector("#input");
const UIlocation = document.querySelector(".location");
const UItemprature = document.querySelector(".temprature");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  fetch(`/weather?address=${input.value}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        UIlocation.innerHTML = data.error;
      } else {
        UIlocation.innerHTML = data.location;
        UItemprature.innerHTML = data.data.temprature;
      }
    });
  });
  input.value = "";
});
