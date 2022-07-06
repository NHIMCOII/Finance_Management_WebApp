CREATE TABLE [dbo].[sessions](
    [sid] [nvarchar](255) NOT NULL PRIMARY KEY,
    [session] [nvarchar](max) NOT NULL,
    [expires] [datetime] NOT NULL
)

CREATE TABLE [users](
    id INT NOT NULL IDENTITY(1,1),
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
	firstName NVARCHAR(255),
	lastName NVARCHAR(255),
	dob DATE,
	job NVARCHAR(255),
	address NVARCHAR(255),
	phone VARCHAR(20),
	facebook VARCHAR(255),
	linkedin VARCHAR(255),
	gender BIT
)