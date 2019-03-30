// SELECT ITEMS ////////////////////////////////////////////////////////////////
const main = document.querySelector("ul");
const item = document.querySelector("li");
const today = document.querySelector("#day");
const local = document.querySelector("#location");
const input = document.querySelector("#input");
const remind = document.querySelector("#fa-bell");
const remove = document.querySelector(".fa-trash-alt");

// WHEN TO STORE DATA //////////////////////////////////////////////////////////
let LIST = [];
let id = 0;

// ADD A TO-DO ON CLICKING ENTER KEY ///////////////////////////////////////////
input.addEventListener("keyup", (ev)=> {
  const key = ev.keyCode;
  const TODO = input.value;
  if(key === 13) {
    if(TODO) {
      addToDo(TODO,id);
      LIST.push({
        id:id,
        done:false,
        trash:false
      })
      id++;
    }
    input.value = "";
  }
})

// ADD AN TO DO FUNCTION ////////////////////////////////////////////////////////
 function addToDo (TODO,id) {
  const position = "beforeend";
   const toDo = `<li class="todoBar" id="${id}">
                    <h1 class="todo" id="todo">${TODO}</h1>
                    <i class="fas fa-trash-alt"></i>
                    <div class="separate"></div>
                    <i class="fas fa-bell"></i>
                </li> `;
  /*item.style.marginTop = "14px";
  item.style.top = "0";*/
  main.insertAdjacentHTML(position,toDo);
  
  }
  
  