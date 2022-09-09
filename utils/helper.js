/* -------------------------------------------------------------------- */
/* Plugin Name           : Instagram-Reporter                           */
/* Author Name           : rasoul707                                    */
/* File Name             : helper.js                                    */
/* -------------------------------------------------------------------- */









const listCommandItems = (list) => {
    return Object.keys(list).map((i) => {
        return `${i}) ${list[i]}`
    }).join("\n")
}




module.exports = {
    listCommandItems,

}