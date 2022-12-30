
function queryToString (query) {
    let str = ''
    for (const key in query) {
        if (typeof query[key] === "string") {
            str += `${key} like '${query[key]}' and `
        } else {
            query[key].forEach((item, index) => {
                if (index === query[key].length - 1) {
                    str += `${key} = ${item}) and `
                } else if (index === 0) {
                    str += `(${key} = ${item} or `
                } else {
                    str += `${key} = ${item} or `
                }
            })
        }
    }
    console.log(str.substring(0, str.length - 4))
}

// queryToString(query)
console.log( typeof +'ádjká')