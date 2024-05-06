<?php
// Database configuration
$host = 'service-connect-test-server.database.windows.net'; // Host name
$port = 1433; // Default SQL Server port
$dbname = 'service-connect-test'; // Database name
$user = 'service-connect-admin'; // Database username
$pass = "g*22,'V^%u86U*R4@tqz"; // Database password

// Create PDO instance for database connection
try {
    // $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Retrieve form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Prepare SQL query
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (:name, :email, :password)");
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':password' => $hashedPassword
    ]);

    echo "User registered successfully!";
} catch (PDOException $e) {
    die("Could not connect to the database $dbname :" . $e->getMessage());
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World with PHP</title>
</head>
<body>
    <h1>Hello World!</h1>
    <?php
    // Database configuration
    $host = 'service-connect-test-server.database.windows.net'; // Host name
    $dbname = 'service-connect-test'; // Database name
    $user = 'service-connect-admin'; // Database username
    $pass = ""; // Database password


    // Create PDO instance for database connection
    try {
        $pdo = new PDO("sqlsrv:Server=$host,$port;Database=$dbname", $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Retrieve form data if POST request
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $name = $_POST['name'];
            $email = $_POST['email'];
            $password = $_POST['password'];

            // Hash the password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            // Prepare SQL query
            $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (:name, :email, :password)");
            $stmt->execute([
                ':name' => $name,
                ':email' => $email,
                ':password' => $hashedPassword
            ]);

            echo "<p>User registered successfully!</p>";
        } else {
            echo "<form action='' method='post'>
                Name: <input type='text' name='name'><br>
                Email: <input type='email' name='email'><br>
                Password: <input type='password' name='password'><br>
                <button type='submit'>Register</button>
            </form>";
        }
    } catch (PDOException $e) {
        die("Could not connect to the database $dbname :" . $e->getMessage());
    }
    ?>
</body>
</html>
