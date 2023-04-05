const apiEndpoint = "https://reqres.in/api/users?page=";
let currentPage = 1;

function fetchUsers(page) {
  fetch(apiEndpoint + page)
    .then(response => response.json())
    .then(data => {
      const users = data.data;
      const totalPages = data.total_pages;
      updatePagination(totalPages);
      updateCards(users);
    })
    .catch(error => console.error(error));
}

function updateCards(users) {
  const cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = ""; //clear previous cards
  users.forEach(user => {  // update the .card-container to display newy fetched cards
    const card = document.createElement("div");
    card.classList.add("card");
    const avatar = document.createElement("img");
    avatar.src = user.avatar;
    const name = document.createElement("h2");
    name.textContent = user.first_name + " " + user.last_name;
    const email = document.createElement("p");
    email.textContent = user.email;
    card.appendChild(avatar);
    card.appendChild(name);
    card.appendChild(email);
    cardContainer.appendChild(card);
  });
}

function updatePagination(totalPages) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {     //buttons for pagination
    const button = document.createElement("a");
    button.href = "#";
    button.textContent = i;
    if (i === currentPage) {
      button.classList.add("active");
      button.disabled = true;
    }
    button.addEventListener("click", function(event) {
      event.preventDefault();
      currentPage = i;
      fetchUsers(currentPage);
    });
    paginationContainer.appendChild(button);
  }
}

fetchUsers(currentPage); //default to load
