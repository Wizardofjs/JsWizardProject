// Denna ska finnas i fetch.js
async function getPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) throw new Error("Network response was not ok");
    const posts = await response.json();
    displayPosts(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

// denna ska finnas i denna fil.

function displayPosts(posts) {
  const container = document.querySelector(".post");
  container.innerHTML = "";

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    `;
    container.appendChild(postElement);
  });
}

getPosts();
