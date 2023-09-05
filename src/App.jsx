import { useState ,useTransition} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    title: "",
    first_name: "",
    last_name: "",
    contacts: [{ name: "", value: "" }],
  });

  const [formList,setFormList]=useState([])

  const [_,startTransistion]=useTransition()

  const [requiredFields, setRequiredFields] = useState(['first_name']);
  const [validated,setValidated] =useState(false)

  const handleChange = (event) => {
    setForm((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleChangeContact = (type,event,index) => {
    if(type ==  'textbox'){

      let contacts = structuredClone(form.contacts);
      contacts[index].value = event.target.value
      setForm((prev) => {
        return {
          ...prev,
          contacts
        };
      });
    }
    else{

      
      let contacts = structuredClone(form.contacts);
      console.log(event.target.value)
      contacts[index].name = event.target.value;
      setForm((prev) => {
        return {
          ...prev,
          contacts
        };
      });

    }
  };

  const addMore = ()=>{
    setForm((prev) => {
      return {
        ...prev,
        contacts: [...prev.contacts,{name: "", value: "" }]
      };
    });
  }
  const deleteContact = (e,idx)=>{
    e.preventDefault();
    if(idx==0) return
    setForm((prev) => {
      prev.contacts.splice(idx,1);
      return {
        ...prev,
        contacts: prev.contacts
      };
    });
  }

  const submit =()=>{
    if(!form.first_name.length) return setValidated(true)

    setFormList((prev)=>[...prev,form])
    startTransistion(()=>{
      setValidated(false);
      setForm({
        title: "",
        first_name: "",
        last_name: "",
        contacts: [{ name: "", value: "" }],
      })
    })
  }

  return (
    <>
      <div className="center form-container">
        <div className="flex-column">
        <label>Title</label>
          <input
            type="text"
            name={"title"}
            value={form.title}
            onChange={handleChange}
          />
        </div>
        <div className="flex-column">
          <label>First Name</label>
          <input
            type="text"
            name={"first_name"}
            value={form.first_name}
            onChange={handleChange}
            required
          />
          <span className="danger">{validated? "This Fields is Required":""}</span>
        </div>
        <div className="flex-column">
          <label>Last Name</label>
          <input
            type="text"
            name={"last_name"}
            value={form.last_name}
            onChange={handleChange}
          />
        </div>

        <button onClick={addMore}>Add More Contacts +</button>

        {form.contacts.map((eachContact, idx) => (
          <div className="flex-column">
            <div className="flex">
            <select
              name={"contacts"}
              value={eachContact.name}
              onChange={(e) => handleChangeContact("dropdown", e, idx)}
            >
              <option value="mobile">Mobile</option>
              <option value="phone_no">Phone No</option>
              <option value="email_id">Email Id</option>
            </select>

            <div className="btn">
            <button type="button" onClick={(e)=>deleteContact(e,idx)}>Delete Contacts +</button>

            </div>


            </div>
            <input
              type={eachContact.name == "mobile" ? "number" : "text"}
              name={eachContact.name}
              value={eachContact.value}
              onChange={(e) => handleChangeContact("textbox", e, idx)}
            />
          </div>
        ))}
        <button onClick={submit}>Submit</button>
      </div>

      <hr/>
      <div className="table">
        <h3>Form List</h3>
        <hr/>

        {
          formList.map((eachForm,key)=>(
            <>
                 <div className="flex-column" key={key}>Title-{eachForm.title}</div>
                 <div className="flex-column" key={key}>First Name-{eachForm.first_name}</div>
                 <div className="flex-column" key={key}>Last Name-{eachForm.last_name}</div>
                 <div className="flex-column" key={key}>Contacts-{eachForm.contacts.map((eachContact,key2)=>(
                 <div className="flex-column" key={key2}>{eachContact.name}-{eachContact.value}</div>
                 ))}</div>
                        <hr/>
            </>
          ))
        }
  
      </div>
    </>
  );
}

export default App;
