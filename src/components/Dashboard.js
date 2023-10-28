import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/pushnote/fetchTasks")
            .then((response) => response.json())
            .then((data) => {
                // Assuming the API response is an array of tasks, update the state
                setTasks(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            {tasks.map((task) => (
                <TaskCard key={task.taskId} task={task} />
            ))}
        </div>
    );
}
