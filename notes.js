class Note {
    constructor(id, title, text) {
        this.id = id
        this.title = title;
        this.text= text;
    }
}

class App {
    constructor(){
        this.notes=[];
        this.$activeForm = document.querySelector(".active-form");
        this.$inactiveForm = document.querySelector(".inactive-form");
        this.addEventListeners();  
    }
    addEventListeners(){
        document.body.addEventListener("click",(event) =>{
            this.handleFormClick(event);
        })
    }
    handleFormClick(event){
        console.log(this.$activeForm.contains(event.target));
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


