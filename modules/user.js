//Importerar fetchUsers från fetch modulen
import { getDataFromSessionStorage } from './fetch.js';
import { renderTodos } from './todos.js';
import { showAllPostUser } from './posts.js';

import { showUserDiv } from './ui.js';


window.addEventListener('resize', moveUsersToDropdown);

//Skapar en async funktion loadUsers()
export function loadUsers(){
    try{
        //Tillderar variabler
        const images = getDataFromSessionStorage('img');
        const users = getDataFromSessionStorage('users');
        const userDiv = document.querySelector('.others-div');
        //Loopar igenom users och skapar element i html
        users.forEach((user, index) => {
            const userElement = document.createElement('button');
            const colors = ['green', 'gray'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            userElement.classList.add(randomColor);
            
            userElement.classList.add('other-user');
            userElement.textContent = `${user.name}`;
            userDiv.appendChild(userElement);

            const userImage = images[index];
            //Skapar en eventlyssnare som anropar en funktion
            userElement.addEventListener('click', () => {
                showUserDetails(user, userImage?.image);
                renderTodos(user.id);
                showAllPostUser(user.id);
            })
            console.log(`Bild för ${user.name}:`, userImage?.image);
        });

        moveUsersToDropdown();
        //Fångar eventuella errors 
    }catch (error){
        console.log('Fel vid hämtning av användare' + error);
    }
}

//Funktion som anropas från eventlyssnaren och öppnar mer information om den klickade användaren
function showUserDetails(user, img){
    const userDiv = document.querySelector('.user-ui');
    userDiv.innerHTML = 
    `<i class="fa-solid fa-user"></i>
    <br> <h2>${user.name}</h2><br> 
    <img src="${img || 'default.jpg'}" alt="Profilbild" class="profile-pic"><br>
    <p>Username: ${user.username}<br>
    Email: ${user.email}</p>`;
    showUserDiv();
}

// Hämtar referenser till knappen och dropdown-innehållet
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');

// Eventlyssnare för att toggla visning av dropdown
dropdownBtn.addEventListener('click', () => {
  // Växla "show"-klassen på dropdown-content
  dropdownContent.classList.toggle('show'); 
  
  // Kolla om dropdown-content är synlig eller inte
  if (dropdownContent.classList.contains('show')) {
    // Om den är synlig, flytta användarna till dropdown
    moveUsersToDropdown(true);
  } else {
    // Om den inte är synlig, flytta tillbaka användarna till .others-div
    moveUsersToDropdown(false);
  }
});

// Stänger dropdown om man klickar utanför
window.addEventListener('click', (e) => {
  if (!dropdownBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
    dropdownContent.classList.remove('show'); // Ta bort "show"-klassen
    moveUsersToDropdown(false); // Flytta tillbaka användarna till .others-div
  }
});

// Funktion som anropas för att flytta användarna till eller från dropdownen
function moveUsersToDropdown(isOpen) {
    const dropdownContent = document.querySelector('.dropdown-content');
    const othersDiv = document.querySelector('.others-div');
    const userButtons = document.querySelectorAll('.other-user');
    
    if (window.innerWidth <= 900) {
      if (isOpen) {
        userButtons.forEach(button => {
          dropdownContent.appendChild(button);
        });
      } else {
        userButtons.forEach(button => {
          othersDiv.appendChild(button);
        });
      }

      if (othersDiv) othersDiv.style.display = 'none';
    } else {
      userButtons.forEach(button => {
        othersDiv.appendChild(button);
      });

      if (othersDiv) othersDiv.style.display = 'block';

      dropdownContent.classList.remove('show');
    }
}