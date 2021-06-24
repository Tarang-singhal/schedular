import React from 'react';
import classes from './App.module.css';
import Axios from 'axios';
import Sidebar from './components/sidebar';
import Calendar from './components/calendar';


function App() {
  const [teachers, setTeachers] = React.useState([]);
  const [slots, setSlots] = React.useState({});
  const [checked, setChecked] = React.useState([]);

  const selectTeacher = async (id) => {
    try {
      let { data } = await Axios.get(`/api/getSlots/${id}`);
      console.log(data.slots);
      setSlots({
        ...slots,
        [id]: data.slots
      })
      return true;
    } catch (error) {
      alert("something went wrong");
      return false;
    }
  }

  const unSelectTeacher = (id) => {
    let tempSlots = { ...slots };
    delete tempSlots[id];
    setSlots(tempSlots);
    return false;
  }

  return (
    <div className={classes.App}>
      <Sidebar
        teachers={teachers}
        checked={checked}
        setChecked={setChecked}
        setTeachers={setTeachers}
        selectTeacher={selectTeacher}
        unSelectTeacher={unSelectTeacher}
      />
      <Calendar
        teachers={teachers}
        slots={slots}
        setSlots={setSlots}
        checked={checked}
      />
    </div>
  );
}

export default App;
