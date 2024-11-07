class UserGraph {
    constructor() {
        this.users = [];
    }
    addVertex(user) {
        this.dramas.push(user);
    }

    display(){
        for(let i in this.users){
            console.log(this.users[i])
        }
    }

    
    searchUser(userID){
        console.log(userID);
        for (let i in this.users){
            if(this.users[i].userID===userID){
                return this.users[i];
            }
        }
    }

    addUser(user) {
        user.addMaybeFriend(this.users);
        user.display();
        this.addVertex(user); 
    
        let userContainer = document.querySelector('.drama-container');
        dramaContainer.innerHTML += `
            <div class="drama" style="background-image: url(${user.avatar});">
                <div class="drama-title">
                    <h3>${user.userName}</h3>
                    <p>${user.helloWord}</p>
                </div>
            </div>
        `;
    }
}

let userGraph = new UserGraph();

class User {
    constructor(userID, userName, age, gender, avatar, helloWord) {
        this.userID = userID;
        this.userName = userName;
        this.age = age;
        this.gender = gender;
        this.favorFilm = [];
        this.maybeFriend = {};
        this.friends = [];
        this.avatar = avatar;
        this.helloWord = helloWord;
    }

    addFavorFilm(films){
        for(let i in films){
            this.favorFilm.push(films[i]);
        }
    }

    printFilm(){
        return this.favorFilm.join(', ');
    }

    display(){
        console.log(this.userID, this.userName, this.age, this.gender);
        console.log(this.favorFilm);
    }

    addMaybeFriend(users){
        for(let i in users){
            let count = 0;
            for(let c in users[i].favorFilm){
                if(this.favorFilm.includes(users[i].favorFilm[c])){
                    count++;
                }
            }
            if(count > 0){
                this.maybeFriend.set(users[i], count);
                users[i].maybeFriend.set(this, count);
            }
        }
    }

    addFriend(user){
        this.friends.push(user);
    }

    recommend(){
        const newMap = Array.from(this.maybeFriend).sort((a, b) => - (a[1] - b[1]));
        const sortedMap = new Map(newMap);
        console.log(sortedMap);  
        return sortedMap;      
    }

    changeHelloWord(word){
        this.helloWord = word;
    }
}

function changeHelloWordButton(){
    let inputForm = document.querySelector('.form_input');
    inputForm.style.display = 'flex';
    document.querySelector('.form_input').innerHTML += `
        <form class="form_input-container">
            <h2>Change Hello Word</h2>
            <div class="form_input-line">
                <label for="helloWord">Hello Word</label>
                <input type="text" name="helloWord" id="helloWord" required placeholder="What are you feeling?">
            </div>
            <div class="web-button">Change</div>
            <div onclick="close1()" class="web-button">Close</div>
        </form>
    `;

}
