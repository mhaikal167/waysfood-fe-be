package transdto

type TransactionResponse struct {
	Status     string `json:"status"`
	CounterQty int    `json:"qty"`
	SellerID   int    `json:"seller_id" `
	OrderID    int    `json:"orderId" `
	Total      int64  `json:"total"`
}
