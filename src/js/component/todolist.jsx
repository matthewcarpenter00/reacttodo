import React from "react";
import { getTodos, updateTodos } from "../apis/api";

export const ToDoList = () => {
	const [newTask, setNewTask] = React.useState("");
	const [listOfTasks, setListOfTasks] = React.useState(null);

	const addToList = () => {
		setListOfTasks([...listOfTasks, newTask]);
		setNewTask("");
	};

	const deleteTask = index => {
		const updatedList = listOfTasks.filter((item, i) => {
			return i !== index;
		});

		setListOfTasks(updatedList);
	};

	React.useEffect(() => {
		// Loading initial todos from the server
		const fn = async () => {
			const todos = await getTodos();
			setListOfTasks(todos.map(item => item.label));
		};
		fn();
	}, []);

	React.useEffect(() => {
		// Update todos on the server
		const fn = async () => {
			updateTodos(
				listOfTasks.map(item => ({ label: item, done: false }))
			);
		};
		if (listOfTasks !== null) {
			fn();
		}
	}, [listOfTasks]);

	if (listOfTasks === null) {
		return null;
	}

	return (
		<div className="notePad container-fluid">
			<div className="text-center mt-5">
				<h1>To Do List</h1>
			</div>
			<input
				className="container inputfield"
				type="text"
				value={newTask}
				placeholder="No tasks? add a task"
				onChange={event => setNewTask(event.target.value)}
				onKeyUp={event => {
					if (event.key === "Enter") {
						if (newTask === "") {
							alert("Please enter a task");
						} else {
							addToList();
						}
					}
				}}
			/>
			{/* {listOfTasks.length == 0 ? (
				<p className="text-center">No tasks? add a task</p>
			) : null} */}

			{listOfTasks.map((item, index) => {
				return (
					<div key={index} className="todo">
						{item}
						<p
							className="closebutton"
							onClick={() => {
								deleteTask(index);
							}}>
							X
						</p>
					</div>
				);
			})}
			{listOfTasks.length > 0 ? (
				<p className="itemsleft">{`${listOfTasks.length} item${
					listOfTasks.length > 1 ? "s" : ""
				} left`}</p>
			) : null}
		</div>
	);
};
