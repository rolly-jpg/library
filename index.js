const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
        this.id = crypto.randomUUID()
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, read: ${this.read}`        
    }

    toggleReadStatus() {
        this.read = !this.read
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read))
}

function renderTable() {
    const table = document.querySelector('tbody')
    table.innerHTML = ''

    myLibrary.forEach((book) => {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.read}</td>
            <td><input type="checkbox" data-id=${book.id} ${book.read ? 'checked' : ''}></td>
            <td><button type='button' data-id=${book.id}>Delete Book</button></td>
        `
        table.appendChild(row)
    })

    const checkboxBtns = document.querySelectorAll("input[data-id]")
    checkboxBtns.forEach(checkbox => checkbox.addEventListener('change', (e) => {
                const index = myLibrary.findIndex((book) => book.id === e.currentTarget.dataset.id)
                if (index !== -1)
                    myLibrary[index].toggleReadStatus() 
            }
        )
    )

    const deleteBtns = document.querySelectorAll("button[data-id]")
    deleteBtns.forEach(
        (btn) => btn.addEventListener('click', (e) => {
            const index = myLibrary.findIndex((book) => book.id === e.currentTarget.dataset.id)
            if (index !== -1) {
                myLibrary.splice(index, 1)
                renderTable()
                }
            }
        )
    )
}

addBookToLibrary('The Great Whale','A. Dawt', 234, false)
addBookToLibrary('The Cloud','N. Roteer', 223, true)

renderTable()

const form = document.getElementById('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const read = document.getElementById('read').checked
    addBookToLibrary(title, author, pages, read)
    renderTable()   
    
    e.target.reset()
})