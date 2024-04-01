#!/usr/bin/env zx

import Mustache from "mustache";
import { readEnvJson } from "./lib/utils.mjs";

const shell = process.env.SHELL | "/bin/zsh";
$.shell = shell;
$.verbose = false;

await generateTFVars();

async function generateTFVars() {
  const {
    compartmentId,
    compartmentName,
    regionName,
    tenancyId,
    publicKeyContent,
    certFullchain,
    certPrivateKey,
    artifacts,
  } = await readEnvJson();

  const distWebUrl = ""; // artifacts["dist_web.tar.gz"].fullPath;
  const distBackendUrl = ""; // artifacts["dist_backend.tar.gz"].fullPath;
  const ansibleWebUrl = ""; // artifacts["ansible_web.tar.gz"].fullPath;
  const ansibleBackendUrl = ""; // artifacts["ansible_backend.tar.gz"].fullPath;

  const tfVarsPath = "deploy/terraform/terraform.tfvars";

  const tfvarsTemplate = await fs.readFile(`${tfVarsPath}.mustache`, "utf-8");

  const output = Mustache.render(tfvarsTemplate, {
    tenancyId,
    regionName,
    compartmentId,
    ssh_public_key: publicKeyContent,
    cert_fullchain: certFullchain,
    cert_private_key: certPrivateKey,
    // dist_web_url: distWebUrl,
    // dist_backend_url: distBackendUrl,
    // ansible_web_url: ansibleWebUrl,
    // ansible_backend_url: ansibleBackendUrl,
  });

  console.log(
    `Terraform will deploy resources in ${chalk.green(
      regionName
    )} in compartment ${
      compartmentName ? chalk.green(compartmentName) : chalk.green("root")
    }`
  );

  await fs.writeFile(tfVarsPath, output);

  console.log(`File ${chalk.green(tfVarsPath)} created`);

  console.log(`1. ${chalk.yellow("cd deploy/terraform/")}`);
  console.log(`2. ${chalk.yellow("terraform init")}`);
  console.log(`3. ${chalk.yellow("terraform apply -auto-approve")}`);
}
