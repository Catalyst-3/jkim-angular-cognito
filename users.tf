
resource "aws_cognito_user" "test1" {
  user_pool_id = aws_cognito_user_pool.userpool.id
  username     = "test1@test.com"
  password     = "test123"

  attributes = {
    email          = "test1@test.com"
    email_verified = true
  }
}

resource "aws_cognito_user" "test2" {
  user_pool_id = aws_cognito_user_pool.userpool.id
  username     = "test2@test.com"
  password     = "test123"

  attributes = {
    email          = "test2@test.com"
    email_verified = true
  }
}

resource "aws_cognito_user" "test3" {
  user_pool_id = aws_cognito_user_pool.userpool.id
  username     = "test3@test.com"
  password     = "test123"

  attributes = {
    email          = "test3@test.com"
    email_verified = true
  }
}

resource "aws_cognito_user" "test4" {
  user_pool_id = aws_cognito_user_pool.userpool.id
  username     = "test4@test.com"
  password     = "test123"

  attributes = {
    email          = "test4@test.com"
    email_verified = true
  }
}

resource "aws_cognito_user" "test5" {
  user_pool_id = aws_cognito_user_pool.userpool.id
  username     = "test5@test.com"
  password     = "test123"

  attributes = {
    email          = "test5@test.com"
    email_verified = true
  }
}

resource "aws_cognito_user_in_group" "in-admin" {
  user_pool_id = aws_cognito_user_pool.userpool.id
  group_name   = aws_cognito_user_group.admins.name
  username     = aws_cognito_user.test5.username
}
