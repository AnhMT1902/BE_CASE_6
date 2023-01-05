function queryToString(query) {
    let str = ''
    for (const key in query) {
        if (key === 'key') {
            let arrKey = query[key].split('+')
            str += `(company.name  like '${arrKey.join(' ')}' or `
            let res = ''
            arrKey.map((value, index) => {
                res += value
                if (index === arrKey.length - 1) {
                    str += `company.name like ${res}%) and `
                } else {
                    str += `company.name  like '${res}%' or `
                }
            })
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
    country: 'VN', locationName: 'Vietnam', jobTypes: 'INTERNSHIP,FULL_TIME'
}))