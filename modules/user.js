//Importerar fetchUsers från fetch modulen
import { getDataFromSessionStorage } from './fetch.js';

//Skapar en async funktion loadUsers()
export async function loadUsers(){
    try{
        //Tillderar variabler
        const users = getDataFromSessionStorage('user');
        const userDiv = document.querySelector('.user-div');
        //Loopar igenom users och skapar element i html
        users.forEach(user => {
            const userElement = document.createElement('div');
            userElement.textContent = `${user.name}`
            userDiv.appendChild(userElement);
        });
        //Fångar eventuella errors 
    }catch (error){
        console.log('Fel vid hämtning av användare' + error);
    }
}
