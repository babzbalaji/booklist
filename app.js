//Book Constructor

function Book(title, author, isnb){
    this.title = title;
    this.author = author;
    this.isnb = isnb;
}

//UI Constructor

function UI(){}

UI.prototype.addBooktoList = function (book)
{
    const list = document.getElementById("book-list");

    //creating TR element

    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isnb}</td>
    <td><a href="" class="delete">X</a></td>
    `

    list.appendChild(row);
}

//Delete Book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}



//cleaFields

UI.prototype.clearfields = function (){
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isnb').value = "";
}

//Show alerts

UI.prototype.showalert = function(message, className)
{
    //create div
    const div = document.createElement('div');
    
    //Add classes
    div.className = `alert ${className} `;

    //Add Text
    div.appendChild(document.createTextNode(message));

    //Get Parent
    const container = document.querySelector('.container');

    //Get form
    const form = document.querySelector('#book-form');

    //InsertAlert
    container.insertBefore(div, form);

    //Timeout after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);

}


//Event Listner

document.getElementById('book-form').addEventListener('submit',
function(e){

//Get form values

 const title = document.getElementById('title').value,
     author = document.getElementById('author').value,
     isnb = document.getElementById('isnb').value

//Instaniate Book
const book = new Book (title, author, isnb);

//Instanitare UI
const ui = new UI();


if(title === '' || author === '' || isnb === '')
{
    //Error alert
    ui.showalert('Please full in all fields', 'error');
}
else
{
    //Add Book to the list
    ui.addBooktoList(book);
    
    //showSuccess
    ui.showalert('Book Added!', 'success');

    //clearfields
    ui.clearfields();   
}



    e.preventDefault();
});


//Event listner for delete
document.getElementById('book-list').addEventListener('click', function(e){

    const ui = new UI();

    ui.deleteBook(e.target);    


    //Show Message
    ui.showalert('Book Removed!', 'success');

    e.preventDefault();

});