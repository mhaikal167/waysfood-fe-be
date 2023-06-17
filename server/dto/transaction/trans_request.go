package transdto

type CreateTransactionRequest struct {
	Status     string `json:"status" form:"status" gorm:"type: varchar(255)"`
	CounterQty int    `json:"qty" form:"qty"`
	SellerID   int    `json:"seller_id" form:"sellerId"`
	OrderID    int    `json:"orderId" form:"orderId"`
	Total      int64  `json:"total"`
}

type UpdateTransactionRequest struct {
	Status     string `json:"status" form:"status" gorm:"type: varchar(255)"`
	CounterQty int    `json:"qty" form:"qty" `
	OrderID    int    `json:"orderId" form:"orderId"`
	Total      int64  `json:"total" form:"total"`
}
