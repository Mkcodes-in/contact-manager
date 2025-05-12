import { useEffect, useState } from 'react'
import './App.css'
import ConatactHeader from './components/ConatactHeader';

function App() {

  // {Make array and localstorage logic}

  const [list, setList] = useState(() => {
    const saved = localStorage.getItem('contacts');
    return saved && saved !== "undefined" ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(list));
  }, [list]);

  const AddList = (text) => {
    const new_list = {
      id: Date.now(),
      ...text,
      category: text.category || "personal",
    }
    setList([...list, new_list]);
  }

  // {Delete logic}

  const DeleteList = (id) => {
    const delete_list = list.filter((itm) => itm.id !== id);
    setList(delete_list);
  }

  // {Update (edit) logic}

  
  const EditContact = (id, updateContact) => {
    setList(prev => prev.map(contact =>
      contact.id === id ? { ...contact, ...updateContact } : contact
    ));
  };

  return (
    <>
      <ConatactHeader
        DeleteList={DeleteList}
        list={list}
        EditContact={EditContact}
        AddList={AddList} />
    </>
  )
}

export default App;
