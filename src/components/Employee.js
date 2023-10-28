import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Employee() {
  const [users, setUsers] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // Make an HTTP request to fetch the user data from the API
  useEffect(() => {
    fetch('http://localhost:8080/pushnote/fetchUsers') // Replace with the actual API URL
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const handleSaveGroups = (user) => {
    // Update the user's groupnames with selectedGroups
    const updatedUser = { ...user, groupnames: selectedGroups.join(',') };

    // Make an API call to update the user's information
    fetch(`http://localhost:8080/pushnote/updateUser/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (response.ok) {
          // User updated successfully
          closeEditModal();
          alert("Group details has been updated. Please use close button to close the modal.")
        }
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        closeEditModal();
      });
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className="row" style={{ marginTop: "20px", marginBottom: "20px" }}>
          <div className="col d-flex justify-content-center align-items-center ">
            <div className="card w-75">
              <img src={user.image} className="card-img-top" alt="empPhoto" />
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
              </div>
              <div className="card-header">Groups Present</div>

              <ul className="list-group list-group-flush">
                {user.groupnames.split(',').map((groupName, index) => (
                  <li key={index} className="list-group-item">{groupName.trim()}</li>
                ))}
              </ul>
              <div className="card-body">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target={`#editgroupsModal-${user.id}`} // Add a unique ID for each user
                  style={{ marginLeft: "20px", marginRight: "20px" }}
                >
                  Edit Groups
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target={`#availabilityModal-${user.id}`} // Add a unique ID for each user
                  style={{ marginLeft: "20px", marginRight: "20px" }}
                >
                  Availability
                </button>
                <Link
                  to={`/chat?chatId=${user.name}`} // Add a Link with the chatId as a query parameter
                >
                  <button
                    type="button"
                    className="btn btn-primary"
                  >
                    Chat with {user.name}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Availability Modals */}
      {users.map((user) => (
        <div
          key={user.id}
          className="modal fade"
          id={`availabilityModal-${user.id}`}
          tabIndex="-1"
          aria-labelledby={`availabilityModalLabel-${user.id}`}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id={`availabilityModalLabel-${user.id}`}>
                  Availability
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {user.attendance.split('').map((status, dayIndex) => (
                  <div key={dayIndex}>
                    {dayNames[dayIndex]}: {status === '1' ? 'Present' : 'Absent'}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      ))}
      {users.map((user) => (
        <div
          key={user.id}
          className="modal fade"
          id={`editgroupsModal-${user.id}`}
          tabIndex="-1"
          aria-labelledby={`editgroupsModal-${user.id}`}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id={`editgroupsModal-${user.id}`}>
                  Edit Groups
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="groupNames" className="form-label">Select Group Names</label>
                    <select
                      multiple
                      className="form-select"
                      id="groupNames"
                      value={selectedGroups}
                      style={{ height: "135px" }}
                      onChange={(e) => setSelectedGroups(Array.from(e.target.selectedOptions, (option) => option.value))}
                    >
                      <option value="Team1">Team1</option>
                      <option value="Team2">Team2</option>
                      <option value="Team3">Team3</option>
                      <option value="Team4">Team4</option>
                      <option value="Team5">Team5</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={closeEditModal} // Close modal on Cancel button click
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleSaveGroups(user)} // Handle Save button click
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
