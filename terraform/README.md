# Terraform Configuration for AWS Cognito

This folder contains Terraform configuration files to set up AWS Cognito resources for the Catalyst 3 Angular Platform project.

## Prerequisites

- [Terraform](https://www.terraform.io/downloads.html) installed
- [AWS CLI](https://aws.amazon.com/cli/) installed and configured with appropriate credentials

## Files

- `main.tf`: Main configuration file that defines the AWS Cognito resources.
- `users.tf`: Configuration file that defines AWS Cognito users and user groups.
- `.terraform.lock.hcl`: Lock file for Terraform providers.

## Configuration

### Variables

- `created_by`: The name of the person or system that created the resources.
- `project`: The name of the project.

### Resources

- `aws_cognito_user_pool.userpool`: Defines the Cognito user pool.
- `aws_cognito_user_pool_client.userpool-client`: Defines the Cognito user pool client.
- `aws_cognito_user_group.admins`: Defines the Cognito user group for admins.
- `aws_cognito_user.test1` to `aws_cognito_user.test5`: Defines the Cognito users.
- `aws_cognito_user_in_group.in-admin`: Adds a user to the admin group.

## Usage

1. **Initialize Terraform:**

   ```sh
   terraform init
   ```

2. **Validate the configuration:**

   ```sh
   terraform validate
   ```

3. **Apply the configuration:**

   ```sh
   terraform apply
   ```

4. **View the outputs:**

   ```sh
   terraform output
   ```

## Outputs

- `pool-id`: The ID of the created Cognito user pool.
- `client-id`: The ID of the created Cognito user pool client.

## Notes

- Ensure that your AWS CLI is configured with the necessary permissions to create Cognito resources.
- The `terraform apply` command will prompt for confirmation before creating the resources. You can use the `-auto-approve` flag to skip this prompt.

For more information on Terraform, visit the [Terraform documentation](https://www.terraform.io/docs/index.html).
