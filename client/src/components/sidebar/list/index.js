import React from 'react';
import classes from './index.module.css';
import { Edit, Trash2 } from 'react-feather';
import randomColor from 'randomcolor';

function List({ teachers, handleOpenModal, handleDelete, selectTeacher, unSelectTeacher, checked, setChecked }) {


    const findChecked = (id) => {
        let x = checked.find(el => id === el.id);
        return x;
    }

    const handleSelected = async (id) => {
        let x = findChecked(id);
        if (x) {
            let temp = [...checked];
            temp = temp.filter(t => t.id != id);
            setChecked(temp);
        } else {
            setChecked([
                ...checked,
                {
                    id,
                    color: randomColor({ luminosity: 'bright' })
                }
            ])
        }
    }

    return (
        <>
            <ul className={classes.list}>
                {
                    teachers.map(teacher => {
                        let x = findChecked(teacher.id);
                        return (
                            <li
                                key={teacher.id}
                                className={classes.listItem}
                                onClick={(e) => handleSelected(teacher.id)}
                                style={{ backgroundColor: x && (x.color), color: x && 'white', backdropFilter: 'brightness(4)' }}
                            >
                                <input className={classes.checkBox} type="checkbox" checked={x || false} readOnly />
                                <span className={classes.listItemText}>{teacher.name}</span>
                                <span className={classes.icons}>
                                    <Edit className={classes.editIcon} size="20" onClick={(e) => { e.stopPropagation(); handleOpenModal(teacher) }} />
                                    <Trash2 className={classes.trashIcon} size="20" onClick={(e) => { e.stopPropagation(); handleDelete(teacher) }} />
                                </span>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default List;