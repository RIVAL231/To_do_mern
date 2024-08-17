import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Navbar from '../Components/Navbar';
import Notes from '../Components/Notes';
import NewNote from '../Components/NewNote';
import Login from '../Components/Login';
import Register from '../Components/Register';

function App() {
  const [showAdd, setAdd] = useState(false);
  const [loading, setLoading] = useState(true);  // Loading state for the loading screen
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState([]);
  const [isEmpty, setEmpty] = useState(true);
  const [user, setUser] = useState(null); // State to track user login status

  // Function to fetch notes from the backend
  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      try {
        const response = await fetch(`https://to-do-mern-git-main-sankalp-sharmas-projects.vercel.app/list/${userId}/lists`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setSaved(data);
          setEmpty(data.length === 0);
        } else {
          console.error("Failed to fetch lists");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setTimeout(() => setLoading(false), 500);  // Stop loading after 2 seconds
      }
    } else {
      console.error("Token or userId is missing");
      setLoading(false);
    }
  };

  // Fetch notes on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      setUser({ token, userId }); // Set user if token and userId exist
      fetchNotes();
    } else {
      setUser(null); // Clear user if token and userId don't exist
      setLoading(false);
    }
  }, []);

  const addNote = () => {
    setAdd(!showAdd);
  };

  const saveNoteHandler = (event) => {
    setNote(event.target.value);
  };

  const saveNoteGlobal = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      try {
        const response = await fetch(`https://to-do-mern-git-main-sankalp-sharmas-projects.vercel.app/list/${userId}/lists/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ description: note })
        });

        if (response.ok) {
          const data = await response.json();
          setSaved(prevSaved => [...prevSaved, data]);
          setEmpty(false);
          setAdd(false);
          setNote("");
        } else {
          console.error("Failed to save the note");
        }
      } catch (error) {
        console.error("Error:", error);
      }finally{
        fetchNotes();
      }
      }
    }


  const handleCheckboxChange = async (id, currentCheckedState) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      try {
        const response = await fetch(`https://to-do-mern-git-main-sankalp-sharmas-projects.vercel.app/list/${userId}/lists/update/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ isChecked: !currentCheckedState })
        });

        if (response.ok) {
          setSaved(prevSaved =>
            prevSaved.map(item =>
              item._id === id ? { ...item, isChecked: !item.isChecked } : item
            )
          );
          console.log("Checkbox state updated successfully");
        } else {
          console.error("Failed to update the checkbox state");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleDelete = async (listId) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      try {
        const response = await fetch(`https://to-do-mern-git-main-sankalp-sharmas-projects.vercel.app/list/${userId}/lists/delete/${listId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {

          setSaved(prevSaved => {
            const updatedSaved = prevSaved.filter(item => item._id !== listId);
            setEmpty(updatedSaved.length === 0);
            return updatedSaved;
          });
        } else {
          console.error("Failed to delete the list");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const displayNotes = saved.map((str) => (
    <Notes
      notes={str.description}
      isChecked={str.isChecked}
      handleCheckboxChange={() => handleCheckboxChange(str._id, str.isChecked)}
      handleDelete={() => handleDelete(str._id)}
      key={str._id}
      id={str._id}
    />
  ));

  return (
    <Router>
      <div className='container'>
        {loading ? (
          <div className="loading-screen">
            <h2 style={{ textAlign: "center",fontFamily:"Kanit",position:"absolute",top:"30%",left:"45%" }}>Loading...</h2>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login setUser={setUser} fetchNotes={fetchNotes}/>} />
            <Route path="/notes" element={
              user ? (
                <div>
                  <Navbar />
                  {isEmpty && (
                    <div className='empty'>
                      <img src='https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSiSLhRa8UExYF92rsew9Nmm_0OiuPybsn8SstgyZgICZKloGIh' alt="Empty" />
                      <h1>Empty...</h1>
                    </div>
                  )}
                  <div className='notes'>
                    {!isEmpty && displayNotes}
                  </div>

                  {showAdd && (
                    <NewNote
                      note={note}
                      saveNote={saveNoteHandler}
                      saveNoteGlobal={saveNoteGlobal}
                      cancel={addNote}
                      className="notescss"
                    />
                  )}

                  <button onClick={addNote} className='button1'>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              ) : (
                <h1>Not Logged In</h1>
              )
            } />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
