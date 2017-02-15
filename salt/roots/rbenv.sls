rbenv-deps:
  pkg.installed:
    - names:
      - bash
      - git
      - openssl
      - libssl-dev
      - make
      - curl
      - autoconf
      - bison
      - build-essential
      - libffi-dev
      - libyaml-dev
      - libreadline6-dev
      - zlib1g-dev
      - libncurses5-dev

# ruby-1.9.3-p429:
#   rbenv.absent:
#     - require:
#       - pkg: rbenv-deps

ruby-2.3.3:
  rbenv.installed:
    - default: True
    - require:
      - pkg: rbenv-deps
