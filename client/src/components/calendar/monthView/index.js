import React from 'react';
import dayjs from 'dayjs';
import classes from './index.module.css';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'react-feather';

const weekNames = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function MonthView({ pointer, setPointer, handleOpenModal, slots, checked }) {
    const [month, setMonth] = React.useState([]);

    const today = () => {
        setPointer(dayjs());
    }

    const nextMonth = () => {
        setPointer(pointer.add('1', 'month').clone());
    }

    const prevMonth = () => {
        setPointer(pointer.subtract(1, 'month').clone());
    }

    React.useEffect(() => {
        const temp = [];

        let startDay = pointer.clone().startOf('month').startOf('week');
        let endDay = pointer.clone().endOf('month').endOf('week');

        let day = startDay.clone().subtract(1, 'day');

        while (day.isBefore(endDay, 'day')) {
            const array = Array(7).fill(0).map((el) => {
                day = day.add(1, 'day').clone();
                return day;
            });
            temp.push(array);
        }

        setMonth(temp);

    }, [pointer, slots, checked])

    return (
        <div className={classes.container}>
            <div className={classes.controls}>
                <button className={classes.today} onClick={today}>
                    Today
                </button>
                <button className={classes.prev} onClick={prevMonth}>
                    <ChevronLeft />
                </button>
                <div className={classes.date} >
                    {dayjs(pointer).format('MMM-YYYY')}
                </div>
                <button className={classes.next} onClick={nextMonth}>
                    <ChevronRight />
                </button>
            </div>
            <div className={classes.monthView}>
                <div className={classes.weekNames}>
                    {
                        weekNames.map(weekName => {
                            return (
                                <div key={weekName} className={classes.weekName}>{weekName.slice(0, 3)}</div>
                            )
                        })
                    }
                </div>
                {
                    month.map((week, idx) => {
                        return (
                            <div className={classes.week} key={idx}>
                                {
                                    week.map(day => {
                                        return (
                                            <span
                                                key={dayjs(day).toISOString()}
                                                onClick={(e) => dayjs(day).isSame(dayjs(pointer), 'month') && handleOpenModal(day)}
                                                className={clsx(
                                                    classes.day,
                                                    dayjs(day).isSame(dayjs(pointer), 'month') ? classes.dayHover : classes.disableDay,
                                                    dayjs(day).isSame(dayjs(), 'date') && classes.currDay
                                                )}
                                            >
                                                {dayjs(day).format('DD')}
                                                <div className={classes.slotsContainer} onClick={(e) => { e.stopPropagation() }}>
                                                    <div className={classes.slots}>
                                                        {
                                                            checked.map(t_id =>
                                                                slots[t_id].map(slot => {
                                                                    if (dayjs(slot.start).isSame(day, 'date')) {
                                                                        return (
                                                                            <div key={slot.id} className={classes.slot}>
                                                                                <span className={classes.name}>{slot.batch_name.slice(0, 6)}...</span>
                                                                                <span className={classes.time}>
                                                                                    {dayjs(slot.start).format('hh:mm a ')}
                                                                                    -
                                                                                    {dayjs(slot.end).format(' hh:mm a')}
                                                                                </span>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    return null;
                                                                })
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </span>)
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MonthView;