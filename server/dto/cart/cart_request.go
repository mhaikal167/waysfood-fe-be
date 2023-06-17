package cartdto

import "waysfood/models"

type CreateCarts struct {
	ID            int                `json:"id" gorm:"primary_key:auto_increment"`
	Qty           int                `json:"qty" `
	ProductID     int                `json:"product_id" gorm:"type: int"`
	Product       models.Product     `json:"product" gorm:"constraint:OnDelete:CASCADE,OnUpdate:CASCADE"`
	TransactionID int                `json:"transaction_id" gorm:"constraint:OnDelete:CASCADE,OnUpdate:CASCADE"`
	Transaction   models.Transaction `json:"-"`
}
