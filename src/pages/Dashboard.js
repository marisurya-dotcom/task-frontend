import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const token = localStorage.getItem("token");

    // ================= FETCH TASKS =================
    const fetchTasks = async () => {
        try {
            const res = await axios.get(
                "https://task-manager-backend-t3mq.onrender.com/task",
                {
                    headers: {
                        authorization: token
                    }
                }
            );

            setTasks(res.data.tasks);
        } catch (error) {
            console.log(error);
        }
    };

    // ================= ADD TASK =================
    const addTask = async () => {
        try {
            await axios.post(
                "https://task-manager-backend-t3mq.onrender.com/task",
                { title, description },
                {
                    headers: {
                        authorization: token
                    }
                }
            );

            alert("Task added 🚀");
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
                        authorization: token
                    }
                }
            );

            alert("Task deleted ❌");
            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    // ================= UPDATE TASK =================
    const updateTask = async (id, status) => {
        try {
            await axios.put(
                `https://task-manager-backend-t3mq.onrender.com/task/${id}`,
                { status },
                {
                    headers: {
                        authorization: token
                    }
                }
            );

            alert("Task updated ✅");
            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Dashboard 📊</h2>

            {/* ADD TASK */}
            <h3>Add Task ➕</h3>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br /><br />

            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <br /><br />

            <button onClick={addTask}>
                Add Task
            </button>

            {/* TASK LIST */}
            <h3>Your Tasks</h3>

            {tasks.length === 0 ? (
                <p>No tasks found</p>
            ) : (
                tasks.map((task) => (
                    <div
                        key={task._id}
                        style={{
                            border: "1px solid black",
                            margin: "10px",
                            padding: "10px"
                        }}
                    >
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>

                        <button onClick={() => updateTask(task._id, "completed")}>
                            Mark Completed ✔
                        </button>

                        <button onClick={() => deleteTask(task._id)}>
                            Delete ❌
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default Dashboard;