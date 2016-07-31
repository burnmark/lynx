# lynx
Web app for sharing links

## Installation & Development

### Prerequisites
We're assuming you're on OSX with node, npm, and homebrew already installed

### Installing on your machine

```
$ cd <project>
$ npm install
$ brew cask install virtualbox
$ brew cask install vagrant
```

Add project secrets:
```
$ mkdir secret
$ touch secret/config-maria.json
```

### Starting Vagrant

```
$ vagrant up
$ vagrant up
$ vagrant ssh
```

**You're in!**

### Installing in Vagrant

```
$ cd /vagrant
$ export SIGSECRET=$(uuidgen)
```

Some things don't transfer well between osx & ubuntu, so we gotta install these again:

```
$ npm install bcrypt
$ npm install mariasql
```

Now we're ready for the good stuff:

```
$ node server.js
```

It should say:
```
listening at http://localhost:80
```

Which gets remapped in the `Vagrantfile` to `1234` on your machine:
```
http://localhost:1234
```

### Starting Webpack

Webpack runs in OSX to watch for file changes and build the result:

```
$ cd <project>
$ npm run dev
```

Watch this output to make sure you don't have syntax errors caught by Babel, and be patient to let the build run before refreshing your browser and seeing your changes.

# YOU ARE GOOD TO GO
