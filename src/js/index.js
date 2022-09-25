import '../scss/main.scss';

// uncomment the lines below to enable PWA
// import {registerSW} from './pwa.js';
// registerSW();

/* place your code below */

class Item {
    constructor(name) {
        this.name = name;
        this.toBuy = true;
        this.bought = false;
        this.lack = false;
    }

    buyItem() {
        this.toBuy = false;
        this.bought = true;
        this.lack = false;
    }

    lackItem() {
        this.toBuy = false;
        this.bought = false;
        this.lack = true;
    }
}

class ItemsList {
    constructor() {
        this.list = [];
    }

addItemToList(item) {
    this.list.push(item);

}

}

class Main {
    constructor() {
        this.list = new ItemsList();
    
        let myForm = document.querySelector(".add-elements__form");
        let myInput = document.querySelector(".add-elements__input");
        let resetBtn = document.querySelector(".reset__btn");
        let itemsList = document.querySelector(".shopping-list__items");
        
        myForm.addEventListener("submit", (e) => {
            e.preventDefault();
            // console.log("kliknąłeś");
            // console.log(myInput.value);
            if (myInput.value) {
                let item = new Item(myInput.value);
                console.log (item);
                this.list.addItemToList(item);
                console.log(this.list.list);
                let visibleItem = document.createElement("li");
                visibleItem.innerHTML = item.name;
                console.log(visibleItem);
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
                    visibleItem.style.backgroundColor = "green";
                    console.log(main.list.list);
                })

                lackIcon.addEventListener("click", ()=>{
                    item.lackItem();
                    visibleItem.style.backgroundColor = "red";
                    console.log(main.list.list);
                })

            }
        })
    }

}

const main = new Main;