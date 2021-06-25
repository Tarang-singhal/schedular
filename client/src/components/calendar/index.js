import React from 'react';
import dayjs from 'dayjs';
import classes from './index.module.css';
import Axios from 'axios';

import InputForm from './form';
import Controls from './controls';
import DayView from './dayView';
import WeekView from './weekView';
import MonthView from './monthView';
import { Plus } from 'react-feather';

function Calendar({ teachers, slots, setSlots, checked }) {

    const [openModal, setOpenModal] = React.useState(false);
    const [pointer, setPointer] = React.useState(dayjs());
    const [selectedDate, setSelectedDate] = React.useState(dayjs());
    const [view, setView] = React.useState('month');

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = (day) => {
        if (teachers.length === 0) return;
        setSelectedDate(dayjs(day));
        setOpenModal(true);
    }

    const handleDeleteSlot = async (id, teacher_id) => {
        try {
            let res = await Axios.delete(`/api/deleteSlot/${id}`);
            let tempSlots = { ...slots };
            let temp = [...tempSlots[teacher_id]];
            temp = temp.filter(slot => slot.id !== id);
            tempSlots[teacher_id] = temp;
            setSlots(tempSlots);
        } catch (err) {
            alert("something went wrong!");
            console.log(err);
        }
    }

    return (
        <div className={classes.calendar}>

            <Controls
                pointer={pointer}
                setPointer={setPointer}
                view={view}
                setView={setView}
            />

            {
                view === 'day' &&
                <DayView
                    handleOpenModal={handleOpenModal}
                    pointer={pointer}
                    setPointer={setPointer}
                    slots={slots}
                    checked={checked}
                    deleteSlot={handleDeleteSlot}
                />
            }

            {
                view === 'week' &&
                <WeekView
                    handleOpenModal={handleOpenModal}
                    pointer={pointer}
                    setPointer={setPointer}
                    slots={slots}
                    checked={checked}
                    deleteSlot={handleDeleteSlot}
                />
            }

            {
                view === 'month' &&
                <MonthView
                    handleOpenModal={handleOpenModal}
                    pointer={pointer}
                    setPointer={setPointer}
                    slots={slots}
                    checked={checked}
                    deleteSlot={handleDeleteSlot}
                />
            }

            <InputForm
                teachers={teachers}
                date={selectedDate}
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                slots={slots}
                setSlots={setSlots}
            />

            <button className={classes.floatingButton} onClick={(e) => handleOpenModal(dayjs())}>
                <Plus className={classes.plusIcon} size="38px" />
            </button>

        </div>
    )
}

export default Calendar;