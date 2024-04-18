package db

import (
	"fmt"
	"gorm.io/gorm"
	"gorm.io/driver/postgres"
)

func InitDB() *gorm.DB {
	dsn := "postgres://default:DE3fRxcL6ugU@ep-polished-lab-a45rj9zc.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
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

	fmt.Println("Connection to database is successful")
	return db
}
