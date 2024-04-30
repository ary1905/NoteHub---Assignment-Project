import React, { useEffect, useState } from 'react';
import './Content1.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import viewBtn from '../../Images/viewBtn.png'

export default function Content1() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes/api/notes/`);
      const data = response.data;
      setNotes(data);
    } catch (error) {
      console.error('Error fetching Notes:', error);
    }
  };

  const handleViewNote = (noteId) => {
    axios.get(`${process.env.REACT_APP_API_URL}/notes/api/notes/${noteId}/`)
      .then(response => {
        window.location = `/viewNote/${noteId}`;
      })
      .catch(error => {
        console.error('Error fetching note details:', error);
      });
  };


  return (
    <div className="con1" style={{ gridArea: 'con1' }}>
      <div className="con1MainHead">
        <h1 className='con1MainHeadH2'>My Notes</h1>
        <Link className='noteBtn1' to='/addNote'>+</Link>
      </div>
      <div className="con1MainForm">
        <table className="noteTable1">
          <thead>
            <tr className='noteTr'>
              <th className='noteTh' style={{ width: '100px' }}>Note ID</th>
              <th className='noteTh' style={{ width: '250px' }}>Note Title</th>
              <th className='noteTh' style={{ width: '100px' }}></th>
            </tr>
          </thead>
          <tbody className='noteTBody'>
            {notes.length > 0 ? (
              notes.map((note) => (
                <tr key={note.note_id} className="studDailyAttdTr">
                  <td className="noteTd">{note.note_id}</td>
                  <td className="noteTd">{note.note_title}</td>
                  <td className="noteTd">
                    <button onClick={() => handleViewNote(note.note_id)} className='viewButton'>
                      <img src={viewBtn} alt="viewButton" style={{ width: '30px', height: '30px' }} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <li>No notes found</li>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
