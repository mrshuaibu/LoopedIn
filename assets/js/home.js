'use strict';

const profilePic = document.getElementById('profilePic');
const dropdownMenu = document.getElementById('dropdownMenu');
const profile = document.querySelector('.profile');

profilePic.addEventListener('click', function (event) {
    profile.classList.toggle('active');
    // Prevent click from propagating to the document body
    event.stopPropagation();
});

const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
dropdownLinks.forEach(link => {
    link.addEventListener('click', function () {
        profile.classList.remove('active');
    });
});

window.addEventListener('scroll', function () {
    profile.classList.remove('active');
});

document.addEventListener('click', function (event) {
    if (!profile.contains(event.target)) {
        profile.classList.remove('active');
    }
});

document.querySelector('#fileUpload').addEventListener('change', (event) => {
    const fileNameElement = document.querySelector('#fileName');
    const file = event.target.files[0];

    if (file) {
        fileNameElement.textContent = file.name;
    } else {
        fileNameElement.textContent = 'No file selected';
    }
});

document.querySelector('.post-button').addEventListener('click', () => {
    const postText = document.querySelector('.text-area').value.trim();
    const postImageFile = document.querySelector('#fileUpload').files[0];
    const displayArea = document.querySelector('.display-area');
    const warningText = document.querySelector('.warning-text');  

    if (warningText) warningText.style.display = 'none';

    if (!postText && !postImageFile) {
        if (warningText) {
            warningText.style.display = 'block';
            warningText.textContent = `
            Please enter some text or upload an image to post!
            `;
        }
        return;
    }

    const postContainer = document.createElement('div');
    postContainer.classList.add('post');

    const postHeader = document.createElement('div');
    postHeader.classList.add('post-header');
    postHeader.innerHTML = `
        <img src="./assets/img/man.jpg" 
        alt="profile picture" 
        class="post-profile-pic"
        >
        <div class="post-info">
            <span class="post-user-name">Michael</span>
            <span class="post-date">${new Date().toLocaleString()}</span>
        </div>
    `;
    postContainer.appendChild(postHeader);

    if (postText) {
        const postTextElement = document.createElement('p');
        postTextElement.classList.add('post-text');
        postTextElement.textContent = postText;
        postContainer.appendChild(postTextElement);
    }

    if (postImageFile) {
        const postImageElement = document.createElement('img');
        postImageElement.classList.add('post-image');
        const reader = new FileReader();
        reader.onload = () => {
            postImageElement.src = reader.result;
        };
        reader.readAsDataURL(postImageFile);
        postContainer.appendChild(postImageElement);
    }

    displayArea.insertBefore(postContainer, displayArea.firstChild);

    document.querySelector('.text-area').value = '';
    document.querySelector('#fileUpload').value = '';

    const imagePreview = document.querySelector('#imagePreview');
    const fileNameElement = document.querySelector('#fileName');

    if (imagePreview) {
        imagePreview.style.display = 'none';
        imagePreview.src = '';
    }
    if (fileNameElement) {
        fileNameElement.textContent = 'No file selected';
    }
});

const inputFile = document.querySelector('#fileUpload');
const imagePreview = document.querySelector('#imagePreview');
const imageName = document.querySelector('#imageName');

document.addEventListener('DOMContentLoaded', function () {
    // makes sure the content is loaded after the html
    if (inputFile && imagePreview && imageName) {
        inputFile.addEventListener('change', function () {
            const file = inputFile.files[0];
            if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                };

                reader.readAsDataURL(file);

                imageName.textContent = file.name;
                console.log("File name set:", file.name);
            }
        });
    }
});

const feed = document.querySelector('.feed');
if (feed) {
    feed.style.overflowY = 'auto'; 
}

const userList = document.getElementById('user-list');
const suggestion = document.querySelector('#suggestion');

async function fetchRandomUsers() {
  try {
    const response = await fetch('https://randomuser.me/api/?results=10');
    const data = await response.json();

    userList.innerHTML = '';

    data.results.forEach((user) => {
      const userCard = document.createElement('div');
      userCard.className = 'user-card';

      userCard.innerHTML = `
        <img src="${user.picture.medium}" alt="${user.name.first} ${user.name.last}">
        <div class="name">${user.name.first} ${user.name.last}</div>
        <div class="city">${user.location.city}</div>
      `;

      userList.appendChild(userCard);
    });

    adjustUserGridHeight();
  } catch (error) {
    console.error('Error fetching random users:', error);
    userList.innerHTML = '<p>Unable to load suggestions at this time.</p>';
  }
}

function adjustUserGridHeight() {
    const suggestionHeight = suggestion.offsetHeight;
    const userGrid = document.querySelector('.user-grid');

   
    const availableHeight = suggestionHeight - 50; 

    userGrid.style.maxHeight = `${availableHeight}px`;
}

fetchRandomUsers();
