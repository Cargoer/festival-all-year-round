export function getDateObj(date) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return {
    year,
    month,
    day
  }
}

export function getWeekBasedDate(year, month, weekno, dayno) {
  let resultDay
  let firstDayOfTheMonth = new Date(year, month-1, 1)
  debugger
  let dayNoOfFirstDay = firstDayOfTheMonth.getDay()
  dayNoOfFirstDay = dayNoOfFirstDay == 0? 7: dayNoOfFirstDay
  let delta = dayno - dayNoOfFirstDay
  if(delta >= 0) {
    resultDay = 1 + delta + (weekno - 1) * 7
  } else {
    resultDay = 1 + delta + weekno * 7
  }
  return `${month}-${resultDay}`
}