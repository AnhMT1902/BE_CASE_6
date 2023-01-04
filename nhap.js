function queryToString(query) {
    let str = ''
    for (const key in query) {
        if (key === 'key') {
            str += `(company.name  like '${query[key]}' or job.title like '%${query[key]}%') and `
        } else {
            let arrValue = query[key].split(',')
            console.log(arrValue)
            if (arrValue.length === 1) {
                str += `job.${key} like '${query[key]}' and `
            } else {
                arrValue.forEach((item, index) => {
                    if (index === arrValue.length - 1) {
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

console.log(queryToString({
        country: 'VN',
        locationName: 'Vietnam',
        jobTypes: 'INTERNSHIP,FULL_TIME'
    }
))