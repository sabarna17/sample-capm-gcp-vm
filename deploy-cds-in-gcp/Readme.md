# Deploy your CDS package in GCP App Engine
Here I have tried to deploy an CDS Project to GCP.

## Prerequisite
1. GCP account is active. If no, click here and see details - [GCP](https://cloud.google.com/free)
2. You have tested your CAPM-NodeJS code Locally. You can run your CDS services - (http://localhost:4004/) and it works fine.

## Deployment Steps
1. Install GCP Cli from the below link - [GoogleCloudSDKInstaller](https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe)

2. Authenticate to Google Cloud by below command. While loading it might open a browser and ask for Authentication to your GCP
```sh
gcloud auth login
```

3. Set your Project for GCP for GCP-Cli
```sh
gcloud config set project tidal-analogy-285516
```

4. Now we need to change the package(my-bookshop) a bit.
    - Create a 'app.yaml' file inside the package my-bookshop
    ```sh
    runtime: nodejs12
    ```
    - Your package will look like -
    ```sh
    my-bookshop/
        app
        db
        srv
        app.yaml
        package.json
        package-lock.json
        myCustAPI.js
        README.md
    ```    

5. Now lets deploy with the below command:
```sh
gcloud app deploy
```
![deployment](https://github.com/sabarna17/sample-capm-gcp-vm/blob/main/deploy-cds-in-gcp/deploymenttoGCP.PNG)

6. Your API is not being hosted in GCP:


![CDS-in-GCP](https://github.com/sabarna17/sample-capm-gcp-vm/blob/main/deploy-cds-in-gcp/deployedinGCP.PNG)


7. Ta da it got deployed:


![CDS-in-GCP](https://github.com/sabarna17/sample-capm-gcp-vm/blob/main/deploy-cds-in-gcp/deployed-in-GCP.PNG)

## Read more
[Create GCP account](https://cloud.google.com/billing/docs/how-to/manage-billing-account)
(https://cloud.google.com/appengine/docs/standard/nodejs/building-app)

## Common Error
This deployment might give you the error as - "Internal server error" Whenever Catalog urls are executed.
- To solve this use the [package.json](https://github.com/sabarna17/sample-capm-gcp-vm/blob/main/deploy-cds-in-gcp/package.json) file



