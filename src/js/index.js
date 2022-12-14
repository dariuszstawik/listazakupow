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
        let loadedList = JSON.parse(savedList);
        for (let i=0; i<loadedList.length; i++) {
            if (!loadedList[i].eliminate) {
            this.list.push(loadedList[i]);
            };         
        }
    }
}

addItemToList(item) {
    this.list.push(item);

}

resetList() {
    this.list = [];
}

}

class Friend {
    constructor() {
        this.speechBubble = document.querySelector('.friend-speech-bubble--js');
        this.speechText = document.querySelector('.friend-speech-bubble__text--js');
        this.speechBought = ["Królu złoty! A 10 groszy byś nie dał?", "Szefie, to będzie dla mnie?", "Świetny zakup, Szefie!", "Zrobimy z tego drinka?", "Będzie na zakąskę", "Królu złoty, kupisz mi też takie?", "Mogę gryza?", "Królu Złoty, brawo!", "Szefie, zakupy z tobą to przyjemność!", "Super! Teraz idziemy po wino!", "UUU... będzie impreza!", "Królu Złoty, tak se dorzucasz do koszyka, a co dla mnie?"]
        this.speechLack = ["Szefie, a jak to znajdę, to kupisz mi wino?", "Ja bym jeszcze poszukał", "Nic nie ma w tych sklepach", "Nie ma co, chodźmy się napić", "Królu Złoty, taka oszczędność, daj na winiacza!", "Szefie, to jest w Biedrze, daj kasę, to kupię", "Teraz coś dla mnie, Królu Złoty", "Królu Złoty, widziałem takie pod śmietnikiem - przynieść?"]
    }

    friendTalking(situation) {
        
        if (situation === "bought") {
        let index = Math.floor(Math.random()*this.speechBought.length);
        this.speechText.textContent = this.speechBought[index];
        this.speechBubble.animate([{opacity: 0}, {opacity: 1}, {opacity: 1}, {opacity: 0}], {duration: 3000});
        }
        else if (situation === "lack") {
            let index = Math.floor(Math.random()*this.speechLack.length);
            this.speechText.textContent = this.speechLack[index];
            this.speechBubble.animate([{opacity: 0}, {opacity: 1}, {opacity: 1}, {opacity: 0}], {duration: 3000});
        }
    }
}


class Main {
    constructor() {
        this.list = new ItemsList();
        this.friend = new Friend();
        window.onload = this.list.checkLocalStorage();

    const myForm = document.querySelector(".add-elements__form--js");
    const myInput = document.querySelector(".add-elements__input--js");
    const resetBtn = document.querySelector(".buttons__reset--js");
    const saveBtn = document.querySelector(".buttons__save--js");
    const itemsList = document.querySelector(".shopping-list__items--js");

    const addLi = (val) => {
        
        let val1;

        let item;

        if (typeof val === "string") {
            item = new Item(val);
            this.list.addItemToList(item);
            val1 = val;
        } else {
            item = val;
            val1 = val.name;
        };

        let newLi = document.createElement("li");
        newLi.className = "shopping-list__item";
        let newLiName = document.createElement("span");
        newLiName.className = "shopping-list__item-name";
        let newLiIcons = document.createElement("span");
        newLiIcons.className = "shopping-list__item-icons";

        newLiName.textContent = val1;
        itemsList.appendChild(newLi);
        newLi.appendChild(newLiName);
        newLi.appendChild(newLiIcons);

        if (val.bought === true) {
            newLiName.style.backgroundColor = "#004d00ff";
            };
        
        if (val.lack === true) {
            newLiName.style.backgroundColor = "#ff655cff";
            };
    
        const createIcons = () => {
            let boughtIcon = document.createElement("span");
            boughtIcon.className = "fa-solid fa-check";
                let lackIcon = document.createElement("span");
                lackIcon.className = "fa-solid fa-minus";
                let deleteIcon = document.createElement("span");
                deleteIcon.className = "fa-solid fa-xmark";
    
                newLiIcons.appendChild(boughtIcon);
                newLiIcons.appendChild(lackIcon);
                newLiIcons.appendChild(deleteIcon);
    
                const afterClick = (button) => {
    
                    button.addEventListener("click", () => {
                        if (button === boughtIcon) {
                            newLiName.style.backgroundColor = "#004d00ff";
                            item.buyItem();
                            this.friend.friendTalking("bought");
                        }
                        else if (button === lackIcon) {
                            newLiName.style.backgroundColor = "#ff655cff";
                            item.lackItem();
                            this.friend.friendTalking("lack");
                        }
                        else if (button === deleteIcon) {
                            newLi.remove();
                            item.deleteItem();
                        }; 
                    });
                };
    
                afterClick(boughtIcon);
                afterClick(lackIcon);
                afterClick(deleteIcon);
        }
    
        createIcons();
    
    };


        for (let i=0; i<(this.list.list).length; i++) {
            const item = new Item(this.list.list[i].name, this.list.list[i].toBuy, this.list.list[i].bought, this.list.list[i].lack, this.list.list[i].eliminate);
            this.list.list[i] = item;
            
            addLi(item);
        };

        myForm.addEventListener("submit", (e) => {
            e.preventDefault();

            if (myInput.value) {
                addLi(myInput.value);
            }
            myInput.value = "";
        });


            resetBtn.addEventListener("click", ()=> {
                this.list.resetList();
                localStorage.clear();
                let liCollection = [...document.getElementsByTagName("li")];
                for (let i=0; i<liCollection.length; i++) {
                    liCollection[i].remove();
                }

            })

            saveBtn.addEventListener("click", ()=> {
                localStorage.setItem('savedList', JSON.stringify(this.list.list));
            })
    }

}

const main = new Main;
