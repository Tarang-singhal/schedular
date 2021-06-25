import React from 'react';
import dayjs from 'dayjs';
import classes from './index.module.css';
import { ChevronLeft, ChevronRight } from 'react-feather';


function Controls({ pointer, setPointer, view, setView }) {

    const today = () => {
        setPointer(dayjs());
    }

    const next = () => {
        setPointer(pointer.add('1', view).clone());
    }

    const prev = () => {
        setPointer(pointer.subtract(1, view).clone());
    }

    return (
        <div className={classes.bar}>
            <div className={classes.controls}>
                <button className={classes.today} onClick={today}>
                    Today
                </button>
                <button className={classes.prev} onClick={prev}>
                    <ChevronLeft />
                </button>
                <div className={classes.date} >
                    {dayjs(pointer).format('MMM-YYYY')}
                </div>
                <button className={classes.next} onClick={next}>
                    <ChevronRight />
                </button>
            </div>
            <select className={classes.select} value={view} onChange={(e) => { setPointer(dayjs()); setView(e.target.value) }}>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
            </select>
        </div>
    )
}

export default Controls;