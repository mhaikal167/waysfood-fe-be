package repository

import (
	"waysfood/models"

	"gorm.io/gorm"
)

type ProductRepository interface {
	FindProducts() ([]models.Product, error)
	FindProductsPartner(ID int) ([]models.Product, error)
	GetProductById(ID int) (models.Product, error)
	CreateProduct(product models.Product) (models.Product, error)
}

func RepositoryProduct(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindProducts() ([]models.Product, error) {
	var Products []models.Product
	err := r.db.Preload("User").Find(&Products).Error
	return Products, err
}

func (r *repository) GetProductById(ID int)(models.Product,error){
	var Product models.Product
	err := r.db.First(&Product,ID).Error
	return Product,err
}

func (r *repository) FindProductsPartner(ID int) ([]models.Product, error) {
	var Product []models.Product
	err := r.db.Preload("User").Find(&Product, "user_id = ?", ID).Error
	return Product, err
}

func (r *repository) CreateProduct(product models.Product) (models.Product, error) {
	err := r.db.Create(&product).Error

	return product, err

}
