import axios from 'axios';
import React, { useState } from 'react'
import './CSS/AddNote/addNote.css'

export default function AddNote() {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');

    const handleNoteTitleChange = (e) => {
        setNoteTitle(e.target.value);
    }

    const handleNoteContentChange = (e) => {
        setNoteContent(e.target.value);
    }

    const addNoteEvent = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/notes/api/notes/`, {
                note_title: noteTitle,
                note_content: noteContent,
            });
            window.location = '/notes';
        } catch (error) {
            console.error('Error adding Note:', error);
        }
    }

    return (
        <div className='addNotePage'>
            <div className="addNoteContainer">
                <div className="addNoteContent">
                    <div className="addNoteHead" style={{ gridArea: 'addNoteHead' }}>
                        <div className="addNoteHead1">
                            <h1 className='headTxt1'>
                                Add Notice
                            </h1>
                        </div>
                    </div>
                    <form className='my-4' style={{ gridArea: 'addNoteIp' }} onSubmit={addNoteEvent}>
                        <div className="addNoteIp1" >
                            <input type="text" id="text" name="text" required className='addNoteTitle' value={noteTitle}
                                onChange={handleNoteTitleChange} placeholder='Title'
                            />
                        </div>
                        <br />
                        <div className="addNoteIp2">
                            <input type="text" id="desc" name="desc" required className='addNoteContent1' value={noteContent}
                                onChange={handleNoteContentChange} placeholder='Content'
                            />
                        </div>
                        <div className="addNoteBtn my-5">
                            <button type="submit" className='addNoteBtn1'>Add Note</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
