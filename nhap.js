function queryToString(query) {
    let str = ''
    for (const key in query) {
        if (key === 'key') {
            str += `(company.name like '${query[key]}' or job.title like '${query[key]}') and `
        } else {
            if (typeof query[key] === "string") {
                str += `job.${key} like '${query[key]}' and `
            } else {
                query[key].forEach((item, index) => {
                    if (index === query[key].length - 1) {
                        str += `job.${key} like '${item}') and `
                    } else if (index === 0) {
                        str += `(job.${key} like '${item}' or `
                    } else {
                        str += `job.${key} like '${item}' or `
                    }
                })
            }
        }
    }
    return str.substring(0, str.length - 4)
}

console.log(queryToString({category: ['it', 'marketing'], key: 'abc'}
))