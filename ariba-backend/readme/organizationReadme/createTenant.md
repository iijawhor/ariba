# Organization / Tenant Management

This document explains the **tenant (organization) creation feature** including **route, controller, service, repository, and model**.

## 1. **Route: `routes/organization.routes.js`**

```js
router.post(
  "/create-tenant",
  verifyJWT,
  validateRole(["superAdmin"]),
  sanitizeRequests,
  createTenant
);
```

### 🔹 What It Does:

- Defines the `/create-tenant` endpoint for creating a new organization.
- Middleware applied:

  1. `verifyJWT` → ensures the user is authenticated.
  2. `validateRole(["superAdmin"])` → restricts this action to super admins only.
  3. `sanitizeRequests` → cleans request data to prevent XSS/injection attacks.

- Calls `createTenant` controller to handle the business logic.

---

## 2. **Controller: `controllers/organization.controller.js`**

```js
export const createTenant = async (req, res) => {
  try {
    const newTenant = await OrganizationServices.createTenant(req.body);
    if (!newTenant) {
      return res.status(400).json({ message: "Organization is not created" });
    }

    return res.status(200).json({
      message: "Organization is created successfully",
      organization: newTenant
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};
```

### 🔹 What It Does:

- Receives tenant data from the request body.
- Calls **service layer** to create the tenant.
- Returns:

  - `200 OK` and the new tenant object if successful.
  - `400` or `500` errors if creation fails.

---

## 3. **Service: `services/organization.services.js`**

```js
export const createTenant = async (data) => {
  const { name, phoneNumber, email, address, domain, subscriptionPlan } = data;

  if ([name, phoneNumber, email, address].some((fields) => !fields)) {
    throw new ApiError("All fields are required!", 400);
  }

  const existingTenant = await Organization.findOne({ email });
  if (existingTenant) {
    throw new ApiError("Organization with this email already exist!", 400);
  }

  const newTenant = await OrganizationRepositories.createTenant({
    name,
    phoneNumber,
    email,
    address
  });
  return newTenant;
};
```

### 🔹 What It Does:

- Validates required fields: `name`, `phoneNumber`, `email`, `address`.
- Checks if an organization with the same email already exists.
- Calls the repository to persist the new organization.
- Returns the newly created tenant object.

---

## 4. **Repository: `repositories/organization.repositories.js`**

```js
export const createTenant = (data) => Organization.create(data);
```

### 🔹 What It Does:

- Directly interacts with the database using Mongoose.
- Creates a new organization document with the provided data.

---

## 5. **Model: `models/organization.model.js`**

```js
const organizaionShcema = new Schema(
  {
    organizationId: {
      type: String,
      default: () => uuidv4(),
      unique: true,
      immutable: true
    },
    name: { type: String, required: true },
    domain: { type: String, unique: true },
    addres: { type: String },
    phoneNumber: {
      type: String,
      validate: {
        validator: (value) => /^\d{10}$/.test(value),
        message: "Phone number must be 10 digits"
      }
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address" + value);
        }
      }
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active"
    },
    subscriptionStartDate: { type: Date },
    subscriptionEndDate: { type: Date },
    subscriptionPlan: [
      {
        type: String,
        enum: ["free", "basic", "premium"],
        default: "free"
      }
    ]
  },
  { timestamps: true }
);
```

### 🔹 What It Does:

- Defines the structure of the **Organization** collection in MongoDB.
- Fields include:

  - `organizationId` → auto-generated UUID.
  - `name`, `email`, `phoneNumber`, `address` → essential organization info.
  - `status` → tracks organization status (`active`, `inactive`, `suspended`).
  - `subscriptionPlan` → type of subscription (`free`, `basic`, `premium`).
  - `subscriptionStartDate` & `subscriptionEndDate` → optional subscription tracking.

- Validates data (email format, phone number, required fields).

---

## 6. **Flow Summary**

1. **Client** sends `POST /create-tenant` with organization data.
2. **Middlewares** run:

   - `verifyJWT` → checks user is authenticated.
   - `validateRole(["superAdmin"])` → only super admins can create tenants.
   - `sanitizeRequests` → cleans input.

3. **Controller** calls **service**.
4. **Service** validates data and checks uniqueness.
5. **Repository** creates the new tenant in the database.
6. **Response** returned to client with the newly created organization.

---

## ✅ Example Request

```json
POST /create-tenant
{
  "name": "Greenfield High School",
  "email": "contact@greenfield.com",
  "phoneNumber": "9876543210",
  "address": "123 Main St, City",
  "domain": "greenfield.highschool.com",
  "subscriptionPlan": ["basic"]
}
```

---

## ✅ Example Response

```json
{
  "message": "Organization is created successfully",
  "organization": {
    "_id": "64f123abcde56789",
    "organizationId": "f9b1c8e0-1234-4567-89ab-1234567890ab",
    "name": "Greenfield High School",
    "email": "contact@greenfield.com",
    "phoneNumber": "9876543210",
    "status": "active",
    "subscriptionPlan": ["basic"],
    "createdAt": "2025-08-24T12:34:56.789Z",
    "updatedAt": "2025-08-24T12:34:56.789Z"
  }
}


## 🔒 Security & Validation

* Only **superAdmin** users can create organizations.
* Input is **sanitized** to prevent XSS/SQL injection.
* Emails must be unique and valid.
* Phone numbers must be 10 digits.
* Status defaults to `active` if not provided.
```
