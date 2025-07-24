CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    github_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stack (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    image_url VARCHAR(255)  
);

CREATE TABLE project_stack (
    project_id INT,
    stack_id INT,
    PRIMARY KEY (project_id, stack_id),
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (stack_id) REFERENCES stack(id)
);


INSERT INTO stack (name, image_url) VALUES
("css", "/images/css.png"),
("express", "/images/express.png"),
("git", "/images/git.png"),
("github","/images/github.png"),
("js", "/images/js.png"),
("mysql","/images/mysql.png"),
("node","/images/node.png"),
("react", "/images/react.png"),
("ts","/images/ts.png")


