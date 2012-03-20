module Jekyll
  module ZFilter
    # Convert a simple Markdown string into HTML output, without the wrapping <p>.
    # This is useful for titles with embedded markdown (or to get fancy quotes)
    #
    # input - The Markdown String to convert.
    #
    # Returns the HTML formatted String.
    def markdownify2(input)
      site = @context.registers[:site]
      converter = site.getConverterImpl(Jekyll::MarkdownConverter)
      converter.convert(input).gsub(/<\/?p>/, '').chomp
    end
  end
end

Liquid::Template.register_filter(Jekyll::ZFilter)
