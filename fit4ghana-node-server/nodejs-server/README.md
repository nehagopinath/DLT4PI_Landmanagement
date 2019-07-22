# MRI

the MRI backend application can be found [here](https://repobruegge.in.tum.de/projects/IOS1819MRI/repos/ios1819mri-server/)

## Prerequisites

* nodejs [official website](https://nodejs.org/en/) - nodejs includes [npm](https://www.npmjs.com/) (node package manager)

* mongodb [official installation guide](https://docs.mongodb.org/manual/administration/install-community/)

## Setup (before first run)

Go to your project root folder via command line
```
cd path/to/workspace/ios1819mri-server
```

**Install node dependencies**

```
npm install
```

**Set up your database**

* Create a new directory where your database will be stored (it's a good idea to separate data and business logic - the data directory should be on a different place than your app)
* Start the database server
```
mongod --dbpath relative/path/to/database
```
* Create all database schemes and import data to begin with
```
mongorestore dump/
```
If no dump is available, please populate first the mri database by using the dummy data from folder ```dummy-data``` and afterwards running 
```
mongo localhost:27017/mri NameOfDummyFile.js
```
Create the dump by calling ```mongodump --db mri```inside the ```dump/ios1819mri```folder.

For the video files stored using GridFS, create a dump using the following commands, assuming that the DB used to store the videos is called ```GridFS```:
````
 mongodump --db GridFS --collection fs.chunks
 mongodump --db GridFS --collection fs.files
```` 

## Start the project

**Development environment**
```bash
npm run devstart
```

**Production environment**
```bash
npm start
```
