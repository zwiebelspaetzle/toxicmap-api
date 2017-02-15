# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "debian/jessie64"

  config.vm.network "private_network", ip: "192.168.77.77", netmask: "255.255.255.0"
  config.vm.network "forwarded_port", guest: 80, host: 8080

  config.vm.synced_folder "../tm-api-node/", "/usr/local/tm-api/"
  config.vm.synced_folder "./salt/roots/", "/srv/salt/"
  config.vm.synced_folder "./salt/pillar/", "/srv/pillar/"
  # config.vm.synced_folder "./rubies", "/home/vagrant/.rubies/"

  # install those to be able to use gitfs for node formula
  # @see https://github.com/saltstack/salt-bootstrap/issues/245
  config.vm.provision :shell, :inline => "sudo apt-get -y install git-core"
  config.vm.provision :shell, :inline => "sudo apt-get -y install python-setuptools"
  config.vm.provision :shell, :inline => "sudo easy_install GitPython"

  config.vm.provision :salt do |salt|
      salt.bootstrap_options = '-F -c /tmp/ -P'
      salt.minion_config = "salt/minion.yml"
      salt.run_highstate = true
      salt.colorize = true
      salt.log_level = 'info'
      salt.verbose = true
  end
end
