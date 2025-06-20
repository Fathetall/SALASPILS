# SALASPILS

| ID    | Function             | What to Test                       | Input Data                             | Expected Result                                            | Note                    |
|-------|----------------------|----------------------------------|--------------------------------------|------------------------------------------------------------|-----------------------------|
| TC01  | Admin Registration   | Form validation                  | Email: `test@test.com`, Password: `12345678` | Displays message: "Registration successful!"       | Email must be unique        |
| TC02  | Admin Registration   | Empty fields                    | Email: ``, Password: ``               | Form submits successfully (should fail validation)         |                             |
| TC03  | Admin Registration   | Duplicate email registration    | Email: `test@test.com`                | Registration succeeds (should show error about duplicate)  | Check for duplicates        |
| TC04  | Admin Login          | Correct credentials             | Email: `admin@example.com`, Password: `123456` | Redirects to homepage (should redirect to protected page)  |                    |
| TC05  | Admin Login          | Wrong password                 | Email: `admin@example.com`, Password: `wrong` | Error message displayed                             |                             |
| TC06  | Add Comment          | All fields filled              | Name: `Anna`, Text: `Great post!`    | Comment NOT added (should add comment)                       |                             |
| TC07  | Add Comment          | Empty "Name" field             | Name: ``, Text: `Hi`                 | Error: "Please fill in both name and comment!"               |                             |
| TC08  | Comments Display     | After submitting a comment     | After submit                        | New comment appears at the END of the list (should be first)  |                             |
| TC09  | Navigation           | Menu links (navbar)            | Click on "Comments"                  | Redirects to wrong page (should open comments page)          |                             |
| TC10  | Create Post (Admin)  | Fields filled, authorized     | Post title + content                 | Post saved and appears in DB                                  |                             |
| TC11  | Protected Route      | Unauthorized access to `/create-post` | No login                           | Access granted (should redirect to login page)          | Check authorization         |
