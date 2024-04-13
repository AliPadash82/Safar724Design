package db

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
)

func InitDB() {
	db, err := sql.Open("postgres", "postgres://default:DE3fRxcL6ugU@ep-polished-lab-a45rj9zc.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require")
	if err != nil {
		panic(err)
	}
	defer db.Close()
	err = db.Ping()
	if err != nil {
		panic(err)
	}
	fmt.Println("Connection to database is successful")
}