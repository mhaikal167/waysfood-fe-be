package repository

import (
	"waysfood/models"

	"gorm.io/gorm"
)

type OrderRepository interface {
	CreateOrder(order models.Order) (models.Order, error)
	FindOrder() ([]models.Order, error)
	// GetOrderByBuyerSeller(IDB int, IDS int) (models.Order, error)
	GetOrderByBuyerProduct(IDB int, IDP int) (models.Order, error)
	GetOrderByBuyer(ID int) ([]models.Order, error)
	// GetOrderById(ID int) (models.Order, error)
	UpdateOrder(order models.Order) (models.Order, error)
}

func RepositoryOrder(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindOrder() ([]models.Order, error) {
	var Orders []models.Order
	err := r.db.Preload("Buyer").Preload("Seller").Preload("Product.User").Find(&Orders).Error

	return Orders, err
}

func (r *repository) CreateOrder(order models.Order) (models.Order, error) {
	err := r.db.Preload("Buyer").Create(&order).Error

	return order, err
}

func (r *repository) GetOrderByBuyerProduct(IDB int, IDP int) (models.Order, error) {
	var Order models.Order
	err := r.db.Where("buyer_id = ? AND product_id = ?", IDB, IDP).First(&Order).Error

	return Order, err
}

func (r *repository) GetOrderByBuyer(ID int) ([]models.Order, error) {
	var Order []models.Order
	err := r.db.Where("buyer_id = ?", ID).Preload("Buyer").Preload("Product").Preload("Seller").Find(&Order).Error

	return Order, err
}

func (r *repository) UpdateOrder(Order models.Order) (models.Order, error) {
	err := r.db.Save(&Order).Error
	return Order, err
}
