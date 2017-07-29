const form = document.getElementById('registrar'),
      input = document.querySelector('input'),
      ul = document.getElementById('invitedList'),
      div = document.createElement('div'),
      filterLabel = document.createElement('label'),
      filterCheckbox = document.createElement('input'),
      mainDiv = document.querySelector('.main');

filterLabel.textContent = "Hide those who haven't RSVPed";
filterCheckbox.type = 'checkbox';
div.appendChild(filterLabel);
div.appendChild(filterCheckbox);
mainDiv.insertBefore(div, ul);

function createElement(name, property, value) {
    const element = document.createElement(name);
    element[property] = value;
    return element;
}

filterCheckbox.addEventListener('change', (e) => {
    const isChecked = e.target.checked,
          lis = ul.children;

    if(isChecked) {
        for(let i = 0; i < lis.length; i++ ) {
            const li = lis[i];
            if(li.className === 'responded') {
                li.style.display = '';
            } else {
                li.style.display = 'none';
            }
        }
    } else {
        for(let i = 0; i < lis.length; i++ ) {
            lis[i].style.display = '';
        }
    }
});


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = input.value,
          label = createElement('label', 'textContent', 'Confirmed'),
          li = document.createElement('li'),
          checkbox = createElement('input', 'type', 'checkbox'),
          removeBtn = createElement('button', 'textContent', 'remove'),
          editBtn = createElement('button', 'textContent', 'edit'),
          span = createElement('span','textContent',text);

    label.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(label);
    li.appendChild(editBtn);
    li.appendChild(removeBtn);
    ul.appendChild(li);

    input.value = '';
});

ul.addEventListener('change', (e) => {
    const checkbox = e.target,
          li = checkbox.parentNode.parentNode;

    if(checkbox.checked){
        li.className = 'responded';
    } else {
        li.className = '';
    }
});

ul.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
        const button = e.target,
              li = button.parentNode,
              ul = li.parentNode,
              action = button.textContent,
              nameActions = {
                  remove: () => {
                      ul.removeChild(li);
                  },
                  edit: () => {
                      const span = li.firstElementChild,
                            input = createElement('input', 'type', 'text');
                      input.value = span.textContent;
                      li.insertBefore(input, span);
                      li.removeChild(span);
                      button.textContent = 'save';
                  },
                  save: () => {
                      const input = li.firstElementChild,
                            span = createElement('span', 'textContent', input.value);
                      li.insertBefore(span, input);
                      li.removeChild(input);
                      button.textContent = 'edit';
                  }
              };
        //select and run action depending on the button text
        nameActions[action]();
    }
})
