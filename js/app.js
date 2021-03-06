// SELECT ITEMS ////////////////////////////////////////////////////////////////
const main = document.querySelector("ul");
const item = document.querySelector("li");
const today = document.querySelector("#day");
const reload = document.querySelector("#reload");
const local = document.querySelector("#location");
const input = document.querySelector("#input");
const remind = document.querySelector("#fa-bell");
const remove = document.querySelector(".fa-trash-alt");

// WHEN TO STORE DATA //////////////////////////////////////////////////////////
let LIST = [];
let id = 0;

// CLASSES NAMES ///////////////////////////////////////////////////////////////
const ITS_DONE = "fa-bell-slash";
const ALERT_ME = "fa-bell ";
const LINE_THROUGH = "line";
const GREEN = "green"

// SYNCRONIZE THE DATE /////////////////////////////////////////////////////////
let date = new Date();
const options = {weekday : "long", month:"short", year:"numeric",day:"numeric"}

today.innerHTML = date.toLocaleDateString("ar",options);

     // get data from the local storage /////////////////////////////
let data = localStorage.getItem("TODO");

    // update the LIST and id //////////////////////////////////////
    if(data) {
      LIST = JSON.parse(data);
      id = LIST.length;
      loadList(LIST);
    }else {
       LIST = [];
       id = 0;
    }

      // load items to the user's interface
function loadList(array){
  array.forEach(function(item){
      addToDo(item.name, item.id, item.done, item.trash);
  });
}
      // clear the local storage
  reload.addEventListener("click", function(){
  localStorage.clear();
  location.reload();
});


// ADD A TO-DO ON CLICKING ENTER KEY ///////////////////////////////////////////
input.addEventListener("keyup", (ev)=> {
  const key = ev.keyCode;
  const TODO = input.value;
  if(key === 13) {
    if(TODO) {
      addToDo(TODO,id,false,false);
      LIST.push({
        name:TODO,
        id:id,
        done:false,
        trash:false
      })
      
      // add the list to local storage /////////////////////////////////////
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
})

// ADD AN TO DO FUNCTION ////////////////////////////////////////////////////////
 function addToDo (TODO,id,done,trash) {
    if(trash){return;}
    const DONE = done?ITS_DONE:ALERT_ME;
    const LINE = done?LINE_THROUGH:"";

   const toDo = `<li class="todoBar">
                    <h1 class="todo ${LINE}" id="todo">${TODO}</h1>
                    <i class="fas fa-trash-alt " job="delet" id="${id}"></i>
                    <div class="separate"></div>
                    <i class="done fas ${DONE}" job="check" id="${id}"></i>
                </li> `;
  const position = "beforeend";
  main.insertAdjacentHTML(position,toDo);
  }

// check a to do ////////////////////////////////////////////////////////////////////
function chekIt(element) {
  element.classList.toggle(ITS_DONE);
  element.style.fontSize ="30px"
  element.parentNode.classList.toggle(GREEN);
  element.parentNode.querySelector(".todo").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
  
}

// delete a todo //////////////////////////////////////////////////////////////////
function deleteIT(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

// check or delete ///////////////////////////////////////////////////////////////////

main.addEventListener("click",(ev)=> {
  const element = ev.target;
  
  const elementJob = element.attributes.job.value;
 
  if(elementJob == "check" ) {
    chekIt(element)
  }
  if(elementJob == "delet") {
    deleteIT(element)
  }

  // add the list to local storage /////////////////////////////////////
  localStorage.setItem("TODO", JSON.stringify(LIST));
})
