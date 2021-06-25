import React from 'react';
import classes from './index.module.css';
import { Plus } from 'react-feather';
import Axios from 'axios';
import InputModal from './form';
import List from './list';

function Sidebar({ teachers, setTeachers, selectTeacher, unSelectTeacher, checked, setChecked }) {
    const [openModal, setOpenModal] = React.useState(false);
    const [editTeacher, setEditTeacher] = React.useState({});

    React.useEffect(() => {
        async function fetch() {
            const { data } = await Axios.get('/api/teachers');
            setTeachers(data.teachers);
        }
        fetch();
    }, []);

    const handleCloseModal = () => {
        setEditTeacher({});
        setOpenModal(false);
    }

    const handleOpenModal = (teacher = {}) => {
        setEditTeacher(teacher);
        setOpenModal(true);
    }

    const handleDelete = async (teacher) => {
        const id = teacher.id;
        let yes = window.confirm(`Are you sure you want to delete "${teacher.name}" ? You will lose all classes associated with "${teacher.name}"`);
        if (!yes) return;
        try {
            let res = await Axios.delete(`/api/deleteTeacher/${id}`);
            let newTeachers = teachers.filter(t => {
                if (t.id === id) return false;
                return true;
            })
            setTeachers(newTeachers);
            setChecked(checked.filter(el => el.id != id));
        } catch (e) {
            alert("Something went wrong!");
            console.log(e);
        }
    }


    return (
        <div className={classes.sidebar}>

            {openModal &&
                <InputModal
                    editTeacher={editTeacher}
                    setEditTeacher={setEditTeacher}
                    teachers={teachers}
                    setTeachers={setTeachers}
                    openModal={openModal}
                    handleCloseModal={handleCloseModal}
                />
            }

            <button className={classes.addTeacher} onClick={(e) => setOpenModal(true)}>
                <Plus />
                <span className={classes.buttonText}>Add Teacher</span>
            </button>

            <List
                teachers={teachers}
                checked={checked}
                setChecked={setChecked}
                handleOpenModal={handleOpenModal}
                handleDelete={handleDelete}
                selectTeacher={selectTeacher}
                unSelectTeacher={unSelectTeacher}
            />

        </div>
    )
}

export default Sidebar;