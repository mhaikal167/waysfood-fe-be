package routes

import (
	"waysfood/handlers"
	"waysfood/pkg/middleware"
	"waysfood/pkg/mysql"
	"waysfood/repository"

	"github.com/labstack/echo/v4"
)

func OrderRoutes(e *echo.Group) {
	orderRepository := repository.RepositoryOrder(mysql.DB)
	h := handlers.HandlerOrder(orderRepository)
	e.GET("/orders", h.FindOrder)
	e.POST("/create-order", middleware.Auth(h.CreateOrder))
	e.GET("/order-user", middleware.Auth(h.GetOrderByBuyer))

}
