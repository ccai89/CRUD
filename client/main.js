document.addEventListener('DOMContentLoaded', () => {
  // creates title for the page
  const title = document.createElement('h1');
  title.innerText = 'To Do List:';

  // First get the body tag in-order to append the h1 element.
  document.querySelector('body').appendChild(title);

  // creates general interaction box
  const inputContainer = document.createElement('div');
  inputContainer.setAttribute('style', 'width: 420px; height: 250px; border: 2px solid black');
  document.querySelector('body').appendChild(inputContainer);

  // creates title for subject area
  const subjectContainer = document.createElement('div');
  subjectContainer.setAttribute('id', 'subjectArea');
  subjectContainer.setAttribute('style', 'margin-left: 10px');
  subjectContainer.innerText = 'Task Name:';

  // input field for subject
  const subjectInput = document.createElement('input');
  subjectInput.setAttribute('type', 'text');
  subjectInput.setAttribute('style', 'margin: 10px; width: 200px');
  subjectInput.setAttribute('id', 'subjectInput');

  // creates title for description box
  const descriptionContainer = document.createElement('div');
  descriptionContainer.setAttribute('id', 'subjectArea');
  descriptionContainer.setAttribute('style', 'margin-left: 10px');
  descriptionContainer.innerText = 'Description:';

  // input field for description
  const descriptionInput = document.createElement('input');
  descriptionInput.setAttribute('type', 'text');
  descriptionInput.setAttribute('style', 'margin: 10px; width: 400px; height: 120px');
  descriptionInput.setAttribute('id', 'subjectInput');

  // submit button
  const submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'submit');
  submitButton.setAttribute('style', 'margin-left: 10px');
  submitButton.innerText = 'submit';

  // update button
  const updateButton = document.createElement('button');
  updateButton.setAttribute('type', 'submit');
  updateButton.setAttribute('style', 'margin-left: 10px');
  updateButton.innerText = 'update';

  // renders all the components inside general interaction box
  inputContainer.appendChild(subjectContainer);
  inputContainer.appendChild(subjectInput);
  inputContainer.appendChild(descriptionContainer);
  inputContainer.appendChild(descriptionInput);
  inputContainer.appendChild(submitButton);
  inputContainer.appendChild(updateButton);

  // line break between areas
  document.querySelector('body').appendChild(document.createElement('br'));

  // Card container
  const cardContainer = document.createElement('div');
  document.querySelector('body').appendChild(cardContainer);

  const getTasks = () => {
    fetch('/all')
      .then(response => response.json())
      .then(data => {
        data.forEach((el, i) => {
          // initializing card and styling it
          const card = document.createElement('div');
          card.setAttribute('id', `card${el._id}`)
          card.setAttribute('style', 'width:380px; height: 175px; padding: 5px; margin: 10px; border: 2px solid black');

          // setting values for each element
          const subject = document.createElement('p');
          subject.innerText = `subject:  ${el.subject}`;
          const description = document.createElement('p');
          description.innerText = `description:  ${el.description}`;

          // delete button
          const deleteButton = document.createElement('button');
          deleteButton.setAttribute('class', 'deleteButton')
          deleteButton.setAttribute('type', 'submit');
          deleteButton.setAttribute('style', 'margin-left: 10px');
          deleteButton.innerText = 'delete';

          // creating each card
          cardContainer.appendChild(card);

          // rendering elements in each card 
          card.appendChild(subject);
          card.appendChild(description);
          card.appendChild(deleteButton);

          deleteButton.addEventListener('click', remove)
          
        })
      })
      .catch(err => console.log(err));
  }

  function remove(){
    this.closest('div').remove();
  }

  // making a post request to send to do to db
  const submitTask = () => {
    fetch('/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: subjectInput.value,
        description: descriptionInput.value
      })
    })
      .then(() => {
        getTasks();
        console.log('sent to db')
      })
  }

  const deleteTask = () => {
    fetch('/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        id: ''
      })
    });
  }

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    submitTask();
  })
  


  getTasks();
});