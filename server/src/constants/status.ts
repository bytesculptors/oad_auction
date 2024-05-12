enum ProductStatus {
    INACTIVE = 0,
    PENDING = 1,
    ACTIVE = 2,
    DENY = 3,
    BIDDING = 4,
    SOLD = 5,
}

export enum AdminAcceptStatus {
    ACTIVE = 2,
    DENY = 3,
}

export enum ProductUserStatus {
    APPLIED = 0,
    WON = 1,
    LOST = 2,
}
export default ProductStatus;
