class UI {
    constructor() {
        this.posts = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.formState = 'add';
    }

    showPosts(posts) {
        let output = '';

        posts.forEach((post) => {
            output += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                        <a href="#" class="card-link edit" data-id="${post.id}">
                        <i class="fa fa-pencil"></i>
                        </a>
                        <a href="#" class="card-link delete" data-id="${post.id}">
                        <i class="fa fa-remove"></i>
                        </a>
                    </div>
                </div> 
            `
        });

        this.posts.innerHTML = output;
    }

    showAlert(msg, className){
        this.clearAlert();

        // Create div
        const div = document.createElement('div');
        // add classes
        div.className = className;
        // add text
        div.appendChild(document.createTextNode(msg));
        // get parent
        const container = document.querySelector('.postContainer');
        //Get posts
        const posts = document.querySelector('#posts');
        //insert alert div
        container.insertBefore(div, posts);

        //Timeout
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    clearAlert(){
        const currentAlert = document.querySelector('.alert');
        if(currentAlert){
            currentAlert.remove();
        }
    }

    //clear form fields
    clearFields(){
       this.titleInput.value = '';
       this.bodyInput.value = ''; 
    }

    //Fill form to edit
    fillForm(data){
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        this.changeFormState('edit');
    }

    // Change form state
    changeFormState(type){
        if(type === 'edit'){
            this.postSubmit.textContent = 'Update Post';
            this.postSubmit.className = 'post-submit btn btn-warning btn-block';

            if(document.querySelector('.post-cancel') === null){
                // Create cancel button
                const button = document.createElement('button');
                button.className = 'post-cancel btn btn-light btn-block';
                button.appendChild(document.createTextNode('Cancel Edit'));
    
                // Get parent
                const cardForm = document.querySelector('.card-form');
                // Get element to  insert before
                const formEnd = document.querySelector('.form-end');
                // Insert cnacel button
                cardForm.insertBefore(button, formEnd); 
            }

        }else{
            //Add State

            this.postSubmit.textContent = 'Post it';
            this.postSubmit.className = 'post-submit btn btn-primary btn-block';

            // Remove cancel btn if exist
            if(document.querySelector('.post-cancel')){
                document.querySelector('.post-cancel').remove();
            }

            // Clear ID from hidden field
            this.clearIdInput();
            // Clear text fields
            this.clearFields();

        }
    }

    // Clear ID input
    clearIdInput(){
        this.idInput.value = '';
    }
}

export const ui = new UI();