
//comments
export function renderComments(posts, comments) {
    posts.forEach((post) => {
        //filtrera till rätt kommentarer för inlägget
        const postComments = comments.filter((comment) => comment.postId === post.id);

        //första 3 kommentarerna 
        const firstThreeComments = postComments.slice(0, 3);

        //skapar lista för kommentarerna 
        const commentList = document.createElement("ul");
        firstThreeComments.forEach((comment) => {
            const listItem = document.createElement("li");
            listItem.textContent = comment.body;
            commentList.appendChild(listItem);
        });
        
        //sätta id data-post-id på alla article element med rätt post.id? för vet ej riktigt varifrån post.id ska hämtas?
        const article = document.querySelector(`article[data-post-id="${post.id}"]`);
        if (article) {
            const commentsContainer = document.createElement("div");
            commentsContainer.classList.add("comments-container");
            commentsContainer.appendChild(commentList);
            article.appendChild(commentsContainer);
        }
    });
}