enum ProductStatus {
    INACTIVE = 0,
    PENDING = 1,
    ACTIVE = 2,
    DENY = 3,
    BIDDING = 4,
    PAYING = 5,
    SOLD = 6,
}

export enum AdminAcceptStatus {
    ACTIVE = 2,
    DENY = 3,
}

export enum ProductUserStatus {
    APPLIED = 0,
    WON_NOT_PAYING = 1,
    WON_PAID = 2,
    LOST = 3,
}
export default ProductStatus;
