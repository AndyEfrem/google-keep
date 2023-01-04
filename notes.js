class Note {
    constructor(id, title, text) {
        this.id = id
        this.title = title;
        this.text= text;
    }
}

class App {
    constructor(){
        this.notes=[]
    }
    addNote({id, title, text}){
        const newNote = new Note(id,title, text);
        this.note = [...this.notes, newNote]
    }
    editNote(id,{title,text}){
        this.notes.map(note => {
            if(note.id == id){
                note.title = title
                note.text = text

            }

        })
    }
}

const note1= {
    title: "Test note",
    text : "Text"

}
const updateNote= {
    title: "Updated Test note",
    text : "Updated Text"

}

const app = new App();
app.addNote(0,note1)
app.addNote(1,note1)
app.addNote(2,note1)
app.addNote(3,note1)
console.log("Before editing", app.note );
setTimeout(()=> {
    app.editNote(2, updateNote);
    console.log("After editing", app.note);
},1000) 
