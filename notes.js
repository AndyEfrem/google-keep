class Note {
    constructor(id, title, text) {
        this.id = id
        this.title = title;
        this.text= text;
    }
}

class App {
    constructor(){
        this.notes=[new Note("abc1", "test t", "test text")];
        this.selectedNoteId = "";

        this.$activeForm = document.querySelector(".active-form");
        this.$inactiveForm = document.querySelector(".inactive-form");
        this.noteTitle = document.querySelector(".note-title")
        this.noteText = document.querySelector(".note-text")        
        this.$noteTitle = document.querySelector("#note-title")
        this.$noteText = document.querySelector("#note-text")       
        this.$notes =document.querySelector(".notes")
        this.$form = document.querySelector("#form");
        this.$modal = document.querySelector(".modal");
        this.$modalForm = document.querySelector("#modal-form")
        this.$modalTitle = document.querySelector("#modal-title")
        this.$modalText = document.querySelector("#modal-text")       
        this.$closeModalForm =document.querySelector("#modal-btn")
        
        this.addEventListeners();
        this.displayNotes();
        
    }

    addEventListeners(){
        document.body.addEventListener("click",(event) =>{
           
            this.handleFormClick(event);
            this.closeModal(event);
            this.openModal(event);
            this.handleArchiving(event);
        })

        this.$form.addEventListener("submit", (event) => {
            event.preventDefault();
            const title= this.$noteTitle.value;
            const text =this.$noteText.value;
            this.addNote({ title, text });
            this.closeActiveForm();
        })

        this.$closeModalForm.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("test")
            //this.closeModal(event);
        })
    }
    
    handleFormClick(event){
        const isActiveFormClickedOn = this.$activeForm.contains(event.target);
        const isInactiveFormClickedOn = this.$inactiveForm.contains(event.target);
        const title= this.$noteTitle.value;
        const text =this.$noteText.value;
           

        if(isInactiveFormClickedOn){
            this.openActiveForm();  
        }
        else if(!isActiveFormClickedOn){
            this.addNote({ title, text });
            this.closeActiveForm();
        }
    }

    openActiveForm (){
        this.$inactiveForm.style.display = "none"
        this.$activeForm.style.display = "block"
        this.$noteText.focus(); 
    }

    closeActiveForm (){
        this.$inactiveForm.style.display = "block"
        this.$activeForm.style.display = "none"
        this.$noteTitle.value = "";
        this.$noteText.value = "";
    }

    openModal(event){
        const $selectedNote = event.target.closest(".note");
        if($selectedNote && !event.target.closest(".archive")){ 
            this.selectedNoteId = $selectedNote.id;
            this.$modalTitle.value = ($selectedNote.children[1].innerHTML);
            this.$modalText.value = ($selectedNote.children[2].innerHTML);
            this.$modal.classList.add("open-modal");
        } else {
            return;
        }
    }

    closeModal(event){
        const isModalFormClickedOn = this.$modalForm.contains(event.target);
        const isCloseModalBtnClickedOn = this.$closeModalForm.contains(event.target);
        if(!isModalFormClickedOn && this.$modal.classList.contains("open-modal")){
            this.editNote(this.selectedNoteId, {title: this.$modalTitle.value, text: this.$modalText.value});
            this.$modal.classList.remove("open-modal");
        }
    }

    handleArchiving(event){
        const $selectedNote = event.target.closest(".note");
        if($selectedNote && event.target.closest(".archive")){ 
            this.selectedNoteId = $selectedNote.id;
            this.deleteNote(this.selectedNoteId)
        } else {
            return; 
        }

    }

    addNote({title, text}){
        if( text != ""){
            const newNote = new Note(cuid(), title, text);
            this.notes = [...this.notes, newNote]
            this.displayNotes();
        }
    }

    editNote(id,{title,text}){
        this.notes = this.notes.map((note) => {
            if(note.id == id){
                note.title = title;
                note.text = text;
            }
            return note;
        });
        this.displayNotes();
    }

    deleteNote(id) {
        this.notes = this.notes.filter((note) => note.id != id);
        this.displayNotes();
    }

    handleMouseOverNote(element) {
        const $note = document.querySelector("#" + element.id)
        const $checNote = $note.querySelector(".check-circle")
        const $noteFooter = $note.querySelector(".note-footer")
        $checNote.style.visibility = "visible";
        $noteFooter.style.visibility = "visible";
        
    }

    handleMouseOutNote(element) {
        const $note = document.querySelector("#" + element.id)
        const $checNote = $note.querySelector(".check-circle")
        const $noteFooter = $note.querySelector(".note-footer")
        $checNote.style.visibility = "hidden";
        $noteFooter.style.visibility = "hidden";
    }

    displayNotes(){
        this.$notes.innerHTML = this.notes.map((note) =>
        `
            <div class="note" id ="${note.id}"onmouseover="app.handleMouseOverNote(this)" onmouseout= "app.handleMouseOutNote(this)">
            <span class="material-icons check-circle">
                check_circle
                </span>
            <div class="title">${note.title}</div>
            <div class="text">${note.text}</div>
            <div class="note-footer">
                <div class="tooltip">
                    <span class="material-icons hover small-icons">
                        add_alert
                    </span>
                    <span class="tooltip-text">Remind me</span>
                </div>
                <div class="tooltip">
                    <span class="material-icons hover small-icons">
                        person_add
                    </span>
                    <span class="tooltip-text">Collaborator</span>
                </div>
                <div class="tooltip">
                    <span class="material-icons hover small-icons">
                        color_lens
                    </span>
                    <span class="tooltip-text">Background options</span>
                </div>
                <div class="tooltip">
                    <span class="material-icons hover small-icons">
                        image
                    </span>
                    <span class="tooltip-text">Add image</span>
                </div>
                <div class="tooltip archive">
                    <span class="material-icons hover small-icons">
                        archive
                    </span>
                    <span class="tooltip-text">Archive</span>
                </div>
                <div class="tooltip">
                    <span class="material-icons hover small-icons">
                        more_vert
                    </span>
                    <span class="tooltip-text">More</span>
                </div>
            </div>
        </div>              
       `
        ).join("");
    }
}

const app = new App();
