const formatDate = (str)=> {
let date = new Date(str)
let hours = date.getHours()
let mins = date.getMinutes()

let day = date.getDay()
let month = date.getMonth()
let year = date.getFullYear()

return `${day}/${month}/${year}@${hours}:${mins}`
}

function chatDate(inputDate) {
    const date = new Date(inputDate);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Strip time part for comparison
    const dateOnly = date.setHours(0, 0, 0, 0);
    const todayOnly = today.setHours(0, 0, 0, 0);
    const yesterdayOnly = yesterday.setHours(0, 0, 0, 0);

    if (dateOnly === todayOnly) {
        return "Today";
    } else if (dateOnly === yesterdayOnly) {
        return "Yesterday";
    } else if (dateOnly > todayOnly - today.getDay() * 86400000) {
        // Check if the date falls within the current week
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
        // Return date in "19 Aug 2020" format
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }
}

function chatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

export {formatDate,chatDate, chatTime}