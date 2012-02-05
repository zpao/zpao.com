desc "less css"
task :css do
  system("lessc _css/backtothefuture.less > css/backtothefuture.css")
end

desc "put it up"
task :deploy do
  system("rsync -avze ssh --delete _site/ zpao.com:zpao.com/")
end
