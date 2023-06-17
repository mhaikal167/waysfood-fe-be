package handlers

import (
	"net/http"
	"strconv"
	orderdto "waysfood/dto/order"
	resultdto "waysfood/dto/result"
	"waysfood/models"
	"waysfood/repository"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerOrder struct {
	OrderRepository repository.OrderRepository
}

func HandlerOrder(orderRepository repository.OrderRepository) *handlerOrder {
	return &handlerOrder{orderRepository}
}

func (h *handlerOrder) FindOrder(c echo.Context) error {
	Order, err := h.OrderRepository.FindOrder()
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: Order, Message: "Success Get Order"})
}
func(h *handlerOrder) GetOrderByBuyer(c echo.Context) error {
	userLogin := c.Get("userLogin")
	buyerId := userLogin.(jwt.MapClaims)["id"].(float64)

	Orders, err := h.OrderRepository.GetOrderByBuyer(int(buyerId))

	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: Orders})
}
func (h *handlerOrder) GetOrderByBuyerProduct(c echo.Context) error {
	idp, _ := strconv.Atoi(c.Param("ids"))
	userLogin := c.Get("userLogin")
	idb := userLogin.(jwt.MapClaims)["id"].(float64)
	Order, err := h.OrderRepository.GetOrderByBuyerProduct(int(idb), idp)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}	

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: Order, Message: "Get order User Success"})
}

func (h *handlerOrder) CreateOrder(c echo.Context) error {
	request := new(orderdto.CreateOrder)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	Order := models.Order{
		Qty:       request.Qty,
		BuyerID:   request.BuyerID,
		SellerID:  request.SellerID,
		ProductID: request.ProductID,
	}

	OrderBuyer, _ := h.OrderRepository.GetOrderByBuyerProduct(request.BuyerID, request.ProductID)

	if OrderBuyer.ID == 0 {
		data, err := h.OrderRepository.CreateOrder(Order)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
		}
		return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: data, Message: "Success Order"})
	} else {
		OrderBuyer.Qty = request.Qty
		UpdateOrder, _ := h.OrderRepository.UpdateOrder(OrderBuyer)
		return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: UpdateOrder, Message: "Success Add Order"})
	}
}

// func (h *handlerOrder) DeleteAllOrder(c echo.Context) error {

// 	userLogin := c.Get("userLogin")
// 	buyerId := userLogin.(jwt.MapClaims)["id"].(float64)
// 	data, err := h.OrderRepository.DeleteAllOrder(int(buyerId))
// 	if err != nil {
// 		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
// 	}

// 	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
// }

// func (h *handlerOrder) DeleteOrder(c echo.Context) error {
// 	id, _ := strconv.Atoi(c.Param("id"))

// 	Order, err := h.OrderRepository.GetOrder(id)
// 	if err != nil {
// 		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
// 	}

// 	data, err := h.OrderRepository.DeleteOrder(Order, id)
// 	if err != nil {
// 		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
// 	}

// 	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
// }
