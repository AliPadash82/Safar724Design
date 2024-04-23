package db

import (
	"fmt"
	"log"

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
	// if err != nil {
	// 	panic("Failed to run auto migration: " + err.Error())
	// }

	// GenerateRows(false)

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

func GenerateRows(removePreviosRows bool) {
	if removePreviosRows {
		e := db.Exec("TRUNCATE TABLE users, companies, cities, services, seats, tickets, passengers, refund_rules, cancellation_conditions, midway_cities RESTART IDENTITY CASCADE")
		if e.Error != nil {
			log.Fatal(e.Error)
		}
	}
	users := make([]m.User, m.HYPERPARAMETER_INT_CONSTANT)
	companies := make([]m.Company, m.HYPERPARAMETER_INT_CONSTANT)
	cities := make([]m.City, m.HYPERPARAMETER_INT_CONSTANT)
	services := make([]m.Service, m.HYPERPARAMETER_INT_CONSTANT)
	seats := make([]m.Seat, m.HYPERPARAMETER_INT_CONSTANT)
	tickets := make([]m.Ticket, m.HYPERPARAMETER_INT_CONSTANT)
	passenger := make([]m.Passenger, m.HYPERPARAMETER_INT_CONSTANT)
	cancellationConditions := make([]m.CancellationCondition, m.HYPERPARAMETER_INT_CONSTANT)
	refundRules := make([]m.RefundRule, m.HYPERPARAMETER_INT_CONSTANT)
	midwayCity := make([]m.MidwayCity, m.HYPERPARAMETER_INT_CONSTANT)
	for i := 0; i < m.HYPERPARAMETER_INT_CONSTANT; i++ {
		users[i] = m.CreateRandomUser()
		companies[i] = m.CreateRandomCompany()
		cities[i] = m.CreateRandomCity()
		services[i] = m.CreateRandomService()
		seats[i] = m.CreateRandomSeat()
		tickets[i] = m.CreateRandomTicket()
		passenger[i] = m.CreateRandomPassenger()
		cancellationConditions[i] = m.CreateRandomCancellationCondition()
		refundRules[i] = m.CreateRandomRefundRule()
		midwayCity[i] = m.CreateRandomMidwayCity()
	}
	if err := db.Create(users).Error; err != nil {
		log.Printf("Failed to create user: %v", err)
	}
	if err := db.Create(companies).Error; err != nil {
		log.Printf("Failed to create company: %v", err)
	}
	if err := db.Create(cities).Error; err != nil {
		log.Printf("Failed to create city: %v", err)
	}
	if err := db.Create(services).Error; err != nil {
		log.Printf("Failed to create service: %v", err)
	}
	if err := db.Create(seats).Error; err != nil {
		log.Printf("Failed to create seat: %v", err)
	}
	if err := db.Create(tickets).Error; err != nil {
		log.Printf("Failed to create ticket: %v", err)
	}
	if err := db.Create(passenger).Error; err != nil {
		log.Printf("Failed to create passenger: %v", err)
	}
	if err := db.Create(cancellationConditions).Error; err != nil {
		log.Printf("Failed to create cancellation condition: %v", err)
	}
	// try 5 times
	for j := 0; ; j++ {
		if err := db.Create(refundRules).Error; err != nil {
			log.Printf("Failed to create refund rule: %v", err)
			if j == 5 {
				break
			}
			for i := 0; i < m.HYPERPARAMETER_INT_CONSTANT; i++ {
				refundRules[i] = m.CreateRandomRefundRule()
			}
		} else {
			break
		}
	}
	// try 5 times
	for j := 0; ; j++ {
		if err := db.Create(midwayCity).Error; err != nil {
			log.Printf("Failed to create midway city: %v", err)
			if j == 5 {
				break
			}
			for i := 0; i < m.HYPERPARAMETER_INT_CONSTANT; i++ {
				midwayCity[i] = m.CreateRandomMidwayCity()
			}
		} else {
			break
		}
	}
}
