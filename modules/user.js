//Importerar fetchUsers från fetch modulen
import { getDataFromSessionStorage } from './fetch.js';

//Skapar en async funktion loadUsers()
export function loadUsers() {
  try {
    //Tillderar variabler
    const users = getDataFromSessionStorage('users');
    const userDiv = document.querySelector('.others-div');
    //Loopar igenom users och skapar element i html
    users.forEach((user) => {
      const userElement = document.createElement('div');
      const colors = ['green', 'gray'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      userElement.classList.add(randomColor);

      userElement.classList.add('other-user');
      userElement.textContent = `${user.name}`;
      userDiv.appendChild(userElement);
    });
    //Fångar eventuella errors
  } catch (error) {
    console.log('Fel vid hämtning av användare' + error);
  }
}
