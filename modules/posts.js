function getDataFromSessionStorage(key) {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

export function showPosts() {
  const posts = getDataFromSessionStorage("posts");

  if (posts.length > 0) {
    const postsContainer = document.querySelector(".post");

    postsContainer.innerHTML = "";

    // Count the number of posts per user
    // Track post counts for each user
    const postCounts = {};

    posts.forEach((post) => {
      if (!postCounts[post.userId]) {
        postCounts[post.userId] = 0;
      }

      // Increment the count for the user
      postCounts[post.userId] += 1;

      const article = document.createElement("article");
      article.classList.add("post");

      const header = document.createElement("header");

      /* Tillfälligt för att se vilken användare som har vilken post */
      const h2 = document.createElement("h2");
      /*  h2.textContent = `Användare: ${post.userId} > post: ${post.id}`; */
      h2.textContent = ` ${post.userId} user | post:${
        postCounts[post.userId]
      }/10 | total:${post.id} `;
      header.appendChild(h2);

      article.appendChild(header);

      const pContent = document.createElement("p");
      // Replace \n with <br> to preserve line breaks in the body
      pContent.innerHTML = post.body.replace(/\n/g, "<br>");
      article.appendChild(pContent);

      postsContainer.appendChild(article);
    });
  } else {
    console.log("No posts data available in sessionStorage.");
  }
}
