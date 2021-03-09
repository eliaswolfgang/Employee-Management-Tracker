USE employees;

INSERT INTO department (name)
VALUES ('Inbounds'), ('Chats'), ('Escalations'), ('Quality Assurance');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Inbounds Manager', 80000, 1),
    ('Inbounds Supervisor', 50000, 1),
    ('Inbounds CSR', 30000, 1),
    ('Chats Manager', 80000, 2),
    ('Chats Supervisor', 50000, 2),
    ('Chats CSR', 30000, 2),
    ('Escalations Manager', 80000, 3),
    ('Escalations Supervisor', 50000, 3),
    ('Escalations CSR', 30000, 3),
    ('Training Manager', 75000, 4),
    ('QA Specialist', 45000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Brandon', 'Hoshaw', 1, 1),
    ('Cherie', 'Mazza', 2, 1),
    ('Ben', 'Gutwillig', 3, 1),
    ('Rafael', 'Rodriguez', 4, 2),
    ('Julie', 'Taguding', 5, 2),
    ('Lacee', 'Stanley', 6, 2),
    ('Cody', 'Schutte', 7, 3),
    ('Mallory', 'Serano', 8, 3),
    ('Javier', 'Azarcoya', 9, 3),
    ('Brett', 'Hamilton', 10, 4),
    ('Julie', 'Marchiano', 11, 4);
