package repository

import (
	"waysfood/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	GetUserTransaction(ID int) ([]models.Transaction, error)
	GetPartnerTransaction(ID int) ([]models.Transaction, error)
	GetOrderUserTrans(ID int) ([]models.Order, error)
	GetBuyer(ID int) (models.User, error)
	CreateOrderTrans(Carts models.Carts) (models.Carts, error)
	CreateTransaction(trans models.Transaction) (models.Transaction, error)
	UpdateTransaction(status string, transId int) (models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var Transaction []models.Transaction
	err := r.db.Preload("Cart.Product").Preload("Buyer").Preload("Seller").Find(&Transaction).Error

	return Transaction, err
}
func (r *repository) GetBuyer(ID int) (models.User, error) {
	var user models.User
	err := r.db.First(&user, ID).Error
	return user, err
}

func (r *repository) CreateOrderTrans(Carts models.Carts) (models.Carts, error) {
	err := r.db.Create(&Carts).Error

	return Carts, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var Transaction models.Transaction
	err := r.db.Preload("Buyer").First(&Transaction, ID).Error

	return Transaction, err
}
func (r *repository) GetUserTransaction(ID int) ([]models.Transaction, error) {
	var Transaction []models.Transaction
	err := r.db.Where("buyer_id = ?", ID).Preload("Cart.Product").Preload("Buyer").Preload("Seller").Find(&Transaction).Error

	return Transaction, err
}
func (r *repository) GetPartnerTransaction(ID int) ([]models.Transaction, error) {
	var Transaction []models.Transaction
	err := r.db.Where("seller_id = ?", ID).Preload("Cart.Product").Preload("Buyer").Preload("Seller").Find(&Transaction).Error

	return Transaction, err
}

func (r *repository) GetOrderUserTrans(ID int) ([]models.Order, error) {
	var Order []models.Order
	err := r.db.Where("buyer_id = ?", ID).Preload("Buyer").Preload("Product").Preload("Seller").Find(&Order).Error

	return Order, err
}

func (r *repository) CreateTransaction(Transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Preload("Cart.Product").Preload("Buyer").Preload("Seller").Create(&Transaction).Error

	return Transaction, err
}

func (r *repository) UpdateTransaction(status string, transId int) (models.Transaction, error) {
	var transaction models.Transaction
	r.db.Preload("Buyer").First(&transaction, transId)

	transaction.Status = status
	err := r.db.Save(&transaction).Error
	return transaction, err
}
