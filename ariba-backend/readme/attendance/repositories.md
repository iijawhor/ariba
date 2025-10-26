3. Repository

Handles database operations.

export const getPresentDayAttendance = async ({ userId, today }) => {
return await Attendance.findOne({ user: userId, date: today });
};

Description:

Queries the Attendance collection to find a record for the given userId and date.

Returns the attendance document if found, otherwise returns null.

Endpoint
GET /api/v1/attendance/my-today/:today

Headers:

Authorization: Bearer <access_token>

Parameters:

today (string, required): Date in YYYY-MM-DD format.

Response:

Success (200):

{
"message": "Successfully fetched today's attendance",
"response": {
"\_id": "1234567890",
"user": "userId",
"date": "2025-10-26",
"status": "in",
"createdAt": "2025-10-26T09:00:00.000Z",
"updatedAt": "2025-10-26T09:00:00.000Z"
}
}

Error (400):

{
"message": "Failed to get today's attendance"
}

Usage

Make sure the user is authenticated.

Call the endpoint with the current date as a parameter.

Receive the attendance record if present.
