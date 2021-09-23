import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from '../styles/Notepad.module.css'
import Note from './note'

const Notepad: NextPage = () => {
  const [notes, setNotes] = useState<(string|undefined)[]>([undefined]);

  useEffect(() => {
    if(document.cookie) {
      const val: (string|undefined)[] = document.cookie.split("=")[1].split(",");
      val.pop();
      if(val.length) {
        val.push(undefined);
        setNotes(val);
      } else {
        setNotes([undefined]);
      }
    }
  }, [])

  useEffect(() => {
    document.cookie = `notes=${notes.join(",")}`;
  }, [notes])
  
  const onCreate = (id: number, val:string) => {
    const notesDupe = [...notes];
    notesDupe.push(undefined);
    notesDupe[id] = val;
    setNotes(notesDupe);
  }
  
  const removeNote = (id: number) => {
    const notesDupe = [...notes];
    notesDupe.splice(id, 1);
    setNotes(notesDupe);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Notepad.</h2>
      <div className={styles.notepad__notes}>
        {notes.map((item, index) => {
          return <Note key={`Note_${index}`} id={index} onDelete={removeNote} noteValue={item} onCreate={onCreate} hasVal={item?true:false} select={index==notes.length-1?true:false}/>
        })}
      </div>
      <button className={styles.button__delete} onClick={() => {
        setNotes([undefined]);
      }}>Delete All</button>
    </div>
  )
}

export default Notepad
