# A way to specify a Twitter card for posts that can still end up in my default
# layout. This works around a Jekyll "bug" where page.layout is the parent
# layout instead of the specific one.
# Impl based on https://gistflow.com/posts/609-content_for-sidebar-in-jekyll
module Jekyll
  class TwitterCard < Liquid::Block
    alias :super_render :render

    def initialize(tag_name, identifier, tokens)
      super
    end

    def render(context)
      context.environments.first["page"]["twitter_card"] = super_render(context)
      ''
    end
  end

  class OpenGraph < Liquid::Block
    alias :super_render :render

    def initialize(tag_name, identifier, tokens)
      super
    end

    def render(context)
      context.environments.first["page"]["opengraph"] = super_render(context)
      ''
    end
  end
end

Liquid::Template.register_tag('twitter_card', Jekyll::TwitterCard)
Liquid::Template.register_tag('opengraph', Jekyll::OpenGraph)
