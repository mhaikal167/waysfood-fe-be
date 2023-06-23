package handlers

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
	resultdto "waysfood/dto/result"
	transdto "waysfood/dto/transaction"
	"waysfood/models"
	"waysfood/repository"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
	"gopkg.in/gomail.v2"
)

type handlerTransaction struct {
	TransRepository repository.TransactionRepository
}

func HandlerTransaction(TransRepository repository.TransactionRepository) *handlerTransaction {
	return &handlerTransaction{TransRepository}
}

func (h *handlerTransaction) FindTransactions(c echo.Context) error {
	Transactions, err := h.TransRepository.FindTransactions()
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: Transactions})
}

func (h *handlerTransaction) GetTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	Transaction, err := h.TransRepository.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: Transaction})
}
func (h *handlerTransaction) GetUserTransaction(c echo.Context) error {
	userLogin := c.Get("userLogin")
	Id := userLogin.(jwt.MapClaims)["id"].(float64)

	Transaction, err := h.TransRepository.GetUserTransaction(int(Id))
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: Transaction})
}

func (h *handlerTransaction) GetPartnerTransaction(c echo.Context) error {
	userLogin := c.Get("userLogin")
	Id := userLogin.(jwt.MapClaims)["id"].(float64)

	Transaction, err := h.TransRepository.GetPartnerTransaction(int(Id))
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: Transaction})
}

func (h *handlerTransaction) CreateTransaction(c echo.Context) error {
	request := new(transdto.CreateTransactionRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	userLogin := c.Get("userLogin")
	buyerId := userLogin.(jwt.MapClaims)["id"].(float64)

	buyer, _ := h.TransRepository.GetBuyer(int(buyerId))

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	var transactionIsMatch = false
	var transactionId int
	for !transactionIsMatch {
		transactionId = int(time.Now().Unix())
		transactionData, _ := h.TransRepository.GetTransaction(transactionId)
		if transactionData.ID == 0 {
			transactionIsMatch = true
		}
	}

	Transactions := models.Transaction{
		ID:         transactionId,
		BuyerID:    int(buyerId),
		SellerID:   request.SellerID,
		TotalPrice: request.TotalPrice,
		Status:     "pending",
	}
	dataTransactions, err := h.TransRepository.CreateTransaction(Transactions)
	fmt.Println(dataTransactions, "ini data")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	orders, err := h.TransRepository.GetOrderUserTrans(int(buyerId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	for _, order := range orders {
		cart := models.Carts{
			Qty:           order.Qty,
			ProductID:     order.ProductID,
			TransactionID: dataTransactions.ID,
		}
		h.TransRepository.CreateOrderTrans(cart)
	}
	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)
	fmt.Println(os.Getenv("SERVER_KEY"))
	fmt.Println(dataTransactions.Buyer.Fullname, "ini fullname")
	fmt.Println(dataTransactions.Buyer.Email, "ini email")
	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(dataTransactions.ID),
			GrossAmt: dataTransactions.TotalPrice,
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: buyer.Fullname,
			Email: buyer.Email,
		},
	}

	snapResp, _ := s.CreateTransaction(req)

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: snapResp})

}

func (h *handlerTransaction) Notification(c echo.Context) error {
	var notificationPayload map[string]interface{}

	if err := c.Bind(&notificationPayload); err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	transactionStatus := notificationPayload["transaction_status"].(string)
	fraudstatus := notificationPayload["fraud_status"].(string)
	transId := notificationPayload["order_id"].(string)

	trans_id, _ := strconv.Atoi(transId)
	transaction, _ := h.TransRepository.GetTransaction(trans_id)

	if transactionStatus == "capture" {
		if fraudstatus == "challange" {
			h.TransRepository.UpdateTransaction("pending", trans_id)
		} else if fraudstatus == "accept" {
			SendMail("success", transaction)
			h.TransRepository.UpdateTransaction("success", trans_id)
		}
	} else if transactionStatus == "settlement" {
		SendMail("success", transaction)
		h.TransRepository.UpdateTransaction("success", trans_id)
	} else if transactionStatus == "deny" {
		h.TransRepository.UpdateTransaction("failed", trans_id)
	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
		h.TransRepository.UpdateTransaction("failed", trans_id)
	} else if transactionStatus == "pending" {
		h.TransRepository.UpdateTransaction("pending", trans_id)
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Code: http.StatusOK,
		Data: notificationPayload,
	})
}

func SendMail(status string, transaction models.Transaction) {
	if status != transaction.Status && (status == "success") {
		var CONFIG_SMTP_HOST = "smtp.gmail.com"
		var CONFIG_SMTP_PORT = 587
		var CONFIG_SENDER_NAME = "WaysFood <skadskuds.f@gmail.com>"
		var CONFIG_AUTH_EMAIL = os.Getenv("EMAIL_SYSTEM")
		var CONFIG_AUTH_PASSWORD = os.Getenv("PASSWORD_SYSTEM")

		var productName = "Transaction Status"
		var price = strconv.FormatInt(transaction.TotalPrice, 10)

		mailer := gomail.NewMessage()
		mailer.SetHeader("From", CONFIG_SENDER_NAME)
		mailer.SetHeader("To", transaction.Buyer.Email)
		mailer.SetHeader("Subject", "Transaction Status")
		mailer.SetBody("text/html", fmt.Sprintf(`<!DOCTYPE html>
		<html lang="en">
		  <head>
		  <meta charset="UTF-8" />
		  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
		  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		  <title>Document</title>
		  <style>
			h1 {
			color: brown;
			}
		  </style>
		  </head>
		  <body>
		  <h2>Product payment :</h2>
		  <ul style="list-style-type:none;">
			<li>Name : %s</li>
			<li>Total payment: Rp.%s</li>
			<li>Status : <b>%s</b></li>
		  </ul>
		  </body>
		</html>`, productName, price, status))

		dialer := gomail.NewDialer(
			CONFIG_SMTP_HOST,
			CONFIG_SMTP_PORT,
			CONFIG_AUTH_EMAIL,
			CONFIG_AUTH_PASSWORD,
		)

		err := dialer.DialAndSend(mailer)
		if err != nil {
			log.Fatal(err.Error())
		}
	}
}
