'use strict';

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
