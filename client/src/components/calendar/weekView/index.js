import React from 'react';
import classes from './index.module.css';
import dayjs from 'dayjs';
import clsx from 'clsx';
import { Trash2 } from 'react-feather';

function WeekView({ pointer, handleOpenModal, slots, checked, deleteSlot }) {
    const [week, setWeek] = React.useState([]);

    React.useEffect(() => {
        const temp = [];
        let day = dayjs(pointer).clone().startOf('week');
        const array = Array(7).fill(0).map((el) => {
            day = day.add(1, 'day').clone();
            return day;
        });
        setWeek(array);

    }, [pointer, slots, checked])

    return (
        <div className={classes.container}>
            <div className={classes.weekNames}>
                {
                    week.map(day => {
                        let x = dayjs(day);
                        return (
                            <div
                                className={clsx(classes.weekName, x.isSame(dayjs(), 'date') && classes.currDay)}
                                onClick={(e) => { handleOpenModal(x) }}
                            >
                                <span>{x.format('dddd')}</span>
                                <span>{x.format('DD')}</span>
                            </div>
                        )
                    })
                }
            </div>
            <div className={classes.weeksContainer}>
                {
                    week.map(day => {
                        let x = dayjs(day);
                        return (
                            <div className={classes.week}>
                                <div className={classes.slots} onClick={(e) => handleOpenModal(x)}>
                                    {
                                        checked.map(t => {
                                            return (slots[t.id] || []).map(slot => {
                                                if (dayjs(slot.start).isSame(x, 'date')) {
                                                    return (
                                                        <div key={slot.id}
                                                            className={classes.slot}
                                                            style={{ backgroundColor: t.color }}
                                                            onClick={(e) => { e.stopPropagation() }}
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
                                                                    <Trash2 size="20px" onClick={(e) => deleteSlot(slot.id, t.id)} />
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
                        )
                    })
                }
            </div>
        </div>
    )
}

export default WeekView;