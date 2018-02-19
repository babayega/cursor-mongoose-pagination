const moment = require('moment')
const _ = require('underscore')

function Paginate(model, params) {
    const findParams = {}
    if (params.find && Object.keys(params.find).length > 0) _.extend(findParams, params.find)

    if (params.next) {
        const [nextUpdatedAt, nextId] = params.next.split('_')
        _.extend(findParams, {
            $or: [{
                updatedAt: { $lt: nextUpdatedAt }
            }, {
                // If the updatedAt is the exact match, then _id is used to sort
                updatedAt: nextUpdatedAt,
                _id: { $lt: nextId }
            }]
        })
    }

    const sortParams = {
            updatedAt: -1,
            _id: -1 // Secoondary sort, in case duplicate updatedAt values
        }
        // } 

    return model.find(findParams)
        .sort(sortParams)
        .limit(params.limit + 1)
        .exec()
        .then(result => {
            const hasMore = result.length > params.limit
            if (hasMore) {
                result.pop()
                const lastItem = result[result.length - 1]
                const next = `${moment.utc(lastItem.updatedAt)}_${lastItem._id}`
                return [result, hasMore, next]
            } else return [result, hasMore, "null"]

        })
        .catch(err => {
            throw Error(err)
        })

}

module.exports = Paginate