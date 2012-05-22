desc "less css"
task :css do
  system("lessc _css/backtothefuture.less > css/backtothefuture.css")
end

desc "put it up"
task :deploy do
  system("rsync -avze ssh --delete _site/ zpao.com:zpao.com/")
end

# based on the new_post task in octopress
desc "new post"
task :new, :title, :tags do |t, args|
  args.with_defaults(:title => ENV["title"])

  abort("ABORT: post need title...") unless args.title

  title = args.title
  slug = title.downcase.gsub(/\s+/, "-").gsub(/["'.?!:]/, "")
  #TODO: check for files that have same title because permalink format doesn't allow dupes
  filename = "_posts/#{Time.now.strftime("%Y-%m-%d")}-#{slug}.markdown"

  abort("ABORT: #{filename} exists...") if File.exists?(filename)

  puts "Creating new post: #{filename}"
  open(filename, "w") do |post|
    post.puts "---"
    post.puts "title: \"#{title}\""
    post.puts "date: #{Time.now.strftime("%Y-%m-%d %H:%M")}"
    post.puts "tags:"
    post.puts "  - "
    post.puts "layout: post"
    post.puts "---"
    post.puts
    post.puts
  end
end
