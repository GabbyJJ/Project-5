let employeeList;
//This function calls the Random User Generator API.
$.ajax({
  url: "https://randomuser.me/api/?results=12",
  dataType: "json",
  success: function (data) {
    console.log(data);
    employeeList = data.results;
    showPage();
    getCards();
  },
});
//This function runs through the list of the cards.
function showPage() {
  let gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  for (let i = 0; i < employeeList.length; i++) {
    const employeeCard = `<div class="card">

    <div class="card-img-container">
        <img
          class="card-img"
          src=${employeeList[i].picture.large}
          alt="profile picture"
        />
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${employeeList[i].name.first} ${employeeList[i].name.last}</h3>
        <p class="card-text">${employeeList[i].email}</p>
        <p class="card-text cap">${employeeList[i].location.city}${employeeList[i].location.state}</p>
      </div>
    </div>
    `;
    gallery.insertAdjacentHTML("beforeend", employeeCard);
  }
}

//This allows you to go through the cards.
function getCards() {
  let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function () {
      showModal(i);
    });
  }
}
//Displays the data and shows the modal
function showModal(i) {
  var modal = `  <div class="modal-container">
                <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${
            employeeList[i].picture.large
          }" alt="profile picture">
          <h3 id="name" class="modal-name cap">${employeeList[i].name.first} ${
    employeeList[i].name.last
  }</h3>
          <p class="modal-text">${employeeList[i].email}</p>
          <p class="modal-text cap">${employeeList[i].location.city}${
    employeeList[i].location.state
  }</p>
          <hr>
          <p class="modal-text">${formatedNumber(employeeList[i].cell)}</p>
          <p class="modal-text">${employeeList[i].location.street.number} ${
    employeeList[i].location.street.name
  }${employeeList[i].location.city}, ${employeeList[i].location.state} ${
    employeeList[i].location.postcode
  }</p>
          <p class="modal-text">Birthday:${employeeList[i].dob.date.slice(
            5,
            7
          )}/${employeeList[i].dob.date.slice(8, 10)}/${employeeList[
    i
  ].dob.date.slice(2, 4)} </p>
      </div>
  </div>`;
  document.body.insertAdjacentHTML("afterbegin", modal);
  modalRemove();
}

//When your click the x button this will allow you to close the modal after each user.
function modalRemove() {
  let exitModalButton = document.getElementById("modal-close-btn");
  let modalContainer = document.querySelector(".modal-container");

  exitModalButton.addEventListener("click", () => {
    modalContainer.hidden = true;
  });
}
//This function is to format the telephone number
function formatedNumber(phoneNumberString) {
  let removeNumbers = ("" + phoneNumberString).replace(/\D/g, "");
  while (removeNumbers.length < 10) {
    removeNumbers = removeNumbers + "0";
  }
  let num = removeNumbers;
  return (
    "(" +
    num.substring(0, 3) +
    ") " +
    num.substring(3, 6) +
    "-" +
    num.substring(6, 10)
  );
}
