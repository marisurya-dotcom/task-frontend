import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // ================= FETCH TASKS =================
    const fetchTasks = useCallback(async () => {
        try {
            const res = await axios.get(
                "https://task-manager-backend-t3mq.onrender.com/task",
                {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
            );

            setTasks(res.data.tasks);
        } catch (error) {
            console.log(error);
        }
    }, []);

    // ================= USE EFFECT =================
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    // ================= ADD TASK =================
    const addTask = async () => {
        try {
            await axios.post(
                "https://task-manager-backend-t3mq.onrender.com/task",
                { title, description },
                {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
            );

            setTitle("");
            setDescription("");
            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    // ================= DELETE TASK =================
    const deleteTask = async (id) => {
        try {
            await axios.delete(
                `https://task-manager-backend-t3mq.onrender.com/task/${id}`,
                {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
            );

            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    // ================= UI =================
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Dashboard</h2>

            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br /><br />

            <input
                type="text"
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <br /><br />

            <button onClick={addTask}>Add Task</button>

            <h3>Your Tasks</h3>

            {tasks.map((task) => (
                <div key={task._id} style={{ margin: "10px" }}>
                    <strong>{task.title}</strong> - {task.description}
                    <br />
                    <button onClick={() => deleteTask(task._id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;