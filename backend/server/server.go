package server

import (
	"fmt"
	"net/http"

	"time"

	"github.com/gin-gonic/gin"
	ptime "github.com/yaa110/go-persian-calendar"
)

func InitServer() {
	router := gin.Default()

	pt := ptime.New(time.Now())
	// Get the date in Persian calendar
	fmt.Println(pt.Weekday()) 
	router.GET("/", func(c *gin.Context) {
		y, mString, d := pt.Date()
		m := int(mString)
		c.JSON(http.StatusOK, gin.H{
			"Date": pt.Format("y-MM-dd"),
			"Day": d,
			"Month": m,
			"Year": y,
			"MonthString": mString,
			"Weekday": pt.Weekday().String(),
			"WeekdayNumber": int(pt.Weekday()),
		})
	})

	router.Run("localhost:8080")
}
