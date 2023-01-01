<?php 

// receives values from the shult table page (high score as text, username, high score in seconds)
$cHighscore = $_GET['highscore'];
$cUser = $_GET['username'];
$cRn = $_GET['rawnum'];

// connects to foodintorg.com database
$servername = "p3plzcpnl447280";
$username = "AdminNaz";
$password = "ALOisgood";
$dbname = "Main";
$conn = new mysqli($servername, $username, $password, $dbname);

// I had a really complicated process before, that then stopped working and I couldnt find the problem. Struggled for hours before deciding to consult chatGPT.
//It taught me how to use as he says upserts and prepared statments, I did and it double checked everything and it worked! The wonders of AI.
if ($stmt = $conn->prepare("INSERT INTO ShultTable (username, highscore, rawNum) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE highscore = ?, rawNum = ?")) {

    /* Bind the variables to the parameters */
    $stmt->bind_param("ssisi", $cUser, $cHighscore, $cRn, $cHighscore, $cRn);

    /* Execute the statement */
    $stmt->execute();

    /* Close the statement */
    $stmt->close();
}

// queries the database table and orders the results from highest to lowest of the highscores
$query = "SELECT * FROM ShultTable ORDER BY rawNum";
$result = $conn->query($query); 

// makes an ordered list containing the username and highscore of each player
echo 'Highscores';
echo '<ol>';
while ($row = $result->fetch_row()) {
   echo "<br><li>$row[0] $row[1]</li>";
}
echo '</ol>';

?>
