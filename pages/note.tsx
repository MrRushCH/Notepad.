import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from '../styles/Note.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

interface Props {
    noteValue: string | undefined;
    onDelete: Function;
    onCreate: Function;
    id: number;
    hasVal: boolean;
    select: boolean;
}

const Note: NextPage<Props> = ({noteValue, onDelete, id, onCreate, hasVal, select}) => {
    const [noteInput, setNoteInput] = useState<string|undefined>("");

    let inputElement: HTMLInputElement|null = null;
    
    useEffect(() => {
        if(select) {
            inputElement?.select();
        }
    }, [])

  return (
    <form className={styles.note}>
        {!hasVal && <input type="text" className={styles.note__input} ref={element => inputElement = element} onChange={(event) => {
            console.log(noteInput)
            setNoteInput(event.target.value);
        }}></input>}
        {hasVal && <input type="text" className={`${styles.note__input} ${styles.note__disabled}`} value={noteValue} disabled></input>}
        <div className={styles.spacing}/>
        <div className={`${hasVal?styles.note__delete:styles.note__submit} ${styles.note__button}`}>
            <button onClick={(e) => {
                e.preventDefault();
                if(!noteValue) {
                    if(noteInput) {
                        console.log(id, noteInput);
                        onCreate(id, noteInput);
                    } else {
                        alert("Please enter a value before creating the note.");
                    }
                } else {
                    onDelete(id);
                    setNoteInput(undefined);
                }
            }}>
                <FontAwesomeIcon icon={faPlus}/>
            </button>
        </div>
    </form>
  )
}

export default Note
