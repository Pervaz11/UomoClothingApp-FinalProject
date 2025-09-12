export const applyDiscount = (product) => {
    const { price, discount } = product;

    // If there is no discount or the value is 0, the price does not change.
    if (!discount || discount.value <= 0) return price;

    // Expired discount 
    if (discount.expiresAt && new Date() > discount.expiresAt) return price;

    // Percent Discount
    if (discount.type === "percentage") {
        return price - (price * discount.value / 100);
    }

    // Fiks discount
    if (discount.type === "fixed") {
        return Math.max(0, price - discount.value);
    }

    return price;
};
