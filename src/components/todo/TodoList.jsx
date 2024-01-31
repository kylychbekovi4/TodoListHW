import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import scss from "./TodoList.module.scss";
const url =
	"https://elchocrud.pro/api/v1/dea0258cbc1b983b968148560013d81e/axios-mui";

const TodoList = () => {
	const [todo, setTodo] = useState([]);
	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const [isEdit, setIsEdit] = useState(false);
	const [editId, setEditId] = useState("");
	const [edit_input1, setEdit_input1] = useState("");
	const [edit_input2, setEdit_input2] = useState("");
	const [edit_input3, setEdit_input3] = useState("");

	const handleAdd = async () => {
		const newData = {
			title: title,
			image: image,
			description: description,
		};

		//! POST
		const response = await axios.post(url, newData);
		setTodo(response.data);
		setTitle("");
		setImage("");
		setDescription("");
	};

	//! GET
	const getTodos = async () => {
		const response = await axios.get(url);
		setTodo(response.data);
	};

	//! DELETE
	const deleteTodo = async (id) => {
		const response = await axios.delete(`${url}/${id}`);
		setTodo(response.data);
	};

	const updateTodoValue = (id) => {
		const filterData = todo.find((item) => item._id === id);
		setEdit_input1(filterData.title);
		setEdit_input2(filterData.image);
		setEdit_input3(filterData.description);
		setEditId(id);
		setIsEdit(!isEdit);
		setTitle("");
		setImage("");
		setDescription("");
	};

	//! PUT
	const updateTodo = async (id) => {
		const updateData = {
			title: edit_input1,
			image: edit_input2,
			description: edit_input3,
		};
		const response = await axios.put(`${url}/${id}`, updateData);
		setTodo(response.data);
		console.log(response.data);
		setEditId(null);
		setIsEdit(!isEdit);
	};

	const deleteAllTodo = async () => {
		const response = await axios.delete(url);
		setTodo(response.data);
	};

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div>
			<p className={scss.todo_list}>TodoList</p>
			{/* //! */}
			<div className={scss.parent}>
				<input
					type="text"
					placeholder="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<input
					type="text"
					placeholder="image"
					value={image}
					onChange={(e) => setImage(e.target.value)}
				/>
				<input
					type="text"
					placeholder="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<div className={scss.buttons}>
				<button onClick={handleAdd}>Add</button>
				<button className={scss.delete_all} onClick={deleteAllTodo}> DeleteAll</button>
			</div>

			{/* //! MAP */}
			<div className={scss.dad}>
				{todo.map((item) => (
					<div className={scss.papa} key={item._id}>
						{isEdit && editId === item._id ? (
							<div className={scss.parent_second}>
								<div className={scss.innputs}>
									<input
										type="text"
										placeholder="title"
										value={edit_input1}
										onChange={(e) => setEdit_input1(e.target.value)}
									/>
									<input
										type="text"
										placeholder="image"
										value={edit_input2}
										onChange={(e) => setEdit_input2(e.target.value)}
									/>
									<input
										type="text"
										placeholder="description"
										value={edit_input3}
										onChange={(e) => setEdit_input3(e.target.value)}
									/>
								</div>
								{/* //! save */}
								<div className={scss.buttonn}>
								<button
									onClick={() => updateTodo(item._id)}>
									Save
								</button>

								</div>
							</div>
						) : (
							<div className={scss.parent_third}>
								<div className={scss.h1_p}>
									<h1>{item.title}</h1>
									<p>{item.description}</p>
								</div>
								<img src={item.image} alt={item.title} />
								<div className={scss.button_2}>
									<button
										onClick={() => {
											deleteTodo(item._id);
										}}>
										delete
									</button>

									{/* //! EDIT button */}
									<button
										className={scss.edit_bt}
										onClick={() => {
											updateTodoValue(item._id);
										}}>
										Edit
									</button>
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default TodoList;
