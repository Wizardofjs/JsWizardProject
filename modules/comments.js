//FUnktion som returnerar alla kommentarer till ett visst inlägg
function filterCommentsForPost(postId, comments) {
    return comments.filter((comment) => comment.postId === postId);
}
//Funktion som skapar div-ar för kommentarerna
function createCommentElement(comment) {
    const div = document.createElement("div");
    div.classList.add("comment");
    div.textContent = comment.body;
    return div;
}
//Visa rätt kommentarer där de ska vara
export function showComments() {
    const posts = JSON.parse(sessionStorage.getItem("posts"));
    const comments = JSON.parse(sessionStorage.getItem("comments"));
    //Om det inte finns data visa meddelandet
    if (!comments || !posts || posts.length === 0 || comments.length === 0) {
        console.log("Inga kommentarer eller inlägg tillgängliga.");
        return;
    }
    //Visa tre första kommentarerna för varje inlägg
    posts.forEach((post) => {
        const postComments = filterCommentsForPost(post.id, comments);
        const firstThree = postComments.slice(0, 3);
        //Hitta article-element med post-id, hitta eller skapa ny container för kommentarer
        const article = document.querySelector(`article[post-id="${post.id}"]`);
        if (article) {
            let container = article.querySelector(".post-comments");
            if (!container) {
            container = document.createElement("div");
            container.classList.add("post-comments");
            article.appendChild(container);
            }
            container.innerHTML = '';
            firstThree.forEach((comment) => {
                container.appendChild(createCommentElement(comment));
            });
        }
    });
}