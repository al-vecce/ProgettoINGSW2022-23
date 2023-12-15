-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;

INSERT INTO Business(id, business_name, business_phone_number, business_address) VALUES (1, 'La Ratatouille', '3396036798', 'Via dei Topi (NA), 24b');
ALTER sequence Business_SEQ restart WITH 2;
INSERT INTO Employee(id, username, password, employee_role, last_modified, first_login, business_id) VALUES (1, 'ADMIN',    'Ratatouille&0',    'AMMINISTRATORE',   '01-01-2023', false, 1);
INSERT INTO Employee(id, username, password, employee_role, last_modified, first_login, business_id) VALUES (2, 'Utente01', 'Password&1',       'SUPERVISORE',      '05-05-2023', true,  1);
INSERT INTO Employee(id, username, password, employee_role, last_modified, first_login, business_id) VALUES (3, 'Utente02', 'Password&2',       'ADDETTOSALA',      '06-06-2023', false, 1);
INSERT INTO Employee(id, username, password, employee_role, last_modified, first_login, business_id) VALUES (4, 'Utente03', 'Password&3',       'ADDETTOSALA',      '07-07-2023', false, 1);
ALTER sequence Employee_SEQ restart WITH 5;

INSERT INTO MenuCategory(priority, id, average_cost, element_number, last_modified, name) VALUES(2, 1, 30.0, 0, '2020-06-06', 'Primi');
INSERT INTO MenuCategory(priority, id, average_cost, element_number, last_modified, name) VALUES(3, 2, 10.5, 0, '1999-11-03', 'Secondi');
INSERT INTO MenuCategory(priority, id, average_cost, element_number, last_modified, name) VALUES(1, 3, 0.0,  0, '2021-08-04', 'Antipasti');
INSERT INTO MenuCategory(priority, id, average_cost, element_number, last_modified, name) VALUES(4, 4, 0.0,  0, '2002-12-11', 'Fritti');
INSERT INTO MenuCategory(priority, id, average_cost, element_number, last_modified, name) VALUES(6, 5, 0.0,  0, '2023-04-22', 'Bevande');
INSERT INTO MenuCategory(priority, id, average_cost, element_number, last_modified, name) VALUES(5, 6, 99.0, 0, '2010-09-03', 'Dolci');
INSERT INTO MenuCategory(priority, id, average_cost, element_number, last_modified, name) VALUES(7, 7, 2,    0, '2006-09-08', 'Servizio');
ALTER sequence MenuCategory_SEQ restart WITH 8;

INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, second_name, second_ingredients, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(1,  1, 1, 'Pasta alla Genovese',    15, 'Manzo,Cipolle',            'GLUTINE',                   'Genovese Sauce Pasta', 'Beef,Onions',            false, '', '2020-06-06');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, second_name, second_ingredients, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(13, 2, 1, 'Risotto alla Pescatora', 20, 'Vongole,Gamberi,Calamari', 'PESCE,MOLLUSCHI,CROSTACEI', 'Seafood Risotto',      'Clams,Shrimps,Squids',   false, '', '2020-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(9, 3, 1, 'Risotto allo Zafferano',  22, 'Cipolle,Brodo-Vegetale,Zafferano', 'LATTE', false, '', '2020-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(11, 4, 1, 'Lasagna',                18, 'Macinato,Pomodoro,Mozzarella,Basilico,Ricotta', 'GLUTINE,LATTE,UOVA', false, '', '2020-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(10, 5, 1, 'Zuppa di Ceci',          9,  'Ceci', 'GLUTINE', false, '', '2020-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(8, 6, 1, 'Cannelloni',              22, 'Macinato,Spinaci,Ricotta,Uovo', 'GLUTINE,LATTE,UOVA', false, '', '2020-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(5, 7, 1, 'Pasta e Lenticchie',      8,  'Lenticchie', 'GLUTINE', false, '', '2020-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(7, 8, 1, 'Tagliatelle ai Funghi',   25, 'Porcini', 'GLUTINE', false, '', '2020-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(6, 9, 1, 'Ragù di Cinghiale',       28, 'Pomodoro,Cinghiale,Cipolle', 'GLUTINE', false, '', '2020-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(3, 10, 1, 'Pizza Margherita',       10, 'Pomodoro,Mozzarella,Basilico', 'GLUTINE,LATTE', false, '', '2020-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(4, 11, 1, 'Zuppa di Cozze',         11, 'Cozze', 'PESCE,MOLLUSCHI', false, '', '2020-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(2, 12, 1, 'Empanadas',              13, 'Cipolla,Manzo,Olive,Uova,Peperoncino', 'GLUTINE,UOVA', false, '', '2020-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(12, 13, 1, 'Ravioli',               15, 'Pomodoro,Ricotta,Basilico', 'GLUTINE,LATTE', false, '', '2020-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(3, 14, 2, 'Cotoletta di Pollo',     10, 'Pollo', 'GLUTINE', false, '', '1999-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(4, 15, 2, 'Salsicce di Cinghiale',  16, 'Cinghiale', ',', false, '', '1998-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(5, 16, 2, 'Filetto di Scottona',    18, 'Manzo', ',', false, '', '1998-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(6, 17, 2, 'Black Angus',            29, 'Manzo', ',', false, '', '1998-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(10, 18, 2, 'Pulled Pork',           13, 'Maiale', ',', false, '', '1999-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(2, 19, 2, 'American-Brisket',       27, 'Maiale', ',', false, '', '1999-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(9, 20, 2, 'Orata alla Brace',       17, 'Orata', 'PESCE', false, '', '1999-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(8, 21, 2, 'Aragosta',               35, 'Aragosta', 'CROSTACEI', false, '', '1999-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(7, 22, 2, 'Gamberi Scottati',       21, 'Gamberi', 'CROSTACEI', false, '', '1999-11-03');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(1, 23, 2, 'Crocchette di Pollo',    8,  'Pollo', 'GLUTINE', true, '8008110121006', '1998-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(3, 24, 3, 'Patatine',               5,  'Patate', ',', false, '', '2002-12-11');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(2, 25, 3, 'Frittatina',             2,  'Piselli,Macinato,Besciamella', 'GLUTINE,LATTE', false, '', '2000-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(1, 26, 3, 'Mozzarella in Carrozza', 1,  'Mozzarella', 'GLUTINE,LATTE', true, '0074969051694', '2000-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(4, 27, 3, 'Montanara',              8,  'Pomodoro,Basilico', 'GLUTINE', false, '', '2000-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(4, 28, 4, 'Tiramisù',               15, 'Uova,Caffè,Mascarpone,Savoiardi', 'LATTE,UOVA,GLUTINE', false, '', '2020-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(3, 29, 4, 'Sorbetto al Limone',     8,  'Limone', 'LATTE', false, '', '2020-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(2, 30, 4, 'Profiteroles',           12, ',',',',true, '8003170029231 ', '2020-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(1, 31, 4, 'Torta-della-Nonna',      9, 'Limone,Uova,Burro', 'GLUTINE,UOVA,LATTE', false, '', '2020-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(5, 32, 5, 'Bruschette',             3, 'Pomodori', 'GLUTINE', false, '', '2021-08-04');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(2, 33, 5, 'Tagliere di Salumi',     11, ',', ',', false, '', '2020-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(3, 34, 5, 'Tagliere di Formaggi',   7,  ',', 'LATTE,FRUTTAGUSCIO', false, '', '2020-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(4, 35, 5, 'Antipasto di Mare',      21, ',', 'PESCE,MOLLUSCHI,CROSTACEI', false, '', '2020-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(1, 36, 5, 'Gnocco Fritto',          8,  ',', 'GLUTINE', false, '', '2020-06-05');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(1, 37, 6, 'CocaCola Zero',          2,  ',', ',', true, '5000112556247', '2020-01-09');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(3, 38, 6, 'CocaCola',               2,  ',', ',', true, '5449000214911', '2020-03-02');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(2, 39, 6, 'Fanta',                  2,  ',', ',', true, '5000112557688', '2020-06-15');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(5, 40, 6, 'Acqua',                  1,  ',', ',', true, '8008490000021', '2020-07-25');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(4, 41, 6, 'Vino della Casa',        5,  ',', ',', false, '', '2023-04-22');
INSERT INTO MenuElement(priority, id, menu_category_id, name, price, ingredients, allergens, openfoodfacts, openfoodfacts_identifier, last_modified) VALUES(1, 42, 7, 'Coperto',                2,  ',', ',', false, '', '2006-09-08');
ALTER sequence MenuElement_SEQ restart WITH 43;

INSERT INTO RestaurantCheck(id, check_status, check_total, opening_date_time, check_table) VALUES(25, true, 39.0, '2023-12-13T13:01', 8);
INSERT INTO RestaurantCheck(id, check_status, check_total, opening_date_time, check_table) VALUES(26, true, 87.0, '2023-12-13T13:12', 3);
INSERT INTO RestaurantCheck(id, check_status, check_total, opening_date_time, check_table) VALUES(27, true, 85.0, '2023-12-13T14:33', 11);
INSERT INTO RestaurantCheck(id, check_status, check_total, opening_date_time, check_table) VALUES(28, true, 15.0, '2023-12-13T14:27', 2);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(1, false, 60, 12, '2020-03-06T13:10:50', '2020-03-06T12:13:32', 1);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(2, false, 15, 5, '2021-09-23T22:33:22', '2021-09-23T21:43:33', 2);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(3, false, 40, 10, '2022-10-01T00:13:01', '2022-09-30T22:15:54', 4);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(4, false, 250, 25, '2022-11-06T16:19:27', '2022-11-06T17:00:12', 1);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(5, false, 45, 15, '2022-11-12T21:46:58', '2022-11-12T22:19:00', 6);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(6, false, 32, 8, '2022-12-11T13:15:14', '2022-12-11T14:11:09', 2);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(7, false, 42, 21, '2023-01-09T20:19:01', '2023-01-09T20:59:38', 7);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(8, false, 58, 29, '2023-02-23T15:32:27', '2023-02-23T14:08:33', 2);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(9, false, 70, 10, '2023-03-18T23:11:09', '2023-03-18T22:39:23', 1);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(10, false, 68, 17, '2023-04-12T14:46:36', '2023-04-12T13:10:39', 3);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(11, false, 55, 11, '2023-05-24T21:54:34', '2023-05-24T20:00:03', 6);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(12, false, 90, 15, '2023-06-11T22:13:45', '2023-06-11T20:23:16', 2);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(13, false, 33, 11, '2023-07-30T15:39:28', '2023-07-30T13:33:35', 5);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(14, false, 30, 10, '2023-08-11T21:17:24', '2023-08-11T20:39:00', 4);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(15, false, 52, 13, '2023-09-23T14:10:22', '2023-09-23T12:37:23', 4);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(16, false, 10, 2, '2023-10-25T13:22:30', '2023-10-25T12:58:34', 7);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(17, false, 18, 9, '2023-11-11T23:44:09', '2023-11-11T22:00:35', 3);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(18, false, 40, 20, '2023-12-02T00:10:35', '2023-12-01T22:30:21', 3);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(19, false, 45, 15, '2023-12-09T15:16:10', '2023-12-09T12:09:57', 1);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(20, false, 27, 9, '2023-12-12T20:58:19', '2023-12-12T19:01:49', 1);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(21, false, 40, 8, '2023-12-12T21:29:01', '2023-12-12T20:11:09', 2);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(22, false, 12, 2, '2023-12-12T22:00:03', '2023-12-12T20:09:00', 3);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(23, false, 20, 5, '2023-12-13T14:00:08', '2023-12-13T12:41:01', 4);
INSERT INTO RestaurantCheck(id, check_status, check_total, check_average, closing_date_time, opening_date_time, check_table) VALUES(24, false, 88, 22, '2023-12-13T14:24:23', '2023-12-13T13:10:56', 5);
ALTER sequence Check_SEQ restart WITH 29;

INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(1, 5, 10, 2, 1, 42);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(2, 5, 50, 10, 1, 10);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(3, 3, 15, 5, 2, 24);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(4, 4, 40, 10, 3, 14);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(5, 10, 250, 25, 4, 8);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(6, 3, 45, 15, 5, 13);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(7, 4, 32, 8, 6, 36);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(8, 2, 42, 21, 7, 22);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(9, 2, 58, 29, 8, 17);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(10, 7, 70, 10, 9, 10);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(11, 4, 68, 17, 10, 20);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(12, 5, 55, 11, 11, 33);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(13, 6, 90, 15, 12, 13);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(14, 3, 33, 11, 13, 11);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(15, 3, 30, 10, 14, 10);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(16, 4, 52, 13, 15, 12);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(17, 5, 10, 2, 16, 38);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(18, 2, 18, 9, 17, 31);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(19, 2, 40, 20, 18, 2);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(20, 3, 45, 15, 19, 1);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(21, 3, 27, 9, 20, 5);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(22, 5, 40, 8, 21, 27);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(23, 6, 12, 2, 22, 25);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(24, 4, 20, 5, 23, 41);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(25, 4, 88, 22, 24, 3);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(26, 3, 39, 13, 25, 18);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(27, 3, 87, 29, 26, 17);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(28, 5, 10, 2, 27, 42);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(29, 3, 6, 2, 28, 42);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(30, 5, 75, 15, 27, 19);
INSERT INTO RestaurantOrder(id, quantity, order_total, current_price, restaurantCheck, menu_element_id) VALUES(31, 3, 9, 3, 28, 32);
ALTER sequence Order_SEQ restart WITH 32;

