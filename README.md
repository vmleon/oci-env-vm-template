# OCI Environment for Virtual Machines (template)

This project is a template for building an environment for Virtual Machines.

The functions are:

- Set up the environment variables in a `.env.json` file.
- Deploy artifacts with the Ansible code and the application code, plus the Oracle Database wallet for the connection.
- Create the `terraform.tfvars`
- Allow you to apply the infrastructure

## Requirements

- OCI CLI installed and configured. Test it with `oci os ns get`
- Node.js v15+

## Set up environment

```bash
cd scripts/ && npm init -y && npm install && cd ..
```

```bash
npx zx scripts/setenv.mjs
```
