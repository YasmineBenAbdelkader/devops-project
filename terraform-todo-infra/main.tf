provider "aws" {
  region = "eu-west-3" # Paris
}

resource "aws_instance" "todo_server" {
  ami           = "ami-0c6b1d09930fac512" # Ubuntu 22.04
  instance_type = "t2.micro"

  tags = {
    Name = "TodoBackend"
  }
}
