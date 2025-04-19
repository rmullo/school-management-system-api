/**
 * Middleware to handle advanced query params for API routes
 *
 * @param {Model} model - The mongoose model to query
 * @param {String} [populate] - The field to populate with a second query
 * @returns {Function} an express middleware function
 *
 * Supported query params:
 *   - select: comma separated list of fields to return
 *   - sort: comma separated list of fields to sort by, prefixed with '-' for descending order
 *   - page: page number to return
 *   - limit: number of documents to return per page
 *   - [field]: query operators ($gt, $gte, $lt, $lte, $in) can be used to filter results
 */
const advancedResults = (model, populate) => async (req, res, next) => {
    let Query = model.find();

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await model.countDocuments();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (req.query.search) {
        Query = model.find(
            {
                $or: [
                    {name: {$regex: req.query.search, $options: 'i'}},
                    {email: {$regex: req.query.search, $options: 'i'}}
                ]
            }
        )
    }

    if (populate) {
        Query = Query.populate(populate);
    }

    const pagination = {};
    if (endIndex < await model.countDocuments().exec()) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }

    const models = await Query.find().limit(limit).skip(skip);
    
    res.results = {
        total,
        pagination,
        results: models.length,
        status: "success",
        data: models,
    };
    next();
};

module.exports = advancedResults;