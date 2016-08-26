CREATE TABLE todos (
    id serial PRIMARY KEY,
    content text,
    completed BOOLEAN default false
);

GRANT ALL PRIVILEGES ON TABLE todos to pguser;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO pguser;
