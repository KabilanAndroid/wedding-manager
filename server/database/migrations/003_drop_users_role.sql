-- Admins now have their own table, so customers no longer need a role
ALTER TABLE users DROP COLUMN role;
