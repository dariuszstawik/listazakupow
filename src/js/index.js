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
            if (!lista[i].eliminate) {
            this.list.push(lista[i]);
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
        this.speachText = document.querySelector('.image-speech-bubble__text--js');
        this.speachBought = ["Królu złoty! A 10 groszy byś nie dał?", "Szefie, to będzie dla mnie?", "Świetny zakup, Szefie!", "Zrobimy z tego drinka?", "Będzie na zakąskę", "Królu złoty, kupisz mi też takie?", "Mogę gryza?", "Królu Złoty, brawo!", "Szefie, zakupy z tobą to przyjemność!", "Super! Teraz idziemy po wino!", "UUU... będzie impreza!", "Królu Złoty, tak se dorzucasz do koszyka, a co dla mnie?"]
        this.speachLack = ["Szefie, a jak to znajdę, to kupisz mi wino?", "Ja bym jeszcze poszukał", "Nic nie ma w tych sklepach", "Nie ma co, chodźmy się napić", "Królu Złoty, taka oszczędność, daj na winiacza!"]
    }

    friendTalking(situation) {
        let index = Math.floor(Math.random()*this.speachBought.length);
        if (situation === "bought") {
        this.speachText.textContent = this.speachBought[index];
        }
        else if (situation === "lack") {
            this.speachText.textContent = this.speachLack[index];
        }
    }
}


class Main {
    constructor() {
        this.list = new ItemsList();
        this.friend = new Friend();
        window.onload = this.list.checkLocalStorage();

    let myForm = document.querySelector(".add-elements__form--js");
    let myInput = document.querySelector(".add-elements__input--js");
    let resetBtn = document.querySelector(".buttons__reset--js");
    let saveBtn = document.querySelector(".buttons__save--js");
    let itemsList = document.querySelector(".shopping-list__items--js");

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
        newLi.textContent = val1;
        itemsList.appendChild(newLi);

        if (val.bought === true) {
            newLi.style.backgroundColor = "green";
            };
        
        if (val.lack === true) {
            newLi.style.backgroundColor = "red";
            };
    
        const createIcons = () => {
            let boughtIcon = document.createElement("span");
            boughtIcon.className = "fa-solid fa-check";
                let lackIcon = document.createElement("span");
                lackIcon.className = "fa-solid fa-minus";
                let deleteIcon = document.createElement("span");
                deleteIcon.className = "fa-solid fa-xmark";
    
                newLi.appendChild(boughtIcon);
                newLi.appendChild(lackIcon);
                newLi.appendChild(deleteIcon);
    
                const afterClick = (button) => {
    
                    button.addEventListener("click", () => {
                        if (button === boughtIcon) {
                            newLi.style.backgroundColor = "green";
                            item.buyItem();
                            this.friend.friendTalking("bought");
                        }
                        else if (button === lackIcon) {
                            newLi.style.backgroundColor = "red";
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
                let lis = [...document.getElementsByTagName("li")];
                for (let i=0; i<lis.length; i++) {
                    lis[i].remove();
                }

            })

            saveBtn.addEventListener("click", ()=> {
                localStorage.setItem('savedList', JSON.stringify(this.list.list));
            })
    }

}

const main = new Main;


                // const sortList1 = (currentLi) => {
                //     this.list.sortList("bought");
                //     let index = this.list.list.indexOf(val);
                //     console.log(index); 

                //     // let liCollection = [...document.getElementsByTagName("li")];
                //     // let index = liCollection.indexOf(currentLi);
                //     // itemsList.insertBefore(currentLi, liCollection[index+3]);
                // };

                // sortList(task) {
                //     if (task === "bought") {
                
                //     this.list.sort((a,b)=> {
                //         return a.bought - b.bought;
                //     });
                // }
                
                // else if (task === "lack") {
                //     this.list.sort((a,b)=> {
                //         return a.lack - b.lack;
                //     });
                // }
                // }