//Importerar fetchUsers från fetch modulen
import { fetchUsers } from './fetch.js';
//Skapar en async funktion loadUsers()
async function loadUsers(){
    try{
        //Tillderar variabler
        const users = await fetchUsers;
        const userDiv = document.querySelector('user-div');
        //Loopar igenom users och skapar element i html
        users.forEach(user => {
            const userElement = document.createElement('div');
            userElement.textContent = `${user.name}, ${user.username}, ${user.email}`
            userDiv.appendChild(userElement);
        });
        //Fångar eventuella errors 
    }catch (error){
        console.log('Fel vid hämtning av användare' + error);
    }
}

loadUsers();