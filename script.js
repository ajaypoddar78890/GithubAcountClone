document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://api.github.com/users/freecodecamp/repos";
  const repositoriesContainer = document.getElementById(
    "repositories-container"
  );
  const perPage = 10; // Number of repositories to display per page
  let currentPage = 1;

  function fetchRepositories(page) {
    const url = `${apiUrl}?page=${page}&per_page=${perPage}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        displayRepositories(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        //
      });
  }

  function displayRepositories(repositories) {
    repositoriesContainer.innerHTML = ""; // Clearing older content

    repositories.forEach((repo) => {
      const repoElement = document.createElement("div");
      repoElement.classList.add("repo-card");
      repoElement.innerHTML = `<h3>${repo.name}</h3><p>${repo.description}</p><p>Language: ${repo.language}</p>`;
      repositoriesContainer.appendChild(repoElement);
    });
  }

  function updatePaginationButtons(totalRepositories) {
    const totalPages = Math.ceil(totalRepositories / perPage);
    const paginationContainer = document.getElementById("pagination-container");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.addEventListener("click", () => {
        currentPage = i;
        fetchRepositories(currentPage);
      });
      paginationContainer.appendChild(pageButton);
    }
  }

  // Initial fetch on page load
  fetchRepositories(currentPage);

  // Optional: Fetch total repositories count to update pagination buttons
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const totalRepositories = data.length;
      updatePaginationButtons(totalRepositories);
    })
    .catch((error) => {
      console.error("Error fetching total repositories count:", error);
    });
});
