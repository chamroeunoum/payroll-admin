<<<<<<< HEAD
export const excelDateToJSDate = (serial) => {
    // Excel's epoch starts at December 30, 1899 (not January 1, 1900)
    // because Excel incorrectly treats 1900 as a leap year
    const excelEpoch = new Date(1899, 11, 30); // Month is 0-based: 11 = December
    
    // Calculate the date
    const jsDate = new Date(excelEpoch.getTime() + serial * 86400000);
    
    // Excel incorrectly treats 1900 as a leap year, so we need to adjust
    // for dates on or after March 1, 1900
    if (serial >= 60) {
        jsDate.setDate(jsDate.getDate() - 1);
    }
    return jsDate;
=======
export const excelDateToJSDate = (serial) => {
    // Excel's epoch starts at December 30, 1899 (not January 1, 1900)
    // because Excel incorrectly treats 1900 as a leap year
    const excelEpoch = new Date(1899, 11, 30); // Month is 0-based: 11 = December
    
    // Calculate the date
    const jsDate = new Date(excelEpoch.getTime() + serial * 86400000);
    
    // Excel incorrectly treats 1900 as a leap year, so we need to adjust
    // for dates on or after March 1, 1900
    if (serial >= 60) {
        jsDate.setDate(jsDate.getDate() - 1);
    }
    return jsDate;
>>>>>>> 9c9120be8b76f88ac98c70e3e86f780df1b53097
}