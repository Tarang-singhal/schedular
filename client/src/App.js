import React from 'react';
import classes from './App.module.css';
import Axios from 'axios';
import Sidebar from './components/sidebar';
import Calendar from './components/calendar';


function App() {
  const [teachers, setTeachers] = React.useState([]);
  const [slots, setSlots] = React.useState({});
  const [checked, setChecked] = React.useState([]);
  const [fetching, setFetching] = React.useState(false);

  React.useEffect(() => {
    async function fetch() {
      setFetching(true);
      let { data } = await Axios.get(`/api/getSlots`);
      let temp = {};
      data.slots.forEach(slot => {
        if (!temp[slot.teacher_id]) temp[slot.teacher_id] = [];
        temp[slot.teacher_id].push(slot);
      })
      setSlots(temp);
      setFetching(false);
    }
    fetch();
  }, [])

  const selectTeacher = async (id) => {
    try {
      let { data } = await Axios.get(`/api/getSlots/${id}`);
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
      {
        fetching &&
        <div className={classes.backdrop}>
          <span className={classes.outerCircle}>
            <span className={classes.innerCircle}></span>
          </span>
        </div>
      }
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
