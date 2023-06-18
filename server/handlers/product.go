package handlers

import (
	"net/http"
	"strconv"
	"time"
	productdto "waysfood/dto/product"
	resultdto "waysfood/dto/result"
	"waysfood/models"
	"waysfood/repository"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerProduct struct {
	ProductRepository repository.ProductRepository
}

func HandlerProduct(ProductRepository repository.ProductRepository) *handlerProduct {
	return &handlerProduct{ProductRepository}
}

func (h *handlerProduct) FindProducts(c echo.Context) error {
	Product, err := h.ProductRepository.FindProducts()
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "Get Products Successfully",
		Data:    Product,
	})
}
func (h *handlerProduct) GetProductById(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	Product, err := h.ProductRepository.GetProductById(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Code:    http.StatusOK,
		Message: "Get Product ID success",
		Data:    Product,
	})
}

func (h *handlerProduct) FindProductsPartner(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	Products, err := h.ProductRepository.FindProductsPartner(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Code:    http.StatusOK,
		Data:    Products,
		Message: "Get Product Partner Success",
	})
}

func (h *handlerProduct) CreateProduct(c echo.Context) error {
	dataFile := c.Get("dataFile").(string)

	userLogin := c.Get("userLogin")
	SellerID := userLogin.(jwt.MapClaims)["id"].(float64)
	Price, _ := strconv.ParseInt(c.FormValue("price"), 10, 64)

	var productIsMatch = false
	var productId int
	for !productIsMatch {
		productId = int(time.Now().Unix())
		productData, _ := h.ProductRepository.GetProductById(productId)
		if productData.ID == 0 {
			productIsMatch = true
		}
	}

	request := productdto.CreateProductRequest{
		ID:     productId,
		Title:  c.FormValue("title"),
		Image:  dataFile,
		Price:  Price,
		UserId: int(SellerID),
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	Products := models.Product{
		ID:     request.ID,
		Title:  request.Title,
		Image:  request.Image,
		Price:  request.Price,
		UserID: request.UserId,
	}

	data, err := h.ProductRepository.CreateProduct(Products)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: data, Message: "Add Product Success"})
}
