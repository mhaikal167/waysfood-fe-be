package authdto

type AuthRequest struct {
	Fullname string `json:"fullName" validate:"required"`
	Email    string `json:"email" form:"email"`
	Password string `json:"password" validate:"required"`
	Gender   string `json:"gender" validate:"required"`
	Phone    string `json:"phone" validate:"required"`
	Location string `json:"location"`
	Role     string `json:"role" validate:"required"`
	Picture  string `json:"picture"`
}
