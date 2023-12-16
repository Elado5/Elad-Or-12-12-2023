
//created due to forecast api only returning Celsius temperature
export const convertToFahrenheit = (celsius) => {
    let fahrenheit = (parseInt(celsius) * (9 / 5)) + 32;
    return fahrenheit.toFixed(1).replace(/\.?0+$/, '');
}

export const isDaylight = () => {
    const d = new Date();
    let hour = d.getHours();
    if (hour < 6 || hour > 18) {
        return false;
    }
    return true;
}

export const getDayName = (dateString, locale = 'en-US') => {
    let date = new Date(dateString);
    return date.toLocaleDateString(locale, { weekday: 'long' });
}