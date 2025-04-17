import { fetchUsers } from './fetch.js';

async function loadUsers(){
    try{
        const users = await fetchUsers;
        const userDiv = document.querySelector('user-div');

        users.forEach(user => {
            const userElement = document.createElement('div');
            userElement.textContent = `${user.name}, ${user.username}, ${user.email}`
            userDiv.appendChild(userElement);
        });
    }catch (error){
        console.log('fel vid hämtning av användare' + error);
    }
}

loadUsers();