package models
import (
	"math/rand"
)

func generateRandomString(n int) string {
	letters := []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
	s := make([]rune, n)
	for i := range s {
		s[i] = letters[rand.Intn(len(letters))]
	}
	return string(s)
}

func generateRandomPhoneNumber() string {
	numbers := []rune("1234567890")
	s := make([]rune, 10)
	for i := range s {
		s[i] = numbers[rand.Intn(len(numbers))]
	}
	return "0" + string(s)
}

func generateRandomEmail() string {
	return generateRandomString(6) + generateRandomNumberString(4) + "@" + generateRandomString(4) + []string{".com", ".ir"}[rand.Intn(2)]
}

func generateRandomNumberString(n int) string {
	numbers := []rune("1234567890")
	s := make([]rune, n)
	for i := range s {
		s[i] = numbers[rand.Intn(len(numbers))]
	}
	return string(s)
}
