package handlers

import (
	"net/http"
	"strconv"
	resultdto "waysfood/dto/result"
	userdto "waysfood/dto/user"
	"waysfood/models"
	"waysfood/repository"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type handlerUser struct {
	UserRepository repository.UserRepository
}

func HandlerUser(UserRepository repository.UserRepository) *handlerUser {
	return &handlerUser{UserRepository}
}

func (h *handlerUser) GetUsers(c echo.Context) error {
	users, err := h.UserRepository.GetUsers()

	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code: http.StatusBadRequest,
		})
	}
	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "Get User Success",
		Data:    users,
	})
}
func (h *handlerUser) GetPartner(c echo.Context) error {
	users, err := h.UserRepository.GetPartner()
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "Get Partner Success",
		Data:    users,
	})
}

func (h *handlerUser) GetUserById(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.UserRepository.GetUserById(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "Get User By Id Success",
		Data:    user,
	})
}

func (h *handlerUser) CreateUser(c echo.Context) error {
	request := new(userdto.CreateUser)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}
	validation := validator.New()
	err := validation.Struct(request)

	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	user := models.User{
		Fullname: request.Fullname,
		Email:    request.Email,
		Password: request.Password,
		Gender:   request.Gender,
		Phone:    request.Phone,
		Location: request.Location,
		Role:     request.Role,
	}

	data, err := h.UserRepository.CreateUser(user)

	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "Success Created User",
		Data:    data,
	})
}

func (h *handlerUser) UpdateUser(c echo.Context) error {
	dataFile := c.Get("dataFile").(string)
	id, _ := strconv.Atoi(c.Param("id"))
	user, err := h.UserRepository.GetUserById(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	request := userdto.UpdateUser{
		Fullname: c.FormValue("fullname"),
		Email:    c.FormValue("email"),
		Phone:    c.FormValue("phone"),
		Location: c.FormValue("location"),
		Gender:   c.FormValue("gender"),
		Role:     c.FormValue("role"),
		Image:    dataFile,
	}

	if request.Fullname != "" {
		user.Fullname = request.Fullname
	}

	if request.Email != "" {
		user.Email = request.Email
	}

	if request.Password != "" {
		user.Password = request.Password
	}

	if request.Phone != "" {
		user.Phone = request.Phone
	}
	if request.Location != "" {
		user.Location = request.Location
	}
	if request.Gender != "" {
		user.Gender = request.Gender
	}
	if request.Image != "" {
		user.Image = request.Image
	}
	if request.Role != "" {
		user.Role = request.Role
	}

	data, err := h.UserRepository.UpdateUser(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: convertResponse(data), Message: "Data has been Updated"})
}

func convertResponse(user models.User) userdto.UpdateResponse {
	return userdto.UpdateResponse{
		ID: user.ID,
	}
}
