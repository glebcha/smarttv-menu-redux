import moment from 'moment'
import translations from './locales'

/**
 * [getCategories description]
 * @param  {Array} streams  array of movie objects
 * @return {Object}         movies sorted by category
 */
export function getCategories(streams) {
    let categories = {};

    streams.forEach(stream => {
        let category = stream.category;

        if(category) {
            if(!categories[category]){
                categories[category] = [];
            }
            categories[category].push(stream);
        }
    })

    return categories;
}

/**
 * [isRollingHeader description]
 * @param  {String}  header              movie description header
 * @param  {Boolean}  returnBoolean     whether return boolean or string
 * @return {String}                    return string by default, else boolean
 */
export function isRollingHeader(header, returnBoolean=false) {
    if(returnBoolean) {
        return header.length > 15 ? true : false
    } else {
        return header.length > 15 ? 'rolling' : ''
    }
}

export function formatTime(time){
    return moment(time).format('HH:mm')
}

export function formatDate(lang='en', time){
    return moment(time).locale(lang).format('DD MMM dddd')
}

export function localizeCategory(categoryName, lang='en') {
    return translations[lang].categories[categoryName]
}

/**
 * [checkDuration description]
 * @param  {Date} start        start date
 * @param  {Number} duration   duration time in milliseconds
 * @param  {String} lang       localization identifier, default 'en'
 * @return {String}           string with status description
 */
export function checkDuration(start, duration, lang='en') {

    if(!start) return ''

    const currentTime = moment().utc()
    const startTime = moment(start)
    const durationTime = moment
                        .duration(Number(duration), 'milliseconds')
                        .asMinutes()
    const endTime = moment(start)
                    .add(durationTime, 'minutes')
    const diff = moment(endTime)
                .diff(currentTime, 'minutes')
    const minutesRemain = moment(start)
                        .diff(currentTime, 'minutes')
    const daysRemain = Math.floor(
                        moment
                        .duration(minutesRemain, 'minutes')
                        .asDays()
                    )
    // Handle time remained to start
    if(diff > 0 && diff > durationTime && minutesRemain <= 60) {
        const remained = moment
                        .duration(minutesRemain, 'minutes')
                        .locale(lang)
                        .humanize()
        const within = translations[lang].time.within

        return `${ within } <span class='yellow'>${ remained }</span>`
    }
    // Handle planned date to start
    else if(diff > 0 && diff > durationTime) {
        const soon = translations[lang].time.soon
        const localizedStartTime = startTime.locale(lang).calendar()
        const startText = localizedStartTime.replace(/\d+\S+/g, '')
        const extractedTime = localizedStartTime.match(/\d+/g).join(':')

        if(daysRemain >= 2) {
            return soon
        } else {
            return `${ startText }<span class='yellow'>${ extractedTime }</span>`
        }


    }
    // Handle started movie
    else if(diff > 0 && diff <= durationTime) {
        let remain = durationTime - diff
        let hours = Math.floor(moment.duration(remain, 'minutes').asHours())
        let minutes = remain - hours * 60
        let onair = translations[lang].onair
        let hh = moment.duration(hours, 'hours').locale(lang).humanize()
        let mm = moment.duration(minutes, 'minutes').locale(lang).humanize()

        // Handle humanized >= 50 minutes as 'hour' to be '50 minutes'
        if(minutes < 60 && minutes >= 50) {
            let localizedMinutes = translations[lang].time.minutes
            mm = `${ minutes } ${ localizedMinutes }`
        }

        // Handle humanized 'hour 45 minutes' to be '1 hour 45 minutes'
        if(remain < 120 && remain > 60) {
            let localizedHour = hh.split(' ')
            hh = localizedHour.length > 1
                    ?
                    `1 ${ localizedHour[localizedHour.length - 1] }`
                    :
                    `1 ${ localizedHour[0] }`
        }

        if(hours > 0) {
            return `${ onair } ${ hh } ${ mm }`
        } else {
            return `${ onair } <span class='yellow'>${ mm }</span>`
        }

    } else {
        // Handle finished state
        const finished = translations[lang].finished

        return `${ finished }`
    }
}
