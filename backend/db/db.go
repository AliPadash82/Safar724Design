package db

import (
	"fmt"

	m "main/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
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

	fmt.Println("Connection to database is successful")
}

func GetServices(date string, originID uint, destinationID uint) ([]m.Service, error) {
	var services []m.Service
	err := db.Where("departure_date = ? AND origin_terminal_id = ? AND destination_terminal_id = ?", date, originID, destinationID).
		Find(&services).Error
	if err != nil {
		return nil, err
	}

	return services, nil
}

func GetCityByID(id uint) (c m.City, e error) {
	err := db.Where("id = ?", id).First(&c).Error
	if err != nil {
		return m.City{}, err
	}
	return c, nil
}

func getCompanyByID(id uint) (c m.Company, e error) {
	err := db.Where("id = ?", id).First(&c).Error
	if err != nil {
		return m.Company{}, err
	}
	return c, nil
}

func GetItem(date string, originID uint, destinationID uint) ([]m.Item, error) {
	var items []m.Item
	err := db.Model(&m.Service{}).
		Where("departure_date = ? AND origin_terminal_id = ? AND destination_terminal_id = ?", date, originID, destinationID).
		Select(
			"services.id, bus_types.is_vip, bus_types.code as bus_code, services.bus_name as bus_type, services.price, " +
				"services.departure_time, services.departure_date, " +
				"services.description, services.brief_description, " +
				"bus_types.seat_count, services.discount_percentage, " +
				"companies.code as company_code, companies.name as company_name, companies.persian_name as company_persian_name, " +
				"companies.logo as company_logo, companies.url as company_url, companies.id as company_id, " +
				"origin.name as origin_terminal_name, origin.persian_name as origin_terminal_persian_name, origin.code as origin_terminal_code, " +
				"destination.name as destination_terminal_name, destination.persian_name as destination_terminal_persian_name, destination.code as destination_terminal_code").
		Joins("left join bus_types on bus_types.id = services.bus_type_id").
		Joins("left join companies on companies.id = services.company_id").
		Joins("left join cities as origin on origin.id = services.origin_terminal_id").
		Joins("left join cities as destination on destination.id = services.destination_terminal_id").
		Scan(&items).Error
	if err != nil {
		return nil, err
	}
	return items, nil
}
