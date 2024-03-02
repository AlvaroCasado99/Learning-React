export function getCurrentWeek() {
    const currentDate = new Date();
    const firstDate = new Date(currentDate.getFullYear(), 0, 1);
    const days =  Math.floor((currentDate-firstDate)/(24*60*60*1000)) + 1;
    const weekNumber = Math.ceil(days/7);

    return (weekNumber<=9)
        ? `${currentDate.getFullYear()}-W0${weekNumber}`
        : `${currentDate.getFullYear()}-W${weekNumber}`
}

export function minToHours(minutes){
    return minutes/60;
}

export function toDateNumber(number){
    return (number<10) ? `0${number}`: number;
}

export function htmlWeekToNumber(week){
    return {
        year: parseInt(week.split('W')[0].trim('-')), 
        week: parseInt(week.split('W')[1])
    }
}

export function getDateFromWeekAndDay(week, day){
    const {year, week: weekNumber} = htmlWeekToNumber(week);
    const days = (weekNumber*7-7) + day;

    const firstDate = Date.parse(new Date(year, 0, 1));
    return new Date(firstDate + days*(24*60*60*1000));
}

export function standardDateToReadableDate(date){
    const dateObj = standardDateToObject(date)
    return `${dateObj.day}/${dateObj.month}/${dateObj.year}`
}

export function standardDateToHTMLDate(date){
    const dateObj = standardDateToObject(date)
    return `${dateObj.year}-${dateObj.month}-${dateObj.day}`
}

export function standardDateTimeToReadableDateTime(date){
    const dateObj = standardDateToObject(date)
    return `${dateObj.day}/${dateObj.month}/${dateObj.year} ${dateObj.hour}:${dateObj.minutes}`
}

export function standardDateTimeToHTMLDateTime(date){
    const dateObj = standardDateToObject(date)
    return `${dateObj.year}-${dateObj.month}-${dateObj.day}T${dateObj.hour}:${dateObj.minutes}`
}

export function dateTZToObject(dateTZ, sep='-'){
    const [date, time] = dateTZ.split('T');
    const [year, month, day] = date.split(sep);
    const [hour, minutes, seconds] = time.split('.')[0].split(':');

    return{
        year: year,
        month: toDateNumber(month),
        day: toDateNumber(day),
        hour: toDateNumber(hour),
        minutes: toDateNumber(minutes),
        seconds: toDateNumber(seconds)
    }
}

export function standardDateToObject(date){
    return{
        year: date.getFullYear(),
        month: toDateNumber(date.getMonth()+1),
        day: toDateNumber(date.getDate()),
        hour: toDateNumber(date.getHours()),
        minutes: toDateNumber(date.getMinutes()),
        seconds: toDateNumber(date.getSeconds())
    }
}

export function dateTZToReadableDate(dateTZ, sep='-'){
    const date = dateTZToObject(dateTZ, sep)
    return `${date.day}-${date.month}-${date.year} ${date.hour}:${date.minutes}`;
}