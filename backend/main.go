package main

import (
	"main/server"
	"main/db"
)

func main() {
	db.InitDB()
	server.InitServer()
}