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




//performs a query on the username and if there is 0 results from that username it inserts the current values if there is it does something else
$sql = "SELECT highscore FROM ShultTable WHERE username='$cUser'";
$ver = mysqli_query($conn, $sql);
if (mysqli_num_rows($ver) === 0){
$sql = "INSERT INTO ShultTable(username, highscore, rawNum) 
       VALUES ('$cUser', '$cHighscore', '$cRn')";}
       else{

        // finds the previous highscore of the user (if there is none nothing happens) and saves it to a variable
$query = "SELECT rawNum FROM ShultTable WHERE username='$cUser'";
$result = $conn->query($query);
$rawNum = mysqli_fetch_row($result)[0];
       }
    
// if the previous highscore was higher nothing happens, if it's lower it updates the high scores
if($rawNum < $cRn){
$sql = "UPDATE ShultTable SET highscore='$cHighscore' WHERE username='$cUser'";
if ($conn->query($sql) === TRUE) {
} else {
  echo "Error updating record: " . $conn->error;
}
$sql = "UPDATE ShultTable SET rawNum='$cRn' WHERE username='$cUser'";
if ($conn->query($sql) === TRUE) {
} else {
  echo "Error updating record: " . $conn->error;
}
}


// queries the database table and orders the results from highest to lowest of the highscores
$query = "SELECT * FROM ShultTable ORDER BY rawNum";
$result = $conn->query($query); 

// makes an ordered list containing the username and highscore of each player
echo 'Highscores';
echo '<ol>';
while ($row = mysqli_fetch_row($result)) {
   echo " <br><li>$row[0] $row[1]</li>";
}
echo '</ol>';

?>
