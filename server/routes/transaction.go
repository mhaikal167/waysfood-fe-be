package routes

import (
	"waysfood/handlers"
	"waysfood/pkg/middleware"
	"waysfood/pkg/mysql"
	"waysfood/repository"

	"github.com/labstack/echo/v4" 
)

func TransRoute(e *echo.Group) {
	transrepository := repository.RepositoryTransaction(mysql.DB)
	h := handlers.HandlerTransaction(transrepository)

	e.GET("/transactions", h.FindTransactions)
	e.GET("/transaction/:id", h.GetTransaction)
	e.GET("/transaction-user", middleware.Auth(h.GetUserTransaction))
	e.GET("/transaction-partner", middleware.Auth(h.GetPartnerTransaction))
	e.POST("/transaction", middleware.Auth(h.CreateTransaction))
	e.POST("/notification", h.Notification)
}
