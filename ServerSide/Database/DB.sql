create table User (
   id int auto_increment primary key,
   email varchar(30) not null,
   firstName varchar(30) not null,
   lastName varchar(30) not null,
   password varchar(50),
   role int unsigned not null,  # 0 student, 1 parent, 2 admin
   grade int, 
   unique key(email)
);


insert into User (email, firstName, lastName, password, role, grade)
            VALUES ("jdebest@email.com”, “Josh”, “DeBest”, “password”, 2, null);
