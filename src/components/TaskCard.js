import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function TaskCard({ task }) {
    const [createdByUser, setCreatedByUser] = useState(null);
    const [assignedToUser, setAssignedToUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });

    // Fetch user data for "createdBy" and "assignedTo" IDs
    useEffect(() => {
        fetchUser(task.createdBy, setCreatedByUser);
        fetchUser(task.assignedTo, setAssignedToUser);
    }, [task.createdBy, task.assignedTo]);

    // Fetch user data for a specific user ID
    const fetchUser = (userId, setUser) => {
        // Make an API call to fetch user data based on userId
        fetch(`http://localhost:8080/pushnote/fetchUser/${userId}`)
            .then((response) => response.json())
            .then((userData) => setUser(userData))
            .catch((error) => console.error('Error fetching user data:', error));
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        // Reset the edited task to the original task
        setEditedTask({ ...task });
    };

    const handleSaveEdit = () => {
        // Send the editedTask data to the server or perform any required action
        // Once saved, exit edit mode
        fetch(`http://localhost:8080/pushnote/updateTask/${editedTask.taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedTask),
        })
            .then((response) => {
                if (response.ok) {
                    // Task updated successfully
                    setEditMode(false);
                }
            })
            .catch((error) => console.error('Error updating task:', error));
        setEditMode(false);
        window.location.reload();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({ ...editedTask, [name]: value });
    };



    return (
        <div className="row" style={{ marginTop: "20px", marginBottom: "20px" }}>
            <div className="col d-flex justify-content-center align-items-center">
                <div className="card w-75">
                    <div className="card-body">
                        <h5 className="card-title">Task ID: {task.taskId}</h5>
                        <p className="card-text">Title: {task.title}</p>
                        <p className="card-text">Description: {task.description}</p>
                        <p className="card-text">Created By: {createdByUser ? createdByUser.name : "Loading..."}</p>
                        <p className="card-text">Assigned To: {assignedToUser ? assignedToUser.name : "Loading..."}</p>
                        <p className="card-text">Status: {editMode ? (
                            <select
                                name="status"
                                value={editedTask.status}
                                onChange={handleInputChange}
                            >
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        ) : task.status}</p>
                        <p className="card-text">Deadline: {task.deadline}</p>
                        <p className="card-text">Chat ID: {task.chatId}</p>
                    </div>
                    {editMode ? (
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="editedTitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="editedTitle" name="title" value={editedTask.title} onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editedDescription" className="form-label">Description</label>
                                    <textarea className="form-control" id="editedDescription" name="description" value={editedTask.description} onChange={handleInputChange}></textarea>
                                </div>
                                {/* Add other input fields for editing task properties */}
                                <button type="button" className="btn btn-primary" onClick={handleSaveEdit}>Save</button>
                                <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                            </form>
                        </div>
                    ) : (
                        <div className="card-body" style={{ display: "flex", width: "350px", margin: "auto" }}>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                style={{ marginLeft: "20px", marginRight: "20px" }}
                                onClick={handleEditClick}
                            >
                                Edit Task
                            </button>
                            <div>
                                <Link
                                    to={`/chat?chatId=${task.chatId}`} // Add a Link with the chatId as a query parameter
                                >
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                    >
                                        Chat
                                    </button>
                                </Link>
                            </div>
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
}
