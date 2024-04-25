package server

import (
	"fmt"
	"main/db"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/rs/cors"
)

func InitServer() {
	router := gin.Default()
	api := router.Group("/api")
	{
		v1 := api.Group("/v1")
		{
			v1.GET("/getservices", GetServicesHandler)
			v1.GET("/getseats", GetSeatsByServiceIDHandler)
		}
	}
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
		Debug:            true,
	})
	handler := c.Handler(router)
	httpServer := &http.Server{
		Addr:    "localhost:8080",
		Handler: handler, // Here we pass the CORS wrapped handler
	}
	if err := httpServer.ListenAndServe(); err != nil {
		panic(err)
	}
}

func GetServicesHandler(c *gin.Context) {
	date := c.Query("Date")
	originIDStr := c.Query("OriginID")
	destinationIDStr := c.Query("DestinationID")
	originID, err := strconv.ParseUint(originIDStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid originID format"})
		return
	}
	destinationID, err := strconv.ParseUint(destinationIDStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid destinationID format"})
		return
	}
	OriginCity, err := db.GetCityByID(uint(originID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
	DestinationCity, err := db.GetCityByID(uint(destinationID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
	items, err := db.GetItem(date, uint(originID), uint(destinationID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"Date":                   date,
		"OriginPersianName":      OriginCity.PersianName,
		"OriginEnglishName":      OriginCity.Name,
		"OriginCode":             OriginCity.Code,
		"DestinationPersianName": DestinationCity.PersianName,
		"DestinationEnglishName": DestinationCity.Name,
		"DestinationCode":        DestinationCity.Code,
		"Today":                  nil,
		"Logo":                   nil,
		"Items":                  items,
	})
}

func GetSeatsByServiceIDHandler(c *gin.Context) {
	var serviceIDstr string = c.Query("ServiceID")
	fmt.Println(serviceIDstr)
	serviceID, err := strconv.ParseUint(serviceIDstr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid serviceID format - " + err.Error()})
		return
	}
	seats, err := db.GetSeatsWithGender(uint(serviceID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, seats)
}
