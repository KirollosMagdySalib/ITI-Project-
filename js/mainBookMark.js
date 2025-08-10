var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");
var errorMessage = document.getElementById("errorMessage");
var rowData = document.getElementById("row");
var webList;

if (localStorage.getItem("webs") !== null) {
  webList = JSON.parse(localStorage.getItem("webs"));
  console.log(webList);
  display();
} else {
  webList = [];
}

function addWeb() {
  if (validateForm(siteNameInput) && validateForm(siteUrlInput)) {
    var webs = {
      name: siteNameInput.value.trim(),
      url: siteUrlInput.value.trim(),
    };

    if (validName(webs.name) && validUrl(webs.url)) {
      webList.push(webs);
      localStorage.setItem("webs", JSON.stringify(webList));
      console.log("added");
      clearForm();
      display();
    } else {
      console.log("must be an error");
      showInputErrorMessage();
    }
  } else {
    showInputErrorMessage();
  }
}
function clearForm() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}

function display() {
  var cartoona = "";

  // ----------------- bookmarks اليدوية -----------------
  for (var i = 0; i < webList.length; i++) {
    cartoona += `
    <tr>
      <td class="text-center">${i + 1}</td>
      <td class="text-center">${webList[i].name}</td>
      <td colspan="2" class="text-center">
        <div class="d-flex flex-row justify-content-center gap-2">
          <a href="${webList[i].url}" class="w-50">
    <button class="btn btn-success w-100">Visit</button>
</a>

          <button class="btn btn-danger w-50" onclick="deleteRow(${i})">Delete</button>
        </div>
      </td>
    </tr>`;
  }

  // ----------------- bookmarks التلقائية (من زر Bookmark) -----------------
  const bookmarkedRecipes =
    JSON.parse(localStorage.getItem("bookmarkedRecipes")) || [];

  for (let i = 0; i < bookmarkedRecipes.length; i++) {
    cartoona += `
    <tr>
      <td class="text-center">${webList.length + i + 1}</td>
      <td class="text-center">${bookmarkedRecipes[i].title}</td>
      <td colspan="2" class="text-center">
        <div class="d-flex flex-row justify-content-center gap-2">
          <a href="${bookmarkedRecipes[i].url}" class="w-50">
    <button class="btn btn-success w-100">Visit</button>
</a>

          <button class="btn btn-danger w-50" onclick="deleteRecipeBookmark(${i})">Delete</button>
        </div>
      </td>
    </tr>`;
  }

  rowData.innerHTML = cartoona;
}

function deleteRecipeBookmark(index) {
  let bookmarkedRecipes =
    JSON.parse(localStorage.getItem("bookmarkedRecipes")) || [];
  bookmarkedRecipes.splice(index, 1);
  localStorage.setItem("bookmarkedRecipes", JSON.stringify(bookmarkedRecipes));
  display();
}

function validName(name) {
  if (name.length < 3) {
    showInputErrorMessage();
    return false;
  }
  return true;
}

function validUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    showInputErrorMessage();
    return false;
  }
}

function showInputErrorMessage() {
  var cartoona = `
        <div class="error-message position-absolute flex-column">
            <button type="button" class="btn-close position-absolute top-0 end-0 mt-2 m-lg-2" aria-label="Close" onclick="closeErrorBox()"></button>
            <span class="position-relative top-0 p-3 bg-danger m-4 rounded-circle"></span>
            <span class="position-relative top-0 p-3 bg-warning m-4 rounded-circle"></span>
            <span class="position-relative top-0 p-3 bg-success m-4 rounded-circle"></span>
            <h5>Site Name or Url is not valid, Please follow the rules below:</h5>
            <p class="conditions mx-5"><i class="fa-regular fa-circle-right" style="color: #ff0000;"></i> Site name must contain at least 3 characters</p>
            <p class="conditions mx-5"><i class="fa-regular fa-circle-right" style="color: #ff0000;"></i> Site URL must be a valid one</p>
        </div>`;
  errorMessage.innerHTML = cartoona;
}

function closeErrorBox() {
  errorMessage.innerHTML = "";
}

function showInputErrorMessage() {
  var cartoona = `<div  class="error-message position-absolute flex-column">
          <button type="button" class="btn-close  position-absolute top-0 end-0 mt-2 m-lg-2" aria-label="Close" onclick="closeErrorBox()" ></button>
            <span class="position-relative top-0 p-3 bg-danger m-4 rounded-circle"></span>
            <span class="position-relative top-0 p-3 bg-warning m-4 rounded-circle"></span>
            <span class="position-relative top-0 p-3 bg-success m-4 rounded-circle"></span>
            <h5 >Site Name or Url is not valid, Please follow the rules below :</h5>
            <p class="conditions mx-5"><i class="fa-regular fa-circle-right" style="color: #ff0000;"></i>Site name must contain at least 3 characters</p>
            <p class="conditions mx-5"><i class="fa-regular fa-circle-right" style="color: #ff0000;"></i>Site URL must be a valid one</p>
        </div>`;
  errorMessage.innerHTML = cartoona;
}

function closeErrorBox() {
  const errorBox = document.getElementById("errorMessage");
  errorMessage.innerHTML = "";
}

function validateForm(element) {
  // regex=/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
  regex = {
    siteUrlInput:
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i,
    siteNameInput: /^[a-zA-Z_]{3}/,
  };
  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.remove("d-none");
    return false;
  }
}

function deleteRow(index) {
  webList.splice(index, 1);
  localStorage.setItem("webs", JSON.stringify(webList));
  display();
}
