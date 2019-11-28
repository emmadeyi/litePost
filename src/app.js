import 'babel-polyfill'; //to allow async await
import { http } from './modules/easyHTTP';
import './scss/style.scss';
import { ui } from './modules/UI';

//Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);
//Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);
//Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);
//Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);
//Listen for delete 
document.querySelector('#posts').addEventListener('click', deletePost);


//Get post from API
function getPosts() {
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err))
}

// Add Post
function submitPost() {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;

    // Validate input
    if (title === '' || body === '') {
        ui.showAlert('Please fill in all field', 'alert alert-danger');
    } else {
        const data = {
            title,
            body
        }

        if (id === '') {
            //Create Post
            http.post('http://localhost:3000/posts', data)
                .then(data => {
                    ui.showAlert('Post Added', 'alert alert-success');
                    ui.clearFields();
                    getPosts();
                })
                .catch(err => console.log(err));
        } else {
            //Update Post
            http.put(`http://localhost:3000/posts/${id}`, data)
                .then(data => {
                    ui.showAlert('Post Updated', 'alert alert-success');
                    ui.changeFormState('add');
                    getPosts();
                })
                .catch(err => console.log(err));
        }

    }

}

// Enable Edit State
function enableEdit(e) {

    if (e.target.parentElement.classList.contains('edit')) {
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;

        const data = {
            id,
            title,
            body
        }

        // fill form with current post
        ui.fillForm(data);
    }

    e.preventDefault();
}

// Cancel Edit State
function cancelEdit(e) {
    if (e.target.classList.contains('post-cancel')) {
        ui.changeFormState('add');
    }

    e.preventDefault();
}

function deletePost(e){
    if(e.target.parentElement.classList.contains('delete')){
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

        //Delete Post
        http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
            ui.showAlert('Post Deleted', 'alert alert-success');
            ui.changeFormState('add');
            getPosts();
        })
        .catch(err => console.log(err));
        
    }
}
