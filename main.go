package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"
)

// response is the JSON body returned by every endpoint.
type response struct {
	Message string `json:"message"`
	Host    string `json:"host,omitempty"` // container/pod hostname, useful to prove the app is running on AWS
	Time    string `json:"time"`
}

func main() {
	// Cloud platforms inject PORT (App Runner uses 8080 by default).
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/", rootHandler)
	mux.HandleFunc("/health", healthHandler)

	server := &http.Server{
		Addr:              ":" + port,
		Handler:           mux,
		ReadHeaderTimeout: 5 * time.Second,
	}

	log.Printf("listening on :%s", port)
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	host, _ := os.Hostname()
	writeJSON(w, http.StatusOK, response{
		Message: "Hello from Go, running in a container on AWS",
		Host:    host,
		Time:    time.Now().UTC().Format(time.RFC3339),
	})
}

func healthHandler(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, response{Message: "ok", Time: time.Now().UTC().Format(time.RFC3339)})
}

func writeJSON(w http.ResponseWriter, status int, body response) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(body); err != nil {
		log.Printf("write response: %v", err)
	}
}
