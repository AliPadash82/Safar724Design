package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username       string
	FirstName      string
	LastName       string
	HashedPassword string
	PhoneNumber    string
	Email          string
	BirthDate      time.Time
	Gender         string
	Role           string
	NationalCode   string
	IsActive       bool
	Tickets        []Ticket `gorm:"foreignKey:UserID"`
}

type Company struct {
	gorm.Model
	Name        string
	Code        string
	PersianName string
	Logo        string
	Url         string
	IsActive    bool
	Services    []Service `gorm:"foreignKey:CompanyID"`
}

type City struct {
	ID                  uint `gorm:"primaryKey"`
	Code                string
	Name                string
	PersianName         string
	ProvinceName        string
	ProvincePersianName string
	IsCapital           bool
	Order               int
	MidwayCities        []MidwayCity `gorm:"foreignKey:CityID"`
}

type SearchExpression struct {
	ID         uint   `gorm:"primaryKey"`
	CityID     string `gorm:"foreignKey:CityID"`
	Expression string
}

type Service struct {
	gorm.Model
	BusType               string
	Price                 uint
	VIP                   bool
	CompanyID             uint
	OriginTerminalID      uint
	DestinationTerminalID uint
	DepartureTime         string
	DepartureDate         string
	Description           string
	BriefDescription      string
	AvailableSeatCount    int
	DiscountPercentage    float64
	Seats                 []Seat       `gorm:"foreignKey:ServiceID"`
	Tickets               []Ticket     `gorm:"foreignKey:ServiceID"`
	RefundRules           []RefundRule `gorm:"foreignKey:ServiceID"`
	MidwayCities          []MidwayCity `gorm:"foreignKey:ServiceID"`
}

type Seat struct {
	ID         uint `gorm:"primaryKey"`
	ServiceID  uint
	SeatNumber uint
	Service    Service `gorm:"foreignKey:ServiceID"`
}

type Ticket struct {
	gorm.Model
	Code            string
	ServiceID       uint
	UserID          uint
	PurchasedStatus string
	ReservedAt      time.Time
	User            User        `gorm:"foreignKey:UserID"`
	Service         Service     `gorm:"foreignKey:ServiceID"`
	Passengers      []Passenger `gorm:"foreignKey:TicketID"`
}

type Passenger struct {
	TicketID     uint
	SeatID       uint
	FirstName    string
	LastName     string
	Gender       string
	BirthDate    time.Time
	NationalCode string
	Ticket       Ticket `gorm:"foreignKey:TicketID"`
	Seat         Seat   `gorm:"foreignKey:SeatID"`
}

type RefundRule struct {
	ServiceID               uint                  `gorm:"primaryKey"`
	CancellationConditionID uint                  `gorm:"primaryKey"`
	Service                 Service               `gorm:"foreignKey:ServiceID"`
	CancellationCondition   CancellationCondition `gorm:"foreignKey:CancellationConditionID"`
}

type CancellationCondition struct {
	ID          uint `gorm:"primaryKey"`
	From        time.Time
	To          time.Time
	Message     string
	RefundRules []RefundRule `gorm:"foreignKey:CancellationConditionID"`
}

type MidwayCity struct {
	ServiceID uint    `gorm:"primaryKey"`
	CityID    uint    `gorm:"primaryKey"`
	Service   Service `gorm:"foreignKey:ServiceID"`
	City      City    `gorm:"foreignKey:CityID"`
}

type Item struct {
	ID                             uint    `json:"ID"`
	IsVip                          bool    `json:"IsVip"`
	BusType                        string  `json:"BusType"`
	Price                          uint    `json:"Price"`
	MidwayCity                     string  `json:"MidwayCity"`
	MidwayCityCode                 string  `json:"MidwayCityCode"`
	MidwayEnglishName              string  `json:"MidwayEnglishName"`
	CompanyCode                    string  `json:"CompanyCode"`
	OriginTerminalName             string  `json:"OriginTerminalName"`
	OriginTerminalPersianName      string  `json:"OriginTerminalPersianName"`
	OriginTerminalCode             string  `json:"OriginTerminalCode"`
	DestinationTerminalPersianName string  `json:"DestinationTerminalPersianName"`
	DestinationTerminalName        string  `json:"DestinationTerminalName"`
	DestinationTerminalCode        string  `json:"DestinationTerminalCode"`
	CompanyName                    string  `json:"CompanyName"`
	CompanyPersianName             string  `json:"CompanyPersianName"`
	DepartureTime                  string  `json:"DepartureTime"`
	DepartureDate                  string  `json:"DepartureDate"`
	Description                    string  `json:"Description"`
	BriefDescription               *string `json:"BriefDescription"`
	DestinationCode                string  `json:"DestinationCode"`
	AvailableSeatCount             int     `json:"AvailableSeatCount"`
	DiscountPercentage             float64 `json:"DiscountPercentage"`
	CompanyLogo                    string  `json:"CompanyLogo"`
	CompanyId                      uint    `json:"CompanyId"`
	CompanyUrl                     string  `json:"CompanyUrl"`
	OriginTerminalUrl              string  `json:"OriginTerminalUrl"`
	DestinationTerminalUrl         string  `json:"DestinationTerminalUrl"`
	Status                         int     `json:"Status"`
	// RefundRules                    []RefundRule `foreignKey:ID`
}
