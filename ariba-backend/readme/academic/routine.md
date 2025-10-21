# **Routine Module Documentation**

## **1. Routine Schema (Mongoose)**

The `Routine` model represents a school timetable entry for a specific grade, subject, and teachers.

### **Schema Fields**

| Field         | Type                            | Required | Description                                                    |
| ------------- | ------------------------------- | -------- | -------------------------------------------------------------- |
| `grade`       | `ObjectId` (ref: `Grade`)       | Yes      | Reference to the grade/class.                                  |
| `subjectName` | `ObjectId` (ref: `Subject`)     | Yes      | Reference to the subject.                                      |
| `teachers`    | `Array<ObjectId>` (ref: `User`) | Yes      | One or more teachers assigned. Must have at least one teacher. |
| `day`         | `String`                        | Yes      | Day of the week (`Monday`–`Friday`).                           |
| `date`        | `Date`                          | Yes      | Date of the routine entry.                                     |
| `startTime`   | `String`                        | Yes      | Start time in `HH:mm` format.                                  |
| `endTime`     | `String`                        | Yes      | End time in `HH:mm` format.                                    |

### **Validations**

1. `teachers` must contain at least one teacher.
2. `day` must be one of: `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`.
3. `startTime` and `endTime` must match the regex `^\d{2}:\d{2}$`.
4. **Unique constraint:** Prevents duplicate routines for the same grade, subject, day, and start time.

```js
routineSchema.index(
  { grade: 1, subjectName: 1, day: 1, startTime: 1 },
  { unique: true }
);
```

---

## **2. Routine Creation Service**

### **Function: `createRoutine` (Service Layer)**

Responsible for creating a new routine after validating data and checking conflicts.

#### **Parameters**

* `req` — Express request object containing `body`:

```json
{
  "grade": "ObjectId",
  "subjectName": "ObjectId",
  "teachers": ["ObjectId1", "ObjectId2"],
  "day": "Monday",
  "date": "2025-10-21",
  "startTime": "09:00",
  "endTime": "10:00"
}
```

#### **Validation & Conflict Checks**

1. All required fields must be present (`grade`, `subjectName`, `teachers`, `day`, `date`, `startTime`, `endTime`).
2. **Routine time overlap check** — ensures no duplicate routine exists for the same grade and subject during overlapping times:

```js
startTime < newEndTime && endTime > newStartTime
```

3. **Teacher schedule conflict** — ensures no teacher is assigned to multiple routines at the same time.

   * Returns list of conflicting teachers if found.

#### **Returns**

* On success: `Routine` document created.
* On failure: throws `ApiError` with proper error message.

---

## **3. Routine Controller**

### **Function: `createRoutine(req, res)`**

* Calls the service layer to create a routine.
* Returns JSON response:

#### **Success Response**

```json
{
  "message": "Routine created successfully",
  "newRoutine": { ...RoutineDocument }
}
```

#### **Failure Response**

```json
{
  "message": "Failed to create routine"
}
```

> **Note:** Currently, failure always returns HTTP 200. Consider using proper status codes (e.g., 400 for validation errors).

---

## **4. Example Usage**

```js
import express from "express";
import { createRoutine } from "./routineController.js";

const router = express.Router();

router.post("/routine", createRoutine);

// Request body example
/*
{
  "grade": "650d5c1f2f1e2b001c123456",
  "subjectName": "650d5c1f2f1e2b001c654321",
  "teachers": ["650d5c1f2f1e2b001cabcdef"],
  "day": "Monday",
  "date": "2025-10-21",
  "startTime": "09:00",
  "endTime": "10:00"
}
*/
```

---

✅ **Highlights**

1. Multi-layered validation (required fields, teacher conflict, routine overlap).
2. Fully references related models (`Grade`, `Subject`, `User`).
3. Ensures timetable integrity by preventing duplicate routines and overlapping assignments.


