<html>
	<head>
		<title>Michael A. Delfino</title>
		<link rel="stylesheet" type="text/css" href="delfino.css" />
	</head>
	<body>
		<center>
		<div id="nav">
			<a href="http://www.michaeldelfino.com" class="main"><font color="#000000">michael</font><font color="#F57218">delfino</font></a><br />
			<a href="index.html">home</a>&nbsp;|&nbsp;
			<a href="about.html">about</a>&nbsp;|&nbsp;
			<a href="pictures.html">pictures</a>&nbsp;|&nbsp;
			<a href="contact.html" class="selected">contact</a>
		</div>
		<div id="content">
			<?php
					$to = "megabeano@gmail.com";
					$name = $_POST['name'];
					$subject = "Message from " .$name;
					$phonenum = $_POST['phonenum'];
					$email =$_POST['email'];
					$comments=$_POST['comments'];
					$body = "New message from www.michaeldelfino.com:\n";
					$body .= "\nName: " . $name;
					$body .= "\nPhone number: " . $phonenum;
					$body .= "\nEmail address: " . $email;
					$body .= "\nMessage: " . $comments;
					if (mail($to, $subject, $body, $headers)) {
					  echo("<br><br>Message sent.  Thank you!");
 					} else {
 					 echo("<br><br>Message delivery failed... Please try again.");
 					}
				?>

		</div>
		</center>
	</body>
</html>