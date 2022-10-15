import '../scss/main.scss';

// uncomment the lines below to enable PWA
// import {registerSW} from './pwa.js';
// registerSW();

/* place your code below */

class Item {
    constructor(name, toBuy = true, bought = false, lack = false, eliminate = false) {
        this.name = name;
        this.toBuy = toBuy;
        this.bought = bought;
        this.lack = lack;
        this.eliminate = eliminate;
    }

    buyItem() {
        this.toBuy = false;
        this.bought = true;
        this.lack = false;
        this.eliminate = false;
    }

    lackItem() {
        this.toBuy = false;
        this.bought = false;
        this.lack = true;
        this.eliminate = false;
    }

    deleteItem() {
        this.toBuy = false;
        this.bought = false;
        this.lack = false;
        this.eliminate = true;
    }
}

class ItemsList {
    constructor() {
        this.list = [];
    }

checkLocalStorage() {
    let savedList = localStorage.getItem('savedList');
    if (savedList) {
        let lista = JSON.parse(savedList);
        for (let i=0; i<lista.length; i++) {
            console.log(lista[i]);
            this.list.push(lista[i]);         
        }
    console.log(this.list);
    console.log(this.list.list); //undefined
    }
}

addItemToList(item) {
    this.list.push(item);

}

resetList() {
    this.list = [];
}

// createLiElements(element) {
//     console.log("this.list w createLiElements to" + this.list);
//     console.log(this.list, this);
//     let item = new Item(element);
    

//     // this.list.addItemToList(item);
    
//     let visibleItem = document.createElement("li");
//     visibleItem.innerHTML = item.name;
//     itemsList.appendChild(visibleItem);

//     let boughtIcon = document.createElement("span");
//     boughtIcon.className = "fa-solid fa-check";
//     let lackIcon = document.createElement("span");
//     lackIcon.className = "fa-solid fa-minus";
//     let deleteIcon = document.createElement("span");
//     deleteIcon.className = "fa-solid fa-xmark";
//     visibleItem.appendChild(boughtIcon);
//     visibleItem.appendChild(lackIcon);
//     visibleItem.appendChild(deleteIcon);

//     boughtIcon.addEventListener("click", ()=>{
//         item.buyItem();
//         visibleItem.style.backgroundColor = "green";
//         // console.log(main.list.list);
//     })

//     lackIcon.addEventListener("click", ()=>{
//         item.lackItem();
//         visibleItem.style.backgroundColor = "red";
//         // console.log(main.list.list);
//     })

//     deleteIcon.addEventListener("click", ()=>{
//         item.deleteItem();
//         visibleItem.remove();
//     })
// }

}

class Friend {
    constructor() {
        this.speachText = document.querySelector('.image-speech-bubble__text--js');
        this.speachBought = ["Królu złoty! A 10 groszy byś nie dał?", "Świetny zakup, Szefie!", "Zrobimy z tego drinka?", "Będzie na zakąskę", "Królu złoty, kupisz mi też takie?", "Mogę gryza?"]
        this.speachLack = ["Szefie, a jak to znajdę, to kupisz mi wino?", "Ja bym jeszcze poszukał", "Nic nie ma w tych sklepach", "Nie ma co, chodźmy się napić"]
    }

    friendTalking(situation) {
        if (situation === "bought") {
        console.log(this.speachBought.length);
        let index = Math.floor(Math.random()*this.speachBought.length);
        console.log(index);
        console.log(this.speachBought[index])
        this.speachText.textContent = this.speachBought[index];
        }
        else if (situation === "lack") {
            console.log(this.speachLack.length);
            let index = Math.floor(Math.random()*this.speachLack.length);
            console.log(index);
            console.log(this.speachLack[index])
            this.speachText.textContent = this.speachLack[index];
                
        }
    }
}


