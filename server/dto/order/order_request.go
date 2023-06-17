package orderdto

type CreateOrder struct {
	ID        int `json:"id" gorm:"primary_key:auto_increment"`
	Qty       int `json:"qty" `
	BuyerID   int `json:"buyer_id" `
	SellerID  int `json:"seller_id" `
	ProductID int `json:"product_id" gorm:"type: int"`
}
