package productdto

type CreateProductRequest struct {
	Title  string `json:"title" form:"title" gorm:"type: varchar(255)"`
	Price  int64    `json:"price" form:"price"`
	Image  string `json:"image" form:"image" gorm:"type: varchar(255)"`
	UserId int    `json:"user_id" form:"user_id" gorm:"type: int"`
}

type UpdateProductRequest struct {
	Title string `json:"title" form:"title" gorm:"type: varchar(255)"`
	Price int    `json:"price" form:"price"`
	Image string `json:"image" form:"image" gorm:"type: varchar(255)"`
}