class Main {
    constructor() {
        this.list = new ItemsList();
        this.friend = new Friend();
        window.onload = this.list.checkLocalStorage();
        console.log(this.list);
        console.log(this.list.list);
        // console.log(this.list.list.length);

        let myForm = document.querySelector(".add-elements__form");
        let myInput = document.querySelector(".add-elements__input");
        let resetBtn = document.querySelector(".buttons__reset");
        let saveBtn = document.querySelector(".buttons__save");
        let itemsList = document.querySelector(".shopping-list__items");


        for (let i=0; i<(this.list.list).length; i++) {
            // console.log(this.list.list[i]);
            const item = new Item(this.list.list[i].name, this.list.list[i].toBuy, this.list.list[i].bought, this.list.list[i].lack, this.list.list[i].eliminate);
            this.list.list[i] = item;


            if (item.eliminate === false) {
            let visibleItem = document.createElement("li");
                visibleItem.innerHTML = item.name;
                // console.log(visibleItem);
                itemsList.appendChild(visibleItem);
                if (item.bought === true) {
                    visibleItem.style.backgroundColor = "green";
                };

                if (item.lack === true) {
                    visibleItem.style.backgroundColor = "red";
                };
            

                let boughtIcon = document.createElement("span");
                boughtIcon.className = "fa-solid fa-check";
                let lackIcon = document.createElement("span");
                lackIcon.className = "fa-solid fa-minus";
                let deleteIcon = document.createElement("span");
                deleteIcon.className = "fa-solid fa-xmark";
                visibleItem.appendChild(boughtIcon);
                visibleItem.appendChild(lackIcon);
                visibleItem.appendChild(deleteIcon);

                boughtIcon.addEventListener("click", ()=>{
                    // console.log(item);
                    item.buyItem();
                    console.log(item);
                    visibleItem.style.backgroundColor = "green";
                    console.log("kliknąłeś, że kupiłeś (2)");
                    this.friend.friendTalking("bought");
                    // console.log(main.list.list);
                    // console.log(this.list.list);
                    // console.log(main.list);
                    // console.log(this.list);
                    // console.log(item);
                })

                lackIcon.addEventListener("click", ()=>{
                    item.lackItem();
                    visibleItem.style.backgroundColor = "red";
                    this.friend.friendTalking("lack");
                    // console.log(main.list.list);
                })

                deleteIcon.addEventListener("click", ()=>{
                    item.deleteItem();
                    visibleItem.remove();
                })
        }}
        
        myForm.addEventListener("submit", (e) => {
            e.preventDefault();

            if (myInput.value) {

                let item = new Item(myInput.value);
                this.list.addItemToList(item);
                let visibleItem = document.createElement("li");
                visibleItem.innerHTML = item.name;
                itemsList.appendChild(visibleItem);

                let boughtIcon = document.createElement("span");
                boughtIcon.className = "fa-solid fa-check";
                let lackIcon = document.createElement("span");
                lackIcon.className = "fa-solid fa-minus";
                let deleteIcon = document.createElement("span");
                deleteIcon.className = "fa-solid fa-xmark";
                visibleItem.appendChild(boughtIcon);
                visibleItem.appendChild(lackIcon);
                visibleItem.appendChild(deleteIcon);

                boughtIcon.addEventListener("click", ()=>{

                    item.buyItem();
                    console.log(item);
                    visibleItem.style.backgroundColor = "green";
                    this.friend.friendTalking("bought");
                    console.log("kliknąłeś, że kupione")
                    // console.log(main.list.list);
                })

                lackIcon.addEventListener("click", ()=>{
                    item.lackItem();
                    visibleItem.style.backgroundColor = "red";
                    console.log("kliknąłeś, że brakuje")
                    this.friend.friendTalking("lack");
                    // console.log(main.list.list);
                })

                deleteIcon.addEventListener("click", ()=>{
                    item.deleteItem();
                    visibleItem.remove();
                })

            }
            myInput.value = "";
        })
            resetBtn.addEventListener("click", ()=> {
                this.list.resetList();
                localStorage.clear();
                let lis = [...document.getElementsByTagName("li")];
                for (let i=0; i<lis.length; i++) {
                    lis[i].remove();
                }

            })

            saveBtn.addEventListener("click", ()=> {
                localStorage.setItem('savedList', JSON.stringify(this.list.list));
                console.log(this.list.list);
                console.log(this.list);
            })
    }

}

const main = new Main;