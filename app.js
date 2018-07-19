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
mainDiv.insertBefore(div,ul);

//filtering Confirmed guests
filterCheckBox.addEventListener('click', (e)=>{
const isChecked = e.target.checked;
const list = ul.children;
if(isChecked){
  for (let i = 0; i < list.length; i += 1){
    let li = list[i];
    if (li.className === 'responded') { //means checkbox is clicked
        li.style.display = ''; // empty string will allow it to pick up its previous style
      } else {
        li.style.display = 'none'; // we can hide element by setting its css display property to none
      }
  }

} else { //case when we want to show all the guests whether they responded or not, button hide those is not clicked
    for (let i = 0; i < list.length; i += 1){
      let li = list[i];
      li.style.display = '';
    }
  }
});

function createLI(text){
  const li = document.createElement('li');

  function createElement(elementName,property, value){
    const element = document.createElement(elementName);
    element[property] = value;//to access the property on element we'll need to use brackets syntax
    return element;
  }

  function appendToLI(elementName,property, value){
    const element = createElement(elementName,property, value); //we call above function
    li.appendChild(element);
    return element;
  }

//these 3 line in one function
// const span = document.createElement('span');
//   span.textContent = text;
//   li.appendChild(span);
  appendToLI('span','textContent', 'text');

  //const label = createElement('label','textContent', 'Confirmed');
  //const checkbox = createElement('input','type', 'checkbox');
  //label.appendChild(checkbox);
//  li.appendChild(label);
// or shorter way
  appendToLI('label','textContent', 'Confirmed').appendChild(createElement('input','type','checkbox'));

  appendToLI('button','textContent', 'Edit');
  appendToLI('button','textContent', 'remove');

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

//To simplify the way you manipulate a text element, you can turn it into an HTML element.
