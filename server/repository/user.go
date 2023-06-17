package repository

import (
	"waysfood/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	GetUsers() ([]models.User, error)
	GetPartner() ([]models.User, error)
	GetUserById(ID int) (models.User, error)
	CreateUser(user models.User) (models.User, error)
	UpdateUser(user models.User) (models.User, error)
}

func RepositoryUser(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) GetUsers() ([]models.User, error) {
	var Users []models.User
	err := r.db.Find(&Users).Error
	return Users, err
}

func (r *repository) GetPartner() ([]models.User, error) {
	var users []models.User
	var role = "partner"
	err := r.db.Find(&users, "role = ?", role).Error

	return users, err
}

func (r *repository) GetUserById(ID int) (models.User, error) {
	var user models.User
	err := r.db.First(&user, ID).Error
	return user, err
}

func (r *repository) CreateUser(user models.User) (models.User, error) {
	err := r.db.Create(&user).Error
	return user, err
}

func (r *repository) UpdateUser(user models.User) (models.User, error) {
	err := r.db.Save(&user).Error
	return user, err
}
