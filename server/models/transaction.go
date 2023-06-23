package models

type Transaction struct {
	ID         int                  `json:"id" gorm:"primary_key"`
	TotalPrice int64                `json:"totalPrice"`
	BuyerID    int                  `json:"buyer_id"`
	Buyer      UsersProfileResponse `json:"buyer" gorm:"constraint:OnDelete:CASCADE,OnUpdate:CASCADE"`
	SellerID   int                  `json:"seller_id"`
	Seller     UsersProfileResponse `json:"seller" gorm:"constraint:OnDelete:CASCADE,OnUpdate:CASCADE"`
	Status     string               `json:"status"`
	Cart       []Carts              `json:"carts"`
}
