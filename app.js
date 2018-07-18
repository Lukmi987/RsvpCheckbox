const form = document.getElementById('registrar');
const input = form.querySelector('input');

const mainDiv = document.querySelector('.main');
const ul = document.getElementById('invitedList');

const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckBox = document.createElement('input');

filterLabel.textContent = "Hide those who haven't responded";
filterCheckBox.type = 'checkbox';
div.appendChild(filterLabel);
div.appendChild(filterCheckBox);

function createLI(text){
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;
  li.appendChild(span);
  const label = document.createElement('label');
  label.textContent = 'Confirmed';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  label.appendChild(checkbox);
  li.appendChild(label);
  const editbutton = document.createElement('button');
  editbutton.textContent = 'Edit';
  li.appendChild(editbutton);

  const removeButton = document.createElement('button');
  removeButton.textContent = 'remove';
  li.appendChild(removeButton);
  return li;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = '';
  const li = createLI(text);
  ul.appendChild(li);
});

ul.addEventListener('change', (event) => {
  const checkbox = event.target;

  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;
  if (checked) {
    listItem.className = 'responded'
  } else {
    listItem.className = '';
  }
});

ul.addEventListener('click', (e) => {
if(e.target.tagName === 'BUTTON') {
  const button = e.target;
  const li  = e.target.parentNode;
  const ul = li.parentNode;
  if(button.textContent === 'remove'){
  ul.removeChild(li) ;

  } else if(button.textContent === 'Edit'){

  const span = li.firstElementChild;
  const input = document.createElement('input');
  input.type = 'tesxt';
  input.value = span.textContent;
  li.insertBefore(input, span); // new input element before the span
  li.removeChild(span);
  button.textContent = 'save';
} else if (button.textContent === 'save') {
   const input = li.firstElementChild;
   const span = document.createElement('span');
   span.textContent = input.value;
   li.insertBefore(span, input);
   li.removeChild(input);
   button.textContent = 'Edit';
  console.log(span);
}
}});
