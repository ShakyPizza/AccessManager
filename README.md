# Access Manager

Static site for selecting user roles and door groups.

The site is published via [GitHub Pages](https://shakypizza.github.io/AccessManager/). If you receive a 404 error,
 ensure the URL uses the exact repository name with correct capitalization.

## Login

The GitHub Pages site uses a simple password gate. Visitors are first served `login.html` and redirected to the main
interface after entering the correct password. The password entered by the user is hashed in the browser and compared
against a stored hash.
