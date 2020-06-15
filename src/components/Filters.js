import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate,
} from '../actions/filters'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

// props passed by mapStateToProps(), the props contains props.filters
const Filters = (props) => {
  // DateRangePicker set to this month start and end dates
  const [datePicker, setDatePicker] = useState([])
  const [pickerCleared, setPickerCleared] = useState(false)

  const changeStartDate = (date) => props.dispatch(setStartDate(date))
  const changeEndDate = (date) => props.dispatch(setEndDate(date))

  const onDatePickChange = (datePicker) => {
    if (datePicker == null) {
      setDatePicker(null)
      changeStartDate(null)
      changeEndDate(null)
      setPickerCleared(true)
    } else {
      setDatePicker(datePicker)
      changeStartDate(datePicker[0])
      changeEndDate(datePicker[1])
    }
  }

  useEffect(() => {
    if (!pickerCleared) {
      setDatePicker([props.filters.startDate, props.filters.endDate])
    }
    if (
      props.filters.startDate.getYear() === 70 &&
      props.filters.endDate.getYear() === 3100
    ) {
      setDatePicker([null, null])
    }
  }, [props.filters.startDate, props.filters.endDate])

  // console.log(props.filters.startDate)
  // console.log(props.filters.endDate)

  return (
    <div>
      <input
        type='text'
        value={props.filters.text}
        onChange={(e) => props.dispatch(setTextFilter(e.target.value))}
      />
      <select
        value={props.filters.sortBy}
        onChange={(e) => {
          if (e.target.value === 'date') {
            props.dispatch(sortByDate())
          } else if (e.target.value === 'amount') {
            props.dispatch(sortByAmount())
          }
        }}
      >
        <option value='date'>Date</option>
        <option value='amount'>Amount</option>
      </select>
      <DateRangePicker value={datePicker} onChange={onDatePickChange} />{' '}
      <small>
        click start-date, click and drag towards end-date, click end-date
      </small>
    </div>
  )
}

// state as argument passed by the connect() method
const mapStateToProps = (state) => {
  return {
    filters: state.filters,
  }
}

const ConnectedFilters = connect(mapStateToProps)(Filters)
export default ConnectedFilters
