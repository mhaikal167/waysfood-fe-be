package database

import (
	"fmt"
	"waysfood/models"
	"waysfood/pkg/mysql"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.User{},
		&models.Product{},
		&models.Carts{},
		&models.Order{},
		&models.Transaction{},
	)
	if err != nil {
		panic("Migration Failed")
	}

	fmt.Println("Migration Success 👌👌")
}
