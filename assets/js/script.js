const apiUsers = document.getElementById('api-users');
const ulElement = document.getElementById('ul-list');
const btnLoad = document.getElementById('button-load');
const btnLoadPrev = document.getElementById('button-prev');
let currentPage = 1;
let totalPages;

function getUsersInfo (page) {
  fetch('https://reqres.in/api/users?page=' + page, {
    method: 'GET',
  })
    .then( function(response) {
      if(!response.ok) {
        throw response.status;
      }
        return response.json();
    })
    
    .then( function(responseData) {

      const fragment = document.createDocumentFragment();

      responseData.data.forEach((element) => {
        // console.log(element)
        const li = document.createElement('li');
        li.textContent = `${element.first_name} ${element.last_name}`;

        const userPic = document.createElement('img');
        userPic.setAttribute('src', element.avatar);
        userPic.setAttribute('alt', 'User Picture');
        li.appendChild(userPic);
        fragment.appendChild(li);

    });
    ulElement.innerHTML = " ";
    ulElement.appendChild(fragment);

    totalPages = responseData.total_pages;

        if (currentPage == totalPages) {
            btnLoad.classList.add('btn')
        } else if (currentPage < totalPages){
            btnLoad.classList.remove('btn')
        };

        if (currentPage === 1) {
            btnLoadPrev.classList.add('btn')
        }else if (currentPage > 1) {
            btnLoadPrev.classList.remove('btn')
        };
    })

    .catch( function(error) {

    if (error == 404) {
        const pDesc = document.createElement('p');
        pDesc.textContent = 'Page Not Found';
        apiUsers.appendChild(pDesc);
    }
    })
}

btnLoad.addEventListener('click' , function() {
    if(currentPage == totalPages) {
        return;
    }
    currentPage ++;
    getUsersInfo(currentPage);
})

btnLoadPrev.addEventListener('click' , function() {
    if(currentPage === 1) {
        return;
    }
    currentPage --;
    getUsersInfo(currentPage);
})

getUsersInfo(currentPage);

// POST EXAMPLE //
const divWrapper = document.getElementById('post-block');

function ajax () {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    request.addEventListener('load', function() {
        // console.log(this.responseText);
        const textDataJS = JSON.parse(this.responseText);
        console.log(textDataJS);

        textDataJS.forEach(element => {
            // console.log(element)
            createPost(element);
        })
    })
    request.send();
}
ajax();

function createPost (item) {
    const divContainer = document.createElement('div');
    divContainer.classList.add('post')

    const h3Post = document.createElement('h3');
    h3Post.innerText = item.title;

    const h2Post = document.createElement('h2');
    h2Post.innerText = item.id;

    divContainer.appendChild(h2Post);
    divContainer.appendChild(h3Post);

    divWrapper.appendChild(divContainer);
}