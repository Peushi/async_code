import { fetchData } from "./fetchData.js";
import { formFactory } from "./formFactory.js";
import { putData } from "./putData.js";

const remoteurl = "https://easy-simple-users-rest-api.onrender.com/api/users";
const localurl = "response.json";

const alert = document.querySelector(".alert");
const spinner = document.querySelector(".spinner-border");
const submitBtn = document.querySelector(".submit-btn");

let users = null;
const loadData = async () => {
  spinner.classList.remove("d-none");
  try {
    console.log("Fetching data...");
    const result = await fetchData(remoteurl);
    users = result.data;

    spinner.classList.add("d-none");

    if (users && users.length > 0) {
      alert.classList.remove("d-none");
      alert.classList.add("alert-success");
      alert.innerHTML = "Users loaded successfully!";
      console.log("Data loaded successfully:", users);
      displayUsers(users);
      addEventListeners(users);

    } else {
      alert.classList.remove("d-none");
      alert.classList.add("alert-danger");
      alert.innerHTML = "No users found.";
    }
  } catch (error) {
    spinner.classList.add("d-none");
    console.error("Failed to load data:", error.message);
    alert.classList.remove("d-none");
    alert.classList.add("alert-danger");
    alert.innerHTML = "Failed to load data.";
  }
};

const displayUsers = (localUsers) => {
  if (!localUsers || localUsers.length === 0) {
    alert.classList.remove("d-none");
    alert.classList.add("alert-danger");
    alert.innerHTML = "No users found.";
    return;
  }

  const usersContainer = document.getElementById("users-container");
  usersContainer.innerHTML = "";
  localUsers.forEach((user) => {
    usersContainer.innerHTML += `
        <article class="card col m-2">
            <img src="${user.avatar_url}" alt="${user.name}" class="card-img-top" />
            <div class="card-body">
                <h5 class="card-title">${user.name}</h5>
                <p class="card-text">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><strong>Age:</strong> ${user.age}</li>
                  <li class="list-group-item"><strong>Email:</strong> ${user.email}</li>
                  <li class="list-group-item"><strong>Gender:</strong> ${user.gender}</li>
                </ul>
                <button data-bs-target="#exampleModal" data-bs-toggle="modal" data-user-id="${user.id}" class="edit-btn btn-secondary m-2">Edit</button>
                </p>
            </div>
        </article>
        `;
  });
};

const addEventListeners = (users) => {
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      document.querySelector(".modal-body").innerHTML = "";
      document.querySelector(".modal-body").appendChild(formFactory());
      const foundUser = users.find(
        (user) => user.id === parseInt(e.target.getAttribute("data-user-id"))
      );
      getModalForm(foundUser);
    });
  });
  submitBtn.addEventListener("click", () => {
    console.log("Submit button clicked");
  });
  submitBtn.addEventListener("click", async () => {
    const dataToSend = {
      name: document.querySelector("#userName").value,
      age: document.querySelector("#userAge").value,
      avatar_url: document.querySelector("#UserImage").value,
      gender: document.querySelector("#UserGender").value,
      id: document.querySelector(".submit-btn").getAttribute("data-user-id"),
    };

    document.querySelector(".modal-body").innerHTML = `
            <div class="d-flex justify-content-center align-items-center" style="height: 312px;">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;

    try {
      const response = await putData(remoteurl, dataToSend);

      if (response) {
        // add spinner
        document.querySelector(".modal-body").innerHTML = `
            <div class="d-flex justify-content-center align-items-center" style="height: 312px;">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `

        const myModal = document.getElementById("exampleModal");
        const modal = bootstrap.Modal.getInstance(myModal);

        updateCard(dataToSend); 

        setTimeout(() => {
          modal.hide();
          addEventListeners(users); 
        }, 700);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
      document.querySelector(".modal-body").innerHTML = `
            <div class="d-flex flex-column justify-content-center align-items-center" style="height: 312px;">
                <div class="alert alert-danger w-100" role="alert">
                    ${error.message}
                </div>
                <p class="mark">${error.stack}</p>
            </div>
            `;
    }
  });
};

const getModalForm = (foundUser) => {
  const modalForm = document.querySelector(".modal-body").querySelector("form");

  modalForm.userName.value = foundUser.name;
  modalForm.userAge.value = foundUser.age;
  modalForm.UserImage.value = foundUser.avatar_url;
  modalForm.UserGender.value = foundUser.gender;
  submitBtn.setAttribute("data-user-id", foundUser.id);
};
const updateCard = (user) => {
  const cardsArray = Array.from(document.querySelectorAll(".card"));

  const foundCard = cardsArray.find((card) => {
    return (
      parseInt(card.querySelector("button").getAttribute("data-user-id")) ===parseInt(user.id)
    );
  });
  foundCard.innerHTML = `
				<div class="card-image p-3">
					<img src="${user.avatar_url}" alt="${user.name}" height="254px" class="card-img-top object-fit-cover" />
					<span class="card-title">${user.name}</span>
				</div>

				<div class="card-content">
					<ul class="list-group">
						<li class="list-group-item"><strong>Name: </strong>${user.name}</li>
						<li class="list-group-item"><strong>Age: </strong>${user.age}</li>
						<li class="list-group-item">
							<strong>Gender: </strong> ${user.gender}
						</li>
					</ul>
					<button data-user-id="${user.id}" data-bs-target="#exampleModal" data-bs-toggle="modal" class="edit-btn btn btn-secondary m-2">Edit</button>
				</div>

`;
};
await loadData();
