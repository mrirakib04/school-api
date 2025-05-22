# 📍 School Finder API

A simple Node.js + Express REST API to add and list schools based on geographical location (latitude & longitude). It uses MongoDB as the database and `geolib` for distance calculations.

---

## 📦 Features

- Add a school with name, address, latitude, and longitude
- Get a sorted list of schools based on proximity to a given location
- Built using:
  - Node.js
  - Express.js
  - MongoDB (via MongoDB Atlas)
  - Geolib
  - dotenv & CORS middleware

---

## 🚀 API Endpoints

### `POST /addSchool`

Add a new school to the database.

**Request Body:**

```json
{
  "name": "Sample School",
  "address": "123 Sample Street",
  "latitude": 23.8103,
  "longitude": 90.4125
}
```
