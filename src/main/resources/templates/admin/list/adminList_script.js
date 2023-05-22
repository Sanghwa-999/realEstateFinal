fetch('http://localhost:8080/api/v1/real_estate')
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('#datatable');

    // Clear existing items in the container
    container.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      if (item.district === 1) {
        const div = document.createElement('div');
        div.id = 'item-' + item.id;
        div.className = 'row';

        const image = document.createElement('img');
        image.src = `../../images/${item.id}/${item.id}_1.jpeg`;
        image.alt = '';
        image.width = 300;
        image.height = 170;
        image.className = 'col-3';

        const title = document.createElement('div');
        title.textContent = item.title;
        title.setAttribute("style", "white-space: pre-wrap; font-size: 14px");
        title.className = 'col-5';


        const price = document.createElement('div');
        price.className = 'col-1';
        price.textContent = item.price;


        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.className = 'btn btn-success col-1 mx-1';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
          const itemId = item.id;
          window.location.href = `../edit/admin_edit.html?id=${itemId}`;
        });

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'btn btn-danger col-1 mx-1';
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', () => {
          deleteItem(item.id, div);
        });

        div.appendChild(image);
        div.appendChild(title);
        div.appendChild(price);
        div.appendChild(editButton);
        div.appendChild(deleteButton);


        container.appendChild(div);
      }
    }
  })
  .catch(error => console.log(error));



function redirectToIndex() {
  window.location.href = '../login/loginpage.html';//huy will make the admin login page
}


function filterItemsByDistrict() {
  const selectElement = document.getElementById('districtSelect');
  const selectedDistrict = parseInt(selectElement.value);

  fetch('http://localhost:8080/api/v1/real_estate')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('datatable');

      // Clear existing items in the container
      container.innerHTML = '';

      for (let i = 0; i < data.length; i++) {
        const item = data[i];

        if (item.district === selectedDistrict) {
          const div = document.createElement('div');
          div.id = 'item-' + item.id;
          div.className = 'row'

          const image = document.createElement('img');
          image.src = `../../images/${item.id}/${item.id}_1.jpeg`;
          image.alt = '';
          image.width = 300;
          image.height = 100;
          image.className = 'col-3';

          const title = document.createElement('span');
          title.textContent = item.title;
          title.setAttribute("style", "white-space: pre-wrap; font-size: 14px");
          title.className = 'col-5';


          const price = document.createElement('span');
          price.className = 'col-1';
          price.textContent = item.price;

          const editButton = document.createElement('button');
          editButton.type = 'button';
          editButton.className = 'btn btn-success col-1 mx-1';
          editButton.textContent = 'Edit';
          editButton.addEventListener('click', () => {
            const itemId = item.id;
            window.location.href = `../edit/admin_edit.html?id=${itemId}`;
          });

          const deleteButton = document.createElement('button');
          deleteButton.type = 'button';
          deleteButton.className = 'btn btn-danger col-1 mx-1';
          deleteButton.textContent = 'Delete';

          deleteButton.addEventListener('click', () => {
            deleteItem(item.id, div);
          });

          div.appendChild(image);
          div.appendChild(title);
          div.appendChild(price);
          div.appendChild(editButton);
          div.appendChild(deleteButton);


          container.appendChild(div);
        }
      }
    })
    .catch(error => console.log(error));
}


//Delete an item
function deleteItem(itemId, div) {
  const deleteUrl = `http://localhost:8080/api/v1/real_estate/${itemId}`;

  fetch(deleteUrl, {
    method: "DELETE"
  })
  .then(response => response.json())
  .then(json => {
    console.log(json);
    // Perform any additional actions after successful deletion
    // ...
  })
  .catch(error => {
    console.error('Error:', error);
    // Handle the error case if the delete operation fails
    // ...
  });

  // Remove the item from the DOM
  const container = document.querySelector('#datatable');
  alert("delete successfully");
  container.removeChild(div);
}


const addButton = document.getElementById('addButton');

addButton.addEventListener('click', () => {
  // Redirect to admin_html
  window.location.href = '../add/admin_add.html';
});




