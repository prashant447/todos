import React, { useEffect, useState } from "react";
import logo from "/images/logo.png";
import line from "/images/line.png";
import search from "/images/search.png";
import down from "/images/down.png";

import "./todo.css";
import { signOut } from "firebase/auth";
import { auth, db } from "../../../ConfigFirebase";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const arrow = (
  <svg
    class="w-6 h-6 text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m19 9-7 7-7-7"
    />
  </svg>
);

const Todo = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [todos, setTodos] = useState([]);

  //  for upadate data or completed data
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState("");

  //  create data
  const createTodo = async (e) => {
    e.preventDefault();
    if (title === "" || author === "") {
      alert("Please enter a field");
      return;
    }
    alert("Data add successfully");

    try {
      await addDoc(collection(db, "todos"), {
        title,
        author,
        completed: false,
      });
      setTitle("");
      setAuthor("");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // get data or fetching data from database
  const fetchData = async () => {
    try {
      const snapshot = await getDocs(collection(db, "todos"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(data);
      setTodos(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // delete data
  const handleDelete = async (id) => {
    const remove = doc(db, "todos", id);

    try {
      await deleteDoc(remove);
      alert("Deleted Successfully");
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  // logout user
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await signOut(auth);
      console.log(res, "userData");
      navigate("/");
    } catch (err) {
      console.log(err, "error");
    }
  };

  // hide line
  const showLine = () => {
    if (show == true) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  // handle completed
  const handleCompleted = () => {
    setIsClicked(!isClicked);
  };

  // update data

  const toogleComplete = () => {};

  // const newHandleChange = (e) =>{
  //       e.preventDefault();
  //       if (todos.completed === true) {
  //            setNewTitle(todos.title)
  //            setNewAuthor(todos.author)
  //       }else{
  //         todos.title = ""
  //         setNewTitle(e.target.value)

  //         todos.author = ""
  //         setNewAuthor(e.target.value)
  //       }

  //       console.log(newHandleChange)
  // }

  return (
    <>
      <div className="dashboard">
        <div className="logos">
          <img src={logo} alt="" className="todo-logo" />
        </div>
        <div className="todo">
          <div className="todo-add">
            <div className="todo-form ">
              <h2>TODO</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet
                at eleifend feugiat vitae faucibus nibh dolor dui. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Aliquet at eleifend
                feugiat vitae faucibus nibh dolor dui.
              </p>

              <form action="" onSubmit={createTodo}>
                <input
                  type="text"
                  placeholder="Title"
                  className="todo-val"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Description"
                  className="todo-val"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />

                <button>Add</button>
                {/* <button onClick={logout}>Logout</button> */}
              </form>
            </div>
          </div>
          <div className="vertical-line"></div>

          <div className="todo-list ">
            <h3>TODO LIST</h3>

            <div className="todo-list-container">
              <img src={search} alt="" className="search-icon" />
              <input
                type="text"
                placeholder="Search"
                className="list-search"
                onChange={(e) => setShowSearch(e.target.value)}
              />

              <input
                type="text"
                placeholder="Filter By"
                className="filter-search"
              />
              <img src={down} alt="" className="filter-icon" />

              <div name="" id="" className="filter-menu">
                <div value="" className="dropdown-menu">
                  Completed
                </div>
                <div value="" className="dropdown-menu">
                  Favourite
                </div>
                <div value="" className="dropdown-menu">
                  Deleted
                </div>
              </div>
            </div>

            {/* todo list */}

            {todos
              .filter((item) => {
                return showSearch.toLowerCase() === ""
                  ? item
                  : item.title.toLowerCase().includes(showSearch);
              })
              .map((item) => {
                const { title, author, id } = item;
                return (
                  <div key={id}>
                    <div className="task-list">
                      <div className="list" key={id}>
                        <input
                          type="text"
                          className="list-title"
                          value={title}
                          style={{
                            textDecoration: isClicked ? "line-through" : "none",
                          }}
                        />
                        <input
                          type="text"
                          className="list-author"
                          value={author}
                          style={{
                            textDecoration: isClicked ? "line-through" : "none",
                          }}
                        />
                      </div>

                      <div className="list-img">
                        <span>
                          <img src={line} alt="" onClick={showLine} />
                        </span>
                        {show && (
                          <div name="" id="" className="list-menu">
                            <div
                              value=""
                              className="list-dropdown-menu"
                              onClick={handleCompleted}
                            >
                              Completed
                            </div>
                            <div value="" className="list-dropdown-menu">
                              Favourite
                            </div>
                            <div
                              value=""
                              className="list-dropdown-menu"
                              onClick={() => handleDelete(id)}
                            >
                              Deleted
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
