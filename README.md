# Todolist
An application to track all the current and upcoming tasks. A user can register and start tracking their tasks just by entering few details.

It is build using node.js, express.js and mongodb.

____

## Table of Contents
* [Features of the application](#markdown-header-features-of-app)
* [Local Development](#markdown-header-local-devlopement)
    * [Clone the repo](#markdown-header-clone-the-repo)
    * [Install Dependencies](#markdown-header-install-dependencies)
    * [Local Execution](#markdown-header-local-execution)
____

## Features of the application
* New user can register them using `*Signup*` option.
* Existing user can login them using `*Login*` option.
* A new task can be created or an existing task can modified by following the steps given below-

    * enter the task, then
    * select the current status from the following options `[Todo, In Progress, In Testing, Done]`
    * hit `Submit`
____

## Local Development

### Clone the Repo

```bash
git clone https://github.com/captain-shubhanshu/Todolist.git
```

### Install Dependencies

```bash
npm init
```

### Setup Database

```bash
mkdir -p ~/data/db
sudo mongod --dbpath ~/data/db
```

### Local Execution

```bash
node server.js
```