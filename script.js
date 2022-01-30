const setid = document.querySelector(".setid");
const form = document.querySelector("#regForm");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");

// const emailInput = document.querySelector("#email");
const print = document.querySelector("#print");
let userId = (setid.innerHTML = `ID: ${Date.now().toString()}  `);

let users = [
  {
    id: "3123",
    firstName: "Rohny",
    lastName: "Mantilla",
    email: "ecu_runy@hotmail.com",
  },
  {
    id: "31234",
    firstName: "Paula",
    lastName: "Mantilla",
    email: "paula@hotmail.com",
  },
];

const validateText = (input) => {
  if (input.value.trim() === "") {
    setError(input, "Name can't be empty");
    return false;
  } else if (input.value.trim().length < 2) {
    setError(input, "Name must be atleast 2 chars long");
    return false;
  } else {
    setSuccess(input);
    return true;
  }
};

const validateEmail = (email) => {
  let regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  function sameEmail(email) {
    if (users.find((user) => user.email === email.value)) {
      return false;
    }
  }

  console.log(sameEmail(email));

  if (email.value.trim() === "") {
    setError(email, "You need to enter a email address");
    return false;
  } else if (!regEx.test(email.value)) {
    setError(email, "Email address is not valid");
    return false;
  } else if (sameEmail(email) == false) {
    // console.log("sameEmail");
    setError(email, "This mail is already in the list");
    return false;
  } else {
    setSuccess(email);
    return true;
  }
};

const setError = (input, textMessage) => {
  const parent = input.parentElement;
  parent.classList.add("is-invalid");
  parent.classList.remove("is-valid");
  parent.querySelector(".invalid-input").innerText = textMessage;
  input.focus();
};

const setSuccess = (input) => {
  const parent = input.parentElement;
  parent.classList.remove("is-invalid");
  // parent.classList.add("is-valid");
};

const cleaner = (input) => {
  const parent = input.parentElement;
  parent.classList.remove("is-valid");
};

const validate = (input) => {
  switch (input.type) {
    case "text":
      return validateText(input);
    case "email":
      return validateEmail(input);

    default:
      break;
  }
};

const printUser = () => {
  print.innerHTML = "";
  users.forEach((user) => {
    print.innerHTML += ` 
    <div class="userWrapper">
          <div class="user-content">
            <div class="user">
              <p>${user.firstName} ${user.lastName}</p>
              <a href="mailto:${user.email}"> <small>${user.email}</small> </a>
              <div id="${user.id}">

              <button id="edit" class="pen">
                <i class="fas fa-pen-square"></i>
              </button>
              <button id="delete"class="times">
                <i class="fas fa-times-square"></i>
              </button>
              </div>

            </div>
          </div>
        </div>`;
  });
};

printUser();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  errors = [];

  for (let i = 0; i < form.length; i++) {
    errors[i] = validate(form[i]);
  }
  console.log(errors);

  if (!errors.includes(false)) {
    const user = {
      id: userId,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
    };
    users.push(user);
    printUser();

    swal("Good job!", "You clicked the button!", "success", {
      button: "Yess!",
    });
  }
  userId = setid.innerHTML = `ID: ${Date.now().toString()}  `;
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  cleaner(email);
});

//edit and delet

const btnEdit = document.querySelector("#edit");
const btnDelete = document.querySelector("#delete");

btnDelete.addEventListener("click", () => {
  users.forEach((user) => {
    printUser();
  });
});

btnEdit.addEventListener("click", (e) => {
  console.log(e.target.parentNode.id);
  const changeUser = users.find((user) => user.id === e.target.parentNode.id);
  console.log(changeUser);
});
