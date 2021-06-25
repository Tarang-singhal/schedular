import React from 'react';
import classes from './index.module.css';
import dayjs from 'dayjs';
import clsx from 'clsx';
import { Trash2 } from 'react-feather';

function DayView({ pointer, handleOpenModal, slots, checked, deleteSlot }) {

    let x = dayjs(pointer);
    return (
        <div className={classes.container}>
            <div className={classes.weekNames}>
                <div
                    className={clsx(classes.weekName, x.isSame(dayjs(), 'date') && classes.currDay)}
                    onClick={(e) => { handleOpenModal(x) }}
                >
                    <span>{x.format('MMM DD, YYYY')}</span>
                </div>
            </div>
            <div className={classes.weeksContainer}>

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
                                                        <Trash2 onClick={(e) => deleteSlot(slot.id, t.id)} />
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
            </div>
        </div>
    )
}

export default DayView;