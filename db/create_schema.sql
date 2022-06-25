
create user hr_user with encrypted password 'myxxjs2016';
CREATE DATABASE "hrdb"
WITH
  OWNER = "hr_user"
  TEMPLATE = "template0"
  ENCODING = 'UTF8'
  TABLESPACE = "pg_default"
;