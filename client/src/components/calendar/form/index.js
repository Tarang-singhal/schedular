import React from 'react';
import classes from './index.module.css';
import dayjs from 'dayjs';
import Modal from '../../generalComponents/modal';
import Axios from 'axios';

function InputForm({ teachers, openModal, handleCloseModal, date, slots, setSlots }) {

    const [selectedDate, setSelectedDate] = React.useState(dayjs(date));
    const [selectedTeacher, setSelectedTeacher] = React.useState(teachers[0] ? teachers[0].id : '');
    const [batchName, setBatchName] = React.useState('');
    const [startTime, setStartTime] = React.useState(dayjs(selectedDate).startOf('hour').startOf('minute'));
    const [endTime, setEndTime] = React.useState(dayjs(selectedDate).endOf('hour').endOf('minute'));
    const [submitting, setSubmitting] = React.useState(false);

    React.useEffect(() => {
        setSelectedDate(dayjs(date));
    }, [date])

    React.useEffect(() => {
        setSelectedTeacher(teachers[0] ? teachers[0].id : '');
    }, [teachers])

    React.useEffect(() => {
        setStartTime(startTime.set('date', selectedDate.date()));
        setEndTime(endTime.set('date', selectedDate.date()));
    }, [selectedDate])

    const handleStartTimeChange = (e) => {
        let [h, m] = e.target.value.split(':');
        let temp = selectedDate.set('hour', h).set('minute', m);
        setStartTime(temp);
    }

    const handleEndTimeChange = (e) => {
        let [h, m] = e.target.value.split(':');
        let temp = selectedDate.set('hour', h).set('minute', m);
        setEndTime(temp);
    }

    const handleClose = () => {
        setSelectedTeacher(teachers[0] ? teachers[0].id : '');
        setSelectedDate(dayjs());
        setBatchName('');
        handleCloseModal();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        let formData = {
            teacher_id: selectedTeacher,
            batch_name: batchName,
            start: startTime.toISOString(),
            end: endTime.toISOString()
        };
        console.log(formData);
        try {
            let { data } = await Axios.post('/api/addSlot', formData);
            let id = data.id;
            let temp = slots[selectedTeacher] || [];
            console.log(slots, temp);
            setSlots({
                ...slots,
                [selectedTeacher]: [
                    ...temp,
                    { ...formData, id }
                ]
            })

        } catch (err) {
            alert("something went wrong!");
            console.log(err);
        }
        handleClose();
        setSubmitting(false);
    }

    return (

        openModal && 
        < Modal
            heading={"Schedule a class"}
            openModal={openModal}
            handleCloseModal={handleClose}
        >
            <form className={classes.form} onSubmit={handleSubmit}>
                <label htmlFor="teacher_input">Select teacher: </label>
                <select disabled={submitting} id="teacher_input" value={selectedTeacher} required onChange={(e) => setSelectedTeacher(e.target.value)}>
                    {
                        teachers.map(t => {
                            return (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            )
                        })
                    }
                </select>

                <label htmlFor="batch_input">Batch Name: </label>
                <input disabled={submitting} type="text" id="batch_input" required value={batchName} placeholder="e.g. MMUB" maxLength={25} onChange={(e) => setBatchName(e.target.value)} />

                <label htmlFor="date_input">Select Date: </label>
                <input disabled={submitting} type="date" id="date_input" required value={selectedDate.format('YYYY-MM-DD')} onChange={(e) => setSelectedDate(dayjs(e.target.value))} />

                <div className={classes.inlineInputs}>
                    <span>
                        <label htmlFor="start_input">start: </label>
                        <input disabled={submitting} type="time" id="start_input" required value={startTime.format('HH:mm')} onChange={handleStartTimeChange} />
                    </span>
                    <span>
                        <label htmlFor="end_input">end: </label>
                        <input disabled={submitting} type="time" id="end_input" required value={endTime.format('HH:mm')} onChange={handleEndTimeChange} />
                    </span>
                </div>
                <button disabled={submitting}>Submit</button>
            </form>
        </Modal >
    )
}

export default InputForm;