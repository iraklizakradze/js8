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