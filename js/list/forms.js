"use strict"

//form validate
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {

    let error = formValidate(form);

    if (error > 0) {
      e.preventDefault();
    }
  }


  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if (!checkEmail(input)) {
          error++;
          formAddError(input);
        }
      } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
        error++;
        formAddError(input);
      } else {
        if (input.value === '') {
          error++;
          formAddError(input);
        }
      }
    }
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }

  function checkEmail(input) {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if (EMAIL_REGEXP.test(input.value) == false) {
      return 0;
    } else {
      return 1;
    }
  }
});


//лимит по длинне
const input = document.querySelector('.input');
const textLimit = input.getAttribute('maxlength');
const textCount = document.getElementById('textCounter');
textCount.innerHTML = `${textLimit} word left`;
input.addEventListener('keydown', keydown);
input.addEventListener('keyup', keyup);
function keydown(event) {
  if (event.repeat) {
    keyup();
  }
}
function keyup() {
  const textKol = textLimit - input.value.length;
  textCount.innerHTML = `${textKol} word left`;
}


//custom select
const selects = document.querySelectorAll('select');
let arr = [];

if (selects.length > 0) {
  for (let index = 0; index < selects.length; index++) {
    const select = selects[index];

    selects[index].classList.add('_hidden');
    for (let j = 0; j < select.options.length; j++) {
      const option = select.options[j];
      arr.push(option.text);
    }
    createSelect(select, select.options.length, arr);
  }
}

function createSelect(select, dl, arr) {

  const selectNew = document.createElement('div');
  selectNew.classList.add('_select');

  const selectNewText = document.createElement('span');
  selectNewText.classList.add('_select_text');
  selectNewText.innerHTML = `first`;

  const selectNewBody = document.createElement('div');
  selectNewBody.classList.add('_select_body');

  select.after(selectNew);
  selectNew.append(selectNewBody);
  selectNew.append(selectNewText);

  for (let index = 0; index < dl; index++) {
    const optionNew = document.createElement('div');
    optionNew.classList.add('_option');

    const el = arr[index];
    optionNew.innerHTML = `${el}`;
    optionNew.setAttribute("data-value", index + 1);

    selectNewBody.append(optionNew);

    optionNew.addEventListener("click", function (e) {
      selectNewText.innerHTML = `${el}`;
    });
  }

  selectNew.addEventListener('click', function (e) {
    selectNewBody.classList.toggle('_active');
    selectNewText.classList.toggle('_active');
  });
}