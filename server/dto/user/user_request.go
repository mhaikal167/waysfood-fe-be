package userdto

type CreateUser struct {
	Fullname string `json:"fullname" form:"fullname" validate:"required"`
	Email    string `json:"email" form:"email" validate:"required"`
	Phone    string `json:"phone" form:"phone" validate:"required"`
	Location string `json:"location" form:"location" validate:"required"`
	Password string `json:"password" form:"password" validate:"required"`
	Gender   string `json:"gender" form:"gender" validate:"required"`
	Role     string `json:"role" form:"role" validate:"required"`
	Image    string `json:"image" form:"image"`
}

type UpdateUser struct {
	Fullname string `json:"fullname" form:"fullname" `
	Email    string `json:"email" form:"email" `
	Image    string `json:"image" form:"image"`
	Phone    string `json:"phone" form:"phone"`
	Location string `json:"location" form:"location"`
	Password string `json:"password" form:"password"`
	Gender   string `json:"gender" form:"gender"`
	Role     string `json:"role" form:"role"`
}
