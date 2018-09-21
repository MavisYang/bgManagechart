
//获取当前时期的前一个月
export const getLastMonthYestdy=(date)=>{
    var daysInMonth = new Array([0],[31],[28],[31],[30],[31],[30],[31],[31],[30],[31],[30],[31]);
    var strYear = date.getFullYear();
    var strDay = date.getDate();
    var strMonth = date.getMonth()+1;
    if(strYear%4 == 0 && strYear%100 != 0){
        daysInMonth[2] = 29;
    }
    if(strMonth - 1 == 0) {
        strYear -= 1;
        strMonth = 12;
    } else {
        strMonth -= 1;
    }
    strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];
    strMonth = strMonth<10? strMonth='0'+strMonth:strMonth
    strDay = strDay<10? strDay='0'+strDay:strDay
    return strYear+'-'+strMonth+'-'+strDay;;
}

export const interceptTime =(time)=>{
    let timeArr = time.split('-')
    return timeArr[1]+'.'+timeArr[2]
}


export const releaseDate=(date)=>{
    let newDate = date?date.split('T')[1].split(':'):['','']
    return newDate[0]+':'+newDate[1]

}

export const replaceTime = (time)=>{
    return time.replace(/\-/g,'.')
}


export const getQueryString = (name) => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r != null)
        return (r[2]);
    return null;
}