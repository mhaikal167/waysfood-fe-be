package repository

import (
	"waysfood/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	CreateTransaction(trans models.Transaction) (models.Transaction, error)
	UpdateTransaction(status string, transId int) (models.Transaction, error)
	DeleteTransaction(ID int, trans models.Transaction) (models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

