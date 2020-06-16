Structure de la BDD

...MySQL
CREATE DATABASE no_hyphen;

CREATE TABLE `fact` (`id` INT NOT NULL AUTO_INCREMENT, `claim` TEXT NOT NULL, `claim_date` DATE NOT NULL, `fact_checked` BOOLEAN NOT NULL, PRIMARY KEY (`id`));

INSERT INTO `fact` (`claim`, `claim_date`, `fact_checked`) VALUES ('Snow is not black', '1978-12-20', true), ('Hats are always comfy', '1845-06-12', false), ('Honey is sweet', '1203-04-25', true), ('Aurelien can be very annoying sometimes', '2020-06-15', true), ('Dolphins do not exist', '2016-08-15', false), ('Before the Big Bang, there was a big cake', '1995-11-07', false), ('Trump is orange', '2017-02-22', true), ('My cats are better than yours', '2020-04-27', true);
...
