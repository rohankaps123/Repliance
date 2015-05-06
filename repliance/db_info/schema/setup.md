# Setting up the app's database

### authored by James Desjardin

---

For anyone who couldn't make the 4/12/15 meeting, here's how we set up the database for our app.

1.) Open a terminal window and type:

#### sudo -u postgres psql

2.) This should connect you as the user postgres. We now make the password of the user postgres 'postgres' because it is defined as such in our repliancedb.js connection string. You can change this file if you have a different user on your computer, however please ignore this file when committing if you do so. Keeping this consistent between all of our machines will make this go the smoothest.

#### alter user postgres password 'postgres';

3.) No we can make our database.

#### create database repliance owner postgres;

4.) You can confirm the owner and presence of the 'repliance' database with the following command (press q to close the list after it opens).

#### \l

5.) To connect to the repliance database, type:

#### \connect repliance

6.) Next, you will be in the database and see this at the start of your terminal prompt:

#### repliance=\# 

7.) Now you may copy and paste or run the schema.sql file I have included in this folder to make all of the tables for the database. Once you have done this you can use the following command to list the four tables.

#### \dt