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

include:
  - node
  - mongodb
  # - mysql 

npm:
  pkg.installed

bash-profile:
  file.managed:
    - name: /home/vagrant/.bash_profile
    # - name: /home/tmadmin/.bash_profile  this instead on live
    - contents:
      - alias ll='ls -alh'
