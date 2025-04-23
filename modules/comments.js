
export function showComments() {
    const posts = JSON.parse(sessionStorage.getItem("posts"));
    const comments = JSON.parse(sessionStorage.getItem("comments"));

    if (!comments || !posts || posts.length === 0 || comments.length === 0) {
        console.log("Inga kommentarer eller inlägg tillgängliga.");
        return; // Sluta om det inte finns data att visa
    }
    posts.forEach((post) => {
        //filtrera till rätt kommentarer för inlägget
        const postComments = comments.filter((comment) => comment.postId === post.id);

        //första 3 kommentarerna 
        const firstThreeComments = postComments.slice(0, 3);
        
        //sätta id post-id på alla article element med rätt post.id? för vet ej riktigt varifrån post.id ska hämtas?
        const article = document.querySelector(`article[post-id="${post.id}"]`);
        if (article) {
            let commentsContainer = article.querySelector(".post-comments");

            if (!commentsContainer) {
                commentsContainer = document.createElement("div");
                commentsContainer.classList.add("post-comments");
                article.appendChild(commentsContainer);
            }
            commentsContainer.innerHTML = '';

            firstThreeComments.forEach((comment) => {
                const commentDiv = document.createElement("div");
                commentDiv.classList.add("comment");
                commentDiv.textContent = comment.body;
                commentsContainer.appendChild(commentDiv);
            });
        }
    });
}