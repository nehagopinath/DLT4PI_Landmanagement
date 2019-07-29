# DLT4PI_Landmanagement

**1. Description**

A Blockchain-based application for solving land conflicts in developing areas and preventing land grabbers from dispossessing locals and taking from them a sustainable future!

**2. Prerequisites**

**Versions of main packages used:**

* Docker: 18.06.1
* Hyperledger Fabric: 1.4.2
* Node: 8.16.0
* NPM: 6.4.1
* Angular: 8.0
* Express: 4.16.2

**Things to be Installed:**

* Install prerequisites of Hyperledger fabric:
    [https://hyperledger-fabric.readthedocs.io/en/release-1.2/prereqs.html](https://hyperledger-fabric.readthedocs.io/en/release-1.2/prereqs.html)


**3. Installation Instructions**

* Download Scripts:
    curl -sSL https://raw.githubusercontent.com/hyperledger/fabric/master/scripts/bootstrap.sh | bash -s 1.4.2
* To start the hyperledger Fabric network (With 2 Orgs and 2 peers in each org) : 
1. Navigate to /dlt4pi_landmanagement/fit4ghana_code/fit4ghana_application
2. Execute ./startFabric.sh
* To start the node server :
1. Navigate to /dlt4pi_landmanagement/fit4ghana-node-server/nodejs-server
2. Execute npm install to install the dependancies
3. Run npm run devstart
* To start the angular front end:
1. Navigate to /dlt4pi_landmanagement/fit4ghana-angular
2. Execute npm install to install the dependancies
3. Run ng serve

**4.Instructions to run the application**:

1. To use the Fit4ghana applications to interact with the deployed Fit4ghana contract
2. Start by changing into the "javascript" directory:
    cd javascript
3. Next, install all required packages:
    npm install
4. Then run the following applications to enroll the admin user, and register new   users (chief, cls, lc, familyMember and ExternalMember)
  which will be used by the other applications to interact with the deployed
  contract:
    1. node enrollAdmin.js
    2. node registerUser.js

**5. How to use the Frontend**

Refer the Video for a short demo on how to use the front end.
Navigate to the directory : /dlt4pi_landmanagement/01 Documentation 

**6. System Architecture**

1. Refer the System Architecture and the process flow diagrams under the follwing sub-directory:
/dlt4pi_landmanagement/01 Documentation/03-System_Diagrams
2. For other research related documents: Please refer /dlt4pi_landmanagement/01 Documentation/02-Research

**7. Assumptions made for Development**

*  Tested on MacOS

**8. Errors / Bugs**

