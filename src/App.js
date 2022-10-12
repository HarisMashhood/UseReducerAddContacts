import { useEffect, useReducer, useState } from "react";
import "./styles.css";

const getItems = () => {
  let list = localStorage.getItem("MyList");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};
const initialState = [
  {
    id: Date.now(),
    name: "HarisMashhood",
    email: "haris@gmail.com"
  }
];
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "delete":
      return state.filter((contact) => {
        return contact.id !== action.payload.id;
      });
    default:
      throw new Error();
  }
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  console.log(state);
  const addContact = (e) => {
    e.preventDefault();
    const contact = {
      id: Date.now(),
      name,
      email
    };
    setName("");
    setEmail("");
    dispatch({ type: "add", payload: contact }); //here i'm dispatching my action in order to add my contact
  };
  useEffect(() => {
    localStorage.setItem("MyList", JSON.stringify(state));
  }, [state]);
  return (
    <>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <h1>Add your favourite contacts here :-)</h1>
        <form onSubmit={addContact}>
          <input
            type="text"
            placeholder="enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button>Add Contact</button>
        </form>
      </div>
      <br />
      <div>
        <ul>
          {state.map((contact) => {
            return (
              <li
                key={contact.id}
                style={{
                  display: "flex",
                  backgroundColor: "lightgray",
                  gap: "30px",
                  paddingLeft: "15px",
                  borderBottom: "1px solid white",
                  alignItems: "center",
                  flexWrap: "wrap"
                }}
              >
                <h2>{contact.name}</h2>
                <h2>{contact.email}</h2>
                <div>
                  <button
                    onClick={() =>
                      dispatch({ type: "delete", payload: { id: contact.id } })
                    }
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
