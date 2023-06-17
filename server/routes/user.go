package routes

import (
	"waysfood/handlers"
	"waysfood/pkg/middleware"
	"waysfood/pkg/mysql"
	"waysfood/repository"

	"github.com/labstack/echo/v4"
)

func UsersRoute(e *echo.Group) {
	userRepository := repository.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(userRepository)
	e.GET("/users", h.GetUsers)
	e.GET("/partners", h.GetPartner)
	e.POST("/create-user", h.CreateUser)
	e.PATCH("/update-user/:id", middleware.UploadFile(h.UpdateUser))
}
