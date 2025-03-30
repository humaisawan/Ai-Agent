class ApiFeatures {
  constructor(query, queryReq, customQueryObj) {
    this.query = query;
    this.queryReq = queryReq;
    this.customQueryObj = customQueryObj;
  }

  filter() {
    const excludedFields = ["sort", "page", "limit", "fields"];

    let queryObj = { ...this.queryReq };
    console.log("QUERY OBJ IS:::", queryObj);

    console.log("CUSTOM QUERY OBJ IS:::", this.customQueryObj);

    excludedFields.forEach((el) => {
      delete queryObj[el];
    });

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => {
      console.log("MATCH IS::", match);
      return `$${match}`;
    });

    queryObj = JSON.parse(queryStr);

    if (this.customQueryObj) {
      this.query = this.query.find({ ...this.customQueryObj, ...queryObj });
    } else {
      this.query = this.query.find(queryObj);
    }

    return this;
  }

  sort() {
    if (this.queryReq.sort) {
      const sortBy = this.queryReq.sort.split(",").join(" ");

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort({ createdAt: -1, _id: 1 });
    }

    return this;
  }

  limiting() {
    if (this.queryReq.fields) {
      const limitedFields = this.queryReq.fields.split(",").join(" ");
      this.query = this.query.select(limitedFields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  async paginate() {
    // Default page and limit
    const page = this.queryReq.page * 1 || 1;
    const totalDocuments = await this.query.model
      .find(this.query.getQuery())
      .countDocuments();
    const limit = this.queryReq.limit * 1 || totalDocuments;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    // Setting pagination metadata
    this.paginationData = {
      totalDocuments,
      totalPages: Math.ceil(totalDocuments / limit),
      isPrev: page > 1,
      isNext: page * limit < totalDocuments,
      currentPage: page,
      limit,
    };

    return this;
  }

  getPaginationData() {
    return this.paginationData;
  }

  populate(populateOptions) {
    if (populateOptions) {
      this.query = this.query.populate(populateOptions);
    }
    return this;
  }
}

module.exports = ApiFeatures;
