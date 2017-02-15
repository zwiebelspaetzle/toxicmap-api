vim:
  pkg.installed

sudo:
  pkg.installed

build-essential:
  pkg.installed

git:
  pkg.installed

curl:
  pkg.installed

ruby:
  pkg.installed

include:
  - node
  - mongodb
  - mysql

npm:
  pkg.installed

xlsx-to-json:
  npm.installed:
    # - dir: /vagrant/import/
    - require:
      - pkg: npm

# ended up doing this to get right version of ruby for mongify
# wget -O ruby-install-0.6.0.tar.gz https://github.com/postmodern/ruby-install/archive/v0.6.0.tar.gz
# tar -xzvf ruby-install-0.6.0.tar.gz
# cd ruby-install-0.6.0/
# sudo make install

# mongify:
#   gem.installed:
#     - name: mongify

bash-profile:
  file.managed:
    - name: /home/vagrant/.bash_profile
    - contents:
      - alias ll='ls -alh'
