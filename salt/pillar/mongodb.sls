## For versions of Mongo that use the YAML format for configuration, use the
## following. All entries in mongod_settings are written to the config file
## verbatim. The storage:dbPath and systemLog:path entries are required in
## this usage and take precedence over db_path at the top level (see references
## in mongodb/init.sls).
mongodb:
  use_repo: True
  version: 3.2 # use oldstable in for 1.8 - 2.6
  repo_component: main
  mongodb_package: mongodb-org
  mongodb_user: mongodb
  mongodb_group: mongodb
  mongod: mongod
  conf_path: /etc/mongod.conf
  log_path: /mongodb/log
  db_path: /mongodb/data
  mongod_settings:
    systemLog:
      destination: file
      logAppend: true
      path: /var/log/mongodb/mongod.log
    storage:
      dbPath: /var/lib/mongodb
      journal:
        enabled: true
    net:
      port: 27017
      bindIp: 0.0.0.0
    setParameter:
      textSearchEnabled: true
