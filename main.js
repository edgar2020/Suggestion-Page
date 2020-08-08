document.getElementById('commentInputForm').addEventListener('submit', saveComment);//listens for when the Form's submit button is clicked

const CommentService = {
    getComments() {
        const comments = localStorage.getItem('comments');
        return comments ? JSON.parse(comments) : []
    },
    getComment(id) {
        return this.getComments.find(comment => comment.id === id);
    },//grabs a comment based on its ID
    saveComment(comment) {
        const comments = this.getComments();
        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));
    },//takes a comment object and stores it
    deleteComment(id) {
        const comments = this.getComments.filter(comment => comment.id !== id);
        localStorage.setItem('comments', JSON.stringify(comments));
    }//takes Comment Id and deletes it
};

function createCommentTemplate({ id, status, description, commentBy }) {
    return (
        `<div class="well">
            <h6>Comment ID:  ${id} </h6>
            <p><span class="label label-info">${status}</span></p>
            <h3>${description}</h3>
            <span class="glyphicon glyphicon-user"></span>${commentBy}</p>
            <a href="#" class="btn btn-warning" onclick="setStatusClosed('${id}')">Close</a>
            <a href="#" class="btn btn-danger" onclick="deleteComment('${id}')">Delete</a>
        </div>`
    );
}//injects the HTML into the website for when a comment is inserted

function commentsList() {
    return localStorage.getItem('comments') ?
        JSON.parse(localStorage.getItem('comments')) :
        [];
}//gets the array of Comments

function fetchComments() {
    const comments = this.commentsList();
    const commentsList = document.getElementById('commentsList');
    let commentListHtml = '';

    if (comments) {
        comments.forEach(element => commentListHtml += createCommentTemplate(element));
    }

    commentsList.innerHTML = commentListHtml;
}

function saveComment(e) {
    const id = chance.guid();
    const description = document.getElementById('commentInput').value || 'No Description Provided';
    const commentBy = document.getElementById('commentBy').value || 'No User Assigned.';
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    comments.push({
        id,
        description,
        commentBy,
        status: 'Open'
    });

    localStorage.setItem('comments', JSON.stringify(comments))
    document.getElementById('commentInputForm').reset();

    fetchComments();

    e.preventDefault();
}

function setStatusClosed(id) {
    const comments = this.commentsList();

    if (comments.length) {
        const updateComment = comments.find(commentToClose => commentToClose.id === id);

        const indOf = comments.indexOf(updateComment)
        comments.splice(indOf, 1)
        comments.push({
            id: updateComment.id,
            description: updateComment.description,
            commentBy: updateComment.commentBy,
            status: 'Closed'
        })

        localStorage.setItem('comments', JSON.stringify(comments));

        fetchComments();
    }
}

function deleteComment(id) {
    const comments = this.commentsList();

    if (comments.length) {
        const commentToDelete = comments.find(commentToFind => commentToFind.id === id);

        const indOf = comments.indexOf(commentToDelete)
        comments.splice(indOf, 1)
        localStorage.setItem('comments', JSON.stringify(comments));

        fetchComments();
    }
}