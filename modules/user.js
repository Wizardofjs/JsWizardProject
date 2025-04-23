//Importerar fetchUsers från fetch modulen
import { getDataFromSessionStorage } from './fetch.js';
import { renderTodos } from './todos.js';

//Skapar en async funktion loadUsers()
export function loadUsers(){
    try{
        //Tillderar variabler
        const users = getDataFromSessionStorage('users');
        const userDiv = document.querySelector('.others-div');
        //Loopar igenom users och skapar element i html
        users.forEach(user => {
            const userElement = document.createElement('button');
            const colors = ['green', 'gray'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            userElement.classList.add(randomColor);
            
            userElement.classList.add('other-user');
            userElement.textContent = `${user.name}`;
            userDiv.appendChild(userElement);
            //Skapar en eventlyssnare som anropar en funktion
            userElement.addEventListener('click', userInfo => {
                showUserDetails(user);
                renderTodos(user.userId);
            })

        });
        //Fångar eventuella errors 
    }catch (error){
        console.log('Fel vid hämtning av användare' + error);
    }
}

//Funktion som anropas från eventlyssnaren och öppnar mer information om den klickade användaren
function showUserDetails(user){
    const userDiv = document.querySelector('.user-ui');
    userDiv.innerHTML = `<i class="fa-solid fa-user"></i><br> <h2>${user.name}</h2><br> <p>Username: ${user.username}<br>Email: ${user.email}</p>`

}

