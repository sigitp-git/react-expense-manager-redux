import React, { useState, useEffect } from 'react'
import DatePicker from 'react-date-picker'

// Form used in both Edit and Add (Reusable Form)
// on Add, initial state is empty
// on Edit, props containing the state is sent, useEffect used to update the state
const Form = (props) => {
  //local state also can be used with redux
  const [desc, setDesc] = useState('')
  const [note, setNote] = useState('')
  const [amt, setAmt] = useState('')
  const [datePicker, setDatePicker] = useState(new Date())
  const [status, setStatus] = useState('')

  const onChangeDesc = (e) => {
    if (e.target.value !== null) {
      setDesc(e.target.value)
    }
  }

  const onChangeNote = (e) => {
    if (e.target.value !== null) {
      setNote(e.target.value)
    }
  }

  const onChangeAmt = (e) => {
    if (!e.target.value || e.target.value.match(/^\d{1,}(\.\d{0,2})?$/)) {
      setAmt(e.target.value)
    }
  }

  const onDatePickChange = (datePicker) => {
    if (datePicker) {
      setDatePicker(datePicker)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!desc || !amt) {
      setStatus('Description and Amount required!')
    } else {
      setStatus(`${desc} submitted!`)
      props.onSubmit({
        description: desc,
        note: note,
        amount: parseFloat(amt, 10) * 100,
        createdAt: datePicker.getTime(),
      })
    }
    setDesc('')
    setAmt('')
    setNote('')
  }

  useEffect(() => {
    if (props.expense) {
      const dateObj = new Date(props.expense.createdAt)
      setDesc(props.expense.description)
      setNote(props.expense.note)
      setAmt((props.expense.amount / 100).toString())
      setDatePicker(dateObj)
    }
  }, [props.expense])

  return (
    <form className='form' onSubmit={onSubmit}>
      {status && <p className='form__status'>{status}</p>}
      <DatePicker
        className='date-picker'
        value={datePicker}
        onChange={onDatePickChange}
      />
      <input
        className='text-input'
        type='text'
        placeholder='expense description...'
        autoFocus
        value={desc}
        onChange={(e) => onChangeDesc(e)}
      />
      <input
        className='text-input'
        type='text'
        placeholder='amount...'
        value={amt}
        onChange={(e) => onChangeAmt(e)}
      />
      <textarea
        className='textarea'
        placeholder='note... (optional)'
        value={note}
        onChange={(e) => onChangeNote(e)}
      ></textarea>
      <div>
        <button className='button button--dark'>Save</button>
      </div>
    </form>
  )
}

export default Form
