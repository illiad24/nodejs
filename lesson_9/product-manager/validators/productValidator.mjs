class ProductValidator {
    static productSchema = {
        title: {
            notEmpty: {
                errorMessage: 'title is required',
            },
            isLength: {
                options: { min: 2 },
                errorMessage: 'Username must be at least 2 characters long',
            },
            trim: true,
            escape: true,
        },
        price: {
            isInt: {
                options: { min: 0 },
                errorMessage: 'write correct price',
            },
        },
        count: {
            isInt: {
                options: { min: 0 },
                errorMessage: 'write correct count',
            },
        }
    }

}

export default ProductValidator