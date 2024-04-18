package db

import (
	"fmt"
	"gorm.io/gorm"
	"gorm.io/driver/postgres"
	m "main/models"
)

var db *gorm.DB

func InitDB() {
	var err error
	dsn := "postgres://default:6v1UnCVSYkyw@ep-divine-waterfall-a4qo56m0.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	
	if err != nil {
		panic("failed to connect database: " + err.Error())
	}

	sqlDB, err := db.DB()
	if err != nil {
		panic("failed to get database object: " + err.Error())
	}

	err = sqlDB.Ping()
	if err != nil {
		panic("failed to ping database: " + err.Error())
	}

	// err = db.AutoMigrate(
	// 	&m.User{},
	// 	&m.Company{},
	// 	&m.City{},
	// 	&m.Service{},
	// 	&m.Seat{},
	// 	&m.Ticket{},
	// 	&m.Passenger{},
	// 	&m.RefundRule{},
	// 	&m.CancellationCondition{},
	// 	&m.MidwayCity{},
	// )

	if err != nil {
		panic("Failed to run auto migration: " + err.Error())
	}

	fmt.Println("Connection to database is successful")
}
