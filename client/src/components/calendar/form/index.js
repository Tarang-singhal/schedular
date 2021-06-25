import React from 'react';
import classes from './index.module.css';
import dayjs from 'dayjs';
import Modal from '../../generalComponents/modal';
import Axios from 'axios';

function InputForm({ teachers, openModal, handleCloseModal, date, slots, setSlots }) {

    const [selectedDate, setSelectedDate] = React.useState(dayjs(date).startOf('date').startOf('hour').startOf('minute'));
    const [selectedTeacher, setSelectedTeacher] = React.useState(teachers[0] ? teachers[0].id : '');
    const [batchName, setBatchName] = React.useState('');
    const [startTime, setStartTime] = React.useState(dayjs(selectedDate).startOf('hour').startOf('minute').startOf('second'));
    const [endTime, setEndTime] = React.useState(dayjs(selectedDate).endOf('hour').endOf('minute').startOf('second'));
    const [submitting, setSubmitting] = React.useState(false);
    const [topic, setTopic] = React.useState('');
    const [error, setError] = React.useState({ start: null, end: null });

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

    const resetError = () => {
        setError({ start: null, end: null });
    }

    React.useEffect(() => {
        if (startTime.isAfter(endTime.clone().subtract(1, 'minute'), 'minute') || startTime.isSame(endTime, 'minute')) {
            setError({
                start: 'start time should be less than end!',
                end: null
            })
            return true;
        }
        let temp = slots[selectedTeacher] || [];
        for (let i = 0; i < temp.length; i++) {
            let slot = temp[i];
            let { start: x, end: y } = slot;
            let start = dayjs(x);
            let end = dayjs(y);
            if (startTime.isAfter(start.clone().subtract(1, 'minute'), 'minute') && startTime.isBefore(end.clone().add(1, 'minute'), 'minute')) {
                setError({
                    start: 'start time overlapping with other class time!',
                    end: null
                })
                return true;
            }
            if (endTime.isAfter(start.clone().subtract(1, 'minute'), 'minute') && endTime.isBefore(end.clone().add(1, 'minute'), 'minute')) {
                setError({
                    start: null,
                    end: 'end time overlapping with other class time!'
                })
                return true;
            }
            if (startTime.isBefore(start.clone().add(1, 'minute'), 'minute') && endTime.isAfter(end.clone().subtract(1, 'minute'), 'minute')) {
                setError({
                    start: 'class in between!',
                    end: null
                })
                return true;
            }
        }
        resetError();
    }, [startTime.toString(), endTime.toString(), slots.length, selectedTeacher, openModal]);

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
        setTopic('');
        handleCloseModal();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (error.start || error.end) {
            return;
        }
        setSubmitting(true);
        let formData = {
            teacher_id: selectedTeacher,
            batch_name: batchName.trim(),
            date: selectedDate,
            start: startTime,
            end: endTime,
            topic
        };
        try {
            let { data } = await Axios.post('/api/addSlot', formData);
            let id = data.id;
            let temp = slots[selectedTeacher] || [];
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
            handleCloseModal={(!submitting ? handleClose : () => { })}
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

                <label htmlFor="topic_input">Topic Name: </label>
                <input disabled={submitting} type="text" id="topic_input" required value={topic} placeholder="e.g. Web-Dev" maxLength={25} onChange={(e) => setTopic(e.target.value)} />

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
                <p style={{ height: '15px', color: 'red', fontSize: '12px', margin: '5px, 0' }}>
                    {error.start || error.end}
                </p>
                <div className={classes.center}>
                    <button className={classes.button} disabled={submitting || error.start || error.end}>Submit</button>
                </div>
            </form>
        </Modal >
    )
}

export default InputForm;