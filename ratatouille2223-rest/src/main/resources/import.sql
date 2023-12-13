-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;

INSERT INTO Business(id, business_name) VALUES (1, 'LaRatatouille');
ALTER sequence Business_SEQ restart WITH 2;
INSERT INTO Employee(id, username, password, employee_role, last_modified, first_login, business_id) VALUES (1, 'ADMIN', 'Ratatouille&0', 'AMMINISTRATORE', '2023-01-01T00:00:00', false, 1);
INSERT INTO Employee(id, username, password, employee_role, last_modified, first_login, business_id) VALUES (2, 'Utente01', 'Password&1', 'SUPERVISORE', '2023-03-04T00:00:00', true, 1);
INSERT INTO Employee(id, username, password, employee_role, last_modified, first_login, business_id) VALUES (3, 'Utente02', 'Password&2', 'ADDETTOSALA', '2023-06-06T00:00:00', false, 1);
INSERT INTO Employee(id, username, password, employee_role, last_modified, first_login, business_id) VALUES (4, 'Utente03', 'Password&3', 'ADDETTOSALA', '2023-07-07T00:00:00', false, 1);
ALTER sequence Employee_SEQ restart WITH 5;

INSERT INTO MenuCategory(priority, id, average_cost, element_number, last_modified, name) VALUES(1, 1, 0.0, 0, '2023/06/06', 'Primi');
ALTER sequence MenuCategory_SEQ restart WITH 2;

INSERT INTO MenuElement(priority, id, menu_category_id, name, price, last_modified, openfoodfacts) VALUES(2, 1, 1, 'Pasta-alla-Genovese', 15, '2023-08-08T00:00:00', false);
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, last_modified, openfoodfacts) VALUES(3, 2, 1, 'Cotoletta-di-Pollo', '2023-08-08T00:00:00', 10, false);
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, last_modified, openfoodfacts) VALUES(1, 3, 1, 'CocaCola-Light', '2023-08-08T00:00:00', 2, true);
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, last_modified, openfoodfacts) VALUES(1, 4, 1, 'Coca', 2, '2023-08-08T00:00:00', true);
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, last_modified, openfoodfacts) VALUES(1, 5, 1, 'CocaC', 2, '2023-08-08T00:00:00', true);
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, last_modified, openfoodfacts) VALUES(1, 6, 1, 'CocaCol', 2, '2023-08-08T00:00:00', true);
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, last_modified, openfoodfacts) VALUES(1, 7, 1, 'CocaCola', 2, '2023-08-08T00:00:00', true);
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, last_modified, openfoodfacts) VALUES(1, 8, 1, 'CocaCola-L', 2, '2023-08-08T00:00:00', true);
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, last_modified, openfoodfacts) VALUES(1, 9, 1, 'CocaCola-Li', 2, '2023-08-08T00:00:00', true);
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, last_modified, openfoodfacts) VALUES(1, 10, 1, 'CocaCola-Lig', 2, '2023-08-08T00:00:00', true);
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, last_modified, openfoodfacts) VALUES(1, 11, 1, 'Coc', 2, '2023-08-08T00:00:00', true);
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, last_modified, openfoodfacts) VALUES(1, 12, 1, 'C', 2, '2023-08-08T00:00:00', true);
ALTER sequence MenuElement_SEQ restart WITH 13;

INSERT INTO RestaurantCheck(id, check_status, check_total, opening_date_time, check_table) VALUES(1, true, 0.0, '2023-08-08T00:00:00', 6);
INSERT INTO RestaurantCheck(id, check_status, check_total, opening_date_time, check_table) VALUES(2, true, 0.0, '2023-07-07T00:00:00', 2);
INSERT INTO RestaurantCheck(id, check_status, check_total, opening_date_time, check_table) VALUES(6, true, 0.0, '2023-07-07T00:00:00', 3);
INSERT INTO RestaurantCheck(id, check_status, check_total, opening_date_time, check_table) VALUES(7, true, 0.0, '2023-07-07T00:00:00', 4);
INSERT INTO RestaurantCheck(id, check_status, check_total, opening_date_time, check_table) VALUES(8, true, 0.0, '2023-07-07T00:00:00', 5);
INSERT INTO RestaurantCheck(id, check_status, check_total, opening_date_time, check_table) VALUES(9, true, 0.0, '2023-07-07T00:00:00', 7);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(3, false, 20, 2, '2023-06-06T00:00:00', '2023-05-05T00:00:00', 1);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(4, false, 50, 10, '2023-07-07T00:00:00', '2023-01-01T00:00:00', 8);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(5, false, 60, 30, '2024-06-06T00:00:00', '2023-06-06T00:00:00', 8);
ALTER sequence Check_SEQ restart WITH 10;

INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(1, 5, 75, 15, 1, 1);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(2, 20, 200, 10, 1, 2);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(3, 4, 8, 2, 1, 3);
ALTER sequence Order_SEQ restart WITH 4;


