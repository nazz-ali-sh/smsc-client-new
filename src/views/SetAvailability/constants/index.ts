const generateTimeOptions = () => {
  const times = []
  let currentHour = 9
  let currentMinute = 0

  while (currentHour < 21 || (currentHour === 21 && currentMinute === 0)) {
    const timeString = `${currentHour?.toString()?.padStart(2, '0')}:${currentMinute?.toString()?.padStart(2, '0')}`

    times?.push(timeString)

    currentMinute += 45

    if (currentMinute >= 60) {
      currentMinute = currentMinute - 60
      currentHour += 1
    }
  }

  return times
}

export const TIME_OPTIONS = generateTimeOptions()

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
