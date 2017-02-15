rvm:
  group.present: []
  user.present:
    - gid: rvm
    - home: /home/rvm
    - require:
      - group: rvm

rvm-deps:
  pkg.installed:
    - pkgs:
      - bash
      - coreutils
      - gzip
      - bzip2
      - gawk
      - sed
      - curl
      - git-core
      - subversion

ruby-2.3.3:
  rvm.installed:
    - default: True
    - user: vagrant
    - require:
      - pkg: rvm-deps
      # - pkg: mri-deps
      - user: rvm
