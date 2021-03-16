// Book class:book

class Book{
    constructor(title,author,isbn){
        this.title= title;
        this.author = author;
        this.isbn= isbn;

    }
}

// UI class : ui tasks
class UI {
    static displayBooks(){
       
        const books = Store.getBooks();


        books.forEach(book=>UI.addBookToList(book))

    }
    static addBookToList(book){
        const list = document.querySelector('#book-list')
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class='delete'>X</a></td>
        `;
        list.appendChild(row);
    }
    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentNode.remove();
        }
    }
    static showAlert(message,className){
        const div = document.createElement('div');
        div.className = `alert alert-${className} `;
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form')
        container.insertBefore(div,form)

        // vanish in 3s
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 1000);
    }
    static clearFields(){
        document.querySelector('#title').value= '';
        document.querySelector('#author').value= '';
        document.querySelector('#isbn').value= '';
    }
}
// store class

class Store{
    static getBooks(){

        let books;
        if(localStorage.getItem('books')===null){
            books = []
        }else{
            books = JSON.parse(localStorage.getItem('books')); 
        }
        return books;

    }
    static addBook(book){
        const books = Store.getBooks()
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books))

    }
    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn === isbn){
                books.splice(index,1)
            }
        });
        localStorage.setItem('books', JSON.stringify(books))

    }
}


// event: display books
document.addEventListener('DOMContentLoaded',UI.displayBooks)
// event add book
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    // get form values
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // validate
    if(title===''|| author===''|| isbn === ''){
        UI.showAlert('all field req','danger')
    }else{
          // Instatiate a book
    const book = new Book(title,author,isbn);
    //  add book to UI
    UI.addBookToList(book)
    // add the book to store
    Store.addBook(book)
    // show the success message
    UI.showAlert('book added','success')
    // clear fields
    UI.clearFields();
    }
  
})
// event remove a book

document.querySelector('#book-list').addEventListener('click',(e)=>{
    // remove a book  from a UI
    UI.deleteBook(e.target)
    // remove a book from a store
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
        // show the delete message
    UI.showAlert('book removed','success')
})


































































//    const StoredBooks = [
//             {
//                 title:'Book one',
//                 author:"douglas mogoba",
//                 isbn:'2343442'
//             },
//             {
//                 title:'Book two',
//                 author:"kevin mogoba",
//                 isbn:'2343442'
//             },
//         ]
