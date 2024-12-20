variable "created_by" {
  type = string
}

variable "project" {
  type = string
}

locals {
  tags = {
    CreatedBy = var.created_by
    Project   = var.project
  }
}



terraform {
  backend "s3" {
    bucket = "catalyst3-bench-tf-state"
    key    = "amplify-frontend/simple-cognito.tfstate"
    region = "us-east-2"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~>4.16"
    }
  }
}

provider "aws" {
  region = "us-east-2"
}

resource "aws_cognito_user_pool" "userpool" {
  name = "simple-cognito"
  password_policy {
    temporary_password_validity_days = 7
    minimum_length                   = 6
  }


  username_attributes      = ["email"] // only email for signup
  auto_verified_attributes = ["email"]


  // forgot password sends to email that is verified 
  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  tags = local.tags
}

resource "aws_cognito_user_group" "admins" {
  name         = "admins"
  user_pool_id = aws_cognito_user_pool.userpool.id

}

resource "aws_cognito_user_pool_client" "userpool-client" {
  name         = "simple-cognito-client"
  user_pool_id = aws_cognito_user_pool.userpool.id

  callback_urls = ["http://localhost:5173"]

  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_scopes                 = ["openid", "email"]
  allowed_oauth_flows                  = ["code", "implicit"]
  supported_identity_providers         = ["COGNITO"]

  token_validity_units {
    access_token  = "minutes"
    refresh_token = "days"
  }
  access_token_validity  = 10 // 10 minutes
  refresh_token_validity = 1  // 1 day 

}


output "pool-id" {
  value = aws_cognito_user_pool.userpool.id
}

output "client-id" {
  value = aws_cognito_user_pool_client.userpool-client.id
}
