let addToy = false;
const createBtn = document.querySelector(".submit");

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");

  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");

  fetch("http://localhost:3000/toys")
    .then(function (response) {
      return response.json()
    }).then(function (json) {
      console.log(json);
      for (const element of json) {
        let card = document.createElement("div");
        card.className = "card";

        let name = document.createElement("h2");
        name.innerHTML = element.name;
        card.appendChild(name);

        let img = document.createElement("img");
        img.src = element.image
        img.className = "toy-avatar";
        card.appendChild(img);

        let likes = document.createElement("p");
        likes.innerHTML = element.likes;
        card.appendChild(likes);

        let button = document.createElement("button");
        button.innerHTML = "Like <3";
        button.className = "like-btn";
        card.appendChild(button);

        button.addEventListener("click", (e) => {
          e.preventDefault();

          let newLikes = parseInt(element.likes, 10) + 1;
          let likeData = {
            "likes": newLikes
          }

          let likeConfig = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify(likeData)
          };

          fetch(`http://localhost:3000/toys/${element.id}`, likeConfig)
            .then(function (response) {
              return response.json();
            })
            .then(function (json) {
              likes.innerHTML = newLikes;
            })


        });

        toyCollection.appendChild(card);
      }
    });


  addBtn.addEventListener("click", () => {
    // hide & seek with the for
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


createBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let inputFields = document.getElementsByClassName("input-text");
  let newToyName = "";
  let newToyImg = "";

  for (const element of inputFields) {
    if (element.name == "name") {
      newToyName = element.value;
    }
    else if (element.name == "image") {
      newToyImg = element.value;
    }
  }

  let toyData = {
    "name": newToyName,
    "image": newToyImg,
    "likes": 0
  }

  let toyConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyData)
  };

  fetch("http://localhost:3000/toys", toyConfig)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);
    })


});

