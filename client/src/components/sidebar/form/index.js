import React from 'react';
import classes from './index.module.css';
import Axios from 'axios';
import Modal from '../../generalComponents/modal';

function InputModal({ openModal, handleCloseModal, editTeacher, teachers, setTeachers }) {
    const [submitting, setSubmitting] = React.useState(false);
    const [inputs, setInputs] = React.useState({
        name: "",
        expertise: "",
        age: 24,
        id: '',
    });

    React.useEffect(() => {
        setInputs({
            name: editTeacher.name || "",
            expertise: editTeacher.expertise || "",
            age: editTeacher.age || 24,
            id: editTeacher.id || "",
        })
    }, [editTeacher])

    const handleChange = (value, field) => {
        setInputs({
            ...inputs,
            [field]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {

            const { data } = await Axios.post('/api/addTeacher', inputs);
            setTeachers([
                ...teachers,
                {
                    ...inputs,
                    id: data.id
                }
            ]);

            setInputs({
                name: "",
                expertise: "",
                age: 24,
                id: '',
            });

        } catch (error) {
            alert("something went wrong!");
            console.log(error);
        }
        handleCloseModal();
        setSubmitting(false);
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const { data } = await Axios.put('/api/editTeacher', inputs);
            let newTeachers = teachers.map(t => {
                if (t.id == editTeacher.id) {
                    t = inputs;
                }
                return t;
            });
            setTeachers(newTeachers);
        } catch (error) {
            alert("Something went wrong!");
            console.log(e);
        }
        handleCloseModal();
        setSubmitting(false);
    }

    return (
        <Modal
            heading={!editTeacher.id ? "Add New Teacher" : "Edit Teacher"}
            openModal={openModal}
            handleCloseModal={handleCloseModal}
        >
            <form onSubmit={!editTeacher.id ? handleSubmit : handleEdit} className={classes.form}>
                <label htmlFor="name">Teacher Name: </label>
                <input
                    id="name"
                    required
                    type="text"
                    value={inputs.name}
                    disabled={submitting}
                    maxLength="14"
                    onChange={(e) => handleChange(e.target.value, 'name')}
                />
                <label htmlFor="expertise">Expertise: </label>
                <input
                    id="expertise"
                    type="text"
                    required
                    value={inputs.expertise}
                    disabled={submitting}
                    maxLength="20"
                    onChange={(e) => handleChange(e.target.value, 'expertise')}
                />
                <label htmlFor="age">Age: </label>
                <input
                    id="age"
                    type="number"
                    required
                    value={inputs.age}
                    disabled={submitting}
                    onChange={(e) => handleChange(e.target.value, 'age')}
                />
                <div className={classes.center}>
                    <button className={classes.button} disabled={submitting}>Submit</button>
                </div>
            </form>
        </Modal>
    )
}

export default InputModal;