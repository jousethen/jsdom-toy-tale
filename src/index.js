let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");

  fetch("http://localhost:3000/toys")
    .then(function (response) {
      return response.json()
    }).then(function (json) {

      //Cycle through array of objects
      console.log(json);
      let card = document.createElement("div");
      card.class = "card";
      toyCollection.appendChild(card);
    });


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
