export function ConvertEpochToDateFormat(unixtimestamp) {
    if (unixtimestamp === 0) return 0;

    // Unixtimestamp   : epoch

    // Months array
    var months_arr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Convert timestamp to milliseconds
    if (unixtimestamp.toString().length > 10) {
        unixtimestamp = unixtimestamp / 1000;
    }
    var date = new Date(unixtimestamp * 1000);

    // Year
    var year = date.getFullYear();

    // Month
    var monthAbbr = months_arr[date.getMonth()];
    var month = date.getMonth() + 1;

    // Day
    var day = date.getDate();

    //day of week
    var weekdayAbbr = new Array(7);
    weekdayAbbr[0] = "Sun";
    weekdayAbbr[1] = "Mon";
    weekdayAbbr[2] = "Tue";
    weekdayAbbr[3] = "Wed";
    weekdayAbbr[4] = "Thu";
    weekdayAbbr[5] = "Fri";
    weekdayAbbr[6] = "Sat";

    var weekday = weekdayAbbr[date.getDay()];

    // Hours
    var hours = date.getHours();

    var ampm = "AM";
    var ampmhours = hours;
    if (hours > 12) {
        ampm = "PM";
        ampmhours = hours - 12;
    }

    // Minutes
    var minutes = "0" + date.getMinutes();

    // Seconds
    var seconds = "0" + date.getSeconds();

    // Display date time in MM-dd-yyyy h:m:s format
    // var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return {
        year,
        month,
        monthAbbr,
        day,
        weekday,
        hours,
        minutes: minutes.substr(-2),
        seconds: seconds.substr(-2),
        jsdate: date,
        ampm,
        ampmhours
    };
}

export function ConvertDateToEpoch(date) {
    //(myvar instanceof Date) // returns true or false
    // var myDate = new Date("July 1, 1978 02:30:00"); // Your timezone!
    var myEpoch = Math.round(date.getTime() / 1000.0); //remove millisecond
    return myEpoch;
}

export function GetStandardDate(date) {
    const epochtime = ConvertDateToEpoch(date);
    const dataObj = ConvertEpochToDateFormat(epochtime);
    const sday = ("0" + dataObj.day).substr(-2);
    const smonth = ("0" + dataObj.month).substr(-2);
    const result = `${sday}.${smonth}.${dataObj.year}`;
    // const result = `${dataObj.month}.${dataObj.day}.${dataObj.year}`;
    return result;
}