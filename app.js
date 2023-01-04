class Note {
    constructor(title, text){
        this.title = title;
        this.text = text;
    }
}

class App {
    constructor(){
        this.note = []
    }
    addNotes({title, text}){
        const newNote = new Note(title,text);
        this.notes = [...this.notes, newNote];
    }

}

const note1 = {
    title: "Test note",
    text: "text"
}

const app = new App();
app.addNotes(note1);
console.log(app.note);