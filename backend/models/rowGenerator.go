package models

import (
	"math/rand"
	"time"
)

const HYPERPARAMETER_INT_CONSTANT = 2555

func GetRandomStringSize() int {
	return rand.Intn(10) + 5
}

func CreateRandomUser() User {
	return User{
		Username:       generateRandomString(GetRandomStringSize()),
		FirstName:      generateRandomString(GetRandomStringSize()),
		LastName:       generateRandomString(GetRandomStringSize()),
		HashedPassword: "password",
		PhoneNumber:    generateRandomPhoneNumber(),
		Email:          generateRandomEmail(),
		BirthDate:      time.Now().AddDate(-rand.Intn(50), -rand.Intn(12), -rand.Intn(30)),
		Gender:         []string{"male", "female"}[rand.Intn(2)],
		Role:           "User",
		NationalCode:   generateRandomNumberString(10),
		IsActive:       rand.Intn(10) != 1,
	}
}

func CreateRandomCompany() Company {
	return Company{
		Name:        generateRandomString(GetRandomStringSize()),
		Code:        generateRandomString(GetRandomStringSize()),
		PersianName: generateRandomString(GetRandomStringSize()),
		Url:         generateRandomString(GetRandomStringSize()),
		IsActive:    rand.Intn(10) != 1,
	}
}

func CreateRandomCity() City {
	return City{
		Code:                generateRandomString(GetRandomStringSize()),
		Name:                generateRandomString(GetRandomStringSize()),
		PersianName:         generateRandomString(GetRandomStringSize()),
		ProvinceName:        generateRandomString(GetRandomStringSize()),
		ProvincePersianName: generateRandomString(GetRandomStringSize()),
		IsCapital:           rand.Intn(2) == 1,
		Order:               GetRandomStringSize(),
	}
}

func CreateRandomMidwayCity() MidwayCity {
	return MidwayCity{
		CityID:    uint(1 + rand.Intn(HYPERPARAMETER_INT_CONSTANT)),
		ServiceID: uint(1 + rand.Intn(HYPERPARAMETER_INT_CONSTANT)),
	}
}

func CreateRandomService() Service {
	randomTime := time.Now().AddDate(0, 10 * rand.Intn(6) * int(time.Minute), +rand.Intn(30)).Add(-time.Duration(rand.Intn(24)) * time.Hour);
	return Service{
		BusType:               generateRandomString(GetRandomStringSize()),
		Price:                 uint(rand.Intn(1500000) + 500000),
		VIP:                   rand.Intn(2) == 1,
		CompanyID:             uint(1 + rand.Intn(HYPERPARAMETER_INT_CONSTANT)),
		OriginTerminalID:      uint(1 + rand.Intn(HYPERPARAMETER_INT_CONSTANT)),
		DestinationTerminalID: uint(1 + rand.Intn(HYPERPARAMETER_INT_CONSTANT)),
		DepartureDate:         randomTime.Format("2006-01-02"),
		DepartureTime:         randomTime.Format("15:04"),
		Description:           generateRandomString(GetRandomStringSize()),
		BriefDescription:      generateRandomString(GetRandomStringSize()),
		AvailableSeatCount:    rand.Intn(40),
		DiscountPercentage:    float64(rand.Intn(500) / 10),
	}
}

func CreateRandomSeat() Seat {
	return Seat{
		ServiceID:  uint(1 + rand.Intn(HYPERPARAMETER_INT_CONSTANT)),
		SeatNumber: uint(1 + rand.Intn(40)),
	}
}

func CreateRandomTicket() Ticket {
	return Ticket{
		Code:            generateRandomString(GetRandomStringSize()),
		ServiceID:       uint(1 + rand.Intn(HYPERPARAMETER_INT_CONSTANT)),
		UserID:          uint(1 + rand.Intn(HYPERPARAMETER_INT_CONSTANT)),
		PurchasedStatus: generateRandomString(GetRandomStringSize()),
		ReservedAt:      time.Now().AddDate(0, 0, -rand.Intn(30)).Add(-time.Duration(rand.Intn(24)) * time.Hour),
	}
}

func CreateRandomPassenger() Passenger {
	return Passenger{
		TicketID:     uint(1 + rand.Intn(HYPERPARAMETER_INT_CONSTANT)),
		SeatID:       uint(1 + rand.Intn(HYPERPARAMETER_INT_CONSTANT)),
		FirstName:    generateRandomString(GetRandomStringSize()),
		LastName:     generateRandomString(GetRandomStringSize()),
		Gender:       []string{"male", "female"}[rand.Intn(2)],
		BirthDate:    time.Now().AddDate(-rand.Intn(50), -rand.Intn(12), -rand.Intn(30)),
		NationalCode: generateRandomNumberString(10),
	}
}

func CreateRandomRefundRule() RefundRule {
	return RefundRule{
		ServiceID:               uint(1 + rand.Intn(HYPERPARAMETER_INT_CONSTANT)),
		CancellationConditionID: uint(1 + rand.Intn(HYPERPARAMETER_INT_CONSTANT)),
	}
}

func CreateRandomCancellationCondition() CancellationCondition {
	n := rand.Intn(3)
	if n == 0 {
		return CancellationCondition{
			From:    time.Now(),
			To:      time.Now().AddDate(0, 0, -rand.Intn(30)).Add(-time.Duration(rand.Intn(24)) * time.Hour),
			Message: generateRandomString(GetRandomStringSize()),
		}
	}
	if n == 1 {
		return CancellationCondition{
			From:    time.Now().AddDate(0, 0, -rand.Intn(30)).Add(-time.Duration(rand.Intn(24)) * time.Hour),
			To:      time.Now().AddDate(0, 0, -rand.Intn(30)).Add(-time.Duration(rand.Intn(24)) * time.Hour),
			Message: generateRandomString(GetRandomStringSize()),
		}
	}
	return CancellationCondition{
		From:    time.Now().AddDate(0, 0, -rand.Intn(30)).Add(-time.Duration(rand.Intn(24)) * time.Hour),
		To:      time.Now(),
		Message: generateRandomString(GetRandomStringSize()),
	}
}
