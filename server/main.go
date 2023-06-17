package main

import (
	"fmt"
	"os"
	"waysfood/database"
	"waysfood/pkg/mysql"
	"waysfood/routes"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	
)

func main() {
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.POST, echo.PATCH, echo.GET, echo.DELETE},
		AllowHeaders: []string{"X-Requested-With", "Content-Type", "Authorization"},
	}))
	
	godotenv.Load()
	mysql.DatabaseConnection()
	database.RunMigration()

	routes.RoutesInit(e.Group("/api/v1"))

	PORT := os.Getenv("PORT")
	fmt.Println("Running on port " + PORT)
	e.Logger.Fatal(e.Start("localhost:" + PORT))
}
