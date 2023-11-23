-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;

INSERT INTO Business(id, business_name) VALUES (1, 'LaRatatouille');
ALTER sequence Business_SEQ restart WITH 2;
INSERT INTO Employee(id, username, password, employee_role, last_modified, first_login, business_id) VALUES (1, 'ADMIN', 'Ratatouille&0', 'AMMINISTRATORE', '01/01/2023', false, 1);
INSERT INTO Employee(id, username, password, employee_role, last_modified, first_login, business_id) VALUES (2, 'Utente01', 'Password&1', 'SUPERVISORE', '05/05/2023', true, 1);
INSERT INTO Employee(id, username, password, employee_role, last_modified, first_login, business_id) VALUES (3, 'Utente02', 'Password&2', 'ADDETTOSALA', '06/06/2023', false, 1);
INSERT INTO Employee(id, username, password, employee_role, last_modified, first_login, business_id) VALUES (4, 'Utente03', 'Password&3', 'ADDETTOSALA', '07/07/2023', false, 1);
ALTER sequence Employee_SEQ restart WITH 5;