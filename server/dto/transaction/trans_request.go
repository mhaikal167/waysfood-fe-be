package transdto

type CreateTransactionRequest struct {
	Status     string `json:"status" form:"status" gorm:"type: varchar(255)"`
	Qty        int    `json:"qty" form:"qty" gorm:"type: int"`
	SellerID   int    `json:"seller_id"`
	OrderID    int    `json:"orderId" form:"orderId"`
	TotalPrice int64  `json:"totalPrice"`
}

type UpdateTransactionRequest struct {
	Status     string `json:"status" form:"status" gorm:"type: varchar(255)"`
	CounterQty int    `json:"qty" form:"qty" `
	OrderID    int    `json:"orderId" form:"orderId"`
	Total      int64  `json:"total" form:"total"`
}
