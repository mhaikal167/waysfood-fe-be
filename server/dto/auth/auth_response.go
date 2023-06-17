package authdto

type LoginResponse struct {
	Fullname string `json:"fullname" gorm:"type: varchar(255)"`
	Email    string `json:"email" gorm:"type: varchar(255)"`
	Password string `json:"password" gorm:"type: varchar(255)"`
	Token    string `json:"token" gorm:"type: varchar(255)"`
}
type RegisterResponse struct {
	Email    string      `json:"email"`
	Token    string      `json:"token"`
	Response interface{} `json:"-"`
}

type CheckAuthResponse struct {
	ID      int    `json:"id"`
	Name    string `json:"fullName"`
	Email   string `json:"email"`
	Phone   string `json:"phone"`
	Address string `json:"address"`
	Gender  string `json:"gender"`
	Role    string `json:"role"`
	Picture string `json:"picture"`
}
