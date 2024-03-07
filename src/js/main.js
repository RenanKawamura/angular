// Faça a requisição para a API (http://localhost:3001/todos) e exiba de acordo com o layout proposto no README.md
const baseUrl = "http:\/\/localhost:3001/todos"

const list = document.getElementById('list')

loadAll()

function buttonAddClicked() {
  var value = document.getElementById('add-input').value
  if(value.length == 0) {
    alert('Não pode ser vazio');
    return
  }
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "POST", baseUrl, false );
  xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xmlHttp.send( `userId=2&title=${value}&completed=`+false); 
  loadAll()
}

function loadAll() {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", baseUrl, false );
  xmlHttp.send( null );
  var todoList = JSON.parse(xmlHttp.responseText)
  showData(todoList)
}

function loadDone() {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", baseUrl+"?completed=true", false );
  xmlHttp.send( null );
  var todoList = JSON.parse(xmlHttp.responseText)
  showData(todoList)
}

function loadTodo() {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", baseUrl+"?completed=false", false );
  xmlHttp.send( null );
  var todoList = JSON.parse(xmlHttp.responseText)
  showData(todoList)
}
var buff
function showData(todoList) {
  buff = todoList
  while (list.lastElementChild) {
    list.removeChild(list.lastElementChild);
  }

  const listElement = document.createElement('ul');
  list.appendChild(listElement);

  todoList.forEach(todo => {
    const listItem = document.createElement('li');
    
    const divContainerItem = document.createElement('div');
    divContainerItem.classList.add("list-item-container");
    
    const spanItemText = document.createElement('span');
    spanItemText.textContent = todo.title;
    spanItemText.classList.add("list-item-todo")
  
    const divButtons = document.createElement('div');
    divButtons.classList.add("buttons-container")
  
   
    const firstButton = document.createElement('button');
    firstButton.onclick = function() {doneTodo(todo.id)}
    firstButton.classList.add("icon-button")
    const firstButtonIcon = document.createElement('i');
    if(todo.completed===true || todo.completed==="true"){
      var icon =  "bi-check-square"
    }else {
      var icon =  "bi-square"
    }
    firstButtonIcon.classList.add(icon)
    firstButtonIcon.classList.add("bi")
    
  
    const secondButton = document.createElement('button');
    secondButton.onclick = function() {editTodo(todo.id)}
    secondButton.classList.add("icon-button")
    const secondButtonIcon = document.createElement('i');
    secondButtonIcon.classList.add("bi-pencil-fill")
    secondButtonIcon.classList.add("bi")
    
    const thridButton = document.createElement('button');
    thridButton.onclick = function() {removeTodo(todo.id)}
    thridButton.classList.add("icon-button")
    const thirdButtonIcon = document.createElement('i');
    thirdButtonIcon.classList.add("bi-trash3-fill")
    thirdButtonIcon.classList.add("bi")
    
    listItem.appendChild(divContainerItem)
    divContainerItem.appendChild(spanItemText)
    divContainerItem.appendChild(divButtons)
    divButtons.appendChild(firstButton)
    firstButton.appendChild(firstButtonIcon)
    divButtons.appendChild(secondButton)
    secondButton.appendChild(secondButtonIcon)
    divButtons.appendChild(thridButton)
    thridButton.appendChild(thirdButtonIcon)
  
    listElement.appendChild(listItem);
    
  });
}

function doneTodo(id) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "PATCH", baseUrl+"/"+id, false );
  xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xmlHttp.send( `completed=`+true); 
  loadAll()
}

function removeTodo(id){
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "DELETE", baseUrl+"/"+id, false );
  xmlHttp.send( ); 
  loadAll()
}

function editTodo(id){

}

function deleteAll(){
  buff.forEach(todo => {
    removeTodo(todo.id) 
  })

  loadAll()
}

function deleteDone(){
  buff.forEach(todo => {
    if(todo.completed===true || todo.completed==="true"){
      removeTodo(todo.id) 
    }
  })
  loadAll()
}