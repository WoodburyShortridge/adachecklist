<?php
if(!isset($_POST['submit']))
{
	//This page should not be accessed directly. Need to submit the form.
	echo "error; you need to submit the form!";
}
$name = $_POST['name'];
$title = $_POST['title'];
$org = $_POST['org'];
$visitor_email = $_POST['email'];
$phone = $_POST['phone'];
$payment = $_POST['payment'];
$creditmethod = $_POST['creditmethod'];
$accommodations = $_POST['accommodations'];
$comment = $_POST['comment'];


$email_from = "adainfo@newenglandada.org";//<== update the email address
$email_subject = "New Form submission";
$email_body = "You have received a new registration from$name ($visitor_email).\n \n".
    "Full name: $name \n".
    "Title: $title \n".
    "Organization: $org \n".
    "Email: $visitor_email \n".
    "Phone: $phone \n".
    "Payment: $payment \n".
    "Credit Card: $creditmethod \n".
    "Accommodations: $accommodations \n".
    "Comments: $comment \n";
$to = "kgips@ihcdesign.org, dwest@ihcdesign.org";//<== update the email address
$headers = "From: $email_from \r\n";
$headers .= "Reply-To: $visitor_email \r\n";
//Send the email!
mail($to,$email_subject,$email_body,$headers);
//done. redirect to thank-you page.
header('Location: thank-you.html');


// Function to validate against any email injection attempts
function IsInjected($str)
{
  $injections = array('(\n+)',
              '(\r+)',
              '(\t+)',
              '(%0A+)',
              '(%0D+)',
              '(%08+)',
              '(%09+)'
              );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
    {
    return true;
  }
  else
    {
    return false;
  }
}
   
?> 