package server

import (
	"main/db"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func InitServer() {
	router := gin.Default()
	api := router.Group("/api")
	{
			v1 := api.Group("/v1")
			{
					v1.GET("/getservices", GetServicesHandler)
			}
	}
	

	router.Run("localhost:8080")
}

func GetServicesHandler(c* gin.Context) {
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
	services, err := db.GetServices(date, uint(originID), uint(destinationID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, services)
}