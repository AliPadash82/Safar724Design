package server

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func InitServer() {
    router := gin.Default()

    router.GET("/", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "message": "Hello, Gin!",
        })
    })

    router.Run("localhost:8080")
}