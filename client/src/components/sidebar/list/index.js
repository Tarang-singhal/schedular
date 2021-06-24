import React from 'react';
import classes from './index.module.css';
import { Edit, Trash2 } from 'react-feather';

function List({ teachers, handleOpenModal, handleDelete, selectTeacher, unSelectTeacher, checked, setChecked }) {

    const [fetching, setFetching] = React.useState(false);

    const handleSelected = async (id) => {
        let x = checked.includes(id);
        if (x) {
            unSelectTeacher(id);
            let temp = [...checked];
            temp = temp.filter(t_id => t_id != id);
            setChecked(temp);
        } else {
            setFetching(true);
            let y = await selectTeacher(id);
            if(y){
                setChecked([
                    ...checked,
                    id
                ])
            }
            setFetching(false);
        }
    }

    return (
        <>
            {
                fetching &&
                <div className={classes.backdrop}>
                    <span className={classes.outerCircle}>
                        <span className={classes.innerCircle}></span>
                    </span>
                </div>
            }
            <ul className={classes.list}>
                {
                    teachers.map(teacher => {
                        return (
                            <li
                                key={teacher.id}
                                className={classes.listItem}
                                onClick={(e) => handleSelected(teacher.id)}
                            >
                                <input className={classes.checkBox} type="checkbox" checked={checked.includes(teacher.id)} readOnly/>
                                <span className={classes.listItemText}>{teacher.name}</span>
                                <span className={classes.icons}>
                                    <Edit className={classes.editIcon} size="20" onClick={(e) => {e.stopPropagation(); handleOpenModal(teacher) }} />
                                    {/* <Trash2 className={classes.trashIcon} size="20" onClick={(e) => { handleDelete(teacher) }} /> */}
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