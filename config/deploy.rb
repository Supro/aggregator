set :stages, %w(staging production)
set :default_stage, "production"
set :user, :root
set :application, 'fireimp'

set :deploy_via, :remote_cache
set :repo_url, 'git@github.com:Supro/aggregator.git'
set :scm, :git
set :branch, ENV['BRANCH'] || 'master'

set :linked_dirs, ['log', 'tmp/pids', 'public/uploads']

set :use_sudo, false
set :rbenv_type, :system
set :rbenv_ruby, '2.2.2'
set :rbenv_path, '/root/.rbenv'

set :keep_releases, 3

namespace :deploy do
  desc 'Restart application'

  desc 'Shared storage folders and symlinks to the release'
  task :file_system do
    on roles(:all) do
      execute "ln -nfs #{shared_path}/config/database.yml #{release_path}/config"
      execute "ln -nfs #{shared_path}/config/secrets.yml #{release_path}/config"
    end
  end

  task :restart do
    invoke 'unicorn:restart'
  end

  after :finishing, 'deploy:cleanup'
end

before 'deploy:migrate', 'deploy:file_system'
after 'deploy:publishing', 'deploy:restart'
after 'deploy:migrate', 'deploy:sitemap:refresh'
