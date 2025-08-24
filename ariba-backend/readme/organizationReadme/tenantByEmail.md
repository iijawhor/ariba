# 🏢 Find Organization by Email

This function is part of the **Organization repository** and is used to retrieve an organization document by its email.

## **Function: `fsindOrganizationByEmail`**

```js
export const findOrganizationByEmail = (email) => {
  return Organization.findOne({ email });
};
```

### 🔹 What It Does:

- Accepts an **email** as input.
- Queries the **Organization collection** in MongoDB for a matching email.
- Returns the **organization document** if found, otherwise returns `null`.

### 🔹 Usage:

- Used in **services** to validate if an organization exists before performing operations like creating users or tenants.

---

## ✅ Example

```js
const organization = await OrganizationRepositories.findOrganizationByEmail(
  "kasbagolahighmadrasha@gmail.com"
);

console.log(organization);
// Output: Organization object if found, otherwise null
```

---

## 🔄 Flow Context

1. Service layer calls this function to **verify organization existence**.
2. Prevents creating users or tenants for **non-existent organizations**.
3. Ensures **data integrity** and proper relationship between users and organizations.
