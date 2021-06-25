import React from 'react';
import dayjs from 'dayjs';
import classes from './index.module.css';
import clsx from 'clsx';
import { Trash2 } from 'react-feather';

const weekNames = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function MonthView({ pointer, handleOpenModal, slots, checked, deleteSlot }) {
    const [month, setMonth] = React.useState([]);

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
                                                            checked.map(t => {
                                                                return (slots[t.id] || []).map(slot => {
                                                                    if (dayjs(slot.start).isSame(day, 'date')) {
                                                                        return (
                                                                            <div key={slot.id}
                                                                                className={classes.slot}
                                                                                style={{ backgroundColor: t.color }}
                                                                            >
                                                                                <div className={classes.detail2}>
                                                                                    <span className={classes.time}>
                                                                                        {dayjs(slot.start).format('hh:mm a ')}
                                                                                        -
                                                                                        {dayjs(slot.end).format(' hh:mm a')}
                                                                                    </span>
                                                                                </div>
                                                                                <div className={classes.detail1}>
                                                                                    <span className={classes.name}>{slot.batch_name}</span>
                                                                                </div>
                                                                                <div className={classes.detail1}>
                                                                                    <span className={classes.topic}>
                                                                                        Topic: {slot.topic}
                                                                                    </span>
                                                                                </div>
                                                                                <div className={classes.detail2}>
                                                                                    <span className={classes.delete}>
                                                                                        <Trash2 size="20px" onClick={(e)=> deleteSlot(slot.id, t.id)}/>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    return null;
                                                                })
                                                            })
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