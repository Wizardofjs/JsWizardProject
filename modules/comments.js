//Funktion som returnerar alla kommentarer till ett visst inlägg
function filterCommentsForPost(postId, comments) {
  return comments.filter((comment) => comment.postId === postId);
}
// Funktion som skapar div-ar för kommentarerna
function createCommentElement(comment) {
  const div = document.createElement('div');
  div.classList.add('comment');

  const commentText = document.createElement('p');
  commentText.textContent = comment.body;
  div.appendChild(commentText);

  // Skapa like-knapp och räknare
  const likeContainer = document.createElement('div');
  likeContainer.classList.add('like-container');

  const likeButton = document.createElement('button');
  likeButton.classList.add('like-button');
  likeButton.innerHTML = '<i class="fa fa-thumbs-up"></i> Like';

  const likeCount = document.createElement('span');
  likeCount.classList.add('like-count');

  // Slumpa fram initialt antal likes (t.ex. mellan 0 och 100)
  let count = Math.floor(Math.random() * 101);
  likeCount.innerHTML = `<i class="fa fa-heart" style="color: red;"></i> ${count}`;

  let liked = false;

  // Toggle like
  likeButton.addEventListener('click', () => {
    liked = !liked;
    count += liked ? 1 : -1;
    likeCount.innerHTML = `<i class="fa fa-heart" style="color: red;"></i> ${count}`;
    likeButton.classList.toggle('liked');
  });

  likeContainer.appendChild(likeCount);
  likeContainer.appendChild(likeButton);

  div.appendChild(likeContainer);

  return div;
}
//Visa rätt kommentarer där de ska vara
export function showComments() {
  const posts = JSON.parse(sessionStorage.getItem('posts'));
  const comments = JSON.parse(sessionStorage.getItem('comments'));
  //Om det inte finns data visa meddelandet
  if (!comments || !posts || posts.length === 0 || comments.length === 0) {
    console.log('Inga kommentarer eller inlägg tillgängliga.');
    return;
  }
  //Visa tre första kommentarerna för varje inlägg
  posts.forEach((post) => {
    const postComments = filterCommentsForPost(post.id, comments);
    const firstThree = postComments.slice(0, 3);
    //Hitta article-element med post-id, hitta eller skapa ny container för kommentarer
    const article = document.querySelector(`article[post-id="${post.id}"]`);
    if (article) {
      let container = article.querySelector('.post-comments');
      if (!container) {
        container = document.createElement('div');
        container.classList.add('post-comments');
        article.appendChild(container);
      }
      container.innerHTML = '';
      firstThree.forEach((comment) => {
        container.appendChild(createCommentElement(comment));
      });
    }
  });
}
