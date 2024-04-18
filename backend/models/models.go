package models

import (
	"gorm.io/gorm"
	"time"
)

type User struct {
	gorm.Model
	Username string
	FirstName string
	LastName string
	HashedPassword string
	PhoneNumber string
	Email string
	BirthDate time.Time
	IsActive bool
}

type Ticket struct {
	gorm.Model
	Code string
	ServiceID uint
	UserID uint
	Seats int
}