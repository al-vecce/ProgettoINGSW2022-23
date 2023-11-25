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

INSERT INTO MenuCategory(id, average_cost, element_number, last_modified, name) VALUES(1, 0.0, 0, '2023/06/06', 'Primi');
ALTER sequence MenuCategory_SEQ restart WITH 2;

INSERT INTO MenuElement(id, menu_category_id, name, price, openfoodfacts) VALUES(1, 1, 'Pasta-alla-Genovese', 15, false);
INSERT INTO MenuElement(id, menu_category_id, name, price, openfoodfacts) VALUES(2, 1, 'Cotoletta-di-Pollo', 10, false);
INSERT INTO MenuElement(id, menu_category_id, name, price, openfoodfacts) VALUES(3, 1, 'CocaCola-Light', 2, true);
ALTER sequence MenuElement_SEQ restart WITH 4;

INSERT INTO RestaurantCheck(id, check_status, check_total, opening_date_time, check_table) VALUES(1, true, 0.0, '2023/08/08', 6);
INSERT INTO RestaurantCheck(id, check_status, check_total, opening_date_time, check_table) VALUES(2, true, 0.0, '2023/07/07', 2);
INSERT INTO RestaurantCheck(id, check_status, check_total, closing_date_time, opening_date_time, check_table) VALUES(3, false, 0.0, '2023/06/06', '2023/05/05', 1);
ALTER sequence Check_SEQ restart WITH 4;

INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, check_id, menu_element_id) VALUES(1, 5, 75, 15, 1, 1);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, check_id, menu_element_id) VALUES(2, 20, 200, 10, 1, 2);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, check_id, menu_element_id) VALUES(3, 4, 8, 2, 1, 3);
ALTER sequence Order_SEQ restart WITH 4;


