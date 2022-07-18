exports.generateDateTime = scheme => {
    scheme.pre('save', function () {
        if (this.isNew) {
            this.createdAtDateTime = new Date(this.createdAt).toLocaleString('en-GB').split(', ').join(' ');
            this.createdAtTimeStamp = new Date(this.createdAt).getTime();
        }

        this.updatedAtDateTime = new Date(this.updatedAt).toLocaleString('en-GB').split(', ').join(' ');
        this.updatedAtTimeStamp = new Date(this.updatedAt).getTime();
    })
}

exports.dateTimeKey = {
    createdAt: {
        type: Date,
        select: false
    },
    createdAtDateTime: {
        type: String,
        // select: false
    },
    createdAtTimeStamp: {
        type: Number,
        select: false
    },
    updatedAt: {
        type: Date,
        select: false
    },
    updatedAtDateTime: {
        type: String,
        select: false
    },
    updatedAtTimeStamp: {
        type: Number,
        select: false
    },
}