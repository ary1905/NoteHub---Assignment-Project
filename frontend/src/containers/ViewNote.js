import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CSS/ViewNote/viewNote.css'

export default function ViewNote() {
    const { noteId } = useParams();
    const [note, setNote] = useState(null);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [updateTitle, setUpdateTitle] = useState('');
    const [updateContent, setUpdateContent] = useState('');

    useEffect(() => {
        fetchNoteDetails(noteId);
    }, [noteId]);

    const fetchNoteDetails = async (noteId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes/api/notes/${noteId}/`);
            setNote(response.data);
        } catch (error) {
            console.error('Error fetching Note details:', error);
        }
    };

    const handleDeleteNote = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/notes/api/notes/${noteId}/`);
            window.location = `/notes`;
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const handleUpdateNote = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/notes/api/notes/${noteId}/`, {
                note_title: updateTitle,
                note_content: updateContent
            });
            setIsUpdateOpen(false);
            fetchNoteDetails(noteId);
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    return (
        <div className="viewNoteContainer">
            <h1 className="viewNoteTitle">Note Details</h1>
            {note ? (
                <>
                    <div className='viewNoteContent'>
                        <h2 className="noteTitle">{note.note_id}. <span style={{ marginLeft: '10px' }}>{note.note_title}</span></h2>
                        <p className="noteContent">
                            <span style={{ marginLeft: '40px' }}>{note.note_content}</span>
                        </p>
                    </div>
                    <div className='frontBtns'>
                        <button className="button1" onClick={() => setIsUpdateOpen(true)}>
                            <svg className="svgIcon1" width="800px" height="800px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                <path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z" />
                            </svg>
                        </button>
                        <button className="button2" onClick={handleDeleteNote}>
                            <svg viewBox="0 0 448 512" className="svgIcon">
                                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                            </svg>
                        </button>
                    </div>
                    {isUpdateOpen && (
                        <div className="overlay">
                            <div className="updateBox">
                                <h2>Update Note</h2>
                                <input
                                    type="text"
                                    placeholder="Enter note title"
                                    value={updateTitle}
                                    onChange={(e) => setUpdateTitle(e.target.value)}
                                />
                                <textarea
                                    placeholder="Enter note content"
                                    value={updateContent}
                                    onChange={(e) => setUpdateContent(e.target.value)}
                                ></textarea>
                                <button onClick={handleUpdateNote}>Update</button>
                                <button onClick={() => setIsUpdateOpen(false)}>Cancel</button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
