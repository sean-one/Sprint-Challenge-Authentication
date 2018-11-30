<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
Sessions is used as a way to store bits of information about the user/client

2. What does bcrypt do to help us store passwords in a secure manner.
bcrypt creates a encrypted password by creating a hash based on random arguments (salts) done over a set amount of rounds 

3. What does bcrypt do to slow down attackers?
bcrypt creates a one way encryption making it hard to guess the password.  Basically attackers have to compare their hashed passwords to the victims hashed password and not just decode the hash to find the password.  Meaning he would have to have guess the password right in order to get the right hash to compare.  This is done with rainbow tables

4. What are the three parts of the JSON Web Token?
header, payload, signiture
