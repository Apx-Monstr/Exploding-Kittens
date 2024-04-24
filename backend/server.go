package main

import (
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
	"math/rand"
	"net/http"
)

// Types
type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type GameData struct {
	GameID string   `json:"gameId"`
	Deck   []string `json:"deck"`
}

type GameResult struct {
	GameID   string `json:"gameId"`
	Username string `json:"username"`
	Result   string `json:"result"` // win or lost
}

type UserPoints struct {
	Username string `json:"username"`
	Points   int    `json:"points"`
}

var client *redis.Client

// Main Function
func main() {
	opt, err := redis.ParseURL("rediss://red-cojuajed3nmc73c3je3g:o4Lg2DI7KDDOFXxbaC6dn3pPFfsbNTt3@oregon-redis.render.com:6379/0")
	if err != nil {
		panic(err)
	}

	client = redis.NewClient(opt)

	server := gin.Default()
	server.Use(corsMiddleware())
	server.POST("/login", handleLogin)
	server.GET("/startgame", startGame)
	server.POST("/savegameresult", saveGameResult)
	server.GET("/leaderboard", getLeaderboard)
	server.Run(":8975")
}

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func handleLogin(c *gin.Context) {
	var user User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userKey := fmt.Sprintf("/users/%s/password", user.Username)
	storedPassword, err := client.Get(context.Background(), userKey).Result()
	if err == redis.Nil {
		// User does not exist, register the new user
		if err := registerUser(user); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register user"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "User registered and logged in successfully"})
		return
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve user"})
		return
	}

	if storedPassword != user.Password {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}

	// User is authenticated, send a success response
	c.JSON(http.StatusOK, gin.H{"message": "Login successful"})
}

func registerUser(user User) error {
	userKey := fmt.Sprintf("/users/%s/password", user.Username)
	err := client.Set(context.Background(), userKey, user.Password, 0).Err()
	if err != nil {
		return err
	}
	return nil
}

// Start Game Endpoint
func startGame(c *gin.Context) {
	gameID := generateRandomID(8)
	deck := generateDeck()

	gameData := GameData{
		GameID: gameID,
		Deck:   deck,
	}

	// Store the game data in Redis
	// gameKey := fmt.Sprintf("/games/%s", gameID)
	// err := storeGameData(gameKey, gameData)
	// if err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to store game data"})
	// 	return
	// }

	c.JSON(http.StatusOK, gameData)
}

// Save Game Result Endpoint
func saveGameResult(c *gin.Context) {
	var gameResult GameResult
	if err := c.BindJSON(&gameResult); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userPointsKey := fmt.Sprintf("/users/%s/points", gameResult.Username)
	userPoints, err := client.Get(context.Background(), userPointsKey).Int()
	if err == redis.Nil {
		userPoints = 0
	} else if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve user points"})
		return
	}

	// Update the user's points based on the game result
	if gameResult.Result == "win" {
		userPoints += 1
	}

	err = client.Set(context.Background(), userPointsKey, userPoints, 0).Err()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user points"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Game result saved successfully"})
}

// Get Leaderboard Endpoint
func getLeaderboard(c *gin.Context) {
	// Retrieve all user points
	userPointsMap, err := client.Keys(context.Background(), "/users/*/points").Result()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve user points"})
		return
	}

	var leaderboard []UserPoints
	for _, key := range userPointsMap {
		username := key[len("/users/") : len(key)-len("/points")]
		points, err := client.Get(context.Background(), key).Int()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve user points"})
			return
		}
		leaderboard = append(leaderboard, UserPoints{Username: username, Points: points})
	}

	c.JSON(http.StatusOK, leaderboard)
}

// Function to generate random ID
func generateRandomID(length int) string {
	const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	b := make([]byte, length)
	for i := range b {
		b[i] = characters[rand.Intn(len(characters))]
	}
	return string(b)
}

// Function to generate Random Deck
func generateDeck() []string {
	cardTypes := []string{"cat", "defuse", "shuffle", "cat", "defuse", "cat", "defuse", "bomb", "cat", "defuse", "bomb", "cat", "defuse"}
	deck := make([]string, 5)
	for i := range deck {
		idx := rand.Intn(len(cardTypes))
		deck[i] = cardTypes[idx]
	}
	return deck
}
