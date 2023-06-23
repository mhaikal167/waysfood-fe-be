package routes

import "github.com/labstack/echo/v4"

func RoutesInit(e *echo.Group) {
	UsersRoute(e)
	AuthRoutes(e)
	ProductRoutes(e)
	OrderRoutes(e)
	TransRoute(e)
}
