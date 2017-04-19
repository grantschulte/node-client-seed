import "./styles/user-item.scss";

function fetchUsers() {
  const url  = "http://localhost:5000/user/users";
  const opts = { method: "GET", mode: "cors" };
  const req  = new Request(url, opts);

  fetch(req)
    .then(res => {
      return res.json();
    })
    .then(json => {
      handleJson(json);
    })
    .catch(error => {
      handleError(error);
    });
}

function handleJson(json) {
  const container = document.getElementById("container");
  const items     = document.createDocumentFragment();

  json.forEach(user => {
    let userItem = document.createElement("div");
    userItem.classList.add("user-item");
    userItem.innerHTML = `<div>${user.username}</div>`;
    userItem.innerHTML += `<div>${user._id}</div>`;
    items.appendChild(userItem);
  });

  container.appendChild(items);
}

function handleError(error) {
  console.log("ERROR", error);
}

window.onload = () => {
  console.log("Initialized");
  fetchUsers();
}
