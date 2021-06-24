import React from 'react';
import dayjs from 'dayjs';
import classes from './index.module.css';
import InputForm from './form';
import MonthView from './monthView';

function Calendar({ teachers, slots, setSlots, checked}) {

    const [openModal, setOpenModal] = React.useState(false);
    const [pointer, setPointer] = React.useState(dayjs());
    const [selectedDate, setSelectedDate] = React.useState(dayjs());

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenModal = (day) => {
        console.log(dayjs(day).toDate());
        setSelectedDate(dayjs(day));
        setOpenModal(true);
    }

    return (
        <div className={classes.calendar}>

            {
                openModal &&
                <InputForm
                    teachers={teachers}
                    date={selectedDate}
                    openModal={openModal}
                    handleCloseModal={handleCloseModal}
                    slots={slots}
                    setSlots={setSlots}
                />
            }

            <MonthView
                handleOpenModal={handleOpenModal}
                pointer={pointer}
                setPointer={setPointer}
                slots={slots}
                checked={checked}
            />
        </div>
    )
}

export default Calendar;