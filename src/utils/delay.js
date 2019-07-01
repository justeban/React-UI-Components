/**
 * @param {amount of delay (ms)} t 
 * @param {value to return on time completion} v 
 * @param {func to call on time completion} callback 
 */
export default function (t, v, callback) {
    return new Promise(function (resolve) {
        setTimeout(callback ? callback : resolve.bind(null, v), t);
    });
}
