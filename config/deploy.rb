set :stages, %w(staging production)
set :default_stage, "production"
set :user, :deploy
set :application, 'fireimp'

set :deploy_via, :remote_cache
set :repo_url, 'git@github.com:Supro/aggregator.git'
set :scm, :git
set :branch, ENV['BRANCH'] || 'master'

set :linked_dirs, ['tmp/pids']

set :use_sudo, false
set :rbenv_type, :system
set :rbenv_ruby, '2.1.1'

set :keep_releases, 3

namespace :deploy do
  desc 'Restart application'

  task :restart do
    invoke 'unicorn:restart'
  end

  after :finishing, 'deploy:cleanup'
end

after 'deploy:publishing', 'deploy:restart'
after 'deploy:migrate', 'deploy:sitemap:refresh'
