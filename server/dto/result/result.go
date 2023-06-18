package resultdto

type SuccessResult struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}
type SuccessRequestResult struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}
type ErrorResult struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}
