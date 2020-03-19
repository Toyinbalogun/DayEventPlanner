let currentHour = moment().hours()
// let currentHour = '12'

//display current date and time
$('#currentDay').text(moment().format('MMMM Do YYYY, h:mm:ss a'))

//***********************************************************************************//
//******************************* FUNCTIONS *****************************************//
//***********************************************************************************//

//convert moment.js to 12hr clock
function getTimeValin24hrs(timeString){
    let AMorPM = timeString.substring(timeString.length - 2, timeString.length)//extracts either 'AM'or 'PM'
    //return AMorPM
    let hourInteger = parseInt(timeString.substring(0, timeString.length-2))
    //return hourInteger
    if ((AMorPM === "PM" && hourInteger != 12) || (AMorPM === "AM" && hourInteger === 12)){
        hourInteger += 12
    }
    return hourInteger === 24?0 : hourInteger;
}

function saveEvent(time, event){
    localStorage.setItem(time, event)
}

function getEvent(time){
    return localStorage.getItem(time)
}
//console.log(getEvent('9AM'))
// TEST '.substring()'
// let timeString1 = '12AM'
// let timeString2 = '9PM'
// console.log(convertToAMorPM(timeString1))
// console.log(convertToAMorPM(timeString2))

//***********************************************************************************//
//**************************** EVENT HANDLERS ***************************************//
//***********************************************************************************//
$('.currentTime').each(function(){
    let eventTime = getTimeValin24hrs($(this).text())
    let curEvent = getEvent($(this).text())

    if(currentHour > eventTime){
        $(this).next('.currentEvent').addClass('past')
    }
    else if (currentHour < eventTime){
        $(this).next('.currentEvent').addClass('future')
    }
    else{
        $(this).next('.currentEvent').addClass('present')
    }

    if(curEvent != null){
        $(this).siblings('.currentEvent').first().text(curEvent)
    }
})

$(document).on('click','.saveBtn', function(e){
    e.preventDefault()
    let curTime = $(this).siblings('.currentTime').first().text()
    let getEvent = $(this).siblings('.currentEvent').first().val()
    saveEvent(curTime, getEvent)
})
